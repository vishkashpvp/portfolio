import { calculateDuration, formatDuration } from "@/lib/experience-duration";
import type { TechId } from "@/lib/tech-stack";

export type InternshipRecord = {
  company: string;
  url: string;
  role: string;
  location: string;
  start: string;
  end: string;
  highlight: string;
  stackTags: readonly TechId[];
};

export const internships: InternshipRecord[] = [
  {
    company: "opennets",
    url: "https://opennets.com",
    role: "mean stack engineering intern",
    location: "bengaluru, india",
    start: "2021-05",
    end: "2021-07",
    highlight: "building sdn uis and a drag-and-drop network editor.",
    stackTags: ["node", "angular", "mongo"],
  },
];

export function internshipDuration(record: InternshipRecord): string {
  return formatDuration(calculateDuration(record.start, record.end));
}
