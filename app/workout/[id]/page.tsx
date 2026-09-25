import Link from "next/link";
import { notFound } from "next/navigation";
import { getWorkoutById, getWorkouts, type Workout } from "../../lib/workouts";
import WorkoutActions from "../../components/WorkoutActions";

// Pre-render a static page per workout at build time.
export async function generateStaticParams() {
  const workouts = await getWorkouts();
  return workouts.map((w) => ({ id: w.id }));
}

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs: { label: string; value: string }[] = [
    { label: "Equipment", value: workout.equipment.join(", ") },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.durationMin} min` },
    { label: "Calories", value: `${workout.calories} kcal` },
    { label: "Rating", value: workout.rating.toFixed(1) },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/#library"
        className="inline-flex items-center gap-1 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
      >
        ← Back to library
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: Visual / media */}
        <WorkoutMedia workout={workout} />

        {/* Right: details */}
        <div>
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-5xl">
            {workout.name}
          </h1>

          <p className="mt-4 max-w-md text-lg leading-relaxed text-zinc-400">
            {workout.description}
          </p>

          {/* Category tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {workout.categories.map((c) => (
              <span
                key={c}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-200"
              >
                {c}
              </span>
            ))}
          </div>

          {/* Key specs panel */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            <dl className="divide-y divide-white/10">
              {specs.map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {label}
                  </dt>
                  <dd className="text-sm font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Instructions */}
          <section className="mt-8">
            <h2 className="font-display text-xl font-bold uppercase tracking-tight text-white">
              Instructions
            </h2>
            <ol className="mt-4 space-y-4">
              {workout.instructions.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-black">
                    {i + 1}
                  </span>
                  <p className="pt-0.5 text-zinc-300">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* CTA buttons */}
          <WorkoutActions workoutId={workout.id} />
        </div>
      </div>
    </main>
  );
}

/** Left-column visual. Uses the workout image when present, else a placeholder. */
function WorkoutMedia({ workout }: { workout: Workout }) {
  if (workout.image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={workout.image}
        alt={workout.name}
        className="aspect-[4/5] w-full rounded-3xl border border-white/10 object-cover"
      />
    );
  }

  return (
    <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black">
      <span className="px-6 text-center font-display text-3xl font-bold uppercase leading-tight tracking-tight text-white/15">
        {workout.name}
      </span>
      <span className="absolute bottom-4 left-4 rounded-full bg-black/40 px-3 py-1 text-xs font-medium uppercase tracking-wide text-zinc-300 backdrop-blur">
        Workout image
      </span>
    </div>
  );
}
