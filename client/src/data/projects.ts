/**
 * Workflow / project card data. `image` indexes into
 * siteConfig.assets.workflowImages — replace those URLs to swap imagery.
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

/** Cards shown on the home page (first 4). */
export const homeWorkflows: Workflow[] = [
  {
    id: 1,
    title: "Hospital Appointment AI Booking System",
    image: w1,
    problem: "Staff manually scheduling appointments and sending confirmations.",
    solution:
      "n8n auto-books slots, updates patient databases, and sends WhatsApp reminders.",
    metric: "₹80K",
    metricLabel: "Project Value",
  },
  {
    id: 2,
    title: "Pharmacy Order & Supply Automation",
    image: w2,
    problem: "Manual inventory tracking and supplier coordination causing stock-outs.",
    solution:
      "n8n automates stock checks, triggers purchase orders, and alerts suppliers.",
    metric: "₹46K+",
    metricLabel: "Freelance Profit",
  },
  {
    id: 3,
    title: "Real Estate Lead AI Agent",
    image: w3,
    problem: "Losing hot leads due to delayed responses to late-night property inquiries.",
    solution:
      "n8n uses OpenAI to answer queries 24/7, scores leads, and schedules site visits.",
    metric: "₹33K",
    metricLabel: "System Sold Price",
  },
  {
    id: 4,
    title: "Freelance Lead Onboarding System",
    image: w4,
    problem: "Manual onboarding and invoicing wasting hours of productive freelance time.",
    solution: "Webhook triggers client folder setups, databases, and custom invoices.",
    metric: "₹20K",
    metricLabel: "Project Earning",
  },
];

/** Full gallery shown on the #n8n-projects page. */
export const allWorkflows: Workflow[] = [
  ...homeWorkflows,
  {
    id: 5,
    title: "Local Ollama AI Integration in n8n",
    image: w5,
    problem: "High API costs of large commercial LLMs making automation expensive.",
    solution:
      "Integrates local open-source LLMs (like Llama 3) inside n8n for zero API fees.",
    metric: "Zero",
    metricLabel: "API Cost Flow",
  },
  {
    id: 6,
    title: "Free Tatkal Ticket Alert Bot (IRCTC Bot)",
    image: w1,
    problem:
      "Manually tracking Tatkal seat openings on IRCTC is tedious and leads to missing bookings.",
    solution:
      "n8n scans NTES every 10 minutes and sends instant Telegram alerts upon seat changes.",
    metric: "Free",
    metricLabel: "Tatkal Alerts",
  },
  {
    id: 7,
    title: "Claude AI Agent for B2B Lead Generation",
    image: w2,
    problem:
      "Sifting through listings and writing personalized outreach emails manually is highly inefficient.",
    solution:
      "n8n fetches B2B listings, uses Claude AI to score them, and auto-drafts targeted campaigns.",
    metric: "500+",
    metricLabel: "Leads Scored/mo",
  },
  {
    id: 8,
    title: "WhatsApp AI Booking Agent (Restaurant)",
    image: w3,
    problem:
      "Staff wasting operational hours manually handling table reservation requests on WhatsApp.",
    solution:
      "n8n connects WhatsApp API with Google Sheets & Calendar to autonomously auto-book tables.",
    metric: "Live Client",
    metricLabel: "Zero Admin Time",
  },
  {
    id: 9,
    title: "AI Website Builder & Sales Pipeline",
    image: w4,
    problem:
      "Freelance developers spending hours setting up sites and client databases manually.",
    solution:
      "n8n automates site template setups, deploys to Vercel, and syncs info to CRM.",
    metric: "₹16K/hr",
    metricLabel: "Client Value Flow",
  },
  {
    id: 10,
    title: "Custom AI Ads & Copywriting Scheduler",
    image: w5,
    problem:
      "Spending hours designing layouts and drafting copy for weekly marketing campaigns.",
    solution:
      "n8n fetches product data, writes ad copy with GPT-4, and schedules posts via Buffer.",
    metric: "5x",
    metricLabel: "Faster Launch",
  },
  {
    id: 11,
    title: "Gmail Sentiment Classifier & Urgent Router",
    image: w1,
    problem: "Critical customer complaints getting buried in daily inbox message volume.",
    solution:
      "n8n scans emails, analyzes sentiment, and triggers SMS alerts for negative feedback.",
    metric: "98%",
    metricLabel: "Response Speed",
  },
  {
    id: 12,
    title: "Competitor Price Tracker & Adjuster",
    image: w2,
    problem:
      "E-commerce stores losing revenue due to competitors lowering prices dynamically.",
    solution:
      "n8n runs daily competitor price scrapers and auto-updates WooCommerce margins.",
    metric: "Real-Time",
    metricLabel: "Margin Watch",
  },
  {
    id: 13,
    title: "Notion Database Backup & AWS S3 Sync",
    image: w3,
    problem: "No secure off-site backup for essential knowledge databases in Notion.",
    solution:
      "n8n triggers daily database exports to JSON/Markdown and uploads to AWS S3.",
    metric: "Daily Secure",
    metricLabel: "Automated Backup",
  },
  {
    id: 14,
    title: "YouTube Video to Blog Post Converter",
    image: w4,
    problem:
      "Repurposing video tutorials into readable blogs takes hours of manual translation.",
    solution:
      "n8n transcribes audio with Whisper, writes SEO content with GPT-4, and publishes to WordPress.",
    metric: "20 mins",
    metricLabel: "Video to Article",
  },
  {
    id: 15,
    title: "E-commerce Abandoned Cart Follow-Up",
    image: w5,
    problem:
      "Lost sales from users leaving checkout page without completing purchases.",
    solution:
      "n8n detects abandoned checkouts and triggers WhatsApp reminders with discount links.",
    metric: "15%",
    metricLabel: "Checkout Recovery",
  },
];
