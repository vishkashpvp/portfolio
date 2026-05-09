export function formatVersionDate(iso: string, locale?: string): string {
  return new Date(`${iso}T12:00:00.000Z`).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
