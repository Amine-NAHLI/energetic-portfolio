import type { Metadata } from "next";
import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import { publicCopy } from "@/content/copy";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/contact/ContactForm";
import { getPublicContactLinks } from "@/features/portfolio/data";

type ContactPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const copy = publicCopy[locale].contact;
  return createPageMetadata({ locale, title: copy.title, description: copy.description, path: "/contact" });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = publicCopy[locale].contact;
  const contactLinks = await getPublicContactLinks();
  const links = [
    { label: copy.email, value: contactLinks.email.replace("mailto:", ""), href: contactLinks.email, icon: Mail, external: false },
    { label: copy.linkedin, value: contactLinks.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\//, ""), href: contactLinks.linkedin, icon: LinkedinIcon, external: true },
    { label: copy.github, value: contactLinks.github.replace(/^https?:\/\/(www\.)?/, ""), href: contactLinks.github, icon: GithubIcon, external: true },
  ];

  return (
    <>
      <PageIntro eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
          <aside className="engineering-surface border-t-2 border-accent bg-surface p-6 sm:p-8">
            <p className="font-mono text-[.65rem] font-semibold uppercase tracking-[.12em] text-text-muted">{locale === "fr" ? "Coordonnées" : "Contact details"}</p>
            <div className="mt-6 grid">
              {links.map(({ label, value, href, icon: Icon, external }) => (
                <a key={href} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} data-analytics-event={href === contactLinks.github ? "github_click" : undefined} className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-border py-5 first:border-t transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  <Icon aria-hidden="true" className="size-5 text-accent" />
                  <span><span className="block text-xs font-semibold text-text-primary">{label}</span><span className="mt-1 block break-all text-xs text-text-muted">{value}</span></span>
                  {external ? <ArrowUpRight aria-hidden="true" className="size-4 shrink-0 text-text-muted transition-colors group-hover:text-accent" /> : null}
                </a>
              ))}
            </div>
          </aside>
          <ContactForm locale={locale} />
        </div>
      </Container>
    </>
  );
}
