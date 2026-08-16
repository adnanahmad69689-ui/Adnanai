/** Service categories shown in the portfolio grid. These describe offerings, not unverified credentials. */
export interface SkillCategory {
  title: string;
  tags: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI Web Development",
    tags: ["Premium Websites", "Responsive UX", "Conversion-focused Pages", "Client Enquiry Flows"],
  },
  {
    title: "AI Automation",
    tags: ["Workflow Mapping", "Task Routing", "Data Handoffs", "Operational Systems"],
  },
  {
    title: "AI Agents",
    tags: ["Knowledge Assistants", "Lead Intake", "Support Workflows", "Human-in-the-loop Design"],
  },
  {
    title: "System Design",
    tags: ["Discovery", "Clear Scope", "Practical Delivery", "Maintainable Foundations"],
  },
];
