import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();

describe("contact details and enquiry form contract", () => {
  it("uses only the new public email and removes public Instagram and About metadata", () => {
    const config = readFileSync(resolve(projectRoot, "client/src/data/siteConfig.ts"), "utf8");
    const contact = readFileSync(resolve(projectRoot, "client/src/components/Contact.tsx"), "utf8");
    const metadata = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
    const machineSummary = readFileSync(resolve(projectRoot, "client/public/llms.txt"), "utf8");

    expect(`${config}\n${contact}\n${metadata}\n${machineSummary}`).not.toContain("Adnanuop@gmail.com");
    expect(config).toContain('email: "info@adnanai.com"');
    expect(config).not.toContain("Location");
    expect(config).not.toContain("Available for client projects");
    expect(contact).not.toContain("instagram");
  });

  it("includes exactly the requested visible enquiry fields and the exact success message", () => {
    const contact = readFileSync(resolve(projectRoot, "client/src/components/Contact.tsx"), "utf8");

    expect(contact).toContain("Your name");
    expect(contact).toContain("Your email");
    expect(contact).toContain("Website Development");
    expect(contact).toContain("AI Automation");
    expect(contact).toContain("AI Agents");
    expect(contact).toContain("Tell me what you need");
    expect(contact).toContain("Send enquiry");
    expect(contact).toContain("Thanks for getting in touch. I’ll get back to you soon.");
  });

  it("keeps the future server-side delivery endpoint secret-safe and reply-to aware", () => {
    const endpoint = readFileSync(resolve(projectRoot, "functions/api/contact.ts"), "utf8");

    expect(endpoint).toContain("RESEND_API_KEY?: string");
    expect(endpoint).toContain('to: [recipient]');
    expect(endpoint).toContain("reply_to: email");
    expect(endpoint).not.toContain("re_");
  });
});
