import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const projectRoot = process.cwd();

describe("launch-critical SEO contract", () => {
  it("provides canonical, sharing, structured-data, robots, and sitemap assets for the public site", () => {
    const html = readFileSync(resolve(projectRoot, "client/index.html"), "utf8");
    const robots = readFileSync(resolve(projectRoot, "client/public/robots.txt"), "utf8");
    const sitemap = readFileSync(resolve(projectRoot, "client/public/sitemap.xml"), "utf8");

    expect(html).toContain('rel="canonical" href="https://adnanai.com/"');
    expect(html).toContain('property="og:title"');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type": "ProfessionalService"');
    expect(robots).toContain("Disallow: /admin");
    expect(robots).toContain("Sitemap: https://adnanai.com/sitemap.xml");
    expect(sitemap).toContain("https://adnanai.com/");
  });

  it("marks the client-side admin route as a private noindex destination", () => {
    const adminRoute = readFileSync(resolve(projectRoot, "client/src/pages/AdminRoute.tsx"), "utf8");
    expect(adminRoute).toContain('"noindex,nofollow,noarchive"');
    expect(adminRoute).toContain('"Private admin | Adnan Ai"');
  });
});
