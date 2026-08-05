"use client";

import { useEffect, useState } from "react";
import { GlobalLoader } from "./GlobalLoader";
import { AnimatePresence } from "framer-motion";

export function PageLoadWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

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
      <AnimatePresence>
        {isLoading ? <GlobalLoader key="loader" /> : null}
      </AnimatePresence>
      {children}
    </>
  );
}
