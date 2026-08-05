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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
      style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #0f172a 0%, #0b1120 80%)" }}
      initial={{ opacity: 1, backgroundColor: "#0b1120" }}
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
              stroke="#ffea00"
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
            stroke="#ffea00"
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
            stroke="#ffaa00"
            strokeWidth="2"
            filter="url(#core-glow)"
            animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {/* Central Icon */}
        <motion.div 
          className="relative grid size-20 place-items-center rounded-full bg-[#0f172a] border border-white/10 z-10"
          animate={{ 
            boxShadow: ["0 0 20px #ffea0040", "0 0 50px #ffaa0060", "0 0 20px #ffea0040"],
            borderColor: ["#ffea00", "#ffaa00", "#ffea00"]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap 
            className="size-8 text-[#ffea00]" 
            style={{ filter: `drop-shadow(0 0 8px #ffea00)` }} 
          />
        </motion.div>
      </div>

      {/* Loading Text - Real time cycles */}
      <div className="mt-8 flex flex-col items-center">
        <div className="font-mono text-sm tracking-widest text-[#ffea00]">
          {statuses[statusIndex]}
        </div>
      </div>
    </motion.div>
  );
}
