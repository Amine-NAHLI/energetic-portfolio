import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageIntro from "@/components/ui/PageIntro";
import PortfolioEmptyState from "@/components/ui/PortfolioEmptyState";
import TestimonialForm from "@/components/testimonials/TestimonialForm";
import { getPublicTestimonials } from "@/features/portfolio/data";
import { isLocale } from "@/i18n/config";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { Quote } from "lucide-react";

type TestimonialsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: TestimonialsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "fr" ? "Avis" : "Reviews";
  const description = locale === "fr" ? "Avis et recommandations de professionnels." : "Professional reviews and recommendations.";
  return createPageMetadata({ locale, title, description, path: "/testimonials" });
}

export default async function TestimonialsPage({ params }: TestimonialsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  
  const testimonials = await getPublicTestimonials(locale);

  return (
    <>
      <PageIntro 
        eyebrow={locale === "fr" ? "Témoignages" : "Testimonials"} 
        title={locale === "fr" ? "Retours Professionnels" : "Professional Feedback"} 
        description={locale === "fr" ? "Voici ce que les gens disent de mon travail et de notre collaboration." : "Here is what people have to say about my work and our collaboration."} 
      />
      
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="editorial-shell py-1">
          {testimonials.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <figure
                  key={testimonial.id} 
                  className="flex flex-col border-t-2 border-accent bg-surface p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between"><Quote aria-hidden="true" className="size-7 text-accent" /><span className="font-mono text-[.62rem] text-text-muted">{String(index + 1).padStart(2, "0")}</span></div>
                  <blockquote className="flex-1 text-base leading-relaxed text-text-secondary italic">
                    &quot;{testimonial.message}&quot;
                  </blockquote>
                  <figcaption className="mt-6 border-t border-border pt-4">
                    <p className="font-display font-semibold text-text-primary">
                      {testimonial.name}
                    </p>
                    {(testimonial.role || testimonial.organization) && (
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                        {[testimonial.role, testimonial.organization].filter(Boolean).join(" — ")}
                      </p>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <PortfolioEmptyState collection="testimonials" locale={locale} />
          )}
        </div>
      </Container>
      
      {/* Floating Action Button and Form */}
      <TestimonialForm locale={locale} />
    </>
  );
}
