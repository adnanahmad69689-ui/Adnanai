import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();

describe("A–Z no-redesign quality safeguards", () => {
  it("keeps public metadata human, crawlable, and compatible with browser zoom", () => {
    const html = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
    const robots = readFileSync(resolve(projectRoot, "client/public/robots.txt"), "utf8");
    const llmsPath = resolve(projectRoot, "client/public/llms.txt");

    expect(html).not.toContain("maximum-scale=1");
    expect(html).toContain("Adnan Ai builds clear websites, practical automation, and AI agents for business tasks in Peshawar and remotely.");
    expect(robots).toContain("Allow: /");
    expect(robots).not.toContain("Disallow: /admin");
    expect(robots).not.toContain("Disallow: /reset-password");
    expect(existsSync(llmsPath)).toBe(true);
  });

  it("renders every published item from the admin console rather than a fixed selection", () => {
    const workflows = readFileSync(resolve(projectRoot, "client/src/components/Workflows.tsx"), "utf8");
    const projects = readFileSync(resolve(projectRoot, "client/src/components/SampleProjectCollection.tsx"), "utf8");

    expect(workflows).not.toContain('href="#n8n-projects"');
    expect(projects).toContain("View live site ↗");

    // Both sections must render the full published list. A fixed cap here
    // silently hid everything added after the first few items, which looked
    // to the owner like the admin console had stopped saving.
    expect(workflows).not.toMatch(/\.slice\(\s*0\s*,\s*\d+\s*\)/);
    expect(projects).not.toMatch(/\.slice\(\s*0\s*,\s*\d+\s*\)/);

    // The intro carries no project count at all. A hardcoded one went stale as
    // soon as a project was added, and a derived one was unnecessary noise, so
    // neither should come back.
    expect(projects).not.toMatch(/public website projects?\./);
  });
});
