import fs from "node:fs";
import path from "node:path";

import { Maximize2, Minus, Plus, Terminal, X } from "lucide-react";
import Link from "next/link";

import { formatVersionDate } from "@/lib/format-version-date";

type VersionKey = "terminal" | "cards" | "classic";

const VERSION_KEYS: VersionKey[] = ["terminal", "cards", "classic"];

function readVersionDates(): Record<VersionKey, string> {
  try {
    const file = path.join(process.cwd(), "data/version-dates.json");
    const data = JSON.parse(fs.readFileSync(file, "utf8")) as Partial<Record<VersionKey, string>>;
    const fallback = new Date().toISOString().slice(0, 10);
    return Object.fromEntries(VERSION_KEYS.map((k) => [k, data[k] ?? fallback])) as Record<
      VersionKey,
      string
    >;
  } catch {
    const fallback = new Date().toISOString().slice(0, 10);
    return { terminal: fallback, cards: fallback, classic: fallback };
  }
}

function TerminalPreview() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-zinc-500/35 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] ring-1 ring-zinc-500/15 dark:border-black/40 dark:bg-[#141414] dark:shadow-none dark:ring-white/10">
      <div className="relative flex h-[38px] shrink-0 items-center gap-3 border-b border-zinc-400/40 bg-[linear-gradient(180deg,#f6f6f6_0%,#e8e8e8_100%)] px-2.5 dark:border-black/50 dark:bg-[linear-gradient(180deg,#3d3d3d_0%,#2c2c2c_100%)]">
        <div className="group/traffic flex gap-1.5 pl-0.5">
          <span className="relative flex size-3 items-center justify-center rounded-full bg-[#ff5f57] shadow-inner ring-1 ring-black/15">
            <X
              className="size-2 text-[#520000] opacity-0 transition-opacity duration-150 group-hover/traffic:opacity-100"
              strokeWidth={3}
              aria-hidden
            />
          </span>
          <span className="relative flex size-3 items-center justify-center rounded-full bg-[#febc2e] shadow-inner ring-1 ring-black/15">
            <Minus
              className="size-2 text-[#5c4800] opacity-0 transition-opacity duration-150 group-hover/traffic:opacity-100"
              strokeWidth={3}
              aria-hidden
            />
          </span>
          <span className="relative flex size-3 items-center justify-center rounded-full bg-[#28c840] shadow-inner ring-1 ring-black/15">
            <Maximize2
              className="size-2 text-[#0b4309] opacity-0 transition-opacity duration-150 group-hover/traffic:opacity-100"
              strokeWidth={3}
              aria-hidden
            />
          </span>
        </div>
        <span className="pointer-events-none absolute left-1/2 max-w-[55%] -translate-x-1/2 truncate text-[9px] font-medium text-zinc-700 dark:text-zinc-300">
          zsh — vishkash
        </span>
      </div>
      <div className="flex h-9 shrink-0 items-center border-b border-zinc-400/50 bg-zinc-300 px-1 dark:border-zinc-700 dark:bg-[#2d2d2d]">
        <div className="flex min-h-9 min-w-0 flex-1 items-center overflow-hidden rounded-t-md bg-zinc-50 px-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] dark:bg-black dark:shadow-none">
          <Terminal
            className="mr-1 size-2.5 shrink-0 text-zinc-500 dark:text-zinc-500"
            strokeWidth={2}
            aria-hidden
          />
          <span className="truncate text-[8px] font-medium tabular-nums text-zinc-800 dark:text-zinc-200">
            zsh · 58291
          </span>
        </div>
        <div className="flex items-center px-1 shrink-0">
          <span className="flex justify-center items-center bg-transparent rounded-full border border-transparent transition-colors size-8 text-zinc-800 hover:border-zinc-400/35 hover:bg-zinc-400/25 dark:text-zinc-200 dark:hover:border-zinc-600/60 dark:hover:bg-zinc-600/35">
            <Plus
              className="size-[14px] stroke-2"
              aria-hidden
            />
          </span>
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-1.5 bg-zinc-50 px-2.5 py-2 font-mono text-[9px] leading-relaxed dark:bg-black">
        <div className="flex flex-wrap items-center gap-x-[1ch]">
          <span className="text-emerald-600 dark:text-[#7ccd7c]">vishkash@portfolio</span>
          <span className="text-slate-500 dark:text-zinc-400">~</span>
          <span className="text-zinc-900 dark:text-zinc-100">$</span>
          <span className="text-zinc-900 dark:text-zinc-100">whoami</span>
        </div>
        <div className="space-y-0.5 text-zinc-600 dark:text-zinc-500">
          <p>vishnuprakash p — full-stack developer.</p>
          <p>building calm, efficient web experiences. still human.</p>
        </div>
      </div>
    </div>
  );
}

