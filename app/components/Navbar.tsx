"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { usePlanStore } from "../lib/plan-store";

const NAV_LINKS = [
  { label: "Workout", href: "/workout" },
  { label: "My Plan", href: "/my-plan" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlanStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <div className="flex items-center gap-2">
          {/* Mobile menu toggle */}
          
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white sm:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <path d="M5 5l10 10M15 5L5 15" />
              ) : (
                <path d="M3 6h14M3 10h14M3 14h14" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-black text-black">
              F
            </span>
            <span className="text-lg font-bold tracking-tight text-white">
              FitLog
            </span>
          </Link>
        </div>

        {/* Middle: Nav links (desktop) */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive(href)
                    ? "bg-accent text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Status badges */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            aria-label={`Today's Plan, ${plan.length} items`}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Plan
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black/15 px-1 text-xs font-bold tabular-nums">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            aria-label={`Saved, ${saved.length} items`}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:border-white/50"
          >
            Saved
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white/15 px-1 text-xs font-bold tabular-nums">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul className="flex flex-col gap-1 border-t border-white/10 px-4 py-3 sm:hidden">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive(href)
                    ? "bg-accent text-black"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
