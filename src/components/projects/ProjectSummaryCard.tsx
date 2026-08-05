import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { PortfolioProject } from "@/types/content";

type ProjectSummaryCardProps = {
  project: PortfolioProject;
  locale: Locale;
  cta: string;
  index?: string;
};

export default function ProjectSummaryCard({ project, locale, cta, index }: ProjectSummaryCardProps) {
  const studyLabel = locale === "fr" ? "Étude technique" : "Technical study";
  const indicators = [
    { value: project.objectives.length, label: locale === "fr" ? "Objectifs" : "Objectives" },
    { value: project.architecture.length, label: locale === "fr" ? "Blocs système" : "System blocks" },
    { value: project.results.length, label: locale === "fr" ? "Résultats" : "Results" },
  ].filter((indicator) => indicator.value > 0);
  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-border px-5 py-3 font-mono text-[.62rem] uppercase tracking-[.11em] text-text-muted"><span>{index ?? "—"}</span><span>{studyLabel}</span></div>
      {project.coverImage ? (
        <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-subtle">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.coverImage} alt={project.title} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <svg aria-hidden="true" viewBox="0 0 320 70" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full text-white/70">
            <path d="M0 56L36 50 68 54 100 35 132 42 168 20 204 31 238 12 272 25 320 8" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0 62H320" stroke="currentColor" strokeOpacity=".32" />
          </svg>
        </div>
      ) : <div aria-hidden="true" className="engineering-surface aspect-[16/7] border-b border-border bg-surface-subtle" />}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap gap-2"></div>
        <div className="mt-6 flex-1"><h2 className="text-2xl font-semibold text-text-primary">{project.title}</h2><p className="mt-2 text-sm font-semibold text-accent">{project.subtitle[locale]}</p><p className="mt-4 line-clamp-4 text-sm leading-6 text-text-secondary">{project.summary[locale]}</p></div>
        {indicators.length > 0 ? <dl className="mt-7 grid grid-cols-3 border-y border-border">
          {indicators.map((indicator) => <div key={indicator.label} className="border-r border-border px-2 py-3 first:pl-0 last:border-r-0"><dt className="font-mono text-[.54rem] uppercase tracking-[.08em] text-text-muted">{indicator.label}</dt><dd className="mt-1 text-lg font-semibold tabular-nums text-text-primary">{String(indicator.value).padStart(2, "0")}</dd></div>)}
        </dl> : null}

        <Link href={`/${locale}/projects/${project.slug}`} className="mt-6 inline-flex min-h-11 items-center gap-2 self-start text-xs font-semibold uppercase tracking-[.05em] text-text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{cta}<ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
      </div>
    </article>
  );
}
