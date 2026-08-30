"use client";

import type { ComponentPropsWithoutRef } from "react";
import { Moon, Sun } from "lucide-react";

import { cx } from "@/lib/cx";

/**
 * Which icon is showing is decided entirely by CSS (`.theme-toggle-sun` /
 * `.theme-toggle-moon` in globals.css), mirroring the same cascade that
 * drives the colour tokens themselves. This click handler only ever flips
 * `data-theme` on <html> and remembers the choice — it never touches which
 * icon is visible, so there is nothing for it to get wrong before or after
 * hydration.
 */
function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.getAttribute("data-theme") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  const next = current === "dark" ? "light" : "dark";

  root.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private browsing / storage disabled — the choice just won't survive a reload.
  }
}

export function ThemeToggle({
  className,
  ...rest
}: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={cx(
        "flex size-9 shrink-0 items-center justify-center text-graphite transition-colors duration-300 hover:text-ink",
        className,
      )}
      {...rest}
    >
      <Sun size={17} strokeWidth={1.25} className="theme-toggle-sun" aria-hidden />
      <Moon size={17} strokeWidth={1.25} className="theme-toggle-moon" aria-hidden />
    </button>
  );
}
