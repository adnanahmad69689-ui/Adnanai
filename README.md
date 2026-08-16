# Adnan Ai Portfolio Recreation

This repository contains a high-fidelity React/TypeScript recreation of a dark, neon-lime personal portfolio. It is intentionally built as a reusable starter rather than a hard-coded clone: personal identity, contact details, projects, skills, experience, workflow cards, video cards, and visual assets are centralized for replacement.

The application uses **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**, **Framer Motion**, and **GSAP ScrollTrigger**. The interface is frontend-only; no database, server routes, or external API credentials are required.

## What is included

| Area | Implementation |
|---|---|
| Hero | 180vh pinned hero with image parallax, staged entrance, rotating specialty label, time-aware greeting, and scroll-phase transition |
| Navigation | Centered frosted pill navbar, active-section tracking, notification popup, compact-on-scroll behavior, and responsive full-screen menu |
| Workflow work | Four home-page cards plus a fifteen-item `#n8n-projects` workflow gallery, animated pipeline overlays, data pills, and contextual mailto CTAs |
| Portfolio cadence | About, skills, featured project, experience, YouTube marquee, neutral case-study outcomes, contact, and footer sections |
| Responsive system | Desktop, tablet, and mobile rules reflecting the reference layout; mobile gallery stacks to one column |
| Accessibility | Skip link, visible focus state, semantic landmark structure, keyboard-reachable interactions, reduced-motion handling, and readable image alt text |
| Assets | Generated hero, workflow, portrait, product-mockup, and logo assets referenced by persistent project storage URLs |

> **Important:** The outcome cards deliberately avoid invented customer reviews, ratings, or testimonials. Replace them only with substantiated case studies or client-approved feedback.

## Personalize the site

Begin with [`client/src/data/siteConfig.ts`](client/src/data/siteConfig.ts). This is the main personal-data control plane.

| If you want to change… | Edit this field/file |
|---|---|
| Name, monogram, page title, location, footer roles | `siteConfig.identity` |
| Hero background, headline, rotating labels, right-panel details | `siteConfig.hero` |
| Email, phone, LinkedIn, GitHub, YouTube, Instagram | `siteConfig.contact` |
| Navigation labels and notification popup | `siteConfig.nav` |
| Workflow heading, metrics, CTA, built-with strip | `siteConfig.workflows` |
| Bio, profile info, profile image, achievements | `siteConfig.about` |
| Featured project and product mockup | `siteConfig.project` |
| N8n gallery heading and CTA | `siteConfig.n8nPage` |
| Generated image URLs | `siteConfig.assets` |
| Workflow cards | [`client/src/data/projects.ts`](client/src/data/projects.ts) |
| Skill groups | [`client/src/data/skills.ts`](client/src/data/skills.ts) |
| Experience entries | [`client/src/data/experience.ts`](client/src/data/experience.ts) |
| Case-study outcomes | [`client/src/data/outcomes.ts`](client/src/data/outcomes.ts) |
| YouTube marquee cards | [`client/src/data/videos.ts`](client/src/data/videos.ts) |

### Replace visual assets

Images are centralized as URLs under `siteConfig.hero`, `siteConfig.about`, `siteConfig.project`, and `siteConfig.assets`. Replace any value with an uploaded persistent asset URL. Use an approximately **16:9 image with the subject on the right** for the hero, a **3:4 vertical portrait** for the About image, and a **3:4 product image** for the featured project mockup.

### Replace videos

Edit the `videos` array in `client/src/data/videos.ts`. The thumbnail follows YouTube’s `https://i.ytimg.com/vi/<VIDEO_ID>/hqdefault.jpg` convention. Update the URL, title, duration, view/date text, and thumbnail together for each video.

## Project structure

```text
client/
├── index.html                       # title, meta description, Google font imports, favicon
└── src/
    ├── App.tsx                      # app shell + hash routing
    ├── index.css                    # complete visual system and responsive rules
    ├── components/
    │   ├── Hero.tsx                 # GSAP pinned hero
    │   ├── Navbar.tsx               # desktop/mobile navigation
    │   ├── Workflows.tsx            # home workflow cards
    │   ├── N8nProjects.tsx          # #n8n-projects gallery page
    │   └── …                        # remaining page sections and shared visuals
    ├── data/                        # replaceable portfolio content
    ├── hooks/                       # scroll-reveal and count-up hooks
    └── pages/Home.tsx               # section composition
ideas.md                             # design-spec record
qa-notes.md                          # validation notes
```

## Development commands

```bash
pnpm install
pnpm dev        # local Vite development server
pnpm check      # TypeScript validation
pnpm build      # production build
```

## Routes and interactions

The home portfolio lives at `/`. The extended workflows gallery is a deliberately reference-faithful hash view at `/#n8n-projects`. The home-page “Show More Workflows” control links there, and the gallery’s “Back to Portfolio” control returns to `/#`.

All contact controls use standard `mailto:` links generated from `siteConfig.contact.email`. The notification popup’s discussion button and all workflow/project audit CTAs use the same centralized email setting.

## Motion and design notes

The global style system lives in [`client/src/index.css`](client/src/index.css). It enforces the dark editorial palette, lime accent discipline, Cormorant Garamond / Space Grotesk / Syne typography combination, film-grain overlay, and responsive breakpoints. Scroll reveals and nonessential continuous motion respect `prefers-reduced-motion`.

The hero uses GSAP ScrollTrigger. If you modify its layout, keep `.hero-phase1-container` as a full-screen absolute wrapper; that prevents animated transforms from changing the containing block for the hero’s absolutely positioned headline.

## Verification completed

The implementation passed `pnpm check` and `pnpm build`. Desktop and 375px-wide mobile full-page captures were reviewed for the home and extended gallery views. The only build message is Vite’s non-blocking advisory about the combined JavaScript chunk size; functionality and TypeScript validation are clean.
