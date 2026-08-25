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
    expect(html).toContain("Adnan Ai | Websites, Automation & AI Agents in Peshawar");
    expect(html).toContain("Clear websites, practical automation, and AI agents for business tasks in Peshawar and remotely.");
    expect(html).toContain('property="og:title"');
    expect(html).toContain('property="og:image:alt" content="Adnan Ahmad seated with a laptop"');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type": "ProfessionalService"');
    expect(html).toContain('"@type": "WebSite"');
    expect(html).toContain('"@type": "WebPage"');
    expect(html).toContain('"primaryImageOfPage"');
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

    expect(app).toContain('location === "/" ? <PublicPortfolio /> : <NotFound />');
    expect(notFound).toContain('"noindex,nofollow,noarchive"');
    expect(middleware).toContain('headers.set("X-Robots-Tag", "noindex, nofollow, noarchive")');
    expect(middleware).toContain("status: 404");
    expect(middleware).toContain('headers.set("X-Content-Type-Options", "nosniff")');
    expect(middleware).toContain('headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")');
  });

  it("keeps the public H1 and crawl-relevant sections inside the main landmark without an artificial delay", () => {
    const home = readFileSync(resolve(projectRoot, "client/src/pages/Home.tsx"), "utf8");
    const hero = readFileSync(resolve(projectRoot, "client/src/components/Hero.tsx"), "utf8");

    expect(home).toContain('<main id="main">');
    expect(home).toContain("<Hero />");
    expect(home).toContain("<PortfolioSections />");
    expect(home).not.toContain("setTimeout(() => setShouldLoadSections");
    expect(hero).toContain('<h1 className="hero-name">');
  });

  it("keeps the primary Home control as a crawlable anchor to the main landmark", () => {
    const navbar = readFileSync(resolve(projectRoot, "client/src/components/Navbar.tsx"), "utf8");

    expect(navbar).toContain('href="#main"');
  });
});
