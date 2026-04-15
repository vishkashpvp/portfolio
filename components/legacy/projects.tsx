import { ExternalLink } from "lucide-react";
import Link from "next/link";

import { projects, type Project } from "@/data/projects";

function ProjectItem({ name, description, link }: Project) {
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">{name}</h3>
      <p className="mb-2 text-zinc-800 dark:text-zinc-200">{description}</p>
      {link && (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-light italic text-blue-600 hover:underline dark:text-blue-400">
          {name}
          <ExternalLink
            className="ml-1 h-4 w-4"
            aria-hidden
          />
        </Link>
      )}
    </div>
  );
}

export function Projects() {
  return (
    <section className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex w-full items-center justify-center bg-zinc-100 p-6 md:w-1/2 dark:bg-zinc-900">
        <div className="text-6xl font-bold text-zinc-900 dark:text-zinc-100">dev.</div>
      </div>
      <div className="flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="max-w-md text-zinc-900 dark:text-zinc-100">
          <h2 className="mb-8 text-3xl font-bold">projects</h2>
          <div className="space-y-6">
            {projects
              .filter((p) => !p.versions || p.versions.includes("v1"))
              .map((project) => (
                <ProjectItem
                  key={project.name}
                  {...project}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
