"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

type GalleryImage = { mediaId: string; url: string; altFr: string | null; altEn: string | null };
type ProjectGalleryProps = { images: GalleryImage[]; locale: string };

export default function ProjectGallery({ images, locale }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const reduceMotion = useReducedMotion();
  const labels = locale === "fr" ? { previous: "Image précédente", next: "Image suivante", close: "Fermer la galerie", go: "Aller à l’image" } : { previous: "Previous image", next: "Next image", close: "Close gallery", go: "Go to image" };
  const selected = images[selectedIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (lightboxOpen && !dialog.open) dialog.showModal();
    if (!lightboxOpen && dialog.open) dialog.close();
  }, [lightboxOpen]);

  if (!selected) return null;

  const nextImage = () => setSelectedIndex((previous) => (previous + 1) % images.length);
  const previousImage = () => setSelectedIndex((previous) => (previous - 1 + images.length) % images.length);
  const alt = locale === "fr" ? selected.altFr ?? "" : selected.altEn ?? "";

  return (
    <>
      <div className="group relative w-full overflow-hidden border border-border bg-surface-subtle shadow-lg">
        <button type="button" onClick={() => setLightboxOpen(true)} className="relative block aspect-[16/10] w-full overflow-hidden bg-surface-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent" aria-label={alt || (locale === "fr" ? "Agrandir l’image du projet" : "Enlarge project image")}>
          <AnimatePresence mode="wait" initial={false}><motion.img key={selected.mediaId} src={selected.url} alt={alt} className="absolute inset-0 size-full object-contain p-4 sm:p-7" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .25 }} loading={selectedIndex === 0 ? "eager" : "lazy"} /></AnimatePresence>
        </button>
        {images.length > 1 ? <><button type="button" onClick={previousImage} className="absolute left-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/20 bg-[#06171d]/85 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={labels.previous}><ChevronLeft aria-hidden="true" className="size-5" /></button><button type="button" onClick={nextImage} className="absolute right-3 top-1/2 grid size-11 -translate-y-1/2 place-items-center border border-white/20 bg-[#06171d]/85 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={labels.next}><ChevronRight aria-hidden="true" className="size-5" /></button><div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 bg-[#06171d]/85 p-2">{images.map((image, index) => <button key={image.mediaId} type="button" onClick={() => setSelectedIndex(index)} className={cn("size-2.5 border border-white/50", index === selectedIndex ? "bg-accent" : "bg-white/30")} aria-label={`${labels.go} ${index + 1}`} aria-current={index === selectedIndex ? "true" : undefined} />)}</div></> : null}
      </div>

      <dialog ref={dialogRef} className="m-auto h-dvh max-h-none w-dvw max-w-none border-0 bg-black/92 p-0 text-white backdrop:bg-black/92" onClose={() => setLightboxOpen(false)} onCancel={() => setLightboxOpen(false)} aria-label={locale === "fr" ? "Galerie du projet" : "Project gallery"}>
        <div className="grid size-full place-items-center p-5 sm:p-10"><button type="button" onClick={() => setLightboxOpen(false)} className="absolute right-4 top-4 z-10 grid size-11 place-items-center border border-white/25 bg-black/55 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6 sm:top-6" aria-label={labels.close}><X aria-hidden="true" className="size-6" /></button><AnimatePresence mode="wait" initial={false}><motion.img key={selected.mediaId} src={selected.url} alt={alt} className="max-h-[88dvh] max-w-[90dvw] object-contain" initial={reduceMotion ? false : { opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} exit={reduceMotion ? undefined : { opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }} /></AnimatePresence>{images.length > 1 ? <><button type="button" onClick={previousImage} className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/25 bg-black/55 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-6" aria-label={labels.previous}><ChevronLeft aria-hidden="true" className="size-6" /></button><button type="button" onClick={nextImage} className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center border border-white/25 bg-black/55 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-6" aria-label={labels.next}><ChevronRight aria-hidden="true" className="size-6" /></button></> : null}</div>
      </dialog>
    </>
  );
}
