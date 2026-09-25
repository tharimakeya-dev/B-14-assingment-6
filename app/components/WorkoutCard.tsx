import Link from "next/link";
import { type Workout } from "../lib/workouts";
import { ClockIcon, FlameIcon, StarIcon } from "./icons";

/** A library card. The whole card links to the workout's detail page. */

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/25"
    >
      {/* Illustration / image */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-700 via-zinc-800 to-black">
        {workout.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <span className="px-4 text-center font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white/15">
            {workout.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* Category pills */}
        <div className="flex flex-wrap gap-1.5">
          {workout.categories.map((c) => (
            <span
              key={c}
              className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-zinc-300"
            >
              {c}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="mt-3 font-display text-lg font-bold uppercase leading-tight tracking-tight text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-1 text-sm text-zinc-500">
          {workout.equipment.join(", ")}
        </p>

        {/* Stats row */}
        <div className="mt-auto flex items-center gap-4 border-t border-white/10 pt-3 text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1">
            <span className="text-accent">
              <ClockIcon />
            </span>
            {workout.durationMin} min
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="text-accent">
              <FlameIcon />
            </span>
            {workout.calories} kcal
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="text-accent">
              <StarIcon />
            </span>
            {workout.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
}
