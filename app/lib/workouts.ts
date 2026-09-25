/**
 * Workout data layer.
 *
 * Single source of truth for the library grid, the detail page, and the plan
 * list. Data is fetched from the FitLog API and mapped onto the internal
 * `Workout` shape so calling components stay decoupled from the API payload.
 */

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

// Revalidate server-cached responses hourly (matches the API's Cache-Control).
// Ignored by the browser when called from a Client Component.
const REVALIDATE_SECONDS = 3600;

export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type Workout = {
  id: string;
  name: string;
  description: string;
  /** Banner image URL. Falls back to a generated placeholder when absent. */
  image?: string;
  categories: string[];
  equipment: string[];
  difficulty: Difficulty;
  sets: number;
  /** Rep range, e.g. "6-8". */
  reps: string;
  durationMin: number;
  calories: number;
  rating: number;
  instructions: string[];
};

/** Raw payload shape returned by the API. */
type ApiWorkout = {
  id: number;
  name: string;
  image?: string;
  muscleGroups?: string[];
  equipment?: string;
  difficulty?: string;
  duration?: number;
  caloriesBurned?: number;
  sets?: number;
  reps?: string;
  rating?: number;
  description?: string;
  instructions?: string[];
};

function mapWorkout(a: ApiWorkout): Workout {
  return {
    id: String(a.id),
    name: a.name,
    description: a.description ?? "",
    image: a.image,
    categories: a.muscleGroups ?? [],
    equipment: (a.equipment ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    difficulty: (a.difficulty as Difficulty) ?? "Beginner",
    sets: a.sets ?? 0,
    reps: a.reps ?? "",
    durationMin: a.duration ?? 0,
    calories: a.caloriesBurned ?? 0,
    rating: a.rating ?? 0,
    instructions: a.instructions ?? [],
  };
}

/** Return every workout in the library. */
export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_BASE, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }
  const data: ApiWorkout[] = await res.json();
  return data.map(mapWorkout);
}

/** Return a single workout by id, or `undefined` if it doesn't exist. */
export async function getWorkoutById(id: string): Promise<Workout | undefined> {
  const res = await fetch(`${API_BASE}/${encodeURIComponent(id)}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (res.status === 404) {
    return undefined;
  }
  if (!res.ok) {
    throw new Error(`Failed to load workout ${id} (${res.status})`);
  }
  return mapWorkout(await res.json());
}
