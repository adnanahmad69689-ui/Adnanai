import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const hero = readFileSync(resolve(root, "src/components/Hero.tsx"), "utf8");
const contact = readFileSync(resolve(root, "src/components/Contact.tsx"), "utf8");
const styles = readFileSync(resolve(root, "src/index.css"), "utf8");

describe("Hero and Contact logo placement", () => {
  it("uses the existing light full logo subtly within the Hero", () => {
    expect(hero).toContain('const heroLogoAsset = "/manus-storage/Adnan-AI-Logo-Light_57400ad8.svg"');
    expect(hero).toContain('className="hero-brand-logo"');
    expect(hero).toContain('alt="Adnan Ai"');
  });

  it("uses the unchanged favicon icon compactly within the Contact label", () => {
    expect(contact).toContain('const contactBrandIconAsset = "/favicon.svg"');
    expect(contact).toContain('className="contact-brand-icon"');
    expect(styles).toContain(".contact-brand-label");
    expect(styles).toContain(".hero-brand-logo");
  });
});