function CardsPreview() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex justify-between items-center pb-2 border-b border-zinc-200/80 dark:border-zinc-800">
        <span className="w-14 h-2 rounded bg-zinc-300 dark:bg-zinc-600" />
        <span className="w-8 h-4 rounded-md bg-zinc-200 dark:bg-zinc-800" />
      </div>
      <div className="overflow-hidden relative p-2 bg-white rounded-xl border shadow-sm border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            background: "conic-gradient(from 0deg, #4285f4, #34a853, #fbbc05, #ea4335, #4285f4)",
          }}
        />
        <div className="relative space-y-1.5 rounded-[6px] bg-white/95 p-1.5 dark:bg-zinc-900/95">
          <div className="h-2 w-[90%] rounded bg-zinc-200 dark:bg-zinc-700" />
          <div className="h-2 w-[70%] rounded bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
      <div className="flex gap-1">
        <span className="flex-1 h-6 bg-white rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900" />
        <span className="flex-1 h-6 bg-white rounded-lg border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900" />
      </div>
    </div>
  );
}

function ClassicPreview() {
  return (
    <div className="flex gap-2 h-full">
      <div className="hidden w-8 rounded-md ring-1 shadow-sm shrink-0 bg-white/90 ring-zinc-200 dark:bg-zinc-900/90 dark:ring-zinc-800 sm:block" />
      <div className="flex-1 space-y-2 min-w-0">
        <div className="space-y-1">
          <div className="w-3/4 h-2 rounded bg-zinc-400/90 dark:bg-zinc-600" />
          <div className="w-full h-1 rounded bg-zinc-300/80 dark:bg-zinc-700" />
          <div className="h-1 w-[92%] rounded bg-zinc-300/60 dark:bg-zinc-700/90" />
        </div>
        <div className="w-full h-px bg-zinc-300/70 dark:bg-zinc-700" />
        <div className="space-y-1">
          <div className="h-1.5 w-24 rounded bg-sky-500/70 dark:bg-sky-600/80" />
          <div className="w-full h-1 rounded bg-zinc-300/70 dark:bg-zinc-700" />
          <div className="h-1 w-[88%] rounded bg-zinc-300/50 dark:bg-zinc-700/80" />
          <div className="h-1 w-[72%] rounded bg-zinc-300/50 dark:bg-zinc-700/80" />
        </div>
      </div>
    </div>
  );
}

export function VersionsHub() {
  const dates = readVersionDates();

  const cards = [
    {
      href: "/" as const,
      name: "terminal",
      updatedIso: dates.terminal,
      description: "command-line style ui — zsh prompts, work history, projects, links.",
      previewClass:
        "relative bg-zinc-100 p-2 text-left font-mono text-[9px] leading-tight text-zinc-700 dark:bg-[#0d0d0d] dark:text-zinc-400",
      preview: <TerminalPreview />,
    },
    {
      href: "/v2" as const,
      name: "cards",
      updatedIso: dates.cards,
      description: "card sections for hero, work, internships, and projects.",
      previewClass:
        "relative bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.14),transparent)] bg-zinc-50 dark:bg-zinc-950 p-3 text-left",
      preview: <CardsPreview />,
    },
    {
      href: "/v1" as const,
      name: "classic",
      updatedIso: dates.classic,
      description: "single-page flow: about, experience, and projects in order.",
      previewClass:
        "bg-gradient-to-b from-zinc-100 to-zinc-200/80 p-3 dark:from-zinc-950 dark:to-zinc-900",
      preview: <ClassicPreview />,
    },
  ];

  return (
    <div className="px-5 py-14 mx-auto max-w-5xl">
      <header className="mb-10 space-y-3">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link
            href="/"
            className="underline decoration-zinc-300 underline-offset-4 hover:text-zinc-800 dark:decoration-zinc-600 dark:hover:text-zinc-200">
            ← home
          </Link>
        </p>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            portfolio versions
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            same content, three ways to explore it.
          </p>
        </div>
      </header>

      <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((v) => (
          <li key={v.href}>
            <Link
              href={v.href}
              className="flex overflow-hidden flex-col h-full bg-white rounded-2xl border ring-1 transition group/card group border-zinc-200 shadow-xs ring-zinc-200/80 hover:border-zinc-300 hover:ring-zinc-300/80 dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-zinc-800 dark:hover:border-zinc-700">
              <div
                className={`aspect-5/4 w-full overflow-hidden sm:aspect-16/11 ${v.previewClass}`}>
                <div
                  className={`h-full max-h-[220px] min-h-[168px] ${v.href === "/" ? "" : "pointer-events-none"}`}>
                  {v.preview}
                </div>
              </div>
              <div className="flex flex-col flex-1 p-5">
                <h2 className="font-semibold text-zinc-950 dark:text-zinc-50">{v.name}</h2>
                <p className="flex-1 mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {v.description}
                </p>
                <p className="mt-4 text-xs tabular-nums text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">updated</span>
                  <span className="text-zinc-400 dark:text-zinc-600"> · </span>
                  <time dateTime={v.updatedIso}>
                    {formatVersionDate(v.updatedIso).toLowerCase()}
                  </time>
                </p>
                <span className="mt-4 text-sm font-medium text-sky-700 underline-offset-4 group-hover/card:underline dark:text-sky-400">
                  open →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
