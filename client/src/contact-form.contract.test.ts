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
    expect(contact).toContain('autoComplete="off"');
  });

  it("uses concise project-enquiry copy and a professional email icon without an added logo or footer tagline", () => {
    const contact = readFileSync(resolve(projectRoot, "client/src/components/Contact.tsx"), "utf8");
    const footer = readFileSync(resolve(projectRoot, "client/src/components/Footer.tsx"), "utf8");
    const styles = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(contact).toContain("For project enquiries, send me an email.");
    expect(contact).toContain('import { Mail } from "lucide-react"');
    expect(contact).toContain('className="contact-email-icon"');
    expect(contact).toContain('className="contact-email-stack"');
    expect(contact).not.toContain("contact-email-brand-mark");
    expect(styles).not.toContain(".contact-email-brand-mark");
    expect(footer).toContain("return null");
    expect(footer).not.toContain("footer-tagline");
    expect(styles).toContain(".contact-email-stack { margin-top: auto; padding-top: 3rem; }");
    expect(styles).toContain("border-bottom: 0;");
  });

  it("uses a controlled dark service menu and browser-autofill safeguards instead of a browser-owned select", () => {
    const contact = readFileSync(resolve(projectRoot, "client/src/components/Contact.tsx"), "utf8");
    const styles = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(contact).not.toContain("<select");
    expect(contact).toContain('role="listbox"');
    expect(contact).toContain('role="option"');
    expect(contact).toContain('aria-haspopup="listbox"');
    expect(styles).toContain(".contact-service-options");
    expect(styles).toContain("background: #17181b");
    expect(styles).toContain(".contact-field input:-webkit-autofill");
    expect(styles).toContain("-webkit-box-shadow: 0 0 0 1000px #17181b inset");
  });

  it("keeps the future server-side delivery endpoint secret-safe and reply-to aware", () => {
    const endpoint = readFileSync(resolve(projectRoot, "functions/api/contact.ts"), "utf8");

    expect(endpoint).toContain("RESEND_API_KEY?: string");
    expect(endpoint).toContain('to: [recipient]');
    expect(endpoint).toContain("reply_to: email");
    expect(endpoint).not.toContain("re_");
  });
});
