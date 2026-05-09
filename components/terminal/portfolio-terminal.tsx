"use client";

import { Maximize2, Minus, Plus, Terminal, X } from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { internshipDuration, internships } from "@/data/internships";
import { projects } from "@/data/projects";
import { SOCIAL_LINKS } from "@/data/socials";
import { useExperience } from "@/hooks/use-experience";
import { formatMonthRange } from "@/lib/format-month-range";
import { HERO_TECH_ORDER, techCatalog } from "@/lib/tech-stack";

type TermLine =
  | { id: string; kind: "out"; text: string }
  | { id: string; kind: "err"; text: string }
  | { id: string; kind: "cmd"; command: string };

const FIRST_TAB_ID = "tab-1";

const PROMPT_HOST_CLASS = "text-emerald-600 dark:text-[#7ccd7c]";
const PROMPT_PATH_CLASS = "text-slate-500 dark:text-zinc-400";

/** One line-height + vertical alignment for live prompt vs cmd history */
const PROMPT_ROW_CLASS =
  "flex min-w-0 flex-wrap items-center gap-x-[1ch] font-mono text-[13px] leading-relaxed";

function formatDualTimezoneOutput(): string {
  const d = new Date();
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };
  const ist = new Intl.DateTimeFormat("en-IN", { ...opts, timeZone: "Asia/Kolkata" }).format(d);
  const pacific = new Intl.DateTimeFormat("en-US", {
    ...opts,
    timeZone: "America/Los_Angeles",
  }).format(d);
  const lines = [`india (ist):            ${ist}`, `california (pacific):   ${pacific}`];
  return lines.map((row) => row.toLowerCase()).join("\n");
}

type Session = {
  id: string;
  shellTag: string;
  lines: TermLine[];
  cmdHistory: string[];
};

function tabLabel(shellTag: string): string {
  return shellTag.length > 0 ? `zsh · ${shellTag}` : "zsh";
}

function buildShellTag(used: ReadonlySet<string>): string {
  for (let k = 0; k < 80; k++) {
    const buf = new Uint32Array(1);
    crypto.getRandomValues(buf);
    const n = 10000 + (buf[0] % 90000);
    const tag = String(n);
    if (!used.has(tag)) return tag;
  }
  return String(10000 + (Date.now() % 90000));
}

let nextTtySerial = 0;

function nextTtyName(): string {
  nextTtySerial += 1;
  if (nextTtySerial > 999) nextTtySerial = 1;
  return `ttys${nextTtySerial.toString().padStart(3, "0")}`;
}

const LAST_LOGIN_PLACEHOLDER = "last login: … on ttys---";

function nowLoginLine(): string {
  const d = new Date();
  const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const months = [
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
  ];
  const day = days[d.getDay()];
  const mon = months[d.getMonth()];
  const pad = (n: number) => n.toString().padStart(2, "0");
  const h = pad(d.getHours());
  const m = pad(d.getMinutes());
  const s = pad(d.getSeconds());
  return `last login: ${day} ${mon} ${d.getDate()} ${h}:${m}:${s} on ${nextTtyName()}`;
}

function initialLinesHydrationSafe(): TermLine[] {
  return [
    { id: "boot-1", kind: "out", text: LAST_LOGIN_PLACEHOLDER },
    {
      id: "boot-2",
      kind: "out",
      text: "\ntype `help` for available commands. links in command output are clickable.\n",
    },
  ];
}

function initialLinesLive(): TermLine[] {
  return [
    { id: "boot-1", kind: "out", text: nowLoginLine() },
    {
      id: "boot-2",
      kind: "out",
      text: "\ntype `help` for available commands. links in command output are clickable.\n",
    },
  ];
}

function listedProjects() {
  return projects.filter((p) => !p.versions || p.versions.includes("v2"));
}

