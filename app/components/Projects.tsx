import Link from "next/link";

type ProjectProps = {
  name: string;
  description: string;
  link?: string;
};

function Project({ name, description, link }: ProjectProps) {
  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold">{name}</h3>
      <p className="mb-2">{description}</p>
      {link && (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center italic font-light text-blue-500 hover:underline">
          {name}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

const projects: ProjectProps[] = [
  {
    name: "calcon.fit",
    description:
      "a fitness tracking application that helps users monitor their calorie intake and exercise routines.",
    link: "https://calcon.fit",
  },
  {
    name: "cashflow tracker",
    description: "a web application for tracking personal finances and managing cash flow.",
    link: "https://cashflow-tracker.vercel.app",
  },
  {
    name: "nitw material app (unofficial)",
    description:
      "developed an android application for national institute of technology, warangal (no longer available on play store).",
  },
];

export default function Projects() {
  return (
    <section className="flex flex-col w-full min-h-screen md:flex-row">
      <div className="flex items-center justify-center w-full p-6 bg-gray-100 md:w-1/2 dark:bg-[#171717]">
        <div className="text-6xl font-bold">dev.</div>
      </div>
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="max-w-md">
          <h2 className="mb-8 text-3xl font-bold">projects</h2>
          <div className="space-y-6">
            {projects.map((project, index) => (
              <Project
                key={index}
                {...project}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
