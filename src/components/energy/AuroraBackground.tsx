"use client";

import { useReducedMotion } from "framer-motion";

export default function AuroraBackground() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[-5] overflow-hidden bg-bg-page transition-colors duration-500">
      <div className="absolute inset-0 opacity-40 mix-blend-multiply dark:mix-blend-screen">
        {/* Orb 1: Accent Color (Green) */}
        <div
          className="absolute -left-[10%] -top-[10%] h-[50vh] w-[50vw] rounded-full mix-blend-multiply blur-[120px] dark:mix-blend-screen"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            animation: "aurora-1 25s infinite ease-in-out alternate",
          }}
        />
        {/* Orb 2: Secondary Background (Yellow-ish Green) */}
        <div
          className="absolute -right-[20%] top-[20%] h-[60vh] w-[60vw] rounded-full mix-blend-multiply blur-[120px] dark:mix-blend-screen"
          style={{
            background: "radial-gradient(circle, var(--surface-deep) 0%, transparent 70%)",
            animation: "aurora-2 30s infinite ease-in-out alternate-reverse",
          }}
        />
        {/* Orb 3: Another variation */}
        <div
          className="absolute bottom-[-20%] left-[20%] h-[60vh] w-[50vw] rounded-full mix-blend-multiply blur-[120px] dark:mix-blend-screen"
          style={{
            background: "radial-gradient(circle, var(--surface-subtle) 0%, transparent 70%)",
            animation: "aurora-3 35s infinite ease-in-out alternate",
          }}
        />
      </div>

      {/* Optional glassmorphism noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat"
        }}
      />
    </div>
  );
}
