"use client";

import { useExperience } from "@/hooks/use-experience";

export function About() {
  const { totalExperience } = useExperience();

  return (
    <section className="flex min-h-screen w-full flex-col md:flex-row">
      <div className="flex w-full items-center justify-center bg-zinc-100 p-6 md:w-1/2 dark:bg-zinc-900">
        <div className="text-6xl font-bold text-zinc-900 dark:text-zinc-100">next.</div>
      </div>
      <div className="flex w-full items-center justify-center p-8 md:w-1/2">
        <div className="max-w-md text-left text-zinc-900 dark:text-zinc-100">
          <h2 className="mb-4 text-3xl font-bold">about me</h2>
          <p className="text-zinc-800 dark:text-zinc-200">
            i&apos;m <strong className="text-zinc-950 dark:text-white">vishkash</strong>{" "}
            <em>a.k.a.</em> <strong className="text-zinc-950 dark:text-white">vishnuprakash</strong>
            ,
            <br /> a passionate full-stack web developer driven by the love for creating seamless
            digital experiences. with{" "}
            <strong className="text-zinc-950 dark:text-white">{totalExperience}</strong> of hands-on
            experience, i focus on building modern, efficient, and user-friendly web applications
            using cutting-edge technologies.
          </p>
          <p className="my-4 text-zinc-800 dark:text-zinc-200">
            i continually hone my skills to deliver{" "}
            <strong className="text-zinc-950 dark:text-white">high-quality</strong> solutions. my
            current stack centers on{" "}
            <strong className="text-zinc-950 dark:text-white">next.js</strong>,{" "}
            <strong className="text-zinc-950 dark:text-white">react</strong>,{" "}
            <strong className="text-zinc-950 dark:text-white">node.js</strong>,{" "}
            <strong className="text-zinc-950 dark:text-white">tailwind</strong>,{" "}
            <strong className="text-zinc-950 dark:text-white">postgres</strong>, and{" "}
            <strong className="text-zinc-950 dark:text-white">mongodb</strong>. i thrive in
            collaborative environments, enjoying the opportunity to learn from others while also
            sharing my knowledge and experiences.
          </p>
        </div>
      </div>
    </section>
  );
}
