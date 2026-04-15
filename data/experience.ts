import type { TechId } from "@/lib/tech-stack";

export type Role = { title: string; start: string; end: string };

export type CompanyExperience = {
  name: string;
  url: string;
  isCurrentCompany: boolean;
  location: string;
  highlight: string;
  stackTags: readonly TechId[];
  roles: Role[];
};

export const experiences: CompanyExperience[] = [
  {
    name: "jio platforms limited",
    url: "https://jio.com/platforms",
    isCurrentCompany: true,
    location: "hyderabad, india",
    highlight:
      "full-stack engineer on a smart iot platform — product surfaces, apis, and internal services.",
    stackTags: ["next", "node", "express", "mongo", "redis", "gcp", "jenkins", "mqtt"],
    roles: [
      { title: "get (graduate engineer trainee)", start: "2022-06", end: "2023-06" },
      { title: "software developer", start: "2023-06", end: "2024-07" },
      { title: "software development engineer II", start: "2024-07", end: "present" },
    ],
  },
];
