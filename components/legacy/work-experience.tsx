"use client";

import Link from "next/link";

import { useExperience } from "@/hooks/use-experience";

export function WorkExperience() {
  const { currentCompany, previousCompanies, totalExperience } = useExperience();

  if (!currentCompany) return null;

  const latestRole = currentCompany.roles[0];

  return (
    <section className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="order-2 flex w-full items-center justify-center p-8 md:order-1 md:w-1/2">
        <div className="max-w-md space-y-8 text-zinc-900 dark:text-zinc-100">
          <h2 className="text-3xl font-bold">work experience</h2>

          <div className="space-y-3">
            <p className="text-xl font-semibold">{latestRole.title}</p>
            <div className="flex items-center justify-between gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <Link
                href={currentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:underline dark:text-blue-400">
                {currentCompany.name}
              </Link>
              <span>{currentCompany.experience}</span>
            </div>
          </div>

          {previousCompanies.length > 0 && (
            <div className="mt-6 border-t border-zinc-300 pt-6 dark:border-zinc-700">
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-zinc-600 dark:text-zinc-400">
                previously at
              </h4>
              <ul className="space-y-2 text-sm">
                {previousCompanies.map((company) => (
                  <li
                    key={company.name}
                    className="flex items-center justify-between">
                    <Link
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-blue-600 hover:underline dark:text-blue-400">
                      {company.name}
                    </Link>
                    <span className="text-zinc-600 dark:text-zinc-400">{company.experience}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-6 flex justify-between border-t border-zinc-300 pt-6 text-sm text-zinc-800 dark:border-zinc-700 dark:text-zinc-200">
            <span>total work experience</span>
            <span>{totalExperience}</span>
          </div>
        </div>
      </div>
      <div className="order-1 flex w-full items-center justify-center bg-zinc-100 p-6 md:order-2 md:w-1/2 dark:bg-zinc-900">
        <div className="text-6xl font-bold text-zinc-900 dark:text-zinc-100">web.</div>
      </div>
    </section>
  );
}
