"use client";

import { useToasts, dismiss } from "../lib/toast";

export default function Toaster() {
  const toasts = useToasts();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:right-4 sm:items-end">
      {toasts.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => dismiss(t.id)}
          role="status"
          className="toast-in pointer-events-auto flex items-center gap-2 rounded-xl border border-white/10 bg-zinc-900/95 px-4 py-3 text-sm font-medium text-white shadow-xl shadow-black/40 backdrop-blur"
        >
          <span
            className={t.kind === "success" ? "text-accent" : "text-zinc-400"}
          >
            {t.kind === "success" ? (
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 1 1 1.4-1.4l2.8 2.79 6.8-6.79a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm1 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-1 3a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z" clipRule="evenodd" />
              </svg>
            )}
          </span>
          {t.message}
        </button>
      ))}
    </div>
  );
}
