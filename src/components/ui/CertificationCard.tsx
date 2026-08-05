/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Award, Calendar, Download, X } from "lucide-react";

type Certification = {
  id: string;
  name: string;
  description?: string | null;
  issuer: string | null;
  issuedOn: string | null;
  verificationUrl: string | null;
  hasDocument: boolean;
  documentMimeType: string | null;
};

type CertificationCardProps = {
  certification: Certification;
  locale: string;
  copy: { verify: string; close?: string };
  compact?: boolean;
};

export default function CertificationCard({ certification, locale, copy, compact = false }: CertificationCardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const formattedDate = certification.issuedOn
    ? new Date(certification.issuedOn).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`${certification.name} — ${copy.verify}`} className="group flex h-full w-full flex-col overflow-hidden border border-border bg-surface text-left transition-[border-color,box-shadow] hover:border-accent/55 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
        {!compact || certification.hasDocument ? (
          <div className={`relative w-full overflow-hidden border-b border-border bg-surface-subtle ${compact ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
            {certification.hasDocument ? certification.documentMimeType?.startsWith("image/") ? (
              <img src={`/api/certifications/${certification.id}/document`} alt={locale === "fr" ? `Aperçu de ${certification.name}` : `Preview of ${certification.name}`} className="pointer-events-none size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
            ) : (
              <div className="relative size-full overflow-hidden bg-white"><iframe src={`/api/certifications/${certification.id}/document#toolbar=0&navpanes=0&scrollbar=0&view=FitH`} className="pointer-events-none absolute inset-0 size-full border-0" tabIndex={-1} title={locale === "fr" ? `Aperçu de ${certification.name}` : `Preview of ${certification.name}`} /><div className="absolute inset-0" aria-hidden="true" /></div>
            ) : <div className="engineering-surface grid size-full place-items-center"><Award aria-hidden="true" className="size-14 text-accent/45" /></div>}
          </div>
        ) : null}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 font-mono text-[.62rem] font-semibold uppercase tracking-[.12em] text-accent"><Award aria-hidden="true" className="size-4" />{locale === "fr" ? "Certification" : "Credential"}</div>
          <h2 className="mt-4 text-lg font-semibold leading-snug text-text-primary">{certification.name}</h2>
          {certification.issuer ? <p className="mt-2 text-sm text-text-secondary">{certification.issuer}</p> : null}
          {formattedDate ? <p className="mt-auto pt-5 font-mono text-[.65rem] text-text-muted">{formattedDate}</p> : null}
        </div>
      </button>

      <dialog ref={dialogRef} className="m-auto w-[min(36rem,calc(100%-2rem))] border border-border bg-bg-page p-0 text-text-primary shadow-2xl backdrop:bg-black/80" onClose={() => setOpen(false)} onCancel={() => setOpen(false)}>
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4"><div className="grid size-12 shrink-0 place-items-center border border-border-strong bg-surface text-accent"><Award aria-hidden="true" className="size-6" /></div><button type="button" onClick={() => setOpen(false)} className="inline-grid size-11 shrink-0 place-items-center border border-border bg-surface text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" aria-label={copy.close ?? (locale === "fr" ? "Fermer" : "Close")}><X aria-hidden="true" className="size-5" /></button></div>
          <h2 className="mt-7 text-2xl font-semibold tracking-tight text-text-primary">{certification.name}</h2>
          {certification.issuer ? <p className="mt-2 text-lg font-medium text-accent">{certification.issuer}</p> : null}
          {certification.description ? <p className="mt-4 text-sm leading-7 text-text-secondary">{certification.description}</p> : null}
          {formattedDate ? <div className="mt-6 flex items-center gap-3 border-y border-border py-5 text-text-secondary"><Calendar aria-hidden="true" className="size-5 text-accent" /><span>{formattedDate}</span></div> : null}
          {certification.verificationUrl || certification.hasDocument ? <div className="mt-7 flex flex-col gap-3 sm:flex-row">{certification.verificationUrl ? <a href={certification.verificationUrl} target="_blank" rel="noreferrer" className="button-primary flex-1">{copy.verify}<ArrowUpRight aria-hidden="true" className="size-4" /></a> : null}{certification.hasDocument ? <a href={`/api/certifications/${certification.id}/document`} target="_blank" rel="noreferrer" className="button-secondary"><Download aria-hidden="true" className="size-4" />Document</a> : null}</div> : null}
        </div>
      </dialog>
    </>
  );
}
