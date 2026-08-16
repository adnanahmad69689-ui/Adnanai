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
    role: "AI Web Development",
    date: "From positioning to launch",
    company: "Adnan AI",
    companyType: "Web Strategy · UI/UX · Development",
    bullets: [
      "Clarify the offer, audience, and client journey before interface decisions are made.",
      "Create responsive websites that pair premium visual design with a clear reason to take action.",
      "Keep pages lightweight, accessible, and ready to evolve as the business grows.",
    ],
  },
  {
    role: "AI Automation & Agents",
    date: "From discovery to a working system",
    company: "Adnan AI",
    companyType: "Workflow Design · AI Agents · Operations",
    bullets: [
      "Map the real manual steps before selecting tools or automating anything.",
      "Design focused automations and AI agents around a defined task, approved context, and useful hand-offs.",
      "Prioritize systems that remain understandable and maintainable after the first launch.",
    ],
  },
];
