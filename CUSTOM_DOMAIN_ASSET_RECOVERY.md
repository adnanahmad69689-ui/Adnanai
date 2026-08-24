# Custom-Domain Asset Recovery Verification

## Observed behavior

Immediately after rapid successive Cloudflare Pages production deployments, the canonical `adnanai.com` domain briefly rendered the application's fallback screen while the version-specific Pages deployment rendered normally. The Pages deployment API confirmed that the canonical domain aliases belonged to the latest production deployment. The zone also has no custom cache rulesets; the public HTML response uses `Cache-Control: public, max-age=0, must-revalidate`.

## Likely cause

The evidence is consistent with a short-lived Cloudflare Pages alias propagation mismatch between the HTML entry document and a previously cached hashed JavaScript asset after back-to-back production deployments. The issue cleared after the subsequent deployment became active. This is recorded as an observed operational condition rather than a confirmed Cloudflare platform defect.

## Durable safeguard

The app error boundary now detects common stale lazy-asset errors such as a failed dynamic module or chunk load. It performs **one** session-scoped reload, allowing the browser to obtain the current hashed asset manifest without creating a reload loop. Any error that remains after that retry continues to show the existing recovery screen and is logged to the browser console for diagnosis.

## Verification

Cloudflare Pages deployment `739a6615-cff1-4205-9e0a-546934e64dec` completed successfully. A fresh custom-domain request to `https://adnanai.com/?asset-recovery-check=20260824` rendered the complete public portfolio with the refined navigation: About, Websites, AI Systems, Process, and Contact.
