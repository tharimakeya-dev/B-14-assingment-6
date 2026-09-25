"use client";

import { useMemo, useState } from "react";
import { type Workout } from "../lib/workouts";
import WorkoutCard from "./WorkoutCard";

type SortKey = "duration" | "calories" | "rating";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function LibrarySection({ workouts }: { workouts: Workout[] }) {
  const [sort, setSort] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? workouts.filter(
          (w) =>
            w.name.toLowerCase().includes(q) ||
            w.categories.some((c) => c.toLowerCase().includes(q)),
        )
      : workouts;

    const value = (w: Workout) =>
      sort === "duration"
        ? w.durationMin
        : sort === "calories"
          ? w.calories
          : w.rating;

    // Highest value first.
    return [...filtered].sort((a, b) => value(b) - value(a));
  }, [workouts, sort, query]);

  return (
    <>
      {/* Controls: search + sort */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative sm:max-w-xs sm:flex-1">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="9" cy="9" r="6" />
            <path d="M14 14l4 4" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or tag…"
            aria-label="Search workouts"
            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2 pl-9 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 focus:outline-none"
          />
        </div>

        <label className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-sm text-zinc-500">Sort By</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort workouts by"
              className="appearance-none rounded-full border border-white/10 bg-white/[0.03] py-2 pl-4 pr-9 text-sm font-semibold text-white focus:border-white/30 focus:outline-none"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value} className="bg-zinc-900">
                  {o.label}
                </option>
              ))}
            </select>
            <svg aria-hidden="true" viewBox="0 0 20 20" className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8l4 4 4-4" />
            </svg>
          </div>
        </label>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="py-16 text-center text-zinc-400">
          No lifts match &ldquo;{query}&rdquo;.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </>
  );
}
