"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function SmartGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 z-[-1] overflow-hidden pointer-events-none opacity-40">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="smart-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="color-mix(in srgb, var(--accent) 20%, transparent)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smart-grid)" />

        {/* Traveling energy nodes */}
        {!reduceMotion && (
          <>
            <motion.circle
              r="3"
              fill="var(--accent)"
              initial={{ opacity: 0, cx: -60, cy: 120 }}
              animate={{
                opacity: [0, 1, 1, 0],
                cx: ["0%", "50%", "100%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.circle
              r="3"
              fill="var(--amber)"
              initial={{ opacity: 0, cx: 300, cy: -60 }}
              animate={{
                opacity: [0, 1, 1, 0],
                cy: ["0%", "50%", "100%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: 2,
                ease: "linear",
              }}
            />
            <motion.circle
              r="4"
              fill="var(--accent)"
              style={{ filter: "blur(2px)" }}
              initial={{ opacity: 0, cx: 60, cy: 300 }}
              animate={{
                opacity: [0, 1, 1, 0],
                cx: ["100%", "50%", "0%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: 4,
                ease: "linear",
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
