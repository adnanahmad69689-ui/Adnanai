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
    image: "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/portfolio/migration/cb7824ec-661f-42e4-83d8-2ca017d778de.webp",
    imageAlt: "Aqualume water website hero with glass water bottle and Pure Clarity headline",
    url: "https://1st-water-website.vercel.app/",
  },
  {
    id: "na-metal-live",
    label: "LIVE WEBSITE · N A METAL",
    title: "N A Metal website",
    description: "A public website for metal fabrication, event and exhibition work, display environments, and immersive installations.",
    details: ["Full-screen event fabrication hero", "Service navigation across eight offerings", "Public website link included"],
    status: "Public project · live website available",
    action: "Visit live site ↗",
    image: "https://xlskgkechyngzsrttxap.supabase.co/storage/v1/object/public/portfolio/migration/0c4fe57c-4254-46c8-b9e9-7ec4610a7232.webp",
    imageAlt: "N A Metal website hero showing an event and exhibition fabrication stage",
    url: "https://n-a-metal-lr1v.vercel.app/",
  },
];
