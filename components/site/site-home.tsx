"use client";

import Link from "next/link";

import { BrandIcon } from "@/components/icons/brand-icon";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { ExperienceMetaRow } from "@/components/site/experience-meta-row";
import { HeroIntroCard } from "@/components/site/intro-hero-card";
import { ExperienceStackTags } from "@/components/site/tech-stack-badges";
import { internshipDuration, internships } from "@/data/internships";
import { projects } from "@/data/projects";
import { SOCIAL_LINKS } from "@/data/socials";
import { useExperience } from "@/hooks/use-experience";
import { formatMonthRange } from "@/lib/format-month-range";

function SectionHeading({ step, title }: { step: string; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-3 text-zinc-950 dark:text-zinc-50">
      <span className="font-mono text-xs font-medium text-zinc-400 tabular-nums dark:text-zinc-500">
        {step}
      </span>
      <div className="h-px flex-1 bg-linear-to-r from-zinc-300 to-transparent dark:from-zinc-600" />
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs ring-1 ring-zinc-200/80 dark:border-zinc-800 dark:bg-zinc-950/40 dark:ring-zinc-800 ${className || ""}`}>
      {children}
    </div>
  );
}

export function SiteHome() {
  const { totalExperience, currentCompany, previousCompanies } = useExperience();
  const latestRole = currentCompany?.roles[0];

  return (
    <div className="relative min-h-screen overflow-hidden bg-(--background) font-montserrat text-zinc-950 dark:text-zinc-50">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-radial-[ellipse_80%_50%_at_50%_-20%] from-sky-400/12 to-transparent dark:from-sky-400/8 dark:to-transparent"
        aria-hidden
      />
      <header className="sticky top-0 z-10 border-b border-zinc-200/90 bg-(--background)/90 backdrop-blur-md dark:border-zinc-800">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            vishkash
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-12 px-5 py-10 sm:space-y-16 sm:py-14">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 animate-reveal">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50/50 px-3 py-1.5 text-sm font-medium text-zinc-800 transition-all hover:bg-zinc-100 dark:border-zinc-700/50 dark:bg-zinc-900/50 dark:text-zinc-200 dark:hover:bg-zinc-800"
                aria-label={link.name}>
                <BrandIcon
                  icon={link.icon}
                  useCurrentColor={link.useCurrentColor}
                  className="size-4 transition-transform group-hover:scale-110"
                />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
          <div className="animate-reveal [animation-delay:100ms]">
            <HeroIntroCard totalExperience={totalExperience} />
          </div>
        </div>

        {currentCompany && latestRole && (
          <section className="animate-reveal [animation-delay:200ms]">
            <SectionHeading
              step="01"
              title="work"
            />
            <SectionCard>
              <p className="text-lg font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
                {latestRole.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {currentCompany.highlight}
              </p>
              <ExperienceStackTags ids={currentCompany.stackTags} />
              <ExperienceMetaRow
                companyUrl={currentCompany.url}
                companyName={currentCompany.name}
                location={currentCompany.location}
                tenureLabel={currentCompany.experience}
                periodLabel={formatMonthRange(
                  currentCompany.companyStart,
                  currentCompany.companyEnd
                )}
              />
              {previousCompanies.length > 0 && (
                <ul className="mt-6 space-y-4 border-t border-zinc-200 pt-6 dark:border-zinc-700">
                  {previousCompanies.map((c) => (
                    <li key={c.name}>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300">{c.highlight}</p>
                      <ExperienceStackTags ids={c.stackTags} />
                      <ExperienceMetaRow
                        companyUrl={c.url}
                        companyName={c.name}
                        location={c.location}
                        tenureLabel={c.experience}
                        periodLabel={formatMonthRange(c.companyStart, c.companyEnd)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </SectionCard>
          </section>
        )}

        {internships.length > 0 && (
          <section className="animate-reveal [animation-delay:300ms]">
            <SectionHeading
              step="02"
              title="internship"
            />
            <SectionCard className="space-y-6">
              {internships.map((record) => (
                <div key={record.company}>
                  <p className="text-lg font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
                    {record.role}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {record.highlight}
                  </p>
                  <ExperienceStackTags ids={record.stackTags} />
                  <ExperienceMetaRow
                    companyUrl={record.url}
                    companyName={record.company}
                    location={record.location}
                    tenureLabel={internshipDuration(record)}
                    periodLabel={formatMonthRange(record.start, record.end)}
                  />
                </div>
              ))}
            </SectionCard>
          </section>
        )}

        <section className="animate-reveal [animation-delay:400ms]">
          <SectionHeading
            step="03"
            title="projects"
          />
          <ul className="space-y-4">
            {projects
              .filter((p) => !p.versions || p.versions.includes("v2"))
              .map((project) => (
                <li
                  key={project.name}
                  className="group relative rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950/30 dark:hover:bg-zinc-900/50">
                  <h3 className="font-semibold text-zinc-950 dark:text-zinc-50">
                    {project.link ? (
                      <Link
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline decoration-blue-600/50 underline-offset-4 transition hover:text-blue-800 hover:decoration-blue-800 dark:text-blue-400 dark:decoration-blue-400/60 dark:hover:text-blue-300 dark:hover:decoration-blue-300 before:absolute before:inset-0 before:z-10">
                        {project.name}
                        <span
                          className="ml-1 inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden>
                          ↗
                        </span>
                      </Link>
                    ) : (
                      project.name
                    )}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
                    {project.description}
                  </p>
                  {project.stackTags && project.stackTags.length > 0 ? (
                    <div>
                      <ExperienceStackTags ids={project.stackTags} />
                    </div>
                  ) : null}
                </li>
              ))}
          </ul>
        </section>

        <footer className="mt-12 border-t border-zinc-200/90 pt-8 sm:mt-20 sm:pt-10 dark:border-zinc-800 animate-reveal [animation-delay:500ms]">
          <div className="mx-auto flex max-w-md justify-center pb-8">
            <Link
              href="/v1"
              className="text-sm font-medium text-zinc-500 underline decoration-zinc-300 underline-offset-4 transition hover:text-zinc-800 dark:text-zinc-400 dark:decoration-zinc-700 dark:hover:text-zinc-200">
              view v1
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
