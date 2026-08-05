"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, BatteryCharging, Factory, Gauge, Network, SunMedium } from "lucide-react";
import type { Locale } from "@/i18n/config";

type LocalizedItem = Record<Locale, string>;

const phaseLabels = {
  fr: ["Source", "Conversion", "Contrôle", "Stockage", "Distribution", "Usage"],
  en: ["Source", "Conversion", "Control", "Storage", "Distribution", "Use"],
} as const;

const phaseIcons = [SunMedium, Gauge, Network, BatteryCharging, Network, Factory];
const phaseStyles = ["energy-flow--solar", "energy-flow--conversion", "energy-flow--control", "energy-flow--storage", "energy-flow--distribution", "energy-flow--usage"];

export default function EnergyFlowDiagram({ items, locale }: { items: LocalizedItem[]; locale: Locale }) {
  const reduceMotion = useReducedMotion();

  if (items.length === 0) return null;

  return (
    <div className="engineering-surface energy-flow relative overflow-hidden border border-border bg-surface-subtle px-4 py-7 sm:px-7 sm:py-9 lg:px-10">
      <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[.62rem] font-semibold uppercase tracking-[.13em] text-accent">{locale === "fr" ? "Synoptique fonctionnel" : "Functional schematic"}</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">{locale === "fr" ? "Lecture séquentielle des blocs techniques documentés dans le projet." : "Sequential reading of the technical blocks documented in the project."}</p>
        </div>
        <div aria-hidden="true" className="flex shrink-0 items-center gap-2 font-mono text-[.58rem] uppercase tracking-[.1em] text-text-muted">
          <span>{locale === "fr" ? "Entrée" : "Input"}</span><ArrowRight className="size-3.5 text-accent" /><span>{locale === "fr" ? "Sortie" : "Output"}</span>
        </div>
      </div>

      <div aria-hidden="true" className="energy-flow__bus hidden md:block">
        <motion.span className="energy-flow__bus-line" initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: .35 }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }} />
      </div>

      <ol className="energy-flow__grid relative mt-7 grid gap-4 md:grid-cols-2 md:gap-x-6 md:gap-y-8 xl:grid-cols-3">
        {items.map((item, index) => {
          const phaseIndex = index % phaseLabels[locale].length;
          const Icon = phaseIcons[phaseIndex];
          return (
            <motion.li key={`${index}-${item[locale]}`} className={`energy-flow__node ${phaseStyles[phaseIndex]} relative grid grid-cols-[2.75rem_1fr] gap-4 border border-border bg-surface p-4 sm:p-5 md:block`} initial={reduceMotion ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .45, delay: Math.min(index * .07, .35), ease: [0.16, 1, 0.3, 1] }}>
              <span className="energy-flow__port absolute -left-[.32rem] top-1/2 size-2.5 -translate-y-1/2 rounded-full border-2 border-surface md:-top-[.36rem] md:left-5 md:translate-y-0" />
              <span className="grid size-11 place-items-center border border-current bg-surface-subtle text-[var(--flow-color)] md:mb-5"><Icon aria-hidden="true" className="size-5" /></span>
              <div>
                <div className="flex items-center justify-between gap-3">
                  <p className="font-mono text-[.62rem] font-semibold uppercase tracking-[.12em] text-[var(--flow-color)]">{String(index + 1).padStart(2, "0")} · {phaseLabels[locale][phaseIndex]}</p>
                  {index < items.length - 1 ? <ArrowRight aria-hidden="true" className="hidden size-4 text-text-muted md:block" /> : null}
                </div>
                <p className="mt-2 text-sm leading-6 text-text-primary">{item[locale]}</p>
              </div>
              {index < items.length - 1 ? <ArrowDown aria-hidden="true" className="absolute -bottom-4 left-[.88rem] z-10 size-4 text-accent md:hidden" /> : null}
            </motion.li>
          );
        })}
      </ol>

      <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-5" aria-label={locale === "fr" ? "Légende du synoptique" : "Schematic legend"}>
        {phaseLabels[locale].slice(0, Math.min(items.length, phaseLabels[locale].length)).map((label, index) => (
          <li key={label} className="flex items-center gap-2 font-mono text-[.58rem] uppercase tracking-[.1em] text-text-muted"><span aria-hidden="true" className={`energy-flow__legend ${phaseStyles[index]}`} />{label}</li>
        ))}
      </ul>
    </div>
  );
}
