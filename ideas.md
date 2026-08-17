# Design Specification — Portfolio Recreation (Replication Task)

This is a **replication task**: the reference website `https://rajpalsinh-portfollio.vercel.app/` is the ground-truth design spec. No alternative stylistic approaches are explored; fidelity to the reference overrides all other guidance. Personal identity content is replaced with centralized, user-replaceable placeholders.

## Design Movement

Dark, editorial "neo-brutalist luxury" portfolio: near-black canvas, film-grain noise, oversized serif/sans mixed typography, and a single neon-lime accent (`#a8ff3e`) used sparingly for emphasis, badges, and glows.

## Core Principles

1. **Near-black everything** — page background `#0a0a0a`, surfaces `#161616`/`#1e1e1e`, hairline borders `#ffffff12`.
2. **One ownable accent** — neon lime `#a8ff3e` (secondary cyan `#00eaff` only inside the pipeline SVG animation).
3. **Editorial typography mix** — Cormorant Garamond (light, italic ems in accent) for section headings, Space Grotesk (300) for body, Syne (700–800) for numbers/labels/CTAs, Georgia italic for the hero surname.
4. **Glass + grain texture** — frosted panels (`backdrop-blur`), subtle grid-pattern overlays, global SVG noise at 3% opacity.

## Color Philosophy

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#0a0a0a` | page background |
| `--color-bg-secondary` | `#111111` | alt surfaces |
| `--color-bg-card` | `#161616` | cards |
| `--color-surface` | `#1e1e1e` | workflow/youtube cards |
| `--color-accent` | `#a8ff3e` | primary accent (neon lime) |
| `--color-accent-secondary` | `#00eaff` | pipeline dots only |
| `--color-accent-soft` | `#c0ff6e` | soft accent |
| `--color-text-primary` | `#f0ece6` | headings, high-emphasis text |
| `--color-text-secondary` | `#9e9e9e` | body-secondary |
| `--color-text-muted` | `#555555` | labels, footer |
| `--color-border` | `#ffffff12` | hairline borders |

## Typography System

| Role | Font | Weight | Size |
|---|---|---|---|
| Display/headings | Cormorant Garamond, Georgia, serif | 300 | h1 clamp(40px,6vw,80px), h2 clamp(28px,4vw,52px) |
| Body | Space Grotesk, DM Sans, sans | 300 | clamp(15px,2vw,17px), lh 1.6 |
| Numbers/CTA/labels | Syne, sans | 700–800 | various |
| Hero name | Syne 800 + Georgia italic (surname, accent) | 800/400 | clamp(3.5rem,9vw,9rem), lh .88 |

Heading `<em>` = accent color + italic. Section labels = uppercase, letter-spacing .14–.25em, 11px, accent or muted.

## Layout Paradigm

Centered containers (`max-width: 1280px`, fluid padding `clamp(20px,5vw,80px)`) with asymmetric inner grids: about = `.8fr 1.2fr`, projects = `1.15fr .85fr`, contact card = `1fr 1fr`. Generous vertical rhythm (`--space-3xl: 200px` section padding on skills/experience; `100px` on workflows/projects/youtube/reviews).

## Signature Elements

1. **Pill navbar** — fixed, centered, 52px tall, radius 56px, blurred `#0a0a0abf`, collapses to logo-only width on scroll (>400px), expands on hover; active section pill highlight.
2. **Neon buttons** — `.neon-btn` (outline accent, ✦ prefix, glow on hover) and gradient CTA pills (`135deg #a8ff3e → #7ccd2e`, dark text, Syne 700).
3. **Pipeline SVG overlay** — animated dashed paths + traveling dots over workflow card images (API → OUT nodes).
4. **Glass stat panels** — floating, rotated, blurred cards in contact section with float keyframe animations.
5. **Custom cursor** — 8px accent dot + 32px ring, `mix-blend-mode: difference` (desktop only).

## Interaction & Animation

