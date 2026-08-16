/** Service-focus cards. These describe Adnan AI offerings, not customer testimonials or claimed outcomes. */
export interface Outcome {
  tag: string;
  metric: string;
  metricLabel: string;
  title: string;
  detail: string;
  accent: string;
}

export const outcomes: Outcome[] = [
  {
    tag: "WEB",
    metric: "WEB",
    metricLabel: "AI web development",
    title: "A stronger digital first impression",
    detail: "Premium, responsive web experiences that explain your offer, support your sales process, and make the next action clear.",
    accent: "#a8ff3e",
  },
  {
    tag: "FLOW",
    metric: "FLOW",
    metricLabel: "AI automation",
    title: "Workflows built around real operations",
    detail: "Thoughtful automation that connects routine steps, keeps context moving, and gives teams a clearer operating rhythm.",
    accent: "#61d8ff",
  },
  {
    tag: "AGENT",
    metric: "AGENT",
    metricLabel: "AI agents",
    title: "AI support with a defined purpose",
    detail: "Practical AI agents that help with specific tasks, approved knowledge, communication, and internal decision support.",
    accent: "#c89bff",
  },
];
