/**
 * Testimonial cards.
 * NOTE: These are illustrative placeholders. Replace them with your REAL
 * client feedback before publishing — never ship invented testimonials.
 */
export interface Review {
  initials: string;
  avatarColor: string;
  name: string;
  role: string;
  date: string;
  text: string;
  project: string;
  flag: string;
  country: string;
  stars: number;
}

export const reviews: Review[] = [
  {
    initials: "LH",
    avatarColor: "#3b82f6",
    name: "Liam Henderson",
    role: "CEO",
    date: "1 week ago",
    text: "“They automated our entire lead acquisition and follow-up sequence. We saved 15+ hours weekly and slashed response times down to minutes.”",
    project: "Lead Acquisition & Follow-up n8n Workflow",
    flag: "🇬🇧",
    country: "United Kingdom",
    stars: 5,
  },
  {
    initials: "SJ",
    avatarColor: "#ec4899",
    name: "Sarah Jenkins",
    role: "Founder",
    date: "3 weeks ago",
    text: "“Outstanding n8n workflows! They built a custom AI agent that drafts replies and processes files seamlessly. Highly professional and efficient developer.”",
    project: "Custom AI Agent & Document Processor",
    flag: "🇺🇸",
    country: "United States",
    stars: 5,
  },
  {
    initials: "JK",
    avatarColor: "#10b981",
    name: "Johann Kruger",
    role: "Operations Manager",
    date: "1 month ago",
    text: "“Excellent integration of our industrial monitoring triggers with Telegram and email alerts. The workflow is robust and runs flawlessly.”",
    project: "Industrial Monitoring & Telegram Alert Engine",
    flag: "🇿🇦",
    country: "South Africa",
    stars: 5,
  },
  {
    initials: "ER",
    avatarColor: "#8b5cf6",
    name: "Elena Rostova",
    role: "CTO",
    date: "1 month ago",
    text: "“The AI agent integrated into our customer support has decreased ticket volume by 35%. Dynamic, responsive, and outstanding automation work!”",
    project: "Customer Support AI Agent Integration",
    flag: "🇩🇪",
    country: "Germany",
    stars: 5,
  },
  {
    initials: "RP",
    avatarColor: "#f59e0b",
    name: "Rajesh Patel",
    role: "Owner",
    date: "2 months ago",
    text: "“Our WhatsApp booking agent is a game-changer! Customers get instant reservation confirmations, and table bookings are fully managed automatically.”",
    project: "WhatsApp AI Booking Agent & Reservation Bot",
    flag: "🇮🇳",
    country: "India",
    stars: 5,
  },
  {
    initials: "TA",
    avatarColor: "#14b8a6",
    name: "Tariq Al-Mansoori",
    role: "Operations Director",
    date: "3 months ago",
    text: "“Created a highly functional CRM automation in n8n. Response times were slightly affected by time zones, but the automation works perfectly and saves us daily effort.”",
    project: "CRM Integration & WhatsApp Notification System",
    flag: "🇦🇪",
    country: "United Arab Emirates",
    stars: 5,
  },
];
