/** Small stat icons shared by the library cards and the plan list. */

type IconProps = { className?: string };

export function ClockIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.75V8l2.25 1.5" />
    </svg>
  );
}

export function FlameIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M8 1.5S3.5 4.5 3.5 9a4.5 4.5 0 0 0 9 0c0-1.6-.8-2.9-1.6-3.8-.2 1-.8 1.8-1.4 1.8.4-1.6-.3-4-1.5-5.5Z" />
    </svg>
  );
}

export function StarIcon({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={className} fill="currentColor">
      <path d="M8 1.6l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.4 4.2 13.4l.7-4.3-3.1-3 4.3-.6L8 1.6Z" />
    </svg>
  );
}
