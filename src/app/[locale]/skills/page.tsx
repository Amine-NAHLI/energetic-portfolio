import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import PortfolioEmptyState from "@/components/ui/PortfolioEmptyState";
import { getPublicSkillGroups } from "@/features/portfolio/data";
import { publicCopy } from "@/content/copy";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import SkillIcon from "@/components/ui/SkillIcon";

type SkillsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: SkillsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = publicCopy[locale].skills;
  return createPageMetadata({ locale, title: copy.title, description: copy.description, path: "/skills" });
}

export default async function SkillsPage({ params }: SkillsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = publicCopy[locale].skills;
  const skillGroups = await getPublicSkillGroups(locale);

  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <Container className="py-12 sm:py-16 lg:py-20">
        {skillGroups.length === 0 ? <PortfolioEmptyState collection="skills" locale={locale} className="mx-auto max-w-3xl" /> : <div className="grid gap-12">
          {skillGroups.map((group, groupIndex) => {
            const evidence = Array.from(new Set(group.skills.flatMap((skill) => skill.evidence)));
            return <section key={group.id} className="grid gap-7 border-t border-border pt-7 lg:grid-cols-[.34fr_.66fr] lg:gap-14">
              <header><p className="font-mono text-[.65rem] font-semibold uppercase tracking-[.12em] text-accent">{String(groupIndex + 1).padStart(2, "0")}</p><h2 className="mt-3 text-2xl font-semibold text-text-primary sm:text-3xl">{group.title}</h2>{group.description ? <p className="mt-4 text-sm leading-6 text-text-secondary">{group.description}</p> : null}{evidence.length ? <div className="mt-6"><h3 className="font-mono text-[.62rem] uppercase tracking-[.1em] text-text-muted">{copy.evidence}</h3><ul className="mt-2 grid gap-1">{evidence.map((slug) => <li key={slug}><Link href={`/${locale}/projects/${slug}`} className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-text-primary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{slug}<span className="sr-only"> — {copy.viewProject}</span><ArrowUpRight aria-hidden="true" className="size-4" /></Link></li>)}</ul></div> : null}</header>
              <ul className="grid border-t border-border sm:grid-cols-2">{group.skills.map((skill, index) => <li key={skill.name} className="grid grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-border py-4 sm:odd:border-r sm:odd:pr-5 sm:even:pl-5"><span className="font-mono text-[.6rem] text-text-muted">{String(index + 1).padStart(2, "0")}</span><div><p className="text-sm font-semibold text-text-primary">{skill.name}</p><p className="mt-1 text-[.68rem] capitalize text-text-muted">{skill.level}</p></div><SkillIcon name={skill.name} className="text-[22px]" /></li>)}</ul>
            </section>;
          })}
        </div>}
      </Container>
    </>
  );
}
