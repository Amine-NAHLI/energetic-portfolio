import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Gauge, Target } from "lucide-react";
import EnergyFlowDiagram from "@/components/energy/EnergyFlowDiagram";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/ui/JsonLd";
import ProjectGallery from "@/components/ui/ProjectGallery";
import SkillIcon from "@/components/ui/SkillIcon";
import { getSiteUrl } from "@/config/site";
import { projectCategoryLabels, publicCopy } from "@/content/copy";
import { getProjectGallery, getPublishedProject } from "@/features/projects/data";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type ProjectPageProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const project = await getPublishedProject(locale, slug);
  if (!project) return {};
  return createPageMetadata({ locale, title: project.title, description: project.summary[locale], path: `/projects/${slug}` });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const project = await getPublishedProject(locale, slug);
  if (!project) notFound();
  const gallery = await getProjectGallery(slug);
  const copy = publicCopy[locale].projects;
  const hasCaseStudy = project.problem[locale] !== project.summary[locale];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareSourceCode", name: project.title, description: project.summary[locale], programmingLanguage: project.technologies, url: new URL(`/${locale}/projects/${project.slug}`, getSiteUrl()).toString(), codeRepository: project.githubUrl, sameAs: [project.githubUrl, project.demoUrl].filter(Boolean), author: { "@type": "Person", name: "Amine Nahli" } }} />
      <article>
        <header className="engineering-surface relative overflow-hidden border-b border-border py-12 sm:py-16 lg:py-20">
          <Container>
            <Link href={`/${locale}/projects`} className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"><ArrowLeft aria-hidden="true" className="size-4" />{copy.back}</Link>
            <div className="mt-8 grid gap-9 lg:grid-cols-[minmax(0,.8fr)_minmax(28rem,1.2fr)] lg:items-end lg:gap-14">
              <div>
                <div className="flex flex-wrap gap-2">{project.categories.map((category) => <Badge key={category}>{projectCategoryLabels[category][locale]}</Badge>)}</div>
                <p className="mt-7 font-mono text-[.66rem] font-semibold uppercase tracking-[.13em] text-accent">{locale === "fr" ? "Dossier d’étude" : "Case study dossier"} · {project.slug}</p>
                <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.04] tracking-[-.045em] text-text-primary sm:text-6xl lg:text-7xl">{project.title}</h1>
                <p className="mt-5 text-xl font-medium leading-8 text-accent sm:text-2xl">{project.subtitle[locale]}</p>
                <p className="mt-7 max-w-3xl text-pretty text-base leading-8 text-text-secondary">{project.summary[locale]}</p>
              </div>
              {gallery.length > 0 ? <ProjectGallery images={gallery} locale={locale} /> : project.coverImage ? (
                <div className="aspect-[16/10] overflow-hidden border border-border bg-surface">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.coverImage} alt={project.title} className="size-full object-cover" />
                </div>
              ) : <div aria-hidden="true" className="engineering-surface aspect-[16/10] border border-border bg-surface" />}
            </div>
          </Container>
        </header>

        <Container className="py-14 sm:py-20">
          {hasCaseStudy ? (
            <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:gap-20">
              <div className="min-w-0 space-y-20">
                <section aria-labelledby="overview-heading" className="grid gap-8 border-b border-border pb-16 md:grid-cols-[.38fr_.62fr]">
                  <div><p className="eyebrow">01 · {locale === "fr" ? "Vue d’ensemble" : "Overview"}</p><h2 id="overview-heading" className="mt-4 text-3xl font-semibold text-text-primary">{copy.problem}</h2></div>
                  <p className="text-lg leading-8 text-text-secondary">{project.problem[locale]}</p>
                </section>

                {project.objectives.length > 0 ? <section aria-labelledby="objectives-heading"><div className="flex items-center gap-4"><Target aria-hidden="true" className="size-6 text-accent" /><div><p className="eyebrow">02</p><h2 id="objectives-heading" className="mt-2 text-3xl font-semibold text-text-primary">{copy.objectives}</h2></div></div><ol className="mt-8 grid border-t border-border sm:grid-cols-2">{project.objectives.map((objective, index) => <li key={objective[locale]} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"><span className="font-mono text-[.65rem] text-accent">{String(index + 1).padStart(2, "0")}</span><span className="text-sm leading-6 text-text-secondary">{objective[locale]}</span></li>)}</ol></section> : null}

                {project.solution[locale] ? <section aria-labelledby="solution-heading" className="engineering-surface border-l-2 border-accent bg-surface px-6 py-8 sm:px-10 sm:py-10"><p className="eyebrow">03 · {locale === "fr" ? "Réponse technique" : "Technical response"}</p><h2 id="solution-heading" className="mt-4 text-3xl font-semibold text-text-primary">{copy.solution}</h2><p className="mt-6 text-base leading-8 text-text-secondary">{project.solution[locale]}</p></section> : null}

                {project.architecture.length > 0 ? <section aria-labelledby="architecture-heading"><div className="max-w-3xl"><p className="eyebrow">04 · {locale === "fr" ? "Flux système" : "System flow"}</p><h2 id="architecture-heading" className="mt-4 text-3xl font-semibold text-text-primary">{copy.architecture}</h2></div><div className="mt-8"><EnergyFlowDiagram items={project.architecture} locale={locale} /></div></section> : null}

                {project.results.length > 0 ? <section aria-labelledby="results-heading"><div className="flex items-center gap-4"><Gauge aria-hidden="true" className="size-6 text-accent" /><div><p className="eyebrow">05</p><h2 id="results-heading" className="mt-2 text-3xl font-semibold text-text-primary">{copy.documentedResults}</h2></div></div><ul className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">{project.results.map((result, index) => <li key={result[locale]} className="bg-surface p-6"><p className="font-mono text-[.65rem] uppercase tracking-[.12em] text-accent">{locale === "fr" ? "Résultat" : "Outcome"} {String(index + 1).padStart(2, "0")}</p><p className="mt-4 text-base leading-7 text-text-primary">{result[locale]}</p></li>)}</ul></section> : null}

                {gallery.length > 1 ? <section aria-labelledby="gallery-heading"><p className="eyebrow">06</p><h2 id="gallery-heading" className="mt-4 text-3xl font-semibold text-text-primary">{locale === "fr" ? "Galerie du projet" : "Project gallery"}</h2><div className="mt-8"><ProjectGallery images={gallery} locale={locale} /></div></section> : null}
              </div>

              <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="border-t-2 border-accent bg-surface p-6">
                  <p className="font-mono text-[.65rem] font-semibold uppercase tracking-[.12em] text-text-muted">{copy.technologies}</p>
                  <ul className="mt-5 grid gap-3">{project.technologies.map((technology) => <li key={technology} className="flex items-center gap-3 border-b border-border pb-3 text-sm font-semibold text-text-primary last:border-b-0 last:pb-0"><SkillIcon name={technology} className="text-[22px]" />{technology}</li>)}</ul>
                  {project.githubUrl || project.demoUrl ? <div className="mt-7 grid gap-2 border-t border-border pt-5">{project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="button-secondary"><ArrowUpRight aria-hidden="true" className="size-4" />{copy.sourceCode}</a> : null}{project.demoUrl ? <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="button-primary"><ArrowUpRight aria-hidden="true" className="size-4" />{copy.liveDemo}</a> : null}</div> : null}
                </div>
                <p className="mt-5 text-xs leading-5 text-text-muted">{copy.sourceNote}</p>
              </aside>
            </div>
          ) : (
            <section aria-labelledby="description-heading" className="mx-auto max-w-4xl"><p className="eyebrow">01</p><h2 id="description-heading" className="mt-4 text-3xl font-semibold text-text-primary">Description</h2><p className="mt-6 whitespace-pre-wrap text-base leading-8 text-text-secondary">{project.summary[locale]}</p></section>
          )}
        </Container>
      </article>
    </>
  );
}
