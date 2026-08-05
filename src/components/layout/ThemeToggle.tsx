"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
const storageKey = "portfolio-theme";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(currentTheme);
  }, []);

  const isLight = theme === "light";

  function toggleTheme() {
    const nextTheme: Theme = isLight ? "dark" : "light";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem(storageKey, nextTheme);
    setTheme(nextTheme);

    // Flash effect
    document.body.classList.remove("theme-flash");
    void document.body.offsetWidth; // Trigger reflow
    document.body.classList.add("theme-flash");
  }

  // Prevent hydration mismatch by not rendering the icon until mounted
  if (!mounted) {
    return (
      <div className="relative h-6 w-12 rounded-full border border-border bg-surface-deep opacity-0" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative flex h-6 w-12 cursor-pointer items-center rounded-full border border-border/50 bg-surface-deep p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label={isLight ? "Activer le thème sombre" : "Activer le thème clair"}
      aria-pressed={isLight}
      title={isLight ? "Power Off (Dark)" : "Power On (Light)"}
    >
      <div
        className={`flex size-4 items-center justify-center rounded-full bg-accent shadow-[0_0_10px_color-mix(in_srgb,var(--accent)_80%,transparent)] transition-transform duration-300 ${
          isLight ? "translate-x-6" : "translate-x-0"
        }`}
      >
        <div className="size-1 rounded-full bg-white opacity-80" />
      </div>
      <span className="sr-only">{isLight ? "Dark" : "Light"}</span>
    </button>
  );
}
