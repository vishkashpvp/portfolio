const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const;

export function formatMonthYear(ym: string): string {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export function formatMonthRange(start: string, end: string): string {
  const a = formatMonthYear(start);
  const b = end === "present" ? "present" : formatMonthYear(end);
  return `${a} — ${b}`;
}
