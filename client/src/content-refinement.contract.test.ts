import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();

describe("human, clean, premium content refinement", () => {
  it("removes duplicate service and secondary workflow calls to action from the public homepage", () => {
    const sections = readFileSync(resolve(projectRoot, "client/src/components/PortfolioSections.tsx"), "utf8");
    const workflows = readFileSync(resolve(projectRoot, "client/src/components/Workflows.tsx"), "utf8");

    expect(sections).not.toContain("<Skills />");
    expect(workflows).not.toContain('className="service-pillars');
    expect(workflows).not.toContain('className="social-proof-strip');
    expect(workflows).not.toContain('className="workflow-cta-section');
  });

  it("uses a concise process label and keeps the supporting copy grounded in real work", () => {
    const config = readFileSync(resolve(projectRoot, "client/src/data/siteConfig.ts"), "utf8");

    expect(config).toContain('{ id: "experience", label: "Process" }');
    expect(config).toContain('headingLead: "How I"');
    expect(config).toContain('headingEm: "work"');
    expect(config).toContain('"I build websites, automations, and AI agents around the work that needs doing."');
    expect(config).not.toContain("fake testimonials");
  });
});
