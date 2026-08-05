"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function BatteryMeter() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-5 w-10 items-center justify-start rounded-[3px] border-2 border-text-muted p-0.5">
      {/* Battery positive terminal */}
      <div className="absolute -right-1.5 top-1/2 h-2.5 w-1 -translate-y-1/2 rounded-r-[2px] bg-text-muted" />
      
      {/* Battery fill bars */}
      <div className="flex h-full w-full gap-0.5">
        {[1, 2, 3].map((bar) => (
          <motion.div
            key={bar}
            className="h-full flex-1 rounded-[1px] bg-accent"
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{
              duration: 0.3,
              delay: reduceMotion ? 0 : bar * 0.15 + 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
