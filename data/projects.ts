import type { TechId } from "@/lib/tech-stack";

export type Project = {
  name: string;
  description: string;
  link?: string;
  stackTags?: readonly TechId[];
  versions?: ("v1" | "v2")[];
};

export const projects: Project[] = [
  {
    name: "kiwis.club",
    description:
      "a privacy-first platform delivering ai-powered insights from your inbox. securely track upcoming payments without compromising your personal data.",
    link: "https://kiwis.club/",
    stackTags: ["next", "postgres", "go", "qwen"],
    versions: ["v2"],
  },
  {
    name: "calcon.fit",
    description:
      "the fitness app that helps users track calorie intake, create squads, and share progress with friends.",
    link: "https://calcon.fit",
    stackTags: ["next", "tailwind", "mongo"],
    versions: ["v1", "v2"],
  },
  {
    name: "cashflow tracker",
    description: "a web application for tracking personal finances and managing cash flow.",
    link: "https://cashflow-tracker.vercel.app",
    stackTags: ["next", "postgres"],
    versions: ["v1", "v2"],
  },
  {
    name: "nitw material app (unofficial)",
    description:
      "developed an android application for national institute of technology, warangal (no longer available on play store).",
    stackTags: ["java", "android", "firebase"],
    versions: ["v1", "v2"],
  },
];
