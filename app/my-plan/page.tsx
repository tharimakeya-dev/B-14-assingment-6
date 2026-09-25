"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePlanStore } from "../lib/plan-store";
import { getWorkouts, type Workout } from "../lib/workouts";
import { ClockIcon, FlameIcon, StarIcon } from "../components/icons";
import { toast } from "../lib/toast";
import Spinner from "../components/Spinner";

type Tab = "today" | "saved";

/** Map a list of ids to their workouts, dropping any that no longer exist. */
function resolve(ids: string[], byId: Map<string, Workout>) {
  return ids.map((id) => byId.get(id)).filter((w): w is Workout => Boolean(w));
}

export default function MyPlanPage() {
  const { plan, saved, removeFromPlan, toggleSaved } = usePlanStore();
  const [tab, setTab] = useState<Tab>("today");
  const [workouts, setWorkouts] = useState<Workout[] | null>(null);
  const [done, setDone] = useState<string[]>([]);

  // Fetch the library once; `null` means "still loading".
  useEffect(() => {
    let active = true;
    getWorkouts().then((w) => {
      if (active) setWorkouts(w);
    });
    return () => {
      active = false;
    };
  }, []);

  const byId = useMemo(() => {
    const map = new Map<string, Workout>();
    (workouts ?? []).forEach((w) => map.set(w.id, w));
    return map;
  }, [workouts]);

  const planWorkouts = useMemo(() => resolve(plan, byId), [plan, byId]);
  const savedWorkouts = useMemo(() => resolve(saved, byId), [saved, byId]);

  // Metrics always reflect Today's Plan and update live.
  const minutes = planWorkouts.reduce((sum, w) => sum + w.durationMin, 0);
  const calories = planWorkouts.reduce((sum, w) => sum + w.calories, 0);

  const loading = workouts === null;
  const list = tab === "today" ? planWorkouts : savedWorkouts;

  const handleRemove = (w: Workout) => {
    if (tab === "today") removeFromPlan(w.id);
    else toggleSaved(w.id);
    toast(`Removed ${w.name}`, "info");
  };

  const toggleDone = (w: Workout) => {
    const nowDone = !done.includes(w.id);
    setDone((prev) =>
      nowDone ? [...prev, w.id] : prev.filter((x) => x !== w.id),
    );
    if (nowDone) toast(`Marked ${w.name} as done`);
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6">
      {/* Header */}
      <header>
        <h1 className="font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl">
          My Plan
        </h1>
        <p className="mt-2 text-zinc-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      {/* Metrics summary */}
      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        <StatCard label="Exercises" value={plan.length} />
        <StatCard label="Minutes" value={minutes} />
        <StatCard label="Calories" value={calories} />
      </div>

      {/* Tabs */}
      <div className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
        <TabButton active={tab === "today"} onClick={() => setTab("today")}>
          Today&apos;s Plan
        </TabButton>
        <TabButton active={tab === "saved"} onClick={() => setTab("saved")}>
          Saved
        </TabButton>
      </div>

      {/* List / states */}
      <div className="mt-6">
        {loading ? (
          <div className="flex flex-col items-center gap-4 py-16">
            <Spinner />
            <p className="text-center text-zinc-400">Loading workouts…</p>
          </div>
        ) : list.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="space-y-3">
            {list.map((w) => (
              <PlanCard
                key={w.id}
                workout={w}
                done={done.includes(w.id)}
                onToggleDone={() => toggleDone(w)}
                onRemove={() => handleRemove(w)}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center">
      <div className="font-display text-3xl font-bold tabular-nums text-accent sm:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
        active ? "bg-accent text-black" : "text-zinc-400 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function PlanCard({
  workout,
  done,
  onToggleDone,
  onRemove,
}: {
  workout: Workout;
  done: boolean;
  onToggleDone: () => void;
  onRemove: () => void;
}) {
  return (
    <li
      className={`flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row sm:items-center ${
        done ? "opacity-60" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-zinc-700 via-zinc-800 to-black">
        {workout.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={workout.image}
            alt={workout.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-display text-xl font-bold text-white/25">
            {workout.name.charAt(0)}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-lg font-bold uppercase tracking-tight text-white ${
            done ? "line-through" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-sm text-zinc-500">{workout.equipment.join(", ")}</p>

        {/* Stats row */}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-400">
          <Stat icon={<ClockIcon />} text={`${workout.durationMin} min`} />
          <Stat icon={<FlameIcon />} text={`${workout.calories} kcal`} />
          <Stat icon={<StarIcon />} text={workout.rating.toFixed(1)} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:border-white/50"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={onToggleDone}
          aria-pressed={done}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
            done
              ? "bg-white text-black"
              : "bg-accent text-black hover:opacity-90"
          }`}
        >
          {done ? "Done" : "Mark as Done"}
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-zinc-400 transition-colors hover:border-red-500/60 hover:text-red-400"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>
      </div>
    </li>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/15 py-16 text-center">
      <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
        Nothing here yet
      </h2>
      <p className="mt-2 max-w-xs text-sm text-zinc-400">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-black transition-opacity hover:opacity-90"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function Stat({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className="text-accent">{icon}</span>
      {text}
    </span>
  );
}