- GSAP-style entrance: hero elements stagger in (fade + y), headline lines slide up from overflow-hidden masks; hero background slow zoom (scale 1.05, 22s yoyo) and scroll-scrubbed parallax (scale 1.25, y 5%).
- Hero is a 180vh pinned scene: phase 1 (name/intro) fades out by 35% scroll; phase 2 ("AI that replaces manual work.") fades/slides in 30%→55%.
- Rotating hero word cycles `AI SYSTEMS / AUTOMATION / AGENTS / WORKFLOWS` every 2.5s.
- `.reveal-item` scroll reveals: `y:40 → 0`, opacity, stagger .12s, trigger at `top 88%`, once.
- Count-up metrics (15+, 500+, 99%) on first view, 2s ease-out.
- YouTube dual marquee rows (35s, opposite directions, pause on hover, edge fade masks).
- About portrait 3D tilt with glare following the mouse.
- All animations disabled under `prefers-reduced-motion`.

## Responsive Breakpoints (from reference)

| Breakpoint | Key changes |
|---|---|
| ≤1280px | container-max 1024px |
| ≤1024px | container-max 768px; desktop nav hidden → hamburger; custom cursor off; skills 2 cols; projects 1 col (centered) |
| ≤968px | projects grid 1 col |
| ≤768px | spacing scale shrinks; hero right panel + scroll indicator hidden, greeting repositioned, bg image object-position 85% top; workflows/skills/experience 1 col; pipeline overlay hidden; about image 220×300 |
| ≤480px | tighter padding; about image 180×240; contact visual hidden; reviews 1 col; footer stacked |

## Brand Essence (placeholder, user-replaceable)

A dark, premium personal portfolio for a builder of AI/automation systems — confident, precise, engineered. All personal data (name, links, projects, metrics, reviews, videos) lives in `client/src/data/siteConfig.ts` + sibling data files with placeholder values.

## Content Replacement Strategy

- `siteConfig.ts` — identity, contact, socials, hero copy, stats, section copy.
- `projects.ts` — featured project + workflow cards (home) + full n8n gallery.
- `skills.ts`, `experience.ts`, `reviews.ts`, `videos.ts` — structured lists.
- Images: generated placeholders stored outside the repo and referenced via uploaded URLs; swap by editing one config field per image.

## Style Decisions

- The home page must maintain a continuous editorial cadence after the hero. Scroll-reveal motion may reduce opacity during entry, but must not hide sections from full-page capture or leave long unintentional black gaps.
- The centered blurred pill navigation is a non-negotiable signature motif. It carries the monogram, section navigation, active state, notification control, and lime-contact CTA at desktop sizes; the corresponding full-screen menu appears only below 1024px.
- Neon lime is reserved for prime actions, selected navigation, key metrics, pipeline energy, and italic display emphasis. Supporting labels, body text, and secondary chrome remain muted graphite or warm cream.
- Portfolio proof is framed as substantiated case-study outcomes rather than simulated reviews, ratings, or endorsements. The resulting cards retain the dense dark-panel system without asserting customer speech.
- Every service/system card must retain a compact category signal, outcome-oriented title, practical detail, and a restrained lime accent so no surface reads as an empty decorative slab.
- The hero scroll story is deliberately compressed to avoid extended black pauses; each following section arrives with a clear visual anchor and asymmetric editorial rhythm.
- Adnan AI copy should sound like an engineered automation advisor: concise, specific, and centered on reducing manual handoffs and turning workflows into operating systems.
- The portfolio uses one continuous graphite-black canvas. Sections are differentiated through card depth, restrained texture, and thin dividers rather than abrupt background swaps.
- Neon lime is the only expressive brand accent; cyan is limited to technical pipeline details and purple is not used as a competing category color.
- The desktop navigation remains a visible centered glass pill while scrolling, and the hero prioritizes one dominant personal wordmark with one restrained secondary service phrase.
