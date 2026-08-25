import { describe, expect, it } from "vitest";
import { onRequest } from "../../functions/_middleware";

function context(pathname: string) {
  return {
    request: new Request(`https://adnanai.com${pathname}`),
    next: async () => new Response("<html></html>", { headers: { "Content-Type": "text/html; charset=utf-8" } }),
  };
}

describe("Cloudflare SEO route middleware", () => {
  it("keeps the canonical homepage indexable", async () => {
    const response = await onRequest(context("/"));

    expect(response.status).toBe(200);
    expect(response.headers.get("X-Robots-Tag")).toBeNull();
    expect(response.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(response.headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
  });

  it("serves private routes with a crawlable noindex response header", async () => {
    const response = await onRequest(context("/admin"));

    expect(response.status).toBe(200);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
  });

  it("removes public canonical and index metadata from private HTML responses", async () => {
    const response = await onRequest({
      request: new Request("https://adnanai.com/admin"),
      next: async () => new Response(
        '<html><head><meta name="robots" content="index,follow,max-image-preview:large" /><link rel="canonical" href="https://adnanai.com/" /></head></html>',
        { headers: { "Content-Type": "text/html; charset=utf-8" } }
      ),
    });
    const html = await response.text();

    expect(html).toContain('<meta name="robots" content="noindex,nofollow,noarchive" />');
    expect(html).not.toContain('rel="canonical"');
  });

  it("turns unrecognised HTML paths into noindex 404 responses", async () => {
    const response = await onRequest(context("/an-old-link"));

    expect(response.status).toBe(404);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
  });

  it("makes crawl assets revalidate so updated robots rules and sitemap entries are not stale", async () => {
    const response = await onRequest(context("/robots.txt"));

    expect(response.headers.get("Cache-Control")).toBe("public, max-age=0, must-revalidate");
  });
});
