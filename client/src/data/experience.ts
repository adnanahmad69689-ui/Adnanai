/** Service approach entries, written without unsupported employment or award claims. */
export interface ExperienceEntry {
  role: string;
  date: string;
  companyType: string;
  bullets: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    role: "Web Development",
    date: "Idea to launch",
    companyType: "Strategy, design and build",
    bullets: [
      "First we get clear on what you sell, who it is for, and what a visitor should do next.",
      "Then the site gets designed and built around that one journey, not around a template.",
      "What you are left with is fast, accessible, and easy to update yourself.",
    ],
  },
  {
    role: "Automation & AI Agents",
    date: "Discovery to working setup",
    companyType: "Workflow design and operations",
    bullets: [
      "Before any tool gets picked, we map the work you are actually doing by hand.",
      "The automation is then built around one clear task, with a sensible hand-off back to a person.",
      "It stays understandable afterwards, so you are never locked out of your own system.",
    ],
  },
];
