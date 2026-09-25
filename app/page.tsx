import Image from "next/image";
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
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-zinc-800 via-zinc-900 to-black">
          <Image
            src="/banner hero image.png"
            alt="Anime character doing a fitness workout"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
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
