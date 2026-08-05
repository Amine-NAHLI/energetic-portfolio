"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  yOffset = 30,
  duration = 0.6,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { y: yOffset }}
      animate={reduceMotion || isInView ? { y: 0 } : { y: yOffset }}
      transition={reduceMotion ? { duration: 0 } : { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn("w-full", className)}
    >
      {children}
    </motion.div>
  );
}
