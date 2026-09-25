"use client";

import { useSyncExternalStore } from "react";

/**
 * Minimal toast store. Call `toast("message")` from any client component;
 * the <Toaster /> mounted in the root layout renders and auto-dismisses them.
 */
export type ToastKind = "success" | "info";
export type Toast = { id: number; message: string; kind: ToastKind };

const DISMISS_MS = 2600;

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<() => void>();
const serverSnapshot: Toast[] = [];

function emit() {
  listeners.forEach((l) => l());
}

export function toast(message: string, kind: ToastKind = "success") {
  const id = nextId++;
  toasts = [...toasts, { id, message, kind }];
  emit();
  setTimeout(() => dismiss(id), DISMISS_MS);
}

export function dismiss(id: number) {
  const next = toasts.filter((t) => t.id !== id);
  if (next.length === toasts.length) return;
  toasts = next;
  emit();
}

export function useToasts() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => toasts,
    () => serverSnapshot,
  );
}
