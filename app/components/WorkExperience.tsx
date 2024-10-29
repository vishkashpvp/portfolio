import Link from "next/link";

export default function WorkExperience() {
  return (
    <section className="flex flex-col w-full min-h-screen md:flex-row">
      <div className="flex items-center justify-center order-2 w-full p-8 md:w-1/2 md:order-1">
        <div className="max-w-md">
          <h2 className="mb-5 text-3xl font-bold">work experience</h2>
          <div className="mb-6 text-sm">
            <div className="flex items-center p-3 bg-gray-200 rounded dark:bg-white/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-bold">overall experience: 2 years 4 months</span>
            </div>
          </div>
          <div className="space-y-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-300 dark:before:bg-gray-600">
            <div>
              <h3 className="mb-2 text-xl font-semibold">software development engineer II</h3>
              <div className="flex items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>september 2024 - present</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">software developer</h3>
              <div className="flex items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>july 2023 - july 2024</span>
              </div>
            </div>
            <div>
              <h3 className="mb-2 text-xl font-semibold">get (graduate engineer trainee)</h3>
              <div className="flex items-center text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>june 2022 - june 2023</span>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
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
