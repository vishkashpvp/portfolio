"use client";

import Link from "next/link";
import { useExperience } from "@/hooks/useExperience";

export default function WorkExperience() {
  const { currentCompany, previousCompanies, totalExperience } = useExperience();

  if (!currentCompany) return null;

  const latestRole = currentCompany.roles[0];

  return (
    <section className="flex flex-col w-full min-h-screen md:flex-row">
      <div className="flex items-center justify-center order-2 w-full p-8 md:w-1/2 md:order-1">
        <div className="max-w-md space-y-8">
          <h2 className="text-3xl font-bold">work experience</h2>

          <div className="space-y-3">
            <p className="text-xl font-semibold">{latestRole.title}</p>
            <div className="flex items-center justify-between gap-2 text-sm text-gray-700 dark:text-gray-300">
              <Link
                href={currentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-500 hover:underline">
                {currentCompany.name}
              </Link>
              <span>{currentCompany.experience}</span>
            </div>
          </div>

          {previousCompanies.length > 0 && (
            <div className="pt-6 mt-6 border-t border-gray-300 dark:border-gray-700">
              <h4 className="mb-4 text-sm font-semibold tracking-wider text-gray-600 dark:text-gray-400">
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
                      className="font-bold text-blue-500 hover:underline">
                      {company.name}
                    </Link>
                    <span className="text-gray-600 dark:text-gray-400">{company.experience}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between pt-6 mt-6 text-sm border-t border-gray-300 dark:border-gray-700">
            <span>total work experience</span>
            <span>{totalExperience}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center order-1 w-full p-6 bg-gray-100 md:order-2 md:w-1/2 dark:bg-[#171717]">
        <div className="text-6xl font-bold">web.</div>
      </div>
    </section>
  );
}
