"use client";

import { motion, useReducedMotion } from "framer-motion";

type ScadaGaugeProps = {
  value: number;
  label: string;
  index: string;
};

export default function ScadaGauge({ value, label, index }: ScadaGaugeProps) {
  const reduceMotion = useReducedMotion();
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (0.75 * circumference); // 75% fill for visuals

  return (
    <div className="relative flex flex-col items-center gap-4 border-b border-border py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
      <div className="relative flex size-24 items-center justify-center">
        <svg className="absolute inset-0 size-full -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="color-mix(in srgb, var(--surface-deep) 50%, transparent)"
            strokeWidth="6"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={reduceMotion ? { strokeDashoffset } : { strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
        </svg>
        <span className="font-display text-2xl font-bold tabular-nums text-text-primary">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <div className="text-center">
        <dt className="font-mono text-[.62rem] font-semibold uppercase tracking-[.11em] text-text-muted">
          {label}
        </dt>
      </div>
      <span aria-hidden="true" className="absolute right-2 top-2 font-mono text-[.5rem] text-accent/70">
        SYS-{index}
      </span>
    </div>
  );
}
