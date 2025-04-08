import { experiences as rawExperiences } from "@/data/experience";

function calculateDuration(start: string, end: string): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] =
    end === "present"
      ? [new Date().getFullYear(), new Date().getMonth() + 1]
      : end.split("-").map(Number);
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

function formatDuration(months: number): string {
  const y = Math.floor(months / 12);
  const m = months % 12;
  return `${y} year${y !== 1 ? "s" : ""} ${m} month${m !== 1 ? "s" : ""}`;
}

export function useExperience() {
  const sortedExperiences = rawExperiences.map((exp) => {
    const sortedRoles = [...exp.roles].sort((a, b) => b.start.localeCompare(a.start));
    const experienceInMonths = sortedRoles.reduce(
      (acc, role) => acc + calculateDuration(role.start, role.end),
      0
    );
    return {
      ...exp,
      roles: sortedRoles,
      experienceInMonths,
      experience: formatDuration(experienceInMonths),
      latestRoleStart: sortedRoles[0]?.start ?? "0000-00",
    };
  });

  sortedExperiences.sort((a, b) => b.latestRoleStart.localeCompare(a.latestRoleStart));

  const currentCompany = sortedExperiences.find((exp) => exp.isCurrentCompany);
  const previousCompanies = sortedExperiences.filter((exp) => !exp.isCurrentCompany);

  const totalMonths = sortedExperiences.reduce((acc, exp) => acc + exp.experienceInMonths, 0);
  const totalExperience = formatDuration(totalMonths);

  return { experiences: sortedExperiences, currentCompany, previousCompanies, totalExperience };
}
