import Link from "next/link";
import CalendarIcon from "@icons/CalendarIcon";
import ClockIcon from "@icons/ClockIcon";
import BriefcaseIcon from "@icons/BriefcaseIcon";

export default function WorkExperience() {
  return (
    <section className="flex flex-col w-full min-h-screen md:flex-row">
      <div className="flex items-center justify-center order-2 w-full p-8 md:w-1/2 md:order-1">
        <div className="max-w-md">
          <h2 className="mb-5 text-3xl font-bold">work experience</h2>
          <div className="mb-6 text-sm">
            <div className="flex items-center p-3 bg-gray-200 rounded dark:bg-white/10">
              <ClockIcon />
              <span className="font-bold">overall experience: 2 years 4 months</span>
            </div>
          </div>
          <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-300 dark:before:bg-gray-600">
            <div>
              <h3 className="mb-2 text-xl font-semibold">software development engineer II</h3>
              <div className="flex items-center text-sm">
                <CalendarIcon />
                <span>september 2024 - present</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">software developer</h3>
              <div className="flex items-center text-sm">
                <CalendarIcon />
                <span>july 2023 - july 2024</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">get (graduate engineer trainee)</h3>
              <div className="flex items-center text-sm">
                <CalendarIcon />
                <span>june 2022 - june 2023</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center">
              <BriefcaseIcon />
              <span>
                company:{" "}
                <Link
                  href="https://jio.com/platforms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-blue-500 hover:underline">
                  jio platforms limited
                </Link>
              </span>
            </div>
            <div className="flex items-center">
              <ClockIcon />
              <span>experience: 2 years 4 months</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center order-2 w-full p-6 bg-gray-100 md:w-1/2 dark:bg-[#171717]">
        <div className="text-6xl font-bold">web.</div>
      </div>
    </section>
  );
}
