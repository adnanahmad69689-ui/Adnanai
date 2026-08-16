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
    /** Last name — rendered in italic accent in the hero. */
    lastName: "Ahmad",
    /** Trailing punctuation after the hero last name. */
    lastNameSuffix: ".",
    /** <title> tag and meta description. */
    pageTitle: "Adnan Ai | AI Automation Engineer & Flutter Developer",
    metaDescription:
      "Adnan Ai — portfolio of Adnan Ahmad, an AI automation engineer building end-to-end AI systems, mobile apps, and workflow automations.",
    /** City shown in the footer copyright line. */
    location: "Your City, Country",
    /** Footer tagline. */
    roles: "AI Automation Engineer · Flutter Developer · YouTube Creator",
    /** Copyright year (auto-computed if left as null). */
    copyrightYear: null as number | null,
  },

  /* -------------------------------- Hero --------------------------------- */
  hero: {
    /** Background portrait. Recommended: 1600×900, subject on the RIGHT. */
    backgroundImage: "/manus-storage/hero-user-portrait_ed976720.webp",
    backgroundAlt: "Portrait of Adnan Ahmad seated with a laptop",
    /** Rotating words under the big name (cycles every 2.5s). */
    rotatingWords: ["AI SYSTEMS", "AUTOMATION", "AGENTS", "WORKFLOWS"],
    /** Small tagline above the big name. */
    tagline: "AI AUTOMATION ENGINEER · FLUTTER DEVELOPER · STARTUP FOUNDER",
    /** Short bio under the rotating word. */
    description:
      "Building end-to-end AI automation systems, mobile applications, and AI-driven workflows. Based in Your City — available for remote roles worldwide.",
    /** Right-side panel: three service lines. */
    services: ["AI Automation", "Flutter Dev", "Prompt Engineering"],
    /** Right-side panel: three small stats. */
    stats: [
      { value: "Top 6", label: "iHub Gujarat" },
      { value: "6+", label: "Projects built" },
      { value: "3x", label: "Videos / week" },
    ],
    /** Scroll-phase-2 (the "What I build" panel that appears on scroll). */
    phase2: {
      label: "WHAT I BUILD",
      headingLead: "AI that replaces",
      headingEm: "manual work.",
      description:
        "I design systems where AI handles the repetitive — lead generation, follow-ups, data pipelines, agent workflows — so humans can focus on what actually matters.",
      primaryCta: { label: "See Projects ↓", target: "projects" },
      secondaryCta: { label: "LET'S TALK →", mailto: true },
      stats: [
        { value: "Top 6", label: "iHub Gujarat Startup Program" },
        { value: "500+", label: "Leads / Month fully automated" },
        { value: "40%", label: "Follow-up time reduced via n8n" },
      ],
    },
  },

  /* ------------------------------- Contact ------------------------------- */
  contact: {
    email: "you@example.com",
    phone: "+91 00000 00000",
    phoneHref: "tel:+910000000000",
    linkedin: "https://linkedin.com/in/your-handle",
    linkedinLabel: "linkedin.com/in/your-handle",
    github: "https://github.com/your-handle",
    githubLabel: "github.com/your-handle",
    youtube: "https://youtube.com/@your-channel",
    youtubeLabel: "@your-channel",
    instagram: "https://instagram.com/your-handle",
    instagramLabel: "@your-handle",
    /** Heading parts for the contact card. */
    headingLead: "Let's build",
    headingEm: "together.",
    subtext:
      "Have a manual process eating your team's time? A product idea that needs an engineer? Or just want to talk AI? My inbox is open — I reply within 24 hours.",
  },

  /* ------------------------------ Navigation ----------------------------- */
  nav: {
    links: [
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "projects", label: "Projects" },
      { id: "experience", label: "Experience" },
      { id: "youtube", label: "YouTube" },
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
    label: "Real Results",
    headingLead: "Manual Work Is Costing You —",
    headingEm: "Here's the Proof",
    subtitle:
      "Real n8n automations I've built for real businesses. Measurable outcomes. No fluff.",
    metrics: [
      { value: 15, suffix: "+", label: "Automations Delivered" },
      { value: 500, suffix: "+", label: "Hours Saved / Month" },
      { value: 99, suffix: "%", label: "Automation Accuracy" },
    ],
    showMoreLabel: "Show More Workflows",
    trustedByLabel: "Built with",
    trustedBy: ["✦ n8n Workflows", "✦ AI Agents", "✦ Flutter Apps"],
    ctaHeading: "Ready to automate your business?",
    ctaSub:
      "Tell me your biggest manual task. I'll show you the automation in 15 minutes — free.",
    ctaButton: "Book Your Free 15-min Audit",
    ctaSubject: "Free Automation Audit",
    ctaBody:
      "Hi,\n\nI'd like a free 15-minute automation audit. Here's my biggest manual pain point:\n\n[Describe your task]\n\nThanks!",
    cardCta: "I need this automation",
  },

  /* -------------------------------- About -------------------------------- */
  about: {
    label: "About",
    headingLead: "I build AI systems that",
    headingEm: "actually work.",
    /** Portrait image. Recommended: 3:4 vertical, ~600×800. */
    image: "/manus-storage/key_achievement_a171bb70.png",
    imageAlt: "Portrait",
    bio: [
      "I'm an AI automation engineer and mobile developer who turns repetitive business processes into self-running systems. My work sits at the intersection of AI agents, workflow automation (n8n), and cross-platform app development with Flutter.",
      "Over the past year I've shipped production automations for hospitals, pharmacies, real-estate agencies, and restaurants — each one measured by hours saved and revenue recovered, not by how clever the tech stack looks.",
      "When I'm not building for clients, I document everything on YouTube: full build series, honest breakdowns of what worked, and the exact workflows you can copy for your own business.",
    ],
    info: [
      { label: "Location", value: "Your City, Country" },
      { label: "Email", value: "you@example.com", href: "mailto:you@example.com" },
      { label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
      { label: "LinkedIn", value: "/in/your-handle", href: "https://linkedin.com/in/your-handle" },
      { label: "GitHub", value: "@your-handle", href: "https://github.com/your-handle" },
      { label: "YouTube", value: "@your-channel", href: "https://youtube.com/@your-channel" },
      { label: "Education", value: "B.Tech, Computer Science" },
      { label: "Availability", value: "Open to Remote Roles", highlight: true },
    ],
    achievementsTitle: "Key Achievements",
    achievements: [
      "Top 6 Finalist — State Startup Funding Program (state-wide applicant pool)",
      "Invited Startup Founder — National Innovation Summit 2026",
      "AI Lead Generation System — 500+ leads/month fully automated pipeline",
      "40% reduction in lead follow-up times via custom n8n AI workflow integrations",
    ],
  },

  /* -------------------------------- Skills ------------------------------- */
  skills: {
    label: "Technical Skills",
    headingLead: "Tools &",
    headingEm: "Technologies",
  },

  /* --------------------------- Featured project -------------------------- */
  project: {
    label: "Founder & Startup Showcase",
    titleLead: "Book Your",
    titleEm: "Pitch",
    badges: ["🏆 TOP 6 FINALIST AT STARTUP ACCELERATOR", "SUMMIT '26 INVITEE"],
    tagline:
      "A premium startup platform built to streamline scheduling and communications between founders and venture capital investors.",
    description:
      "As the Founder and Lead Developer, I conceptualized and built the product from scratch. I directed the entire product lifecycle, designed comprehensive UI/UX flows in Figma for both the Mobile App and the Web Console, and developed the app architecture using cross-platform tools and secure databases.",
    highlights: [
      {
        title: "Investor Matchmaker:",
        text: "Automates investor filtering based on industry preferences, ticket size, and funding stage, removing weeks of manual outreach.",
      },
      {
        title: "Full-Stack Architecture:",
        text: "Engineered using Flutter and Firebase, featuring secure user roles, real-time messaging, and scheduling workflows.",
      },
      {
        title: "Figma UI/UX Prototypes:",
        text: "Designed interactive dashboards and user flows for both startups and investors, focused on ease of navigation and onboarding.",
      },
    ],
    techStack: ["Figma", "Flutter", "Firebase", "Product Strategy", "n8n Automation"],
    ctaLabel: "Discuss the Project",
    ctaSubject: "Project Collaboration",
    ctaBody:
      "Hi,\n\nI saw your startup project in your portfolio and would love to discuss your work or potential collaboration.\n\nThanks!",
    /** Mockup frame */
    mockupUrl: "yourproject.com",
    mockupImage: "/manus-storage/project_mockup_c6eecde7.png",
    mockupImageAlt: "Project platform preview",
    overlayBadge: "🏆 ACCELERATOR PROJECT",
    overlayStat: "Top 6 Finalist",
    overlaySub: "State Accelerator (Innovation Summit 2026)",
  },

  /* ------------------------------ Experience ----------------------------- */
  experience: {
    label: "Experience",
    headingLead: "Where I've",
    headingEm: "Worked",
  },

  /* -------------------------------- YouTube ------------------------------ */
  youtube: {
    label: "YouTube Content",
    headingLead: "Watch Me",
    headingEm: "Build",
    headingTail: "In Public",
    subtitle:
      "Step-by-step build series and technical tutorials targeting developers, freelancers, and businesses looking to leverage AI.",
    showMoreLabel: "Subscribe & Watch More",
    channelUrl: "https://youtube.com/@your-channel",
  },

  /* -------------------------------- Reviews ------------------------------ */
  reviews: {
    label: "Client Outcomes",
    headingLead: "Systems That",
    headingEm: "Perform",
    headingTail: "",
    subtitle:
      "Selected workflow patterns designed around measurable operational improvement. Replace with substantiated case-study results as your portfolio grows.",
  },

  /* ----------------------------- n8n subpage ----------------------------- */
  n8nPage: {
    backLabel: "Back to Portfolio",
    label: "All Automations",
    headingLead: "My n8n",
    headingEm: "Workflows Gallery",
    subtitle:
      "A comprehensive gallery of custom-built n8n workflows designed to eliminate manual data entry, streamline operations, and boost efficiency.",
    ctaHeading: "Want a custom workflow built for your business?",
    ctaSub:
      "Let's dissect your manual workflow. I'll outline the n8n automation flow for you in 15 minutes — completely free.",
    ctaButton: "Book Your Free 15-min Audit",
  },

  /* -------------------------------- Assets ------------------------------- */
  assets: {
    workflowImages: [
      "/manus-storage/workflow1_7236b0f9.png",
      "/manus-storage/workflow2_0adf79c8.png",
      "/manus-storage/workflow3_9c42ebbc.png",
      "/manus-storage/workflow4_1c05db5f.png",
      "/manus-storage/workflow5_d958436a.png",
    ],
    logoMark: "/manus-storage/logo_mark_ba82f168.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Build a mailto: URL with subject/body for CTA buttons. */
export function mailto(subject: string, body: string): string {
  return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}
