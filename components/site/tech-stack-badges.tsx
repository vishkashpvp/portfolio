"use client";

import type { ReactNode } from "react";

import { BrandIcon } from "@/components/icons/brand-icon";
import { Badge } from "@/components/ui/badge";
import { HERO_TECH_ORDER, techCatalog, type TechId } from "@/lib/tech-stack";
import { cn } from "@/lib/utils";

/** Light tile so native brand hex stays vivid and dark/light logos stay legible in both themes. */
function TechBadgeIconWrap({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-md bg-white p-1 inset-shadow-2xs ring-1 ring-zinc-200/90 dark:bg-zinc-100 dark:inset-shadow-xs dark:ring-zinc-500/40">
      {children}
    </span>
  );
}

const techPillClass =
  "gap-1.5 border-zinc-200/90 bg-zinc-100/90 text-zinc-800 backdrop-blur-xs dark:border-zinc-600/70 dark:bg-zinc-900/80 dark:text-zinc-200";

export function TechStackTags() {
  return (
    <div className="flex flex-wrap gap-2">
      {HERO_TECH_ORDER.map((id) => {
        const entry = techCatalog[id];
        return (
          <Badge
            key={id}
            variant="hero"
            size="md"
            className={cn(techPillClass)}>
            <TechBadgeIconWrap>
              <BrandIcon
                icon={entry.icon}
                className="h-3.5 w-3.5"
              />
            </TechBadgeIconWrap>
            {entry.label}
          </Badge>
        );
      })}
    </div>
  );
}

export function ExperienceStackTags({ ids }: { ids: readonly TechId[] }) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {ids.map((id) => {
        const entry = techCatalog[id];
        if (!entry) return null;
        return (
          <Badge
            key={id}
            variant="default"
            size="sm"
            className={cn(techPillClass)}>
            <TechBadgeIconWrap>
              <BrandIcon
                icon={entry.icon}
                className="h-3 w-3"
              />
            </TechBadgeIconWrap>
            {entry.label}
          </Badge>
        );
      })}
    </div>
  );
}
