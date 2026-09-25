import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-32 text-center">
      <p className="font-display text-7xl font-bold text-accent sm:text-8xl">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold uppercase tracking-tight text-white">
        Lift not found
      </h1>
      <p className="mt-3 max-w-sm text-zinc-400">
        This page racked out. The route you&apos;re looking for doesn&apos;t
        exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
      >
        Back to the library
      </Link>
    </main>
  );
}
