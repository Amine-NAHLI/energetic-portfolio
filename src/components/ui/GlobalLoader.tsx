"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function GlobalLoader() {
  const reduceMotion = useReducedMotion();
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "Connexion aux systèmes...",
    "Récupération des ressources...",
    "Initialisation de l'interface...",
    "Stabilisation du réseau..."
  ];

  useEffect(() => {
    // Loop through loading messages every 800ms while waiting for the page to load
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statuses.length);
    }, 800);
    return () => clearInterval(interval);
  }, [statuses.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#010609] overflow-hidden pointer-events-auto"
      initial={{ opacity: 1, backgroundColor: "#010609" }}
      exit={{ 
        opacity: 0, 
        backgroundColor: "#ffffff", // The Flash effect when unmounting
        transition: { duration: 0.8, ease: "easeOut" } 
      }}
    >
      <div className="relative flex size-64 items-center justify-center sm:size-80">
        {/* Smart Grid cables radiating from the core */}
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full pointer-events-none">
          <defs>
            <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          
          {/* Grid Lines - they pulse with energy */}
          {[
            "M200 200 L200 0", "M200 200 L400 200", 
            "M200 200 L200 400", "M200 200 L0 200",
            "M200 200 L40 40", "M200 200 L360 40",
            "M200 200 L360 360", "M200 200 L40 360"
          ].map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="#00d65b"
              strokeWidth="1.5"
              initial={{ opacity: 0.1, pathLength: 0 }}
              animate={reduceMotion ? { opacity: 0.4, pathLength: 1 } : { opacity: [0.1, 0.6, 0.1], pathLength: 1 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, ease: "easeInOut" }}
            />
          ))}

          {/* Pulsing Core Rings */}
          <motion.circle
            cx="200"
            cy="200"
            r="60"
            fill="none"
            stroke="#00d65b"
            strokeWidth="1"
            strokeDasharray="4 8"
            animate={reduceMotion ? false : { rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ originX: "50%", originY: "50%" }}
          />
          
          <motion.circle
            cx="200"
            cy="200"
            r="48"
            fill="none"
            stroke="#00c3ff"
            strokeWidth="2"
            filter="url(#core-glow)"
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Central Icon */}
        <motion.div 
          className="relative grid size-20 place-items-center rounded-full bg-[#030f14] border border-white/10 z-10"
          animate={{ 
            boxShadow: ["0 0 20px #00d65b40", "0 0 50px #00c3ff60", "0 0 20px #00d65b40"],
            borderColor: ["#00d65b", "#00c3ff", "#00d65b"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap 
            className="size-8 text-[#00d65b]" 
            style={{ filter: `drop-shadow(0 0 8px #00d65b)` }} 
          />
        </motion.div>
      </div>

      {/* Loading Text - Real time cycles */}
      <div className="mt-8 flex flex-col items-center">
        <div className="font-mono text-sm tracking-widest text-[#00c3ff]">
          {statuses[statusIndex]}
        </div>
      </div>
    </motion.div>
  );
}
