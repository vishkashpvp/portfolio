"use client";

import { TechStackTags } from "@/components/site/tech-stack-badges";

export function HeroIntroCard({ totalExperience }: { totalExperience: string }) {
  return (
    <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl p-px shadow-md shadow-zinc-200/50 dark:shadow-none">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[400%] -translate-x-1/2 -translate-y-1/2 animate-[spin_6s_linear_infinite] opacity-40 motion-reduce:animate-none"
        style={{
          background: "conic-gradient(from 0deg, #4285f4, #34a853, #fbbc05, #ea4335, #4285f4)",
        }}
      />
      <div className="relative z-10 rounded-[15px] bg-white dark:bg-zinc-950">
        <div className="relative overflow-hidden rounded-[15px] px-5 py-6 sm:px-7 sm:py-8">
          <div
            className="intro-hero-motion animate-hero-shimmer pointer-events-none absolute inset-0 rounded-[inherit] motion-reduce:animate-none"
            aria-hidden
          />
          <div
            className="intro-hero-texture pointer-events-none absolute inset-0 rounded-[inherit] text-zinc-900 dark:text-zinc-100"
            aria-hidden
          />
          <div className="relative z-10 space-y-6">
            <div className="space-y-4">
              <h1 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-zinc-950 dark:text-white sm:text-3xl">
                full-stack developer building calm, efficient web experiences.
                <span className="block mt-1 text-zinc-600 dark:text-zinc-400">still human.</span>
              </h1>
              <p className="max-w-2xl text-sm leading-snug text-zinc-600 dark:text-zinc-300 sm:text-base sm:leading-normal">
                <span className="block sm:inline">
                  i&apos;m vishkash <span className="text-zinc-500 dark:text-zinc-500">a.k.a.</span>{" "}
                  vishnuprakash.
                </span>{" "}
                <span className="block sm:inline">
                  with {totalExperience} of hands-on experience
                </span>
              </p>
              <TechStackTags />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