function runCommand(raw: string, ctx: { cmdHistory: string[] }): TermLine[] {
  const input = raw.trim();
  if (!input) return [];

  const [cmd0, ...rest] = input.split(/\s+/);
  const cmd = cmd0.toLowerCase();

  const notFound = (c: string): TermLine[] => [
    { id: crypto.randomUUID(), kind: "err", text: `zsh: command not found: ${c}`.toLowerCase() },
  ];

  switch (cmd) {
    case "help":
    case "?":
      return [
        {
          id: crypto.randomUUID(),
          kind: "out",
          text: [
            "available commands:",
            "  help          show this list",
            "  clear         clear the screen",
            "  history       command history for this tab",
            "  whoami        short introduction",
            "  about         same as whoami",
            "  work          employment history",
            "  internships   past internships",
            "  projects      projects (with links where applicable)",
            "  socials       profile urls",
            "  stack         technologies",
            "  date          ist and pacific (california) time",
            "  versions      choose another layout",
          ].join("\n"),
        },
      ];

    case "history": {
      const h = ctx.cmdHistory;
      if (h.length === 0) {
        return [{ id: crypto.randomUUID(), kind: "out", text: "(no commands yet)" }];
      }
      const lines = h.map((c, i) => `${String(i + 1).padStart(4)}  ${c}`.toLowerCase());
      return [{ id: crypto.randomUUID(), kind: "out", text: lines.join("\n") }];
    }

    case "versions":
      if (typeof window !== "undefined") window.location.assign("/versions");
      return [];

    case "clear":
      return [{ id: crypto.randomUUID(), kind: "out", text: "__CLEAR__" }];

    case "whoami":
    case "about":
      return [
        {
          id: crypto.randomUUID(),
          kind: "out",
          text: [
            "vishnuprakash p — full-stack developer.",
            "building calm, efficient web experiences. still human.",
          ].join("\n"),
        },
      ];

    case "internships":
      if (internships.length === 0) {
        return [{ id: crypto.randomUUID(), kind: "out", text: "(none)" }];
      }
      return [
        {
          id: crypto.randomUUID(),
          kind: "out",
          text: internships
            .map((r) => {
              const period = formatMonthRange(r.start, r.end);
              const dur = internshipDuration(r);
              return [
                `${r.role} @ ${r.company}`,
                `  ${r.highlight}`,
                `  ${r.location} · ${period} · ${dur}`,
                `  ${r.url}`,
              ].join("\n");
            })
            .join("\n\n")
            .toLowerCase(),
        },
      ];

    case "projects": {
      const list = listedProjects();
      return [
        {
          id: crypto.randomUUID(),
          kind: "out",
          text: list
            .map((p) => {
              const stack =
                p.stackTags
                  ?.map((id) => techCatalog[id]?.label)
                  .filter(Boolean)
                  .join(", ") ?? "";
              const linkLine = p.link ? `\n  ${p.link}` : "";
              return [
                `${p.name}`,
                `  ${p.description}${stack ? `\n  stack: ${stack}` : ""}${linkLine}`,
              ].join("\n");
            })
            .join("\n\n")
            .toLowerCase(),
        },
      ];
    }

    case "socials":
    case "links":
      return [
        {
          id: crypto.randomUUID(),
          kind: "out",
          text: SOCIAL_LINKS.map((s) => `${s.name.padEnd(10)} ${s.url}`)
            .join("\n")
            .toLowerCase(),
        },
      ];

    case "stack":
    case "tech":
      return [
        {
          id: crypto.randomUUID(),
          kind: "out",
          text: HERO_TECH_ORDER.map((id) => techCatalog[id].label)
            .join(" · ")
            .toLowerCase(),
        },
      ];

    case "date":
      return [{ id: crypto.randomUUID(), kind: "out", text: formatDualTimezoneOutput() }];

    case "exit":
      return [
        {
          id: crypto.randomUUID(),
          kind: "out",
          text: "this session runs in the browser — close the tab or window to leave.",
        },
      ];

    case "open": {
      const target = rest.join(" ").toLowerCase();
      const map: Record<string, string> = {
        github: SOCIAL_LINKS.find((s) => s.name === "github")?.url ?? "",
        linkedin: SOCIAL_LINKS.find((s) => s.name === "linkedin")?.url ?? "",
        peerlist: SOCIAL_LINKS.find((s) => s.name === "peerlist")?.url ?? "",
      };
      const url = map[target];
      if (!url) {
        return [
          {
            id: crypto.randomUUID(),
            kind: "err",
            text: `open: unknown target '${target || "?"}'`.toLowerCase(),
          },
        ];
      }
      if (typeof window !== "undefined") window.open(url, "_blank", "noopener,noreferrer");
      return [{ id: crypto.randomUUID(), kind: "out", text: `opening ${url} …`.toLowerCase() }];
    }

    default:
      return notFound(cmd0);
  }
}

