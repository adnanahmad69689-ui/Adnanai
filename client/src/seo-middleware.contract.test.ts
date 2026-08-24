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
  });

  it("serves private routes with a crawlable noindex response header", async () => {
    const response = await onRequest(context("/admin"));

    expect(response.status).toBe(200);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
  });

  it("turns unrecognised HTML paths into noindex 404 responses", async () => {
    const response = await onRequest(context("/an-old-link"));

    expect(response.status).toBe(404);
    expect(response.headers.get("X-Robots-Tag")).toBe("noindex, nofollow, noarchive");
  });
});
