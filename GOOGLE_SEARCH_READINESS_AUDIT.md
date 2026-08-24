# Google Search Readiness Audit

Audit date: 24 August 2026

## Scope

This audit follows the user’s no-redesign instruction. It covers crawlability, indexability, canonical signals, sitemap and robots assets, metadata, structured data, semantic HTML, responsive accessibility, public technical exposure, and factual contact information. It does not add keyword-stuffed copy, pages, reviews, claims, or invented data.

## Initial live findings

| Area | Finding | Initial status |
|---|---|---|
| Canonical homepage | `https://adnanai.com/` returns HTTPS `200`. | Pass |
| www redirect | `https://www.adnanai.com/` returns a 301 redirect to the apex canonical URL. | Pass |
| Sitemap | The root XML sitemap is valid in a direct response and contains only `https://adnanai.com/`, the one current indexable public page. | Pass |
| Robots | The live canonical response allows crawling, excludes `/admin` and `/reset-password`, and references the sitemap. | Pass |
| Homepage content | The main page has an H1, descriptive H2/H3 hierarchy, real project links, and the updated public email. | Requires source-level semantic check |
| Contact delivery | The public form and validation endpoint are live, but actual email delivery remains deliberately deferred until the user completes Resend and Cloudflare secret setup. | Deferred by user |
| Unknown routes | An arbitrary missing route responds with the SPA document as `200`, so it needs a source and platform-routing review for a suitable noindex 404 experience. | Review required |

## Source-level findings

The homepage document already has a concise title, meta description, canonical URL, index/follow directive, Open Graph title/description/image/URL/type, Twitter card metadata, theme color, favicon, hero preload, and factual `ProfessionalService` JSON-LD. Its visible email is `info@adnanai.com`. The live public HTML has a single H1 and the primary content uses H2 and H3 elements; all public portfolio images have explicit alternative text. The private `/admin` and `/reset-password` routes set `noindex,nofollow,noarchive` in their route components.

The static source contains an existing generic `NotFound` component, but the application route shell currently serves the public homepage for unrecognised paths. This is the concrete cause of unknown routes receiving the SPA `200` document; a minimal noindex, brand-consistent fallback route is justified.

## Local post-fix verification

The homepage retained its current dark editorial visual identity after the technical work. The updated unknown-route view is a small, brand-consistent 404 panel with one clear return action; it does not introduce a new visual system or public content section. The code-level route middleware additionally turns an unrecognised HTML path into an HTTP 404 with an `X-Robots-Tag: noindex, nofollow, noarchive` header when deployed to Cloudflare Pages.

The 390px mobile review confirmed that the existing public portfolio remains readable, touch-friendly, and free of horizontal overflow. The fallback view also fits a narrow screen without crowding or visual drift.

## Official guidance consulted

Google states that sitemaps should use fully qualified canonical URLs and include URLs intended for search results. For this single-page public portfolio, a root XML sitemap containing only the canonical homepage is appropriate. [1]

Google documents `noindex` as a page-level indexing rule through a robots meta tag or `X-Robots-Tag` response header. Private routes should use a noindex mechanism in addition to being excluded from public navigation. [2]

## References

[1] [Google Search Central — Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)

[2] [Google Search Central — Robots meta tags and X-Robots-Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)