function buildWorkLines(experienceData: ReturnType<typeof useExperience>): TermLine[] {
  const { experiences, totalExperience } = experienceData;
  if (experiences.length === 0) {
    return [{ id: crypto.randomUUID(), kind: "out", text: "(none)" }];
  }
  const blocks = experiences.map((exp) => {
    const period = formatMonthRange(exp.companyStart, exp.companyEnd);
    const roles = exp.roles
      .map((r) => `    • ${r.title} (${formatMonthRange(r.start, r.end)})`)
      .join("\n");
    return [
      `${exp.name} — ${exp.location}`,
      `  ${exp.url}`,
      `  ${period} · tenure ${exp.experience}`,
      `  ${exp.highlight}`,
      roles,
    ].join("\n");
  });
  return [
    {
      id: crypto.randomUUID(),
      kind: "out",
      text: [`total hands-on: ${totalExperience}`, "", ...blocks].join("\n").toLowerCase(),
    },
  ];
}

const URL_RE = /(https?:\/\/[^\s<>"{}|\\^`[\]]+)/gi;

function RichLine({ text, className }: { text: string; className?: string }) {
  const parts: import("react").ReactNode[] = [];
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  const re = new RegExp(URL_RE.source, URL_RE.flags);
  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(<span key={`t-${key++}`}>{text.slice(last, match.index)}</span>);
    }
    const href = match[0];
    parts.push(
      <a
        key={`a-${key++}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-sky-700 underline decoration-sky-600/50 underline-offset-2 hover:text-sky-800 dark:text-sky-400 dark:decoration-sky-400/50 dark:hover:text-sky-300">
        {href}
      </a>
    );
    last = match.index + href.length;
  }
  if (last < text.length) {
    parts.push(<span key={`t-${key++}`}>{text.slice(last)}</span>);
  }
  return <span className={className}>{parts.length > 0 ? parts : text}</span>;
}

function subscribeHydration(onStoreChange: () => void) {
  queueMicrotask(onStoreChange);
  return () => {};
}

function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false
  );
}

export function PortfolioTerminal() {
  const experienceData = useExperience();
  const inputId = useId();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState("");

  const [sessions, setSessions] = useState<Session[]>([
    {
      id: FIRST_TAB_ID,
      shellTag: "",
      lines: initialLinesHydrationSafe(),
      cmdHistory: [],
    },
  ]);
  const [activeTabId, setActiveTabId] = useState(FIRST_TAB_ID);
  const [historyBrowseIndex, setHistoryBrowseIndex] = useState<number | null>(null);

  const activeSession = sessions.find((s) => s.id === activeTabId) ?? sessions[0];

  const hydrated = useHydrated();
  const resolvedBootLogin = useMemo(() => {
    if (!hydrated) return null;
    return nowLoginLine();
  }, [hydrated]);

  const lines = useMemo(() => {
    const base = activeSession?.lines ?? initialLinesHydrationSafe();
    if (!resolvedBootLogin) return base;
    return base.map((l) =>
      l.id === "boot-1" && l.kind === "out" && l.text === LAST_LOGIN_PLACEHOLDER
        ? { ...l, text: resolvedBootLogin }
        : l
    );
  }, [activeSession.lines, resolvedBootLogin]);

  const selectTab = useCallback((id: string) => {
    setActiveTabId(id);
    setHistoryBrowseIndex(null);
    setValue("");
  }, []);

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, [activeTabId]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [lines, activeTabId]);

  useEffect(() => {
    if (!hydrated) return;
    queueMicrotask(() => {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== FIRST_TAB_ID || s.shellTag !== "") return s;
          const used = new Set(prev.map((p) => p.shellTag).filter((tag) => tag.length > 0));
          return { ...s, shellTag: buildShellTag(used) };
        })
      );
    });
  }, [hydrated]);

  const exec = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const cmdLine: TermLine = { id: crypto.randomUUID(), kind: "cmd", command: trimmed };
      const lower = trimmed.split(/\s+/)[0]?.toLowerCase();

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id !== activeTabId) return s;
          const priorHistory = s.cmdHistory;
          let out: TermLine[] = [];
          if (trimmed) {
            if (lower === "work" || lower === "experience") {
              out = buildWorkLines(experienceData);
            } else {
              out = runCommand(trimmed, { cmdHistory: priorHistory });
            }
          }
          const cmdHistory = trimmed.length > 0 ? [...priorHistory, trimmed] : priorHistory;
          const next = [...s.lines, cmdLine];
          for (const line of out) {
            if (line.kind === "out" && line.text === "__CLEAR__") {
              return { ...s, lines: initialLinesLive(), cmdHistory };
            }
            next.push(line);
          }
          return { ...s, lines: next, cmdHistory };
        })
      );
    },
    [experienceData, activeTabId]
  );

  const addTab = () => {
    const id = crypto.randomUUID();
    setSessions((prev) => {
      const used = new Set(prev.map((p) => p.shellTag));
      const shellTag = buildShellTag(used);
      return [...prev, { id, shellTag, lines: initialLinesLive(), cmdHistory: [] }];
    });
    selectTab(id);
  };

  const closeTab = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sessions.length <= 1) return;
    const idx = sessions.findIndex((s) => s.id === id);
    const nextSessions = sessions.filter((s) => s.id !== id);
    setSessions(nextSessions);
    if (activeTabId === id) {
      const neighbor = nextSessions[Math.max(0, idx - 1)] ?? nextSessions[0];
      if (neighbor) selectTab(neighbor.id);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    exec(value);
    setValue("");
    setHistoryBrowseIndex(null);
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const h = activeSession.cmdHistory;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (h.length === 0) return;
      const nextIdx =
        historyBrowseIndex === null ? h.length - 1 : Math.max(0, historyBrowseIndex - 1);
      setHistoryBrowseIndex(nextIdx);
      setValue(h[nextIdx] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyBrowseIndex === null) return;
      const nextIdx = historyBrowseIndex + 1;
      if (nextIdx >= h.length) {
        setHistoryBrowseIndex(null);
        setValue("");
      } else {
        setHistoryBrowseIndex(nextIdx);
        setValue(h[nextIdx]);
      }
    }
  };

  return (
    <div className="flex overflow-hidden relative flex-col from-white h-dvh max-h-dvh bg-linear-to-br via-zinc-50 to-zinc-100 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">
      <div className="flex relative z-10 flex-col flex-1 px-4 pt-4 pb-8 min-h-0 sm:px-6 sm:pb-10">
        <div className="flex gap-3 justify-between items-center mb-3 text-sm shrink-0">
          <Link
            href="/versions"
            className="inline-flex items-center gap-1.5 rounded-md border border-zinc-300/90 bg-white/90 px-3 py-1.5 font-medium text-zinc-900 shadow-sm backdrop-blur-sm transition hover:bg-zinc-50 dark:border-zinc-500/30 dark:bg-black/25 dark:text-zinc-100 dark:shadow-none dark:hover:bg-black/35">
            <Terminal
              className="size-3.5 shrink-0 stroke-2"
              aria-hidden
            />
            versions
          </Link>
          <div className="flex gap-1 items-center sm:gap-2">
            <span className="hidden font-medium text-zinc-800 dark:text-zinc-200 sm:inline">
              portfolio · terminal
            </span>
            <ThemeToggle />
          </div>
        </div>

        <div
          className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[10px] border border-zinc-500/35 shadow-[0_24px_80px_rgba(0,0,0,0.2)] ring-1 ring-zinc-500/15 dark:border-black/40 dark:shadow-[0_24px_80px_rgba(0,0,0,0.55)] dark:ring-white/10"
          role="region"
          aria-label="terminal window">
          <div className="relative flex h-[52px] shrink-0 items-center gap-3 border-b border-zinc-400/40 bg-[linear-gradient(180deg,#f6f6f6_0%,#e8e8e8_100%)] px-3 dark:border-black/50 dark:bg-[linear-gradient(180deg,#3d3d3d_0%,#2c2c2c_100%)]">
            <div className="group/traffic flex gap-1.5 pl-1">
              <button
                type="button"
                aria-label="close"
                className="flex size-3 shrink-0 items-center justify-center rounded-full bg-[#ff5f57] shadow-inner ring-1 ring-black/15">
                <X
                  className="size-2 text-[#520000] opacity-0 transition-opacity duration-150 group-hover/traffic:opacity-100"
                  strokeWidth={3}
                  aria-hidden
                />
              </button>
              <button
                type="button"
                aria-label="minimize"
                className="flex size-3 shrink-0 items-center justify-center rounded-full bg-[#febc2e] shadow-inner ring-1 ring-black/15">
                <Minus
                  className="size-2 text-[#5c4800] opacity-0 transition-opacity duration-150 group-hover/traffic:opacity-100"
                  strokeWidth={3}
                  aria-hidden
                />
              </button>
              <button
                type="button"
                aria-label="zoom"
                className="flex size-3 shrink-0 items-center justify-center rounded-full bg-[#28c840] shadow-inner ring-1 ring-black/15">
                <Maximize2
                  className="size-2 text-[#0b4309] opacity-0 transition-opacity duration-150 group-hover/traffic:opacity-100"
                  strokeWidth={3}
                  aria-hidden
                />
              </button>
            </div>
            <div className="flex absolute left-1/2 gap-2 items-center -translate-x-1/2 pointer-events-none">
              <span className="select-none text-[13px] font-medium text-zinc-700 dark:text-zinc-300">
                zsh — vishkash
              </span>
            </div>
          </div>

          <div className="flex h-9 w-full min-w-0 shrink-0 items-stretch border-b border-zinc-400/50 bg-zinc-300 dark:border-zinc-700 dark:bg-[#2d2d2d]">
            {sessions.map((tab) => (
              <div
                key={tab.id}
                className={`group/tab relative flex min-w-0 flex-1 basis-0 overflow-hidden rounded-t-md border-r border-zinc-400/35 dark:border-zinc-600/50 ${
                  tab.id === activeTabId
                    ? "bg-zinc-50 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55)] dark:bg-black dark:shadow-none"
                    : "bg-zinc-400/30 hover:bg-zinc-400/50 dark:bg-transparent dark:hover:bg-zinc-700/40"
                }`}>
                {sessions.length > 1 ? (
                  <button
                    type="button"
                    aria-label="close tab"
                    onClick={(e) => closeTab(tab.id, e)}
                    className="pointer-events-none absolute left-1 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-zinc-500 opacity-0 transition-[opacity,background-color,color] duration-150 hover:bg-black/2 hover:text-zinc-900 group-hover/tab:pointer-events-auto group-hover/tab:opacity-100 dark:text-zinc-500 dark:hover:bg-white/3 dark:hover:text-zinc-100">
                    <X
                      className="stroke-2 size-4 shrink-0"
                      aria-hidden
                    />
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => selectTab(tab.id)}
                  className={`flex min-h-9 min-w-0 flex-1 items-center justify-center truncate px-2 text-center text-[12px] font-medium tabular-nums text-zinc-800 dark:text-zinc-200 ${
                    sessions.length > 1 ? "pl-9" : ""
                  }`}>
                  {tabLabel(tab.shellTag)}
                </button>
              </div>
            ))}
            <div className="flex items-center px-1 shrink-0">
              <button
                type="button"
                onClick={addTab}
                aria-label="new tab"
                className="flex justify-center items-center bg-transparent rounded-full border border-transparent transition-colors size-8 shrink-0 text-zinc-800 hover:border-zinc-400/35 hover:bg-zinc-400/25 dark:text-zinc-200 dark:hover:border-zinc-600/60 dark:hover:bg-zinc-600/35"
                title="new tab">
                <Plus
                  className="size-[18px] shrink-0 stroke-2"
                  aria-hidden
                />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col bg-zinc-50 font-mono text-[13px] leading-relaxed text-zinc-900 dark:bg-black dark:text-zinc-100">
            <div
              ref={scrollRef}
              role="log"
              onClick={() => inputRef.current?.focus()}
              className="flex min-h-0 flex-1 flex-col gap-2 cursor-text overflow-y-auto overscroll-contain px-4 py-3 pb-4 sm:px-5 [scrollbar-color:rgba(63,63,70,0.35)_transparent] dark:[scrollbar-color:rgba(255,255,255,0.2)_transparent]"
              aria-live="polite">
              {lines.map((line) => (
                <TermLineView
                  key={line.id}
                  line={line}
                />
              ))}
              <form
                onSubmit={onSubmit}
                className={PROMPT_ROW_CLASS}>
                <label
                  htmlFor={inputId}
                  className="sr-only">
                  command line
                </label>
                <span
                  className={`${PROMPT_HOST_CLASS} shrink-0`}
                  aria-hidden>
                  vishkash@portfolio
                </span>
                <span
                  className={`${PROMPT_PATH_CLASS} shrink-0`}
                  aria-hidden>
                  ~
                </span>
                <span
                  className="shrink-0 text-zinc-900 dark:text-zinc-100"
                  aria-hidden>
                  $
                </span>
                <input
                  ref={inputRef}
                  id={inputId}
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  autoComplete="off"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={onInputKeyDown}
                  className="min-w-0 flex-1 border-0 bg-transparent p-0 font-mono text-[13px] leading-relaxed text-zinc-900 caret-zinc-900 outline-none placeholder:text-zinc-500 dark:text-zinc-100 dark:caret-zinc-100 dark:placeholder:text-zinc-600"
                  placeholder=""
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TermLineView({ line }: { line: TermLine }) {
  if (line.kind === "cmd") {
    return (
      <div className={`whitespace-pre-wrap ${PROMPT_ROW_CLASS} wrap-break-word`}>
        <span className={PROMPT_HOST_CLASS}>vishkash@portfolio</span>
        <span className={PROMPT_PATH_CLASS}>~</span>
        <span className="text-zinc-900 dark:text-zinc-100">$</span>
        {line.command ? (
          <span className="min-w-0 text-zinc-900 dark:text-zinc-100">{line.command}</span>
        ) : null}
      </div>
    );
  }

  const cls =
    line.kind === "err"
      ? "whitespace-pre-wrap wrap-break-word leading-relaxed text-red-700 dark:text-red-400"
      : "whitespace-pre-wrap wrap-break-word leading-relaxed text-zinc-900 dark:text-zinc-100";

  return (
    <div className={cls}>
      {line.text.split("\n").map((row, i) => (
        <div key={i}>
          <RichLine text={row || "\u00a0"} />
        </div>
      ))}
    </div>
  );
}
