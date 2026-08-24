/** Service-focus cards. These describe Adnan Ai offerings, not customer testimonials or claimed outcomes. */
export interface Outcome {
  metric: string;
  metricLabel: string;
  title: string;
  detail: string;
  accent: string;
}

export const outcomes: Outcome[] = [
  {
    metric: "WEB",
    metricLabel: "Web development",
    title: "A website that does its job",
    detail: "Clear, responsive pages that explain your offer and guide the next step.",
    accent: "#a8ff3e",
  },
  {
    metric: "FLOW",
    metricLabel: "Automation",
    title: "Less manual work",
    detail: "Automations that connect routine steps and keep information moving.",
    accent: "#a8ff3e",
  },
  {
    metric: "AGENT",
    metricLabel: "AI agents",
    title: "Support for defined tasks",
    detail: "AI agents built around approved knowledge, communication, and clear hand-offs.",
    accent: "#a8ff3e",
  },
];
