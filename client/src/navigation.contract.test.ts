import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();

describe("portfolio navigation contract", () => {
  it("connects every requested public destination and removes the unwanted prompt icon", () => {
    const navbar = readFileSync(resolve(projectRoot, "client/src/components/Navbar.tsx"), "utf8");
    const projects = readFileSync(resolve(projectRoot, "client/src/components/SampleProjectCollection.tsx"), "utf8");
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const styles = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(projects).toContain('<section id="projects"');
    expect(navbar).toContain('onNavClick("hero")');
    expect(navbar).toContain('onNavClick("contact")');
    expect(navbar).toContain('element.scrollIntoView({ behavior: "smooth", block: "start" })');
    expect(navbar).not.toContain("nav-icon-btn");
    expect(navbar).not.toContain("notification-popup");
    expect(app).toContain('behavior: attempts === 0 ? "smooth" : "auto"');
    expect(app).toContain("if (attempts < 6)");
    expect(app).toContain("window.setTimeout(scrollToHash, 180)");
    expect(styles).toContain("#projects,");
    expect(styles).toContain("scroll-margin-top: 104px");
  });

  it("uses the requested Home text at the desktop back-to-top control while preserving the separate About item and mobile brand treatment", () => {
    const navbar = readFileSync(resolve(projectRoot, "client/src/components/Navbar.tsx"), "utf8");
    const config = readFileSync(resolve(projectRoot, "client/src/data/siteConfig.ts"), "utf8");
    const styles = readFileSync(resolve(projectRoot, "client/src/index.css"), "utf8");

    expect(navbar).toContain('className="nav-logo-text"');
    expect(navbar).toContain('className="nav-logo-text">Home</span>');
    expect(config).toContain('{ id: "about", label: "About" }');
    expect(navbar).toContain("mobile-menu-logo");
    expect(navbar).toContain('className="mobile-menu-logo-text"');
    expect(styles).toContain(".nav-logo-text");
    expect(styles).toContain(".mobile-menu-logo-text");
  });
});
