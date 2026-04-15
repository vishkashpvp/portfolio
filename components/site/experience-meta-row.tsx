import Link from "next/link";

export function ExperienceMetaRow({
  companyUrl,
  companyName,
  location,
  tenureLabel,
  periodLabel,
}: {
  companyUrl: string;
  companyName: string;
  tenureLabel: string;
  periodLabel?: string;
  location?: string;
}) {
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-x-6">
      <div className="min-w-0">
        <Link
          href={companyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-700 hover:underline dark:text-blue-400">
          {companyName}
        </Link>
        {location ? (
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{location}</p>
        ) : null}
      </div>
      <div className="flex flex-col gap-0.5 sm:items-end sm:text-right">
        <span className="text-sm font-medium tabular-nums tracking-tight text-zinc-700 dark:text-zinc-300">
          {tenureLabel}
        </span>
        {periodLabel ? (
          <span className="text-xs tabular-nums text-zinc-500 dark:text-zinc-500">
            {periodLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
}
