import { experiences as rawExperiences } from "@/data/experience";
import { calculateDuration, formatDuration } from "@/lib/experience-duration";
import { getCompanyRange } from "@/lib/company-range";

export function useExperience() {
  const sortedExperiences = rawExperiences.map((exp) => {
    const sortedRoles = [...exp.roles].sort((a, b) => b.start.localeCompare(a.start));
    const { start: companyStart, end: companyEnd } = getCompanyRange(exp.roles);
    const experienceInMonths = calculateDuration(companyStart, companyEnd);
    return {
      ...exp,
      roles: sortedRoles,
      companyStart,
      companyEnd,
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
