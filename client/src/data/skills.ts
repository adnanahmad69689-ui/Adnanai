/** Service categories shown in the portfolio grid. These describe offerings, not unverified credentials. */
export interface SkillCategory {
  title: string;
  tags: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI Web Development",
    tags: ["Business Websites", "Responsive Design", "Conversion CTAs"],
  },
  {
    title: "AI Automation",
    tags: ["Workflow Design", "Task Automation", "System Integration"],
  },
  {
    title: "AI Agents",
    tags: ["Knowledge Agents", "Lead Agents", "Support Agents"],
  },
];
