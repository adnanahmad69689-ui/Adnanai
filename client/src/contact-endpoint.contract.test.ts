import { describe, expect, it } from "vitest";
import { onRequestPost } from "../../functions/api/contact";

function request(body: Record<string, unknown>) {
  return new Request("https://adnanai.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "https://adnanai.com" },
    body: JSON.stringify(body),
  });
}

describe("contact Pages Function", () => {
  it("rejects incomplete form data before any email provider request", async () => {
    const result = await onRequestPost({ request: request({ name: "Adnan" }), env: {} });

    expect(result.status).toBe(422);
    await expect(result.json()).resolves.toMatchObject({ ok: false });
  });

  it("silently accepts the honeypot without sending an email", async () => {
    const result = await onRequestPost({
      request: request({ name: "Bot", email: "bot@example.com", service: "Other", details: "Ignore this", website: "spam.example" }),
      env: {},
    });

    expect(result.status).toBe(200);
    await expect(result.json()).resolves.toEqual({ ok: true });
  });

  it("returns a clear temporary response until the private delivery secret is configured", async () => {
    const result = await onRequestPost({
      request: request({ name: "Adnan", email: "visitor@example.com", service: "AI Automation", details: "I need help with an enquiry flow." }),
      env: {},
    });

    expect(result.status).toBe(503);
    await expect(result.json()).resolves.toMatchObject({ ok: false, message: expect.stringContaining("info@adnanai.com") });
  });
});
