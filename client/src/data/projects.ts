/**
 * AI system patterns shown as service examples. They are illustrative patterns,
 * not claims about completed client work or commercial results.
 */
import { siteConfig } from "./siteConfig";

export interface Workflow {
  id: number;
  title: string;
  image: string;
  problem: string;
  solution: string;
  metric: string;
  metricLabel: string;
}

const [w1, w2, w3, w4, w5] = siteConfig.assets.workflowImages;

export const homeWorkflows: Workflow[] = [
  {
    id: 1,
    title: "AI Web Experience & Lead Intake",
    image: w1,
    problem: "A good service can be hard to understand when its website and enquiry flow are unclear.",
    solution: "A focused web experience can explain the offer, capture the right context, and create a cleaner first step for every enquiry.",
    metric: "WEB",
    metricLabel: "Client-ready experience",
  },
  {
    id: 2,
    title: "Workflow Discovery & Routing",
    image: w2,
    problem: "Routine requests often move between tools and people without a dependable structure.",
    solution: "A mapped automation can connect intake, data, notifications, and follow-up around the way a team already works.",
    metric: "FLOW",
    metricLabel: "Process design",
  },
  {
    id: 3,
    title: "AI Support Agent Blueprint",
    image: w3,
    problem: "Customers and teams need consistent answers when the same questions repeat.",
    solution: "A defined AI agent can use approved context to guide questions, prepare responses, and hand off the cases that need people.",
    metric: "AGENT",
    metricLabel: "Defined task support",
  },
  {
    id: 4,
    title: "Business Knowledge Assistant",
    image: w4,
    problem: "Useful business knowledge is often scattered across documents, notes, and conversations.",
    solution: "A structured knowledge workflow can make approved information easier to find, review, and apply.",
    metric: "KNOW",
    metricLabel: "Connected context",
  },
];

export const allWorkflows: Workflow[] = [
  ...homeWorkflows,
  {
    id: 5,
    title: "AI Intake & Qualification",
    image: w5,
    problem: "Early enquiries arrive with different levels of detail and urgency.",
    solution: "An intake system can gather the right details, organize requests, and create a clearer next step.",
    metric: "INTAKE",
    metricLabel: "Better context",
  },
  {
    id: 6,
    title: "Research & Insight Agent",
    image: w1,
    problem: "Research takes time when key information is spread across sources.",
    solution: "An AI-assisted research flow can collect, structure, and prepare material for human review.",
    metric: "RESEARCH",
    metricLabel: "Structured insight",
  },
];
