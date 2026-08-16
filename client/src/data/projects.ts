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
  {
    id: 7,
    title: "Email Triage & Urgent Escalation",
    image: w2,
    problem: "Important customer or operational messages can disappear inside a busy shared inbox.",
    solution: "An AI-assisted triage flow can classify intent, flag urgent issues, and route the right message to the right owner.",
    metric: "INBOX",
    metricLabel: "Focused response",
  },
  {
    id: 8,
    title: "WhatsApp Booking Assistant",
    image: w3,
    problem: "Booking requests often require repeated back-and-forth across messages, calendars, and internal availability.",
    solution: "A booking assistant can collect the necessary details, check a defined availability source, and prepare the correct next step.",
    metric: "BOOKING",
    metricLabel: "Clear scheduling",
  },
  {
    id: 9,
    title: "Lead Follow-Up Operating System",
    image: w4,
    problem: "Interested leads can lose momentum when follow-up depends on manual reminders and fragmented notes.",
    solution: "A connected follow-up system can organize context, prompt a next action, and keep ownership visible across the pipeline.",
    metric: "LEADS",
    metricLabel: "Better hand-offs",
  },
  {
    id: 10,
    title: "Inventory & Supplier Signal Flow",
    image: w5,
    problem: "Teams need a reliable way to notice stock signals and coordinate supplier communication before work is disrupted.",
    solution: "An automation pattern can monitor defined inventory inputs, prepare alerts, and route the relevant context to the right team member.",
    metric: "STOCK",
    metricLabel: "Operational signals",
  },
  {
    id: 11,
    title: "Campaign Brief & Content Scheduler",
    image: w1,
    problem: "Marketing work slows down when briefs, assets, approvals, and publishing tasks are managed in separate places.",
    solution: "A campaign workflow can organize the brief, surface missing inputs, and prepare a consistent publishing checklist.",
    metric: "CAMPAIGN",
    metricLabel: "Aligned planning",
  },
  {
    id: 12,
    title: "Client Onboarding Workflow",
    image: w2,
    problem: "New client setup can become repetitive when information, access, documents, and next steps are collected manually.",
    solution: "An onboarding flow can create a structured intake, organize approved assets, and prepare the right kickoff actions.",
    metric: "ONBOARD",
    metricLabel: "Structured intake",
  },
  {
    id: 13,
    title: "Competitor Signal Monitor",
    image: w3,
    problem: "Market changes can be missed when teams have no consistent way to review selected competitor or category signals.",
    solution: "A monitoring workflow can collect agreed sources, summarize the changes, and provide a review-ready update.",
    metric: "SIGNAL",
    metricLabel: "Reviewed insight",
  },
  {
    id: 14,
    title: "Database Backup & Sync Pattern",
    image: w4,
    problem: "Operational records need a dependable backup approach when essential knowledge is distributed across tools.",
    solution: "A scheduled pattern can prepare structured exports and place them in an approved backup destination for review.",
    metric: "BACKUP",
    metricLabel: "Prepared continuity",
  },
];
