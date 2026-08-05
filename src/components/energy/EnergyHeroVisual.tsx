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
    <figure className="group energy-hero-visual relative min-h-[22rem] overflow-hidden border border-border bg-surface shadow-[0_2rem_6rem_rgba(0,10,15,.28)] transition-all duration-700 hover:border-accent/40 hover:shadow-[0_2rem_8rem_color-mix(in_srgb,var(--accent)_15%,transparent)] sm:min-h-[37rem] lg:min-h-[44rem]">
      <Image
        src="/energy-system-hero.png"
        alt={locale === "fr" ? "Installation hybride associant panneaux photovoltaïques, éolienne, stockage et poste électrique" : "Hybrid installation combining solar panels, a wind turbine, storage and an electrical substation"}
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#041117]/85 via-transparent to-[#041117]/10" />
      <div aria-hidden="true" className="absolute inset-4 border border-white/15 transition-colors duration-500 group-hover:border-accent/40 sm:inset-6" />
      <div aria-hidden="true" className="absolute inset-x-8 top-8 hidden h-28 sm:block">
        <svg viewBox="0 0 560 120" className="size-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="energy-flow-gradient" x1="0" x2="1">
              <stop offset="0" stopColor="#f1bd5c" />
              <stop offset=".52" stopColor="#6bd8a5" />
              <stop offset="1" stopColor="#73c8d0" />
            </linearGradient>
          </defs>
          <path d="M20 72C120 72 100 28 198 28S276 88 366 88 432 45 540 45" fill="none" stroke="rgba(255,255,255,.24)" strokeWidth="1.5" />
          <motion.path
            d="M20 72C120 72 100 28 198 28S276 88 366 88 432 45 540 45"
            fill="none"
            stroke="url(#energy-flow-gradient)"
            strokeWidth="2.4"
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
          {[20, 198, 366, 540].map((cx, index) => (
            <motion.circle
              key={cx}
              cx={cx}
              cy={[72, 28, 88, 45][index]}
              r="5"
              fill={index === 0 ? "#f1bd5c" : index === 3 ? "#73c8d0" : "#6bd8a5"}
              initial={reduceMotion ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: reduceMotion ? 0 : .35 + index * .14, duration: .35 }}
            />
          ))}
        </svg>
      </div>
      <div className="absolute right-4 top-4 flex items-center gap-3 border border-white/20 bg-[#041117]/82 p-2 pr-3 text-white backdrop-blur-md transition-colors duration-500 group-hover:border-accent/40 group-hover:bg-[#041117]/90 sm:right-6 sm:top-6">
        <div className="relative size-11 overflow-hidden border border-white/20 sm:size-12">
          <Image src="/zouhour.jpeg" alt="" fill className="object-cover object-[center_20%]" sizes="48px" />
        </div>
        <div>
          <p className="font-mono text-[.55rem] font-semibold uppercase tracking-[.14em] text-[#70d5a5]">{locale === "fr" ? "Profil ingénieur" : "Engineer profile"}</p>
          <p className="mt-1 text-[.68rem] text-white/75">{locale === "fr" ? "Études & systèmes" : "Studies & systems"}</p>
        </div>
      </div>
      <div className="absolute inset-x-4 bottom-[9.4rem] flex items-center justify-between border-y border-white/15 bg-[#041117]/74 px-3 py-2 text-white backdrop-blur-sm sm:inset-x-6 sm:bottom-[6.75rem]">
        <div className="flex items-center gap-2"><SunMedium aria-hidden="true" className="size-4 text-[#f1bd5c]" /><Wind aria-hidden="true" className="size-4 text-[#73c8d0]" /></div>
        <motion.div aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-[#f1bd5c] via-[#6bd8a5] to-[#73c8d0]" initial={reduceMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? 0 : 1.2, delay: .2 }} />
        <div className="flex items-center gap-2"><Zap aria-hidden="true" className="size-4 text-[#6bd8a5]" /><Building2 aria-hidden="true" className="size-4 text-[#73c8d0]" /></div>
      </div>
      <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-px bg-white/15 sm:inset-x-6 sm:bottom-6 sm:grid-cols-4">
        {labels[locale].map((label, index) => {
          const Icon = icons[index];
          return (
            <div key={label} className="flex min-h-16 items-center gap-2 bg-[#06171d]/88 px-3 text-white backdrop-blur-sm">
              <Icon aria-hidden="true" className="size-4 shrink-0 text-[#70d5a5]" />
              <span className="font-mono text-[.6rem] font-semibold uppercase tracking-[.12em]">{String(index + 1).padStart(2, "0")} · {label}</span>
            </div>
          );
        })}
      </div>
      <figcaption className="sr-only">{locale === "fr" ? "Chaîne énergétique, de la production à la distribution" : "Energy chain, from generation to distribution"}</figcaption>
    </figure>
  );
}
