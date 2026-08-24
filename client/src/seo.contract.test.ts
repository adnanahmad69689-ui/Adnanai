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
    expect(html).toContain('"@type": "WebSite"');
    expect(html).toContain('"@type": "WebPage"');
    expect(html).toContain('rel="manifest" href="/site.webmanifest"');
    expect(robots).toContain("Allow: /");
    expect(robots).not.toContain("Disallow: /admin");
    expect(robots).toContain("Sitemap: https://adnanai.com/sitemap.xml");
    expect(sitemap).toContain("https://adnanai.com/");
  });

  it("marks the client-side admin route as a private noindex destination", () => {
    const adminRoute = readFileSync(resolve(projectRoot, "client/src/pages/AdminRoute.tsx"), "utf8");
    expect(adminRoute).toContain('"noindex,nofollow,noarchive"');
    expect(adminRoute).toContain('"Private admin | Adnan Ai"');
  });

  it("returns unknown routes as a noindex fallback while keeping private route headers crawlable", () => {
    const app = readFileSync(resolve(projectRoot, "client/src/App.tsx"), "utf8");
    const notFound = readFileSync(resolve(projectRoot, "client/src/pages/NotFound.tsx"), "utf8");
    const middleware = readFileSync(resolve(projectRoot, "functions/_middleware.ts"), "utf8");
    const headers = readFileSync(resolve(projectRoot, "client/public/_headers"), "utf8");

    expect(app).toContain('location === "/" ? <PublicPortfolio /> : <NotFound />');
    expect(notFound).toContain('"noindex,nofollow,noarchive"');
    expect(middleware).toContain('headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")');
    expect(middleware).toContain("status: 404");
    expect(headers).toContain("X-Content-Type-Options: nosniff");
  });
});
