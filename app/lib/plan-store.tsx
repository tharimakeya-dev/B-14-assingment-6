"use client";

import { useSyncExternalStore } from "react";

/**
 * Shared client-side store for the two navbar counters.
 * `plan`  = lifts locked into Today's Plan.
 * `saved` = lifts bookmarked for later.
 *
 * Backed by a module-level store + localStorage and exposed through
 * `useSyncExternalStore`, which is SSR-safe (server renders the empty
 * snapshot, the client swaps in persisted values after hydration).
 */
const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";

/** Today's Plan holds at most this many lifts. */
export const MAX_PLAN = 5;

let plan: string[] = [];
let saved: string[] = [];
let hydrated = false;

// Cached snapshots so getSnapshot returns a stable reference until data changes.
let snapshot = { plan, saved };
const serverSnapshot = { plan: [] as string[], saved: [] as string[] };

const listeners = new Set<() => void>();

function rebuildAndEmit() {
  snapshot = { plan, saved };
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  try {
    const p = localStorage.getItem(PLAN_KEY);
    const s = localStorage.getItem(SAVED_KEY);
    plan = p ? JSON.parse(p) : [];
    saved = s ? JSON.parse(s) : [];
    snapshot = { plan, saved };
  } catch {
    // ignore malformed/unavailable storage
  }
}

function persist() {
  try {
    localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
    localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  } catch {
    // ignore unavailable storage
  }
}

function subscribe(callback: () => void) {
  // Runs on the client only; pull persisted values in on first subscription.
  hydrate();
  listeners.add(callback);
  return () => listeners.delete(callback);
}

// --- mutations -------------------------------------------------------------

/** Add a lift to Today's Plan. Returns false if it's full or already present. */
export function addToPlan(id: string): boolean {
  if (plan.includes(id) || plan.length >= MAX_PLAN) return false;
  plan = [...plan, id];
  persist();
  rebuildAndEmit();
  return true;
}

export function removeFromPlan(id: string) {
  if (!plan.includes(id)) return;
  plan = plan.filter((x) => x !== id);
  persist();
  rebuildAndEmit();
}

export function toggleSaved(id: string) {
  saved = saved.includes(id)
    ? saved.filter((x) => x !== id)
    : [...saved, id];
  persist();
  rebuildAndEmit();
}

// --- hook ------------------------------------------------------------------

/** Read the current plan/saved lists. Re-renders on any change. */
export function usePlanStore() {
  const state = useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
  return {
    ...state,
    addToPlan,
    removeFromPlan,
    toggleSaved,
    isInPlan: (id: string) => state.plan.includes(id),
    isSaved: (id: string) => state.saved.includes(id),
  };
}
