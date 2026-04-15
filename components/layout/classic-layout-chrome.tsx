"use client";

import Link from "next/link";

import { ThemeToggle } from "@/components/layout/theme-toggle";

export function ClassicLayoutChrome() {
  return (
    <div className="fixed right-4 top-4 z-50 flex items-center gap-2">
      <ThemeToggle />
      <Link
        href="/"
        className="rounded-lg border border-zinc-300 bg-(--background)/95 px-3 py-2 text-sm text-zinc-800 backdrop-blur-md hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800">
        home
      </Link>
    </div>
  );
}
