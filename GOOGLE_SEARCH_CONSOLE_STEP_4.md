# Google Search Console Preparation — Adnan Ai

## Current Technical Readiness

The existing **Domain property** for `adnanai.com` is the correct property. Do **not** create another property. The public site currently has one canonical indexable document: `https://adnanai.com/`. The public sections are anchors within that page, not separate URLs, so do not submit or inspect `#about`, `#projects`, `#workflows`, `#process`, or `#contact` as separate pages.

| Signal | Verified state |
| --- | --- |
| Homepage | `200` over HTTPS |
| Sitemap | `https://adnanai.com/sitemap.xml` returns `200` with one canonical public URL |
| Robots | `https://adnanai.com/robots.txt` returns `200`, allows public crawling, and references the sitemap |
| Canonical | Self-referential `https://adnanai.com/` canonical link |
| Indexability | Public meta robots: `index,follow,max-image-preview:large` |
| HTTPS | HSTS is enabled; `www` redirects to `https://adnanai.com/`; HTTP-to-HTTPS redirect was verified in the technical SEO pass |
| Private URLs | `/admin` returns `X-Robots-Tag: noindex, nofollow, noarchive` |
| Metadata | Title, description, Open Graph, and Twitter metadata are present |
| Structured data | `ProfessionalService`, `WebSite`, and `WebPage` JSON-LD are present |
| Mobile | The current public layout was reviewed at a mobile viewport and remains responsive |

## Exact Google Search Console Actions

1. **Submit sitemap.xml.** Open the already verified `adnanai.com` Domain property. Go to **Indexing → Sitemaps**, enter `sitemap.xml` in **Add a new sitemap**, and select **Submit**. Confirm that the submitted URL becomes `https://adnanai.com/sitemap.xml`.

2. **Inspect the homepage.** Use the URL Inspection search box and enter the full canonical URL: `https://adnanai.com/`. Check the indexed result first, then select **Test live URL**. Confirm that Google can fetch the page and that indexing is allowed.

3. **Inspect important pages.** At this time, inspect only `https://adnanai.com/`. Do not inspect the admin page, reset-password page, query-string URLs, hash anchors, test URLs, or development URLs. When separate public pages are added later, inspect each new canonical URL once.

4. **Request indexing where appropriate.** If the homepage inspection passes the live test and the indexed status is not yet on Google, select **Request indexing** once for `https://adnanai.com/`. Do not repeat the request; Google states that it can take days to weeks and that a request does not guarantee inclusion.[1]

5. **Check Page Indexing.** Open **Indexing → Pages**. Review the **Indexed** count and the **Why pages aren’t indexed** reasons. The desired public URL is the homepage; expected exclusions include private `/admin`, recovery, and unknown 404 URLs. Investigate only unexpected exclusions for the homepage or a future public canonical URL.

6. **Check Core Web Vitals.** Open **Experience → Core Web Vitals** and select both mobile and desktop. This report uses real-user field data. If it shows **Not enough data**, wait until Google collects sufficient visits rather than treating that as an error. The general targets are LCP ≤ 2.5 seconds, INP < 200 ms, and CLS < 0.1.[2]

7. **Check HTTPS.** Open **Experience → HTTPS**. The expected result is that the canonical homepage has no HTTPS issue. If a report appears, inspect the affected URL before changing any configuration; the current HTTPS endpoint, HSTS, and redirects are already valid.

8. **Check Security Issues.** Open **Security & Manual Actions → Security issues**. The expected state is no issue. If Google reports a threat, use the shown affected URL and issue description before making a correction.

9. **Check Manual Actions.** Open **Security & Manual Actions → Manual actions**. The expected state is no issue. Do not submit a reconsideration request unless Google actually reports a manual action and the stated issue has been resolved.

10. **Monitor Performance.** Open **Performance → Search results**. Review clicks, impressions, average CTR, and average position. Use at least a 28-day comparison once data exists. Filter by **Pages** to monitor `https://adnanai.com/` and by **Queries** to learn the real searches that create impressions. Search Console data is delayed and only appears after Google records activity.[3]

## Important Limits

This preparation verifies the public technical signals; it does **not** prove that Google has crawled, indexed, or ranked the website. Only the URL Inspection, Page Indexing, Core Web Vitals, Security Issues, Manual Actions, and Performance reports in the verified Search Console property can provide those Google-side results.[1] [3]

The public PageSpeed API was quota-limited during this preparation, so no current lab-score claim is made. Use the Search Console Core Web Vitals report for Google’s field-data view after sufficient real-user traffic is available.

## References

[1] [Google Search Console Help — URL Inspection Tool](https://support.google.com/webmasters/answer/9012289?hl=en)

[2] [Google Search Central — Understanding Core Web Vitals](https://developers.google.com/search/docs/appearance/core-web-vitals)

[3] [Google Search Central — Get Started with Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start)
