export default function LandingPage() {
  return (
    <div className="flex flex-col w-full min-h-screen md:flex-row">
      <div className="flex items-center justify-center w-full p-6 bg-gray-100 dark:bg-[#171717] md:w-1/2 md:p-0">
        <div className="text-4xl font-bold text-center text-gray-800 dark:text-white md:text-6xl whitespace-nowrap md:text-left">
          <span className="block md:hidden">next. web. dev.</span>
          <span className="hidden md:block">
            next. <br />
            web. <br />
            dev.
          </span>
        </div>
      </div>
      <div className="flex items-center justify-center w-full p-8 md:w-1/2">
        <div className="max-w-md text-left">
          <h2 className="mb-4 text-3xl font-bold">about me</h2>
          <p>
            i&apos;m <strong>vishkash</strong> <em>a.k.a.</em> <strong>vishnuprakash</strong>,
            <br /> a passionate full-stack web developer driven by the love for creating seamless
            digital experiences. with almost <strong>2.5 years</strong> of hands-on experience, i
            focus on building modern, efficient, and user-friendly web applications using
            cutting-edge technologies.
          </p>
          <p className="my-4">
            i continually hone my skills to deliver <strong>high-quality</strong> solutions. my
            expertise includes <strong>react</strong>, <strong>next.js</strong>,{" "}
            <strong>tailwind</strong>, <strong>node.js</strong>, <strong>angular</strong>, and{" "}
            <strong>mongodb</strong>. i thrive in collaborative environments, enjoying the
            opportunity to learn from others while also sharing my knowledge and experiences.
          </p>
        </div>
      </div>
    </div>
  );
}