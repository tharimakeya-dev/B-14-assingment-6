import { getWorkouts } from "./lib/workouts";
import LibrarySection from "./components/LibrarySection";

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="flex flex-1 flex-col">
      {/* Hero / Banner */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:py-24">
        {/* Left: copy */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>

          <h1 className="mt-4 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Train with intent.
            <br />
            Log every set.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
          >
            {/* library / list icon */}
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="h-4 w-4"
              fill="currentColor"
            >
              <path d="M4 3.5A1.5 1.5 0 0 1 5.5 2H7v16H5.5A1.5 1.5 0 0 1 4 16.5v-13ZM8.5 2H10v16H8.5V2ZM12 2.62l1.45-.39a1.5 1.5 0 0 1 1.84 1.06l3.1 11.58a1.5 1.5 0 0 1-1.06 1.84l-1.45.38a1.5 1.5 0 0 1-1.84-1.06L11 4.45A1.5 1.5 0 0 1 12 2.62Z" />
            </svg>
            Browse Workouts
          </a>
        </div>

        {/* Right: hero image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
          {/* Placeholder visual — swap for a real banner image (e.g. next/image) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-40 w-40 text-accent/80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6.5 6.5 17.5 17.5" />
              <rect x="1.5" y="8.5" width="4" height="7" rx="1" transform="rotate(-45 3.5 12)" />
              <rect x="18.5" y="8.5" width="4" height="7" rx="1" transform="rotate(-45 20.5 12)" />
              <path d="M7 5 5 7M19 17l-2 2" />
            </svg>
          </div>
          <span className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-300 backdrop-blur">
            Hero image
          </span>
        </div>
      </section>

      {/* Library */}
      <section
        id="library"
        className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6"
      >
        <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
          The Library
        </h2>
        <p className="mt-2 text-zinc-400">
          Twelve lifts covering every major muscle group.
        </p>

        <LibrarySection workouts={workouts} />
      </section>
    </main>
  );
}
