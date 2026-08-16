/** Skill categories shown in the Skills section grid. */
export interface SkillCategory {
  title: string;
  tags: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Automation",
    tags: [
      "Claude AI",
      "OpenAI API",
      "LangChain",
      "OpenClaw",
      "Prompt Engineering",
      "AI Agents",
      "n8n",
      "Make.com",
      "Zapier",
      "Docker",
      "MediaPipe",
    ],
  },
  {
    title: "Programming",
    tags: ["Python", "JavaScript", "Dart", "Kotlin", "React", "Pandas", "REST APIs"],
  },
  {
    title: "Mobile Dev",
    tags: [
      "Flutter",
      "Android (Kotlin)",
      "MVVM Architecture",
      "Firebase",
      "Google Maps SDK",
      "Push Notifications",
    ],
  },
  {
    title: "Backend & Database",
    tags: ["Firebase", "Supabase", "SQL", "NoSQL", "REST APIs", "Postman"],
  },
  {
    title: "Cloud & DevOps",
    tags: ["Vercel", "GCP", "GitHub", "CI/CD"],
  },
  {
    title: "Design & Tools",
    tags: ["Figma", "Canva", "Airtable", "CRM Tools", "Google Workspace"],
  },
];
