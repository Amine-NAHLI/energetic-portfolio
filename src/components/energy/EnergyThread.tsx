"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function EnergyThread() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="energy-thread">
      <svg viewBox="0 0 36 1000" preserveAspectRatio="none" className="size-full">
        <defs>
          <filter id="thread-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        <path d="M18 0V1000" className="energy-thread__rail" />
        {[148, 378, 620, 858].map((position) => (
          <path key={position} d={`M18 ${position}h18`} className="energy-thread__branch" />
        ))}
        <motion.path
          d="M18 0V1000"
          className="energy-thread__flow"
          filter="url(#thread-glow)"
          initial={reduceMotion ? false : { pathLength: 0, pathOffset: 0 }}
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.08, 0.25, 0.08], pathOffset: [0, 0.75, 0.92] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 6, ease: "linear", repeat: Infinity }}
        />
        {[148, 378, 620, 858].map((position, index) => (
          <motion.circle
            key={`node-${position}`}
            cx="18"
            cy={position}
            r="3.5"
            className="energy-thread__node"
            initial={reduceMotion ? false : { opacity: 0.35, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          />
        ))}
      </svg>
    </div>
  );
}
