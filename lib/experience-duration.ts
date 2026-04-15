export function calculateDuration(start: string, end: string): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] =
    end === "present"
      ? [new Date().getFullYear(), new Date().getMonth() + 1]
      : end.split("-").map(Number);
  return (endYear - startYear) * 12 + (endMonth - startMonth);
}

export function formatDuration(months: number): string {
  if (months <= 0) return "less than a month";
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y && m) return `${y} year${y > 1 ? "s" : ""} ${m} month${m > 1 ? "s" : ""}`;
  if (y) return `${y} year${y > 1 ? "s" : ""}`;
  return `${m} month${m > 1 ? "s" : ""}`;
}
