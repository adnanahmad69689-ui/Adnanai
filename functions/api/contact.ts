interface ContactEnv {
  RESEND_API_KEY?: string;
  CONTACT_FROM_EMAIL?: string;
}

interface ContactContext {
  request: Request;
  env: ContactEnv;
}

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  service?: unknown;
  details?: unknown;
  website?: unknown;
};

const recipient = "info@adnanai.com";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedOrigins = new Set(["https://adnanai.com", "https://www.adnanai.com"]);

function response(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function clean(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

export const onRequestPost = async ({ request, env }: ContactContext) => {
  const origin = request.headers.get("Origin");
  if (origin && !allowedOrigins.has(origin) && !origin.endsWith(".adnan-ai-portfolio.pages.dev")) {
    return response({ ok: false, message: "This request is not allowed." }, 403);
  }

  const payload = (await request.json().catch(() => null)) as ContactPayload | null;
  if (!payload) return response({ ok: false, message: "Please complete the form and try again." }, 400);

  const name = clean(payload.name, 120);
  const email = clean(payload.email, 254).toLowerCase();
  const service = clean(payload.service, 80);
  const details = clean(payload.details, 4000);
  const honeypot = clean(payload.website, 200);

  if (honeypot) return response({ ok: true });
  if (!name || !emailPattern.test(email) || !service || !details) {
    return response({ ok: false, message: "Please complete every field before sending your enquiry." }, 422);
  }
  if (!env.RESEND_API_KEY) {
    return response({ ok: false, message: "Email delivery is being connected. Please email info@adnanai.com for now." }, 503);
  }

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "Adnan Ai <info@adnanai.com>",
      to: [recipient],
      reply_to: email,
      subject: `New ${service} enquiry — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nService: ${service}\n\nProject details:\n${details}`,
    }),
  });

  if (!emailResponse.ok) return response({ ok: false, message: "Unable to send your enquiry right now. Please email info@adnanai.com." }, 502);
  return response({ ok: true });
};
