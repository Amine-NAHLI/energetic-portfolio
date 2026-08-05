"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Globe, Menu, Search, X } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/layout/ThemeToggle";
import CvButton from "@/components/ui/CvButton";
import { siteConfig } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { getAlternateLocale, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type SiteHeaderProps = { locale: Locale; dictionary: Dictionary; resumeLink: string; hasCv: boolean };
type NavigationItem = { label: string; href: string; id: string };

export default function SiteHeader({ locale, dictionary, resumeLink, hasCv }: SiteHeaderProps) {
  const pathname = usePathname() ?? `/${locale}`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const alternateLocale = getAlternateLocale(locale);
  const navigation = useMemo<NavigationItem[]>(() => [
    { label: dictionary.nav.home, href: `/${locale}#home`, id: "home" }, 
    { label: dictionary.nav.projects, href: `/${locale}#projects`, id: "projects" },
    { label: dictionary.nav.journey, href: `/${locale}#journey`, id: "journey" },
    { label: dictionary.nav.certifications, href: `/${locale}#certifications`, id: "certifications" },
    { label: dictionary.nav.testimonials, href: `/${locale}#testimonials`, id: "testimonials" },
    { label: dictionary.nav.contact, href: `/${locale}#contact`, id: "contact" },
  ], [dictionary, locale]);
  const alternatePath = useMemo(() => { const segments = pathname.split("/"); segments[1] = alternateLocale; return segments.join("/") || `/${alternateLocale}`; }, [alternateLocale, pathname]);

  useEffect(() => { const dialog = dialogRef.current; if (!dialog) return; if (menuOpen && !dialog.open) dialog.showModal(); else if (!menuOpen && dialog.open) dialog.close(); }, [menuOpen]);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: "-30% 0px -70% 0px" });
    
    navigation.forEach(item => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, [navigation]);

  function closeMenu() { setMenuOpen(false); }
  function rememberLocale() { localStorage.setItem("portfolio-locale", alternateLocale); const secure = window.location.protocol === "https:" ? "; Secure" : ""; document.cookie = `portfolio-locale=${alternateLocale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`; }

  return <header className="fixed left-1/2 top-4 z-[100] w-[95%] max-w-5xl -translate-x-1/2 rounded-full border border-border/40 bg-surface/80 px-4 py-2 backdrop-blur-xl shadow-[0_8px_32px_color-mix(in_srgb,var(--accent)_15%,transparent)] supports-[backdrop-filter]:bg-surface/60 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_8px_40px_color-mix(in_srgb,var(--amber)_25%,transparent)] overflow-hidden">
    <motion.div 
      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-amber-400 via-emerald-400 to-cyan-400 origin-left z-0"
      style={{ scaleX }}
    />
    <Container className="relative flex items-center justify-between gap-3 px-2 sm:px-4 z-10">
      <Link href={`/${locale}`} className="group inline-flex min-h-11 items-center gap-3 rounded-sm text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={`${siteConfig.name} — ${dictionary.nav.home}`}>
        <span className="grid size-9 place-items-center border border-border-strong bg-surface text-xs font-bold tracking-[.12em] text-accent transition-all duration-300 group-hover:-rotate-3 group-hover:bg-accent group-hover:text-text-on-accent group-hover:shadow-[0_0_15px_color-mix(in_srgb,var(--accent)_60%,transparent)]">Z</span>
        <span className="hidden text-sm font-semibold tracking-tight transition-colors group-hover:text-accent sm:block">{siteConfig.name}</span>
      </Link>
      <nav className="hidden items-center gap-1 xl:flex relative" aria-label={dictionary.navigationLabel}>{navigation.map((item) => {
        const active = activeSection === item.id;
        return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={cn("relative px-4 py-2 text-[.76rem] font-semibold tracking-[.02em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent", active ? "text-accent" : "text-text-secondary hover:text-accent")}>
          {item.label}
          {active && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-4 rounded-full bg-accent" />}
        </Link>;
      })}</nav>
      <div className="flex items-center gap-1.5">
        <ThemeToggle />
        <Link href={`/${locale}/search`} className="inline-grid size-11 place-items-center rounded-sm text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={dictionary.nav.search}><Search aria-hidden="true" className="size-4" /></Link>
        <Link href={alternatePath} hrefLang={alternateLocale} onClick={rememberLocale} data-analytics-event="language_change" className="inline-flex min-h-11 items-center gap-2 rounded-sm px-3 text-xs font-semibold uppercase tracking-[.06em] text-text-secondary transition-colors hover:bg-surface-raised hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={dictionary.switchLanguage}><Globe aria-hidden="true" className="size-4" /><span>{alternateLocale}</span></Link>
        <CvButton hasCv={hasCv} locale={locale} href={resumeLink} className="hidden min-h-11 items-center gap-1.5 rounded-sm border border-border-strong bg-surface px-4 text-xs font-semibold uppercase tracking-[.05em] text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:inline-flex">{dictionary.nav.resume}<ArrowUpRight aria-hidden="true" className="size-4" /></CvButton>
        <button type="button" className="inline-grid size-11 place-items-center rounded-sm border border-border text-text-primary transition-colors hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent xl:hidden" aria-label={dictionary.openMenu} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(true)}><Menu aria-hidden="true" className="size-5" /></button>
      </div>
    </Container>
    <dialog ref={dialogRef} id="mobile-navigation" className="m-0 ml-auto h-dvh max-h-none w-full max-w-md border-l border-border bg-bg-page p-0 text-text-primary backdrop:bg-black/70" aria-label={dictionary.navigationLabel} onClose={() => setMenuOpen(false)} onCancel={() => setMenuOpen(false)}>
      <div className="flex min-h-full flex-col px-5 py-4 sm:px-8">
        <div className="flex min-h-12 items-center justify-between"><span className="font-mono text-xs font-semibold uppercase tracking-[.12em] text-text-muted">{dictionary.navigationLabel}</span><button type="button" className="inline-grid size-11 place-items-center rounded-sm border border-border text-text-primary hover:bg-surface-raised focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={dictionary.closeMenu} onClick={closeMenu}><X aria-hidden="true" className="size-5" /></button></div>
        <nav className="mt-10 flex flex-1 flex-col" aria-label={dictionary.navigationLabel}>{navigation.map((item) => { const active = activeSection === item.id; return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} onClick={closeMenu} className={cn("flex min-h-14 items-center border-b border-border font-display text-xl font-semibold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent", active ? "text-accent pl-4 border-l-4 border-l-accent" : "text-text-primary hover:text-accent")}>{item.label}</Link>; })}</nav>
        <div className="mt-10 grid gap-3 border-t border-border pt-6"><CvButton hasCv={hasCv} locale={locale} href={resumeLink} onClick={closeMenu} className="button-primary">{dictionary.nav.resume}<ArrowUpRight aria-hidden="true" className="size-4" /></CvButton><Link href={alternatePath} hrefLang={alternateLocale} onClick={() => { rememberLocale(); closeMenu(); }} data-analytics-event="language_change" className="button-secondary"><Globe aria-hidden="true" className="size-4" />{dictionary.alternateLanguageName}</Link></div>
      </div>
    </dialog>
  </header>;
}
