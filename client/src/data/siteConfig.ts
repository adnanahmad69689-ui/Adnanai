/**
 * ============================================================================
 * SITE CONFIG — SINGLE SOURCE OF TRUTH FOR ALL PERSONAL DATA
 * ============================================================================
 * Replace every value below with your own information to make this portfolio
 * yours. Nothing personal is hard-coded in components; everything renders
 * from this file plus the sibling data files (projects.ts, skills.ts,
 * experience.ts, reviews.ts, videos.ts).
 *
 * Images: swap the URLs below for your own hosted images (or upload new ones
 * and paste the new URLs). Recommended sizes are noted per field.
 * ============================================================================
 */

export const siteConfig = {
  /* ------------------------------- Identity ------------------------------ */
  identity: {
    /** Short monogram shown in the navbar logo (1–3 characters). */
    monogram: "Adnan Ai",
    /** Full first name (hero, greeting, footer). */
    firstName: "Adnan",
    /** Second word of the visible personal identity, rendered in italic accent. */
    lastName: "Ai",
    /** Kept empty so the visible identity remains exactly “Adnan Ai”. */
    lastNameSuffix: "",
    /** <title> tag and meta description. */
    pageTitle: "Adnan Ai | Websites, Automation & AI Agents in Peshawar",
    metaDescription:
      "Adnan Ai builds clear websites, practical automation, and AI agents for business tasks in Peshawar and remotely.",
    /** City shown in the footer copyright line. */
    location: "KPK, Peshawar, Pakistan",
    /** Footer tagline. */
    roles: "Web Development · Automation · AI Agents",
    /** Copyright year (auto-computed if left as null). */
    copyrightYear: null as number | null,
  },

  /* -------------------------------- Hero --------------------------------- */
  hero: {
    /** Background portrait. Recommended: 1600×900, subject on the RIGHT. */
    backgroundImage: "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/hero/migration/72a17e27-37ab-4c13-b1b5-ada0f02c2d17.webp",
    backgroundAlt: "Adnan Ahmad seated with a laptop",
    /** Rotating words under the big name (cycles every 2.5s). */
    rotatingWords: ["WEB DEVELOPMENT", "AUTOMATION", "AI AGENTS"],
    /** Small tagline above the big name. */
    tagline: "WEB DEVELOPMENT · AUTOMATION · AI AGENTS",
    /** Short bio under the rotating word. */
    description:
      "I build clear websites, practical automation, and AI agents for business tasks. Based in KPK, Peshawar, Pakistan — available remotely.",
    /** Right-side panel: three service lines. */
    services: ["Web Development", "Automation", "AI Agents"],
    /** Right-side panel: three small stats. */
    stats: [
      { value: "WEB", label: "Web Development" },
      { value: "FLOW", label: "Automation" },
      { value: "AGENT", label: "AI Agents" },
    ],
    /** Scroll-phase-2 (the "What I build" panel that appears on scroll). */
    phase2: {
      label: "WHAT I BUILD",
      headingLead: "Systems built for",
      headingEm: "real work.",
      description:
        "I build websites, workflows, and AI agents around a clear task in your business.",
      primaryCta: { label: "View Websites ↓", target: "projects" },
      secondaryCta: { label: "EMAIL ME →", mailto: true },
      stats: [
        { value: "WEB", label: "Web Development" },
        { value: "FLOW", label: "Automation" },
        { value: "AGENT", label: "AI Agents" },
      ],
    },
  },

  /* ------------------------------- Contact ------------------------------- */
  contact: {
    email: "info@adnanai.com",
    /** Heading parts for the contact card. */
    headingLead: "Have a project",
    headingEm: "in mind?",
    subtext: "Tell me a little about it.",
  },

  /* ------------------------------ Navigation ----------------------------- */
  nav: {
    links: [
      { id: "about", label: "About" },
      { id: "projects", label: "Websites" },
      { id: "ai-systems", label: "AI Systems" },
      { id: "experience", label: "Process" },
    ],
    contactLabel: "Contact",
    /** Notification bell popup content. */
    notification: {
      quote:
        '"If a task keeps repeating, it may be worth automating."',
      ctaLabel: "Discuss an idea",
      ctaSubject: "Automation idea",
      ctaBody:
        "Hi Adnan,\n\nI have a task that may be worth automating.\n\nHere is what I need help with:\n\n[Describe the task]\n\nThanks,",
    },
    mobileCta: "Email me",
    mobileFooter: "Websites · Automation · AI Agents",
  },

  /* ------------------------------- Workflows ----------------------------- */
  workflows: {
    label: "AI Systems",
    headingLead: "Systems designed to make work",
    headingEm: "simpler.",
    subtitle:
      "Three practical examples of work I can design for a business.",
    ctaSubject: "Adnan Ai — Project enquiry",
    ctaBody:
      "Hi Adnan,\n\nI’d like to discuss a website, an automation, or an AI agent for my business.\n\nHere is the task I want to solve:\n\n[Describe your task]\n\nThanks!",
    cardCta: "Discuss this system",
  },

  /* -------------------------------- About -------------------------------- */
  about: {
    label: "About",
    headingLead: "I build systems that support",
    headingEm: "better work.",
    /** Portrait image. Recommended: 3:4 vertical, ~600×800. */
    image: "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/uploads/migration/ed576c01-2271-4a82-8baf-5183dfe6f888.webp",
    imageAlt: "Adnan Ahmad holding a laptop in a studio lounge",
    bio: [
      "I build websites, automations, and AI agents around the work that needs doing.",
      "Each project starts with the task, then a clear plan for design, build, and handover.",
    ],
    achievementsTitle: "What I can build",
    achievements: [
      "Website Development: responsive websites that explain your offer and make the next step clear",
      "AI Automation: connected steps for intake, data, notifications, and follow-up",
      "AI Agents: task-focused support for research, intake, questions, and internal work",
    ],
  },

  /* -------------------------------- Skills ------------------------------- */
  skills: {
    label: "Services",
    headingLead: "What I",
    headingEm: "build",
  },

  /* ------------------------------ Experience ----------------------------- */
  experience: {
    label: "Process",
    headingLead: "How I",
    headingEm: "work",
  },

  /* -------------------------------- Reviews ------------------------------ */
  reviews: {
    label: "Services",
    headingLead: "Built for your next",
    headingEm: "step.",
    headingTail: "",
    subtitle: "Websites, automation, and AI agents for defined business tasks.",
  },

  /* ----------------------------- n8n subpage ----------------------------- */
  n8nPage: {
    backLabel: "Back to Portfolio",
    label: "More examples",
    headingLead: "Practical system",
    headingEm: "patterns",
    subtitle:
      "Examples of websites, automations, and agents built around clear business tasks.",
    ctaHeading: "Need a system for a real task?",
    ctaSub:
      "Tell me what needs to work better. I can help you decide whether a website, an automation, or an AI agent is useful.",
    ctaButton: "Discuss your project",
  },

  /* -------------------------------- Assets ------------------------------- */
  assets: {
    workflowImages: [
      "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/workflows/migration/271ebbb2-aa7f-4959-bdce-7b11639b0243.webp",
      "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/workflows/migration/af505c30-2299-4b45-987c-68b75a745972.webp",
      "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/workflows/migration/354ab610-f1e8-418d-badd-0c8d7621b53e.webp",
      "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/workflows/migration/28cf06b6-d63d-4cb9-8b22-6346b16f9f74.webp",
      "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/workflows/migration/d7ce75b4-592f-4dae-9e38-dd142ce67ebe.webp",
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Build a mailto: URL with subject/body for CTA buttons. */
export function mailto(subject: string, body: string): string {
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
