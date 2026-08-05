import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { isLocale } from "@/i18n/config";
import { getPublicContactLinks } from "@/features/portfolio/data";
import { createAdminClient } from "@/lib/supabase/admin";
import { notFound, redirect } from "next/navigation";
import { publicCopy } from "@/content/copy";

type CvPageProps = { params: Promise<{ locale: string }> };

export const metadata: Metadata = {
  title: "Curriculum Vitae",
  robots: { index: false, follow: false },
};

export default async function CvPage({ params }: CvPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const links = await getPublicContactLinks();
  const cvMediaId = (links as Record<string, unknown>).cvMediaId as string | undefined;

  if (cvMediaId) {
    const supabase = createAdminClient();
    const { data: media } = await supabase
      .from("media_assets")
      .select("bucket_id, storage_path, mime_type")
      .eq("id", cvMediaId)
      .maybeSingle();

    if (media) {
      const { data: signed } = await supabase.storage.from(media.bucket_id).createSignedUrl(media.storage_path, 60);
      if (signed?.signedUrl) {
        redirect(signed.signedUrl);
      }
    }
  }

  // Fallback: Display the request UI
  const copy = publicCopy[locale];

  return (
    <article className="min-h-screen pt-32 pb-24 flex items-center justify-center">
      <Container className="max-w-xl w-full">
        <div className="bg-surface border border-border rounded-sm p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex size-16 items-center justify-center rounded-full bg-surface-raised mb-6">
            <Mail className="size-8 text-accent" />
          </div>
          
          <h1 className="text-3xl font-display font-semibold text-text-primary tracking-tight mb-4">
            {locale === "fr" ? "Curriculum Vitae sur demande" : "Resume upon request"}
          </h1>
          
          <p className="text-text-secondary leading-relaxed mb-8 max-w-sm mx-auto text-balance">
            {locale === "fr" 
              ? "Merci de contacter Zouhour pour obtenir son CV mis à jour." 
              : "Please contact Zouhour to get the latest resume."}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href={`/${locale}/contact`} 
              className="button-primary w-full sm:w-auto"
            >
              {locale === "fr" ? "Me contacter" : "Contact me"}
              <ArrowUpRight className="size-4" />
            </Link>
            
            <Link 
              href={`/${locale}`} 
              className="button-secondary w-full sm:w-auto"
            >
              <ArrowLeft className="size-4" />
              {copy.projects.back}
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
