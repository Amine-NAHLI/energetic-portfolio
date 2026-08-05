import type { Metadata } from "next";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import PortfolioEmptyState from "@/components/ui/PortfolioEmptyState";
import { getPublicJourney } from "@/features/portfolio/data";
import { publicCopy } from "@/content/copy";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type JourneyPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: JourneyPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = publicCopy[locale].journey;
  return createPageMetadata({ locale, title: copy.title, description: copy.description, path: "/journey" });
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = publicCopy[locale].journey;
  const entries = await getPublicJourney(locale);

  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <Container className="py-12 sm:py-16 lg:py-20">
        {entries.length === 0 ? <PortfolioEmptyState collection="journey" locale={locale} className="mx-auto max-w-3xl" /> : <ol className="relative mx-auto max-w-5xl border-l border-border">
          {entries.map((entry, index) => {
            const Icon = entry.type === "experience" ? BriefcaseBusiness : GraduationCap;
            return (
              <li key={entry.id} className="relative grid gap-5 border-b border-border py-8 pl-8 last:border-b-0 sm:grid-cols-[11rem_1fr] sm:gap-10 sm:py-10 sm:pl-10">
                <span className="absolute -left-[.45rem] top-10 size-3.5 border-2 border-accent bg-bg-page" />
                <div><span className="grid size-11 place-items-center border border-border-strong bg-surface text-accent">
                  <Icon aria-hidden="true" className="size-5" />
                </span><p className="mt-4 font-mono text-[.65rem] uppercase tracking-[.1em] text-text-muted">{String(index + 1).padStart(2, "0")} · {entry.eventDate}</p></div>
                <div><p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent">{entry.type === "experience" ? copy.experience : copy.education}</p><h2 className="mt-2 text-xl font-semibold text-text-primary sm:text-2xl">{entry.title}</h2><p className="mt-5 text-sm leading-7 text-text-secondary">{entry.description}</p></div>
              </li>
            );
          })}
        </ol>}
      </Container>
    </>
  );
}
