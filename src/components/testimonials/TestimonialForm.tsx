"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, MessageSquarePlus, Send, X } from "lucide-react";
import { submitTestimonial } from "@/app/[locale]/testimonials/actions";
import type { Locale } from "@/i18n/config";

export default function TestimonialForm({ locale, inline = false }: { locale: Locale; inline?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{ success?: boolean; error?: string; message?: string } | null>(null);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const copy = locale === "fr" ? {
    title: "Votre avis compte", firstName: "Prénom *", lastName: "Nom *", role: "Rôle / Profession", roleHint: "ex : Professeur, ingénieur…", company: "Entreprise / École", message: "Votre avis *", submit: "Envoyer l’avis", trigger: inline ? "Rédiger un avis sur mon profil" : "Laisser un avis", close: "Fermer le formulaire",
  } : {
    title: "Your feedback matters", firstName: "First Name *", lastName: "Last Name *", role: "Role / Profession", roleHint: "e.g. Professor, engineer…", company: "Company / School", message: "Your Review *", submit: "Submit Review", trigger: inline ? "Write a review about me" : "Leave a review", close: "Close form",
  };

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    closeButtonRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => { document.removeEventListener("keydown", handleKeyDown); trigger?.focus(); };
  }, [isOpen]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append("locale", locale);
    startTransition(async () => {
      try {
        const response = await submitTestimonial(null, formData);
        setResult(response);
        if (response.success) window.setTimeout(() => { setIsOpen(false); setResult(null); }, 3000);
      } catch {
        setResult({ success: false, error: locale === "fr" ? "Une erreur s’est produite lors de la connexion au serveur." : "A server connection error occurred." });
      }
    });
  }

  const modal = mounted ? createPortal(
    <AnimatePresence>
      {isOpen ? <motion.div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-[#031014]/82 p-4" role="dialog" aria-modal="true" aria-labelledby="testimonial-dialog-title" initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : .2 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
        <motion.div className="relative my-auto w-full max-w-lg border border-border bg-surface shadow-2xl" initial={reduceMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: reduceMotion ? 0 : .25, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center justify-between border-b border-border bg-surface-raised px-6 py-4"><h2 id="testimonial-dialog-title" className="font-display text-xl font-semibold text-text-primary">{copy.title}</h2><button ref={closeButtonRef} type="button" onClick={() => setIsOpen(false)} className="grid size-11 place-items-center border border-border text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={copy.close}><X aria-hidden="true" className="size-5" /></button></div>
          <div className="p-6">
            {result?.success ? <div className="flex flex-col items-center justify-center py-8 text-center" role="status"><CheckCircle2 aria-hidden="true" className="mb-4 size-14 text-success" /><p className="text-lg font-medium text-text-primary">{result.message}</p></div> : <form onSubmit={handleSubmit} className="grid gap-5 text-left">
              {result?.error ? <div className="border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-danger" role="alert">{result.error}</div> : null}
              <div className="grid gap-5 sm:grid-cols-2"><Field id="firstName" name="firstName" label={copy.firstName} required /><Field id="lastName" name="lastName" label={copy.lastName} required /></div>
              <div className="grid gap-5 sm:grid-cols-2"><Field id="role" name="role" label={copy.role} placeholder={copy.roleHint} /><Field id="company" name="company" label={copy.company} /></div>
              <div className="grid gap-2"><label htmlFor="testimonial-message" className="text-xs font-semibold uppercase tracking-[.06em] text-text-secondary">{copy.message}</label><textarea id="testimonial-message" name="message" required rows={4} className="resize-y px-3 py-2 text-sm text-text-primary" /></div>
              <button type="submit" disabled={isPending} className="button-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70">{isPending ? <motion.span aria-hidden="true" className="size-4 rounded-full border-2 border-text-on-accent border-r-transparent" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: .8, repeat: Infinity, ease: "linear" }} /> : <Send aria-hidden="true" className="size-4" />}{copy.submit}</button>
            </form>}
          </div>
        </motion.div>
      </motion.div> : null}
    </AnimatePresence>, document.body,
  ) : null;

  return <><button ref={triggerRef} type="button" onClick={() => setIsOpen(true)} className={inline ? "button-primary" : "fixed bottom-6 left-6 z-40 inline-flex min-h-11 items-center gap-2 rounded-md bg-accent px-5 py-3 text-xs font-bold text-text-on-accent shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"} aria-haspopup="dialog" aria-expanded={isOpen}><MessageSquarePlus aria-hidden="true" className="size-5" /><span className={inline ? "" : "hidden sm:inline"}>{copy.trigger}</span></button>{modal}</>;
}

function Field({ id, name, label, required, placeholder }: { id: string; name: string; label: string; required?: boolean; placeholder?: string }) {
  const fieldId = `testimonial-${id}`;
  return <div className="grid gap-2"><label htmlFor={fieldId} className="text-xs font-semibold uppercase tracking-[.06em] text-text-secondary">{label}</label><input type="text" id={fieldId} name={name} required={required} placeholder={placeholder} className="px-3 py-2 text-sm text-text-primary" /></div>;
}
