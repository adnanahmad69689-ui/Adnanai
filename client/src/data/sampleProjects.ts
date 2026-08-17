/**
 * Sample-only entries used to preview portfolio formats. Replace these with
 * real project facts, assets, and links before presenting them as live work.
 */
export type SampleProjectFormat = "private-site" | "live-3d" | "ai-system";

export interface SampleProject {
  id: string;
  format: SampleProjectFormat;
  label: string;
  title: string;
  description: string;
  details: string[];
  status: string;
  action: string;
}

export const sampleProjects: SampleProject[] = [
  {
    id: "private-website",
    format: "private-site",
    label: "SAMPLE FORMAT · PRIVATE WEBSITE",
    title: "Private website presentation",
    description: "Use this structure when a website cannot be shared publicly but screenshots can demonstrate the interface.",
    details: ["One polished primary screenshot", "Two or three factual features", "Private-demo email action"],
    status: "Private build — demo available on request",
    action: "Replace with your screenshot",
  },
  {
    id: "live-3d",
    format: "live-3d",
    label: "SAMPLE FORMAT · PUBLIC 3D SITE",
    title: "Interactive 3D website",
    description: "Use this structure when a public site has immersive scenes, product exploration, or high-impact interaction.",
    details: ["Strong 3D hero still", "Short interaction summary", "Single public-link action"],
    status: "Public link ready when supplied",
    action: "Add your live URL",
  },
  {
    id: "ai-system",
    format: "ai-system",
    label: "SAMPLE FORMAT · AI WORKFLOW",
    title: "AI agent or automation",
    description: "Use this structure to show the trigger, process, and output of a private or shareable business system.",
    details: ["Clear trigger → process → output", "Tools or knowledge source", "Human approval where relevant"],
    status: "Private system — details on request",
    action: "Replace with your workflow",
  },
];
