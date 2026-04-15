import type { Role } from "@/data/experience";

/** Company tenure: earliest role start → present or final role end (not role-change dates alone). */
export function getCompanyRange(roles: Role[]): { start: string; end: string } {
  if (roles.length === 0) return { start: "0000-00", end: "0000-00" };
  const byStart = [...roles].sort((a, b) => a.start.localeCompare(b.start));
  const start = byStart[0].start;
  const hasPresent = roles.some((r) => r.end === "present");
  if (hasPresent) return { start, end: "present" };
  const byEnd = [...roles].sort((a, b) => b.end.localeCompare(a.end));
  return { start, end: byEnd[0].end };
}
