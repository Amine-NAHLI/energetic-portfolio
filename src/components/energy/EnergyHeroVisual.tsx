"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { BatteryCharging, Building2, Grid3X3, SunMedium, Wind, Zap } from "lucide-react";
import type { Locale } from "@/i18n/config";

const labels = {
  fr: ["Production", "Conversion", "Stockage", "Distribution"],
  en: ["Generation", "Conversion", "Storage", "Distribution"],
} as const;

const icons = [SunMedium, Wind, BatteryCharging, Grid3X3];

export default function EnergyHeroVisual({ locale }: { locale: Locale }) {
  const reduceMotion = useReducedMotion();

  return (
    <figure className="group energy-hero-visual relative min-h-[28rem] overflow-hidden bg-surface shadow-[0_2rem_6rem_rgba(0,10,15,.28)] transition-all duration-700 hover:shadow-[0_2rem_8rem_color-mix(in_srgb,var(--accent)_15%,transparent)] sm:min-h-[37rem] lg:min-h-[44rem] [clip-path:polygon(30px_0,100%_0,100%_calc(100%-30px),calc(100%-30px)_100%,0_100%,0_30px)] border-t border-l border-border/50">
      <Image
        src="/zouhour.jpeg"
        alt={locale === "fr" ? "Zouhour Bougriane" : "Zouhour Bougriane"}
        fill
        priority
        className="object-cover object-[center_25%]"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#041117]/85 via-transparent to-[#041117]/10" />
      <div aria-hidden="true" className="absolute inset-3 border border-white/15 transition-colors duration-500 group-hover:border-accent/40 sm:inset-6" />

      <div className="absolute inset-x-3 bottom-[7.25rem] flex items-center justify-between border-y border-white/15 bg-[#041117]/74 px-2 py-1.5 text-white backdrop-blur-sm sm:inset-x-6 sm:bottom-[6.75rem] sm:px-3 sm:py-2">
        <div className="flex items-center gap-1.5 sm:gap-2"><SunMedium aria-hidden="true" className="size-3.5 text-[#f1bd5c] sm:size-4" /><Wind aria-hidden="true" className="size-3.5 text-[#73c8d0] sm:size-4" /></div>
        <motion.div aria-hidden="true" className="mx-2 h-px flex-1 bg-gradient-to-r from-[#f1bd5c] via-[#6bd8a5] to-[#73c8d0] sm:mx-4" initial={reduceMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? 0 : 1.2, delay: .2 }} />
        <div className="flex items-center gap-1.5 sm:gap-2"><Zap aria-hidden="true" className="size-3.5 text-[#6bd8a5] sm:size-4" /><Building2 aria-hidden="true" className="size-3.5 text-[#73c8d0] sm:size-4" /></div>
      </div>
      <div className="absolute inset-x-3 bottom-3 grid grid-cols-2 gap-px bg-white/15 sm:inset-x-6 sm:bottom-6 sm:grid-cols-4">
        {labels[locale].map((label, index) => {
          const Icon = icons[index];
          return (
            <div key={label} className="flex min-h-[3.25rem] items-center gap-1.5 bg-[#06171d]/88 px-2 text-white backdrop-blur-sm sm:min-h-16 sm:gap-2 sm:px-3">
              <Icon aria-hidden="true" className="size-3.5 shrink-0 text-[#70d5a5] sm:size-4" />
              <span className="font-mono text-[.55rem] font-semibold uppercase tracking-[.1em] sm:text-[.6rem] sm:tracking-[.12em]">{String(index + 1).padStart(2, "0")} · {label}</span>
            </div>
          );
        })}
      </div>
      <figcaption className="sr-only">{locale === "fr" ? "Chaîne énergétique, de la production à la distribution" : "Energy chain, from generation to distribution"}</figcaption>
    </figure>
  );
}
