/** Experience timeline entries. */
export interface ExperienceEntry {
  role: string;
  date: string;
  company: string;
  companyType: string;
  bullets: string[];
}

export const experienceEntries: ExperienceEntry[] = [
  {
    role: "AI Content Creator & Educator",
    date: "Oct 2025 – Present",
    company: "YouTube — @your-channel",
    companyType: "Content Creation · AI Education",
    bullets: [
      "Producing long-form build series that take viewers from idea to deployed AI automation.",
      "Breaking down real client workflows — architecture, costs, and measurable outcomes.",
      "Growing a community of developers and freelancers learning practical AI automation.",
    ],
  },
  {
    role: "Founder & Product Developer",
    date: "Dec 2024 – Present",
    company: "Your Startup",
    companyType: "Startup · Product",
    bullets: [
      "Designed and built a founder–investor scheduling platform end to end.",
      "Led UI/UX design in Figma and shipped cross-platform apps with Flutter + Firebase.",
      "Top 6 finalist in a state-wide startup funding program; invited to a national summit.",
    ],
  },
];
