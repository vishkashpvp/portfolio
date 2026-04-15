import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 font-montserrat text-zinc-900 dark:text-zinc-100">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">404</p>
      <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">page not found</h1>
      <Link
        href="/"
        className="text-blue-700 underline underline-offset-4 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
        back home
      </Link>
    </div>
  );
}
