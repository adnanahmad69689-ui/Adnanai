/**
 * Outcome cards are case-study summaries, not testimonials or ratings.
 * Replace these only with substantiated project outcomes before publishing.
 */
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
    tag: "LEAD OPS",
    metric: "15+ hrs",
    metricLabel: "saved each week",
    title: "Lead acquisition & follow-up workflow",
    detail:
      "A structured n8n system centralizes incoming leads, scores opportunities, and triggers timely follow-up actions.",
    accent: "#3b82f6",
  },
  {
    tag: "SUPPORT OPS",
    metric: "35%",
    metricLabel: "fewer repeated tickets",
    title: "Customer support AI agent",
    detail:
      "An AI-assisted intake layer classifies routine questions, prepares replies, and routes complex requests to the right owner.",
    accent: "#8b5cf6",
  },
  {
    tag: "BOOKING OPS",
    metric: "24/7",
    metricLabel: "booking availability",
    title: "WhatsApp booking automation",
    detail:
      "An automated reservation flow confirms requests, updates availability, and keeps operational data in sync.",
    accent: "#10b981",
  },
];
