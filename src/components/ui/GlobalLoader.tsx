"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function GlobalLoader() {
  const [progress, setProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Simulate a loading progress that slows down as it gets closer to 100%
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 99) return p;
        const remaining = 100 - p;
        const jump = Math.max(1, Math.random() * (remaining / 5));
        return Math.min(99, p + jump);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="engineering-surface fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-page">
      <div className="mb-12 grid size-16 place-items-center border border-border-strong bg-surface text-accent">
        <Activity aria-hidden="true" className="size-7" />
      </div>
      <p className="system-label mb-5">Portfolio technique</p>
      <div className="relative mb-5 h-0.5 w-64 overflow-hidden bg-surface-raised sm:w-80">
        <motion.div className="absolute left-0 top-0 h-full bg-accent" animate={{ width: `${progress}%` }} transition={reduceMotion ? { duration: 0 } : { duration: .3, ease: "easeOut" }} />
      </div>
      <span className="font-mono text-xs tabular-nums text-text-muted">{Math.floor(progress)}%</span>
    </div>
  );
}
