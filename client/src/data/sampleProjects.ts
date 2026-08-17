/** Portfolio entries built only from the supplied public link and project screenshots. */
export interface PortfolioProject {
  id: string;
  label: string;
  title: string;
  description: string;
  details: string[];
  status: string;
  action: string;
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryImageAlt?: string;
  url?: string;
}

export const sampleProjects: PortfolioProject[] = [
  {
    id: "aqualume-live",
    label: "LIVE CONCEPT WEBSITE · AQUALUME",
    title: "Aqualume water website",
    description: "A public luxury-water concept website built around a cinematic bottle hero, product storytelling, and refined specification-led content.",
    details: ["Cinematic product hero", "Brand story and product specs", "Public website link included"],
    status: "Live concept site · public website available",
    action: "Visit live site ↗",
    image: "/manus-storage/aqualume-live-card_77a688db.webp",
    imageAlt: "Aqualume water website hero with glass water bottle and Pure Clarity headline",
    url: "https://1st-water-website.vercel.app/",
  },
  {
    id: "adnan-ai-portfolio-live",
    label: "LIVE PORTFOLIO WEBSITE · ADNAN AI",
    title: "Adnan Ai Project Website",
    description: "A personal AI portfolio designed to present AI Web Development, AI Automation, AI Agents, public website work, and workflow systems in one editorial experience.",
    details: ["Responsive portfolio interface", "Websites and AI Systems sections", "Optimized visuals and motion"],
    status: "Live portfolio · public website available",
    action: "Visit portfolio ↗",
    image: "/manus-storage/adnan-ai-project-website_3465fe57.webp",
    imageAlt: "Adnan Ai portfolio hero with personal brand identity and service positioning",
    url: "https://portfoliorec-xt4vpvin.manus.space/",
  },
  {
    id: "na-metal-live",
    label: "LIVE WEBSITE · N A METAL",
    title: "N A Metal website",
    description: "A public website for metal fabrication, event and exhibition work, display environments, and immersive installations.",
    details: ["Full-screen event fabrication hero", "Service navigation across eight offerings", "Public website link included"],
    status: "Public project · live website available",
    action: "Visit live site ↗",
    image: "/manus-storage/na-metal-live-card_7d24c526.webp",
    imageAlt: "N A Metal website hero showing an event and exhibition fabrication stage",
    url: "https://n-a-metal-lr1v.vercel.app/",
  },
];
