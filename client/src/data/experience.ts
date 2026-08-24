/** Service approach entries, written without unsupported employment or award claims. */
export interface ExperienceEntry {
  role: string;
  date: string;
  company: string;
  companyType: string;
  bullets: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    role: "Web Development",
    date: "From idea to launch",
    company: "Adnan Ai",
    companyType: "Web Strategy · UI/UX · Development",
    bullets: [
      "I clarify your offer, audience, and the action you want visitors to take.",
      "I design and build a responsive website around that journey.",
      "I keep the result light, accessible, and easy to update.",
    ],
  },
  {
    role: "Automation & AI Agents",
    date: "From discovery to a working setup",
    company: "Adnan Ai",
    companyType: "Workflow Design · AI Agents · Operations",
    bullets: [
      "I map the manual work before choosing tools.",
      "I build focused automations and agents around a clear task and hand-off.",
      "I keep the system understandable after launch.",
    ],
  },
];
