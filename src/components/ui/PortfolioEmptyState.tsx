import { Inbox } from "lucide-react";
import TechnicalFrame from "@/components/ui/TechnicalFrame";
import type { Locale } from "@/i18n/config";

type PortfolioCollection = "projects" | "journey" | "skills" | "certifications" | "testimonials";

const emptyCopy: Record<Locale, Record<PortfolioCollection, { title: string; description: string; action: string }>> = {
  fr: {
    projects: { title: "Aucun projet publié", description: "Ajoutez votre premier projet depuis l’administration pour commencer à documenter votre travail.", action: "Gérer les projets" },
    journey: { title: "Aucune étape de parcours", description: "Les expériences et formations apparaîtront ici après leur ajout dans l’administration.", action: "Gérer le parcours" },
    skills: { title: "Aucune compétence publiée", description: "Ajoutez des compétences et leurs catégories depuis l’administration pour construire cette cartographie.", action: "Gérer les compétences" },
    certifications: { title: "Aucune certification publiée", description: "Ajoutez vos certifications depuis l’administration pour les présenter ici.", action: "Gérer les certifications" },
    testimonials: { title: "Aucun témoignage publié", description: "Les recommandations approuvées apparaîtront ici après leur modération dans l’administration.", action: "Gérer les avis" },
  },
  en: {
    projects: { title: "No published projects yet", description: "Add your first project in the administration area to begin documenting your work.", action: "Manage projects" },
    journey: { title: "No journey entries yet", description: "Experiences and education will appear here after they are added in the administration area.", action: "Manage journey" },
    skills: { title: "No published skills yet", description: "Add skills and their categories in the administration area to build this map.", action: "Manage skills" },
    certifications: { title: "No published certifications yet", description: "Add certifications in the administration area to present them here.", action: "Manage certifications" },
    testimonials: { title: "No published testimonials yet", description: "Approved recommendations will appear here after they are moderated in the administration area.", action: "Manage testimonials" },
  },
};

export default function PortfolioEmptyState({ collection, locale, className }: { collection: PortfolioCollection; locale: Locale; className?: string }) {
  const copy = emptyCopy[locale][collection];

  return (
    <TechnicalFrame as="section" index="00" label={locale === "fr" ? "Module en attente" : "Module standby"} className={`group relative overflow-hidden bg-surface-subtle/50 p-8 text-center backdrop-blur-md sm:p-14 ${className ?? ""}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--accent)_12%,transparent),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="relative mx-auto flex size-16 items-center justify-center rounded-full border border-accent/40 bg-surface/60 shadow-[0_0_20px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
        <Inbox aria-hidden="true" className="size-7 animate-pulse text-accent" />
      </div>
      <h2 className="relative mt-5 font-display text-xl font-semibold tracking-wide text-text-primary">{copy.title}</h2>
      <p className="relative mx-auto mt-3 max-w-md text-[.85rem] leading-relaxed text-text-secondary">{copy.description}</p>
    </TechnicalFrame>
  );
}
