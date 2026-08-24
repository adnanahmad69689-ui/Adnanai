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
    pageTitle: "Adnan Ai | AI Web Development, Automation & Agents",
    metaDescription:
      "Adnan Ai builds AI websites, automations, and AI agents for real business tasks.",
    /** City shown in the footer copyright line. */
    location: "KPK, Peshawar, Pakistan",
    /** Footer tagline. */
    roles: "AI Web Development · AI Automation · AI Agents",
    /** Copyright year (auto-computed if left as null). */
    copyrightYear: null as number | null,
  },

  /* -------------------------------- Hero --------------------------------- */
  hero: {
    /** Background portrait. Recommended: 1600×900, subject on the RIGHT. */
    backgroundImage: "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/hero/migration/72a17e27-37ab-4c13-b1b5-ada0f02c2d17.webp",
    backgroundAlt: "Portrait of Adnan Ai seated with a laptop",
    /** Rotating words under the big name (cycles every 2.5s). */
    rotatingWords: ["AI WEB DEVELOPMENT", "AI AUTOMATION", "AI AGENTS"],
    /** Small tagline above the big name. */
    tagline: "AI WEB DEVELOPMENT · AI AUTOMATION · AI AGENTS",
    /** Short bio under the rotating word. */
    description:
      "I build AI websites, automations, and agents for real business tasks. Based in KPK, Peshawar, Pakistan — available remotely.",
    /** Right-side panel: three service lines. */
    services: ["AI Web Development", "AI Automation", "AI Agents"],
    /** Right-side panel: three small stats. */
    stats: [
      { value: "WEB", label: "AI Web Development" },
      { value: "FLOW", label: "AI Automation" },
      { value: "AGENT", label: "AI Agents" },
    ],
    /** Scroll-phase-2 (the "What I build" panel that appears on scroll). */
    phase2: {
      label: "WHAT I BUILD",
      headingLead: "AI systems built for",
      headingEm: "real work.",
      description:
        "From client-ready websites to dependable workflows and AI agents, every system is designed around a useful next step for your business.",
      primaryCta: { label: "See Projects ↓", target: "projects" },
      secondaryCta: { label: "LET'S TALK →", mailto: true },
      stats: [
        { value: "WEB", label: "AI Web Development" },
        { value: "FLOW", label: "AI Automation" },
        { value: "AGENT", label: "AI Agents" },
      ],
    },
  },

  /* ------------------------------- Contact ------------------------------- */
  contact: {
    email: "Adnanuop@gmail.com",
    instagram: "https://instagram.com/",
    instagramLabel: "Instagram",
    /** Heading parts for the contact card. */
    headingLead: "Let’s build something",
    headingEm: "useful.",
    subtext:
      "Tell me what needs to work better. Email me or send a message on Instagram.",
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
        '"Every manual task is quietly stealing your profits. Stop acting like an employee in your own business — here is the automation idea you need right now."',
      ctaLabel: "Let's discuss",
      ctaSubject: "I need that automation idea!",
      ctaBody:
        "Hey!\n\nYou nailed it with that quote. I am definitely doing way too much manual work that I shouldn't be doing.\n\nWhat is the automation idea you mentioned? I'd love to know how it applies to business like mine.\n\nThanks,",
    },
    mobileCta: "Let's Talk",
    mobileFooter: "Available for new opportunities",
  },

  /* ------------------------------- Workflows ----------------------------- */
  workflows: {
    label: "AI Systems",
    headingLead: "Systems designed to make work",
    headingEm: "simpler.",
    subtitle:
      "A few practical examples of the systems I can design for your business.",
    pillars: ["AI Web Development", "AI Automation", "AI Agents"],
    showMoreLabel: "View all system patterns",
    trustedByLabel: "Core Services",
    trustedBy: ["✦ AI Web Development", "✦ AI Automation", "✦ AI Agents"],
    ctaHeading: "Ready to design a better system?",
    ctaSub:
      "Tell Adnan AI where work feels slower than it should. Together, we can define the right digital next step.",
    ctaButton: "Start a Conversation",
    ctaSubject: "Adnan AI — Project enquiry",
    ctaBody:
      "Hi Adnan AI,\n\nI’d like to discuss an AI website, an automation, or an AI agent for my business.\n\nHere is the problem I want to solve:\n\n[Describe your task]\n\nThanks!",
    cardCta: "Discuss this system",
  },

  /* -------------------------------- About -------------------------------- */
  about: {
    label: "About",
    headingLead: "Adnan AI builds systems that support",
    headingEm: "better work.",
    /** Portrait image. Recommended: 3:4 vertical, ~600×800. */
    image: "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/uploads/migration/ed576c01-2271-4a82-8baf-5183dfe6f888.webp",
    imageAlt: "Portrait of Adnan Ai holding a laptop in a studio lounge",
    bio: [
      "I build websites, automations, and AI agents around the work that needs doing.",
      "Each project starts with the task, then a clear plan for design, build, and handover.",
    ],
    info: [
      { label: "Location", value: "KPK, Peshawar, Pakistan" },
      { label: "Email", value: "Adnanuop@gmail.com", href: "mailto:Adnanuop@gmail.com" },
      { label: "Instagram", value: "Instagram", href: "https://instagram.com/" },
      { label: "Availability", value: "Available for client projects", highlight: true },
    ],
    achievementsTitle: "What I can build",
    achievements: [
      "Websites that explain your offer and make the next step clear",
      "Automations that connect routine work and keep information moving",
      "AI agents for research, intake, support, and internal tasks",
    ],
  },

  /* -------------------------------- Skills ------------------------------- */
  skills: {
    label: "Services",
    headingLead: "What Adnan AI",
    headingEm: "builds",
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
    label: "All Automations",
    headingLead: "AI System",
    headingEm: "Patterns",
    subtitle:
      "A gallery of practical system patterns for AI web development, automation, and agent-based business workflows.",
    ctaHeading: "Want an AI system designed for your business?",
    ctaSub:
      "Tell Adnan AI what needs to work better. The next step can be a useful website, an automation, or an AI agent.",
    ctaButton: "Start a Conversation",
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
