# Visual QA Notes

## 2026-08-16 — Local preview

The initial hero issue was traced to the GSAP-transformed phase-one wrapper becoming the containing block for absolutely positioned headline elements while it had zero height. The wrapper now explicitly fills the sticky hero (`position: absolute; inset: 0`), restoring the expected lower-left headline composition.

The desktop hero now renders the reference’s intended structure: fixed pill navigation, greeting at upper left, portrait at right, services/stat stack at right, oversized mixed Syne/serif name at lower left, rotating label, supporting copy, and the scroll-transition phase. The workflow section is visible directly after the 180vh hero, with its centered editorial heading, metric bar, dark workflow cards, pipeline overlay, and neon data points.

The next QA tasks are to inspect lower sections via direct scroll-to selectors, test the responsive mobile breakpoint, confirm the `#n8n-projects` hash view, and make any composition fixes before a final screenshot/style-review pass.

## Lower-section check — About

The About section is correctly composed at desktop width. It uses the intended asymmetric layout: headline and vertical portrait on the left, restrained bio copy on the right, then a translucent grid-textured contact-information panel and an achievements panel. Text contrast is adequate against the near-black background, and the navigation contracts to a compact logo/contact treatment after scrolling as designed.

## Lower-section check — Featured project

The featured-project area renders with the intended editorial split: structured product narrative, feature bullets, tech pills, and a high-contrast lime CTA on the left; browser-shell device mockup with acceleration card on the right. Its visual hierarchy and spacing are strong at the inspected desktop viewport. The generated product asset sits cleanly in the dark mockup frame and the final card does not obscure the device image.

## Visual-review corrections applied

The initial full-page capture exposed a technical interaction between screenshot capture and scroll-reveal elements: off-viewport items remained hidden, creating falsely empty black regions in the full-page image. Reveal states now retain `visibility: visible` and animate only `opacity` and transform, which preserves continuous page cadence in capture contexts and on slower devices. Simulated testimonial content and the Google-rating badge were also replaced by explicitly non-user-generated outcome/case-study cards, retaining the reference’s card density while preventing unsupported customer-review claims.

## Final screenshot verification

Desktop full-page views of the home route and `#n8n-projects` gallery are continuous with no unintentional blank scroll regions. The home route follows the intended long-form cadence from hero through workflows, profile, skills, featured project, experience, YouTube, case studies, and contact. The n8n route displays the full fifteen-card three-column gallery and audit CTA. Both routes were also captured at a 375×812 mobile viewport: home sections collapse to one column and the gallery cards stack cleanly with readable CTAs and no horizontal overflow visible in the capture.

## Final functional check — Hero

The local preview was reloaded and held until the hero entrance timeline settled. The hero correctly reveals the full composition, including the large mixed-type placeholder name, rotating workflow label, portrait overlay, navigation pill, and scroll indicator. Build validation is clean; the only production-build note is the non-blocking bundle-size advisory from Vite.

## Reference comparison

The recreation preserves the reference’s governing visual system: an almost-black image-led hero, centered frosted pill navigation, lime-on-graphite restraint, editorial serif emphasis, and dense automation-workflow cards. The individual generated hero portrait and workflow images differ from the original source assets by design, while their compositional roles, contrast treatment, dark processing, and neon pipeline motif match the reference approach. The secondary `#n8n-projects` gallery faithfully carries the reference’s high-density card grid, metric badges, red/green problem-solution pattern, and boxed CTA. The home page deliberately replaces unverified testimonial/review content with neutral case-study outcome cards.
