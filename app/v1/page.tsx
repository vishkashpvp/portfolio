import { About } from "@/components/legacy/about";
import { Projects } from "@/components/legacy/projects";
import { WorkExperience } from "@/components/legacy/work-experience";

export default function HomeClassic() {
  return (
    <div className="flex min-h-screen font-montserrat text-zinc-900 dark:text-zinc-100">
      <div className="flex min-h-screen w-full flex-col">
        <About />
        <WorkExperience />
        <Projects />
      </div>
    </div>
  );
}
