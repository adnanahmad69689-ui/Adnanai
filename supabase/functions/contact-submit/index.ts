import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const allowedOrigins = new Set([
  "https://adnanai.com",
  "https://www.adnanai.com",
  "https://adnan-ai-portfolio.pages.dev",
]);

const json = (body: unknown, status = 200, origin = "") =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      Vary: "Origin",
    },
  });

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, max) : "";
const cleanMessage = (value: unknown) => (typeof value === "string" ? value.trim().slice(0, 4000) : "");
const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char);

async function hash(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async request => {
  const origin = request.headers.get("origin") ?? "";
  const corsOrigin = allowedOrigins.has(origin) ? origin : "";
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": corsOrigin,
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        Vary: "Origin",
      },
    });
  }
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405, corsOrigin);
  if (!allowedOrigins.has(origin)) return json({ error: "Unsupported origin" }, 403, corsOrigin);

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400, corsOrigin);
  }

  if (clean(data.website, 200)) return json({ ok: true }, 200, corsOrigin);

  const name = clean(data.name, 120);
  const email = clean(data.email, 254).toLowerCase();
  const subject = clean(data.subject, 180);
  const service = clean(data.service, 80);
  const message = cleanMessage(data.message);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !emailPattern.test(email) || !subject || !service || !message) {
    return json({ error: "Please complete all required fields with a valid email." }, 400, corsOrigin);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (!supabaseUrl || !serviceKey || !resendKey) {
    return json({ error: "Contact delivery is not configured yet." }, 503, corsOrigin);
  }

  const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const keyHash = await hash(`${ip}:${email}`);
  const authHeaders = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };

  const rateResponse = await fetch(
    `${supabaseUrl}/rest/v1/contact_submission_rate_limits?key_hash=eq.${keyHash}&select=attempt_count,window_started_at`,
    { headers: authHeaders },
  );
  const existing = rateResponse.ok ? await rateResponse.json() : [];
  const now = Date.now();
  const windowStart = existing[0] ? new Date(existing[0].window_started_at).getTime() : 0;
  if (existing[0] && now - windowStart < 60 * 60 * 1000 && existing[0].attempt_count >= 5) {
    return json({ error: "Please wait before sending another enquiry." }, 429, corsOrigin);
  }

  const rateBody =
    existing[0] && now - windowStart < 60 * 60 * 1000
      ? { key_hash: keyHash, attempt_count: existing[0].attempt_count + 1, updated_at: new Date().toISOString() }
      : { key_hash: keyHash, attempt_count: 1, window_started_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  await fetch(`${supabaseUrl}/rest/v1/contact_submission_rate_limits?on_conflict=key_hash`, {
    method: "POST",
    headers: { ...authHeaders, Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify(rateBody),
  });

  const insertResponse = await fetch(`${supabaseUrl}/rest/v1/contact_submissions`, {
    method: "POST",
    headers: { ...authHeaders, Prefer: "return=representation" },
    body: JSON.stringify({ name, email, subject, service, message, delivery_status: "pending" }),
  });
  if (!insertResponse.ok) return json({ error: "Unable to save your enquiry. Please try again." }, 500, corsOrigin);
  const [submission] = await insertResponse.json();

  const html = `<h2>New Adnan Ai enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><p><strong>Service:</strong> ${escapeHtml(service)}</p><p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`;
  const sendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Adnan Ai <notifications@adnanai.com>",
      to: ["info@adnanai.com"],
      reply_to: email,
      subject: `[Enquiry] ${subject}`,
      html,
      text: `New Adnan Ai enquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nService: ${service}\n\nMessage:\n${message}`,
    }),
  });
  const resendResult = await sendResponse.json().catch(() => ({}));

  if (!sendResponse.ok) {
    await fetch(`${supabaseUrl}/rest/v1/contact_submissions?id=eq.${submission.id}`, {
      method: "PATCH",
      headers: { ...authHeaders, Prefer: "return=minimal" },
      body: JSON.stringify({ delivery_status: "failed" }),
    });
    return json({ error: "Your enquiry was saved, but email delivery is temporarily unavailable." }, 502, corsOrigin);
  }

  await fetch(`${supabaseUrl}/rest/v1/contact_submissions?id=eq.${submission.id}`, {
    method: "PATCH",
    headers: { ...authHeaders, Prefer: "return=minimal" },
    body: JSON.stringify({ delivery_status: "sent", resend_email_id: resendResult.id ?? null, sent_at: new Date().toISOString() }),
  });
  return json({ ok: true }, 200, corsOrigin);
});
