import type { Metadata } from "next";
import { ArrowRight, Award, BriefcaseBusiness, FileText, GraduationCap, Quote, Wrench } from "lucide-react";
import EnergyHeroVisual from "@/components/energy/EnergyHeroVisual";
import EnergyThread from "@/components/energy/EnergyThread";
import ProjectSummaryCard from "@/components/projects/ProjectSummaryCard";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import ButtonLink from "@/components/ui/ButtonLink";
import CertificationCard from "@/components/ui/CertificationCard";
import Container from "@/components/ui/Container";
import JsonLd from "@/components/ui/JsonLd";
import PortfolioEmptyState from "@/components/ui/PortfolioEmptyState";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillIcon from "@/components/ui/SkillIcon";
import { getSiteUrl, siteConfig } from "@/config/site";
import { publicCopy } from "@/content/copy";
import { getHomeCopy } from "@/content/dynamic-copy";
import { getPublicCertifications, getPublicContactLinks, getPublicJourney, getPublicTestimonials } from "@/features/portfolio/data";
import { getPublishedProjects } from "@/features/projects/data";
import { isLocale, type Locale } from "@/i18n/config";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

type HomePageProps = { params: Promise<{ locale: string }> };

export const revalidate = 3600;

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = await getHomeCopy(locale);
  return createPageMetadata({ locale, title: copy.eyebrow, description: copy.introduction });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale = isLocale(localeParam) ? localeParam : "fr";
  if (!isLocale(locale)) notFound();

  const copy = await getHomeCopy(locale);
  const [projects, certifications, testimonials, journey, contactLinks] = await Promise.all([
    getPublishedProjects(locale),
    getPublicCertifications(locale),
    getPublicTestimonials(locale),
    getPublicJourney(locale),
    getPublicContactLinks(),
  ]);
  const featuredProjects = (projects.some((project) => project.featured) ? projects.filter((project) => project.featured) : projects).slice(0, 3);
  const allTechnologies = Array.from(new Set(projects.flatMap((project) => project.coreTechnologies || project.technologies || []))).filter(Boolean);
  const displayTechnologies = allTechnologies.slice(0, 12);
  const displayCertifications = (certifications.some((certification) => certification.featured) ? certifications.filter((certification) => certification.featured) : certifications).slice(0, 3);
  const displayTestimonials = (testimonials.some((testimonial) => testimonial.featured) ? testimonials.filter((testimonial) => testimonial.featured) : testimonials).slice(0, 3);
  const displayJourney = journey.slice(0, 3);
  const portfolioIndicators = [
    { value: projects.length, label: locale === "fr" ? "Dossiers publiés" : "Published studies" },
    { value: journey.length, label: locale === "fr" ? "Étapes du parcours" : "Journey milestones" },
    { value: certifications.length, label: locale === "fr" ? "Certifications" : "Certifications" },
  ].filter((indicator) => indicator.value > 0);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "Person", "@id": new URL("/#person", getSiteUrl()).toString(), name: siteConfig.name, url: new URL(`/${locale}`, getSiteUrl()).toString(), homeLocation: siteConfig.location[locale], sameAs: [contactLinks.github, contactLinks.linkedin, contactLinks.tryHackMe], alumniOf: { "@type": "CollegeOrUniversity", name: "Université Privée de Fès" } },
          { "@type": "WebSite", name: `${siteConfig.name} — Portfolio`, url: getSiteUrl().toString(), inLanguage: locale, author: { "@id": new URL("/#person", getSiteUrl()).toString() } },
        ],
      }} />

      <div className="energy-journey relative">
      <EnergyThread />
      <section id="home" className="relative overflow-hidden border-b border-border py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,.88fr)_minmax(30rem,1.12fr)] lg:gap-12">
            <ScrollReveal yOffset={18} className="order-2 lg:order-1">
              <div className="max-w-3xl">
                <p className="eyebrow">{copy.eyebrow}</p>
                <h1 className="mt-6 text-balance font-display text-[clamp(3.25rem,8vw,7rem)] font-semibold leading-[.94] tracking-[-.055em] text-text-primary">
                  {siteConfig.name}
                </h1>
                <p className="mt-7 max-w-2xl text-pretty text-xl font-medium leading-8 text-text-primary sm:text-2xl sm:leading-9">{copy.title}</p>
                <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-text-secondary sm:text-lg">{copy.introduction}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href={`/${locale}/contact`}>{copy.contactCta}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink>
                  <ButtonLink href={contactLinks.resume} target="_blank" rel="noreferrer" variant="secondary" data-analytics-event="cv_open"><FileText aria-hidden="true" className="size-4" />{copy.resumeCta}</ButtonLink>
                </div>
                <dl className="mt-10 grid border-y border-border sm:grid-cols-3">
                  {copy.proofItems.map(([term, description]) => (
                    <div key={term} className="border-b border-border py-4 last:border-b-0 sm:border-b-0 sm:border-r sm:px-4 sm:first:pl-0 sm:last:border-r-0">
                      <dt className="font-mono text-[.62rem] font-semibold uppercase tracking-[.12em] text-accent">{term}</dt>
                      <dd className="mt-2 text-xs leading-5 text-text-secondary">{description}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>
            <ScrollReveal yOffset={24} delay={.08} className="order-1 lg:order-2">
              <EnergyHeroVisual locale={locale} />
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="energy-section py-16 sm:py-24">
        <Container>
          <ScrollReveal yOffset={28}>
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <SectionHeading eyebrow={copy.proofEyebrow} title={copy.proofTitle} description={copy.proofDescription} />
              <div className="engineering-surface border-l-2 border-accent bg-surface px-6 py-7 sm:px-9">
                <p className="font-mono text-[.65rem] font-semibold uppercase tracking-[.12em] text-text-muted">{locale === "fr" ? "Dossier de profil" : "Profile dossier"}</p>
                <p className="mt-5 text-pretty text-xl leading-8 text-text-primary sm:text-2xl">{copy.introduction}</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {portfolioIndicators.length > 0 ? (
        <section aria-label={locale === "fr" ? "Indicateurs du portfolio" : "Portfolio indicators"} className="relative border-b border-border bg-surface-deep/45">
          <Container>
            <dl className="grid sm:grid-cols-3">
              {portfolioIndicators.map((indicator, index) => (
                <div key={indicator.label} className="relative grid grid-cols-[auto_1fr] items-center gap-4 border-b border-border py-6 last:border-b-0 sm:border-b-0 sm:border-r sm:px-6 sm:first:pl-0 sm:last:border-r-0">
                  <dd className="font-display text-4xl font-semibold tabular-nums text-text-primary">{String(indicator.value).padStart(2, "0")}</dd>
                  <dt className="font-mono text-[.62rem] font-semibold uppercase tracking-[.11em] text-text-muted">{indicator.label}<span aria-hidden="true" className="mt-2 block h-px w-full bg-gradient-to-r from-accent to-transparent" /></dt>
                  <span aria-hidden="true" className="absolute right-2 top-2 font-mono text-[.5rem] text-accent/70">M-{String(index + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </dl>
          </Container>
        </section>
      ) : null}

      {displayTechnologies.length > 0 ? (
        <section id="expertise" className="energy-section py-16 sm:py-24">
          <Container>
            <ScrollReveal yOffset={28}>
              <div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
                <div>
                  <Wrench aria-hidden="true" className="size-7 text-accent" />
                  <SectionHeading className="mt-6" eyebrow={copy.skillsEyebrow} title={copy.skillsTitle} description={copy.skillsDescription} />
                  <ButtonLink href={`/${locale}/skills`} variant="secondary" className="mt-7">{copy.allSkills}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink>
                </div>
                <ol className="grid border-t border-border sm:grid-cols-2">
                  {displayTechnologies.map((technology, index) => (
                    <li key={technology} className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-border px-1 py-4 sm:odd:border-r sm:odd:pr-5 sm:even:pl-5">
                      <span className="font-mono text-[.62rem] text-text-muted">{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-sm font-semibold text-text-primary">{technology}</span>
                      <SkillIcon name={technology} className="text-[22px]" />
                    </li>
                  ))}
                </ol>
              </div>
            </ScrollReveal>
          </Container>
        </section>
      ) : null}

      <section id="projects" className="energy-section py-16 sm:py-24">
        <Container>
          <ScrollReveal yOffset={28}>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow={copy.projectsEyebrow} title={copy.projectsTitle} description={copy.projectsDescription} />
              <ButtonLink href={`/${locale}/projects`} variant="secondary" className="shrink-0 self-start md:self-auto">{copy.allProjects}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink>
            </div>
            {featuredProjects.length ? <div className="mt-10 grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(22rem,.65fr)]"><ProjectSummaryCard project={featuredProjects[0]} locale={locale} cta={publicCopy[locale].projects.viewProject} index="01" />{featuredProjects.length > 1 ? <div className="grid gap-6">{featuredProjects.slice(1).map((project, index) => <ProjectSummaryCard key={project.slug} project={project} locale={locale} cta={publicCopy[locale].projects.viewProject} index={String(index + 2).padStart(2, "0")} />)}</div> : null}</div> : <PortfolioEmptyState collection="projects" locale={locale} className="mt-10" />}
          </ScrollReveal>
        </Container>
      </section>

      <section id="journey" className="energy-section py-16 sm:py-24">
        <Container>
          <ScrollReveal yOffset={28}>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow={publicCopy[locale].journey.eyebrow} title={publicCopy[locale].journey.title} description={publicCopy[locale].journey.description} />
              <ButtonLink href={`/${locale}/journey`} variant="secondary" className="shrink-0 self-start md:self-auto">{locale === "fr" ? "Tout le parcours" : "Full journey"}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink>
            </div>
            {displayJourney.length ? <ol className="relative mt-12 grid gap-0 lg:grid-cols-3 lg:border-t lg:border-border">{displayJourney.map((entry, index) => { const Icon = entry.type === "experience" ? BriefcaseBusiness : GraduationCap; return <li key={entry.id} className="relative border-l border-border pb-10 pl-8 last:pb-0 lg:border-l-0 lg:border-r lg:px-7 lg:pb-0 lg:pt-9 lg:last:border-r-0"><span className="absolute -left-[.45rem] top-0 size-3.5 border-2 border-accent bg-bg-page lg:-top-[.45rem] lg:left-7" /><Icon aria-hidden="true" className="size-5 text-accent" /><p className="mt-5 font-mono text-[.65rem] uppercase tracking-[.1em] text-text-muted">{String(index + 1).padStart(2, "0")} · {entry.eventDate}</p><h3 className="mt-3 text-xl font-semibold text-text-primary">{entry.title}</h3><p className="mt-4 text-sm leading-6 text-text-secondary">{entry.description}</p></li>; })}</ol> : <PortfolioEmptyState collection="journey" locale={locale} className="mt-10" />}
          </ScrollReveal>
        </Container>
      </section>

      <section id="certifications" className="energy-section py-16 sm:py-24">
        <Container>
          <ScrollReveal yOffset={28}>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow={copy.certificationsEyebrow} title={copy.certificationsTitle} /><ButtonLink href={`/${locale}/certifications`} variant="secondary" className="shrink-0 self-start md:self-auto">{copy.certificationsCta}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink></div>
            {displayCertifications.length ? <div className="mt-10 grid gap-6 md:grid-cols-3">{displayCertifications.map((certification) => <CertificationCard key={certification.id} certification={certification} locale={locale} copy={publicCopy[locale].certifications} compact />)}</div> : <PortfolioEmptyState collection="certifications" locale={locale} className="mt-10" />}
          </ScrollReveal>
        </Container>
      </section>

      <section id="testimonials" className="energy-section py-16 sm:py-24">
        <Container>
          <ScrollReveal yOffset={28}>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><SectionHeading eyebrow={locale === "fr" ? "Recommandations" : "Recommendations"} title={locale === "fr" ? "Retours professionnels" : "Professional feedback"} /><div className="flex flex-col items-start gap-3 sm:flex-row"><TestimonialForm locale={locale as Locale} inline /><ButtonLink href={`/${locale}/testimonials`} variant="secondary">{locale === "fr" ? "Tous les avis" : "All feedback"}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink></div></div>
            {displayTestimonials.length ? <div className="mt-10 grid gap-6 md:grid-cols-3">{displayTestimonials.map((testimonial) => <figure key={testimonial.id} className="border-t-2 border-accent bg-surface p-6 sm:p-7"><Quote aria-hidden="true" className="size-6 text-accent" /><blockquote className="mt-5 text-base leading-7 text-text-secondary">“{testimonial.message.length > 180 ? `${testimonial.message.substring(0, 180)}…` : testimonial.message}”</blockquote><figcaption className="mt-7 border-t border-border pt-4"><p className="font-semibold text-text-primary">{testimonial.name}</p>{testimonial.role || testimonial.organization ? <p className="mt-1 text-xs text-text-muted">{[testimonial.role, testimonial.organization].filter(Boolean).join(" — ")}</p> : null}</figcaption></figure>)}</div> : <PortfolioEmptyState collection="testimonials" locale={locale} className="mt-10" />}
          </ScrollReveal>
        </Container>
      </section>

      <section id="contact" className="energy-section py-16 sm:py-24">
        <Container>
          <ScrollReveal yOffset={28}>
            <div className="engineering-surface grid overflow-hidden border border-border bg-surface lg:grid-cols-[1fr_auto] lg:items-end"><div className="p-7 sm:p-10 lg:p-14"><Award aria-hidden="true" className="size-7 text-accent" /><p className="eyebrow mt-7">{copy.contactEyebrow}</p><h2 className="mt-4 max-w-3xl text-balance text-3xl font-semibold text-text-primary sm:text-4xl lg:text-5xl">{copy.contactTitle}</h2><p className="mt-5 max-w-2xl text-pretty leading-7 text-text-secondary">{copy.contactDescription}</p></div><div className="border-t border-border p-7 lg:border-l lg:border-t-0 lg:p-10"><ButtonLink href={`/${locale}/contact`}>{copy.contactCta}<ArrowRight aria-hidden="true" className="size-4" /></ButtonLink></div></div>
          </ScrollReveal>
        </Container>
      </section>
      </div>
    </>
  );
}
