/** Accent spinning loader. */

export default function Spinner({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-2 border-white/15 border-t-accent ${className}`}
    />
  );
}
