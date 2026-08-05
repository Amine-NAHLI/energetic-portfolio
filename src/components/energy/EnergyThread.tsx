"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function EnergyThread() {
  const reduceMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="energy-thread">
      <svg viewBox="0 0 36 1000" preserveAspectRatio="none" className="size-full">
        <path d="M18 0V1000" className="energy-thread__rail" />
        {[148, 378, 620, 858].map((position) => (
          <path key={position} d={`M18 ${position}h18`} className="energy-thread__branch" />
        ))}
        <motion.path
          d="M18 0V1000"
          className="energy-thread__flow"
          initial={reduceMotion ? false : { pathLength: 0, pathOffset: 0 }}
          animate={reduceMotion ? { pathLength: 1 } : { pathLength: [0.06, 0.2, 0.06], pathOffset: [0, 0.78, 0.94] }}
          transition={reduceMotion ? { duration: 0 } : { duration: 8, ease: "linear", repeat: Infinity }}
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
