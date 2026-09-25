import Spinner from "./components/Spinner";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32">
      <Spinner className="h-10 w-10" />
      <p className="text-sm font-medium text-zinc-400">Loading workouts…</p>
    </div>
  );
}
