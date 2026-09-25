"use client";

import { MAX_PLAN, usePlanStore } from "../lib/plan-store";
import { toast } from "../lib/toast";

export default function WorkoutActions({ workoutId }: { workoutId: string }) {
  const { plan, addToPlan, removeFromPlan, isInPlan, toggleSaved, isSaved } =
    usePlanStore();

  const inPlan = isInPlan(workoutId);
  const saved = isSaved(workoutId);
  const planFull = !inPlan && plan.length >= MAX_PLAN;

  function handlePlan() {
    if (inPlan) {
      removeFromPlan(workoutId);
      toast("Removed from today's plan", "info");
      return;
    }
    if (plan.length >= MAX_PLAN) {
      toast(`Today's plan is full — ${MAX_PLAN} lifts max`, "info");
      return;
    }
    addToPlan(workoutId);
    toast("Added to today's plan");
  }

  function handleSave() {
    const nowSaved = !saved;
    toggleSaved(workoutId);
    toast(nowSaved ? "Saved for later" : "Removed from saved", nowSaved ? "success" : "info");
  }

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      {/* Primary: Add to today's plan */}
      <button
        type="button"
        onClick={handlePlan}
        disabled={planFull}
        aria-pressed={inPlan}
        title={planFull ? `Today's plan is full — ${MAX_PLAN} lifts max` : undefined}
        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wide transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 ${
          inPlan ? "bg-white text-black" : "bg-accent text-black"
        }`}
      >
        {inPlan ? (
          // check icon
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.79 6.8-6.79a1 1 0 0 1 1.4 0Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // plus icon
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="currentColor"
          >
            <path d="M10 3a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H4a1 1 0 1 1 0-2h5V4a1 1 0 0 1 1-1Z" />
          </svg>
        )}
        {inPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>

      {/* Secondary: Save for later */}
      <button
        type="button"
        onClick={handleSave}
        aria-pressed={saved}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-white/50"
      >
        {/* bookmark icon (filled when saved) */}
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill={saved ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 3.5h10a1 1 0 0 1 1 1V17l-6-3.5L4 17V4.5a1 1 0 0 1 1-1Z" />
        </svg>
        {saved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
}
