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
      "Adnan Ai — portfolio of Adnan Ai, an AI automation engineer building end-to-end AI systems, mobile apps, and workflow automations.",
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
    backgroundImage: "/manus-storage/hero-user-portrait_ed976720.webp",
    backgroundAlt: "Portrait of Adnan Ai seated with a laptop",
    /** Rotating words under the big name (cycles every 2.5s). */
    rotatingWords: ["AI WEB DEVELOPMENT", "AI AUTOMATION", "AI AGENTS"],
    /** Small tagline above the big name. */
    tagline: "AI WEB DEVELOPMENT · AI AUTOMATION · AI AGENTS",
    /** Short bio under the rotating word. */
    description:
      "Adnan AI builds clear, capable digital systems for businesses that want better websites, smarter automation, and practical AI agents. Based in KPK, Peshawar, Pakistan — available remotely.",
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
      "Need an AI-powered website, a smoother business workflow, or an AI agent tailored to a real task? Send an email or start a conversation on Instagram.",
  },

  /* ------------------------------ Navigation ----------------------------- */
  nav: {
    links: [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Websites" },
      { id: "ai-systems", label: "AI Systems" },
      { id: "experience", label: "Experience" },
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
      "Explore practical starting points for AI web development, automation, and agent-based workflows — shaped around the way your business actually operates.",
    pillars: ["AI Web Development", "AI Automation", "AI Agents"],
    showMoreLabel: "Explore System Patterns",
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
    image: "/manus-storage/adnan-ai-about-portrait_e8b8b5da.webp",
    imageAlt: "Portrait of Adnan Ai holding a laptop in a studio lounge",
    bio: [
      "Adnan AI helps businesses turn ideas and operational pain points into practical digital systems. The focus is clear communication, thoughtful implementation, and technology that earns its place in the workflow.",
      "Core work spans AI web development, AI automation, and AI agents — from the customer-facing website through to the systems that keep the work moving behind it.",
      "Every engagement begins with the real task at hand, then turns it into a focused plan with the right balance of design, engineering, and automation.",
    ],
    info: [
      { label: "Location", value: "KPK, Peshawar, Pakistan" },
      { label: "Email", value: "Adnanuop@gmail.com", href: "mailto:Adnanuop@gmail.com" },
      { label: "Instagram", value: "Instagram", href: "https://instagram.com/" },
      { label: "Availability", value: "Available for client projects", highlight: true },
    ],
    achievementsTitle: "What Adnan AI Can Build",
    achievements: [
      "AI-powered websites designed to communicate clearly and convert attention into action",
      "Automated workflows that connect routine business steps into a dependable system",
      "AI agents that support research, intake, response, and internal operations",
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
    label: "Experience",
    headingLead: "How Adnan AI",
    headingEm: "works",
  },

  /* -------------------------------- Reviews ------------------------------ */
  reviews: {
    label: "Service Focus",
    headingLead: "Built to make your work",
    headingEm: "clearer.",
    headingTail: "",
    subtitle:
      "Adnan AI brings together focused web development, thoughtful automation, and practical AI agents to support real business needs.",
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
      "/manus-storage/workflow1-dashboard_f2dd664f.webp",
      "/manus-storage/workflow2-dashboard_fe9dd248.webp",
      "/manus-storage/workflow3-dashboard_967223f5.webp",
      "/manus-storage/workflow4-dashboard_e6a1c00a.webp",
      "/manus-storage/workflow5-dashboard_3422b1b5.webp",
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
