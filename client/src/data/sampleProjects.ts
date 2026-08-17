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
    id: "na-metal-live",
    label: "LIVE WEBSITE · N A METAL",
    title: "N A Metal website",
    description: "A public website for metal fabrication, event and exhibition work, display environments, and immersive installations.",
    details: ["Full-screen event fabrication hero", "Service navigation across eight offerings", "Public website link included"],
    status: "Public project · live website available",
    action: "Visit live site ↗",
    image: "/manus-storage/na-metal-live-site_c6242a42.webp",
    imageAlt: "N A Metal website hero showing an event and exhibition fabrication stage",
    url: "https://n-a-metal-lr1v.vercel.app/",
  },
];
