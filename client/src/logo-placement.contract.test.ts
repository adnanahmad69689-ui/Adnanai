import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const root = resolve(import.meta.dirname, "..");
const hero = readFileSync(resolve(root, "src/components/Hero.tsx"), "utf8");
const contact = readFileSync(resolve(root, "src/components/Contact.tsx"), "utf8");
const navbar = readFileSync(resolve(root, "src/components/Navbar.tsx"), "utf8");
const styles = readFileSync(resolve(root, "src/index.css"), "utf8");

describe("Hero greeting logo treatment", () => {
  it("replaces only the Hero greeting text with the supplied Adnan Ai logo treatment", () => {
    expect(hero).toContain('import { BrandLogo } from "./BrandLogo"');
    expect(hero).toContain('className="hero-greeting-logo-lockup"');
    expect(hero).toContain('className="hero-greeting-logo"');
    expect(hero).not.toContain("Good morning!");
    expect(hero).not.toContain("Good afternoon!");
    expect(hero).not.toContain("Good evening!");
    expect(navbar).not.toContain("BrandLogo");
    expect(navbar).toContain('className="nav-logo-text"');
    expect(navbar).toContain('className="mobile-menu-logo-text"');
  });

  it("removes the added Contact icon while preserving the original favicon file", () => {
    expect(contact).not.toContain("contactBrandIconAsset");
    expect(contact).not.toContain("contact-brand-icon");
    expect(styles).not.toContain(".contact-brand-icon");
    expect(styles).not.toContain(".contact-brand-label");
  });
});
