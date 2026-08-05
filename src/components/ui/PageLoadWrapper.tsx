"use client";

import { useEffect, useState } from "react";
import { GlobalLoader } from "./GlobalLoader";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export function PageLoadWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // If the document is already fully loaded
    if (document.readyState === "complete") {
      setIsLoading(false);
      return;
    }

    // Otherwise, wait for the window load event
    const handleLoad = () => {
      // Add a tiny delay to ensure animations and initial renders are smooth
      setTimeout(() => setIsLoading(false), 300);
    };

    window.addEventListener("load", handleLoad);
    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <>
      <AnimatePresence>{isLoading ? <motion.div className="pointer-events-auto fixed inset-0 z-[99999]" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={reduceMotion ? { duration: 0 } : { duration: .45 }}><GlobalLoader /></motion.div> : null}</AnimatePresence>
      {children}
    </>
  );
}
