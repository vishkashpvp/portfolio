import About from "@components/About";
import Projects from "@components/Projects";
import WorkExperience from "@components/WorkExperience";

export default function Home() {
  return (
    <div className="flex min-h-screen font-montserrat">
      <div className="flex flex-col w-full min-h-screen">
        <About />
        <WorkExperience />
        <Projects />
      </div>
    </div>
  );
}
