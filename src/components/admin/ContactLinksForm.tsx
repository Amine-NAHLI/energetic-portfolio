"use client";

import { useActionState, useRef, useState, type ChangeEvent } from "react";
import { Save, AlertCircle, CheckCircle2, FileUp } from "lucide-react";
import { saveContactLinks } from "@/app/admin/(protected)/settings/actions";

export function ContactLinksForm({ 
  currentEmail, 
  currentLinkedin,
  currentCvMediaId
}: { 
  currentEmail: string; 
  currentLinkedin: string; 
  currentCvMediaId?: string;
}) {
  const [state, formAction, isPending] = useActionState(saveContactLinks, null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setUploadError(null);
    if (file) {
      setIsUploading(true);
      try {
        const body = new FormData();
        body.set("file", file);
        const res = await fetch("/api/admin/media", { method: "POST", headers: { Accept: "application/json" }, body });
        const result = await res.json() as { record?: { id: string }, error?: string };
        if (!res.ok || !result.record?.id) throw new Error(result.error ?? "Erreur lors de l'upload du CV");
        formData.set("cv_media_id", result.record.id);
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Erreur inconnue");
        setIsUploading(false);
        return;
      }
      setIsUploading(false);
    } else {
      formData.set("cv_media_id", currentCvMediaId || "");
    }
    formAction(formData);
  };

  const isWorking = isPending || isUploading;

  return (
    <form action={handleSubmit} className="grid gap-6">
      {(state?.error || uploadError) && (
        <div className="flex items-center gap-3 p-4 bg-danger/10 border border-danger/20 rounded-sm text-danger text-sm">
          <AlertCircle className="size-5 shrink-0" />
          <p>{uploadError || state?.error}</p>
        </div>
      )}
      
      {state?.success && !uploadError && (
        <div className="flex items-center gap-3 p-4 bg-success/10 border border-success/20 rounded-sm text-success text-sm">
          <CheckCircle2 className="size-5 shrink-0" />
          <p>{state.message}</p>
        </div>
      )}

      <div className="grid gap-2">
        <label htmlFor="contact_email" className="font-mono text-xs uppercase tracking-widest text-text-secondary">Email de contact</label>
        <p className="text-xs text-text-muted mb-2">L&apos;adresse email affichée sur le site.</p>
        <input 
          type="email" 
          id="contact_email" 
          name="email" 
          defaultValue={currentEmail}
          className="w-full bg-surface-subtle border border-border/50 rounded-sm px-4 py-2 font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
        />
      </div>



      <div className="grid gap-2">
        <label htmlFor="linkedin" className="font-mono text-xs uppercase tracking-widest text-text-secondary">Lien LinkedIn</label>
        <p className="text-xs text-text-muted mb-2">L&apos;URL complète de votre profil LinkedIn.</p>
        <input 
          type="url" 
          id="linkedin" 
          name="linkedin" 
          defaultValue={currentLinkedin}
          className="w-full bg-surface-subtle border border-border/50 rounded-sm px-4 py-2 font-body text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="grid gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-text-secondary">Curriculum Vitae (PDF)</span>
        <p className="text-xs text-text-muted mb-2">Uploadez votre CV au format PDF. S&apos;il n&apos;est pas fourni, le bouton demandera aux utilisateurs de vous contacter.</p>
        <input 
          ref={fileInputRef} 
          type="file" 
          accept="application/pdf" 
          onChange={(event: ChangeEvent<HTMLInputElement>) => setFile(event.target.files?.[0] ?? null)} 
          className="sr-only" 
        />
        <button 
          type="button" 
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-text-primary bg-surface border border-border rounded-sm hover:border-accent hover:text-accent transition-colors w-fit" 
          onClick={() => fileInputRef.current?.click()}
        >
          <FileUp className="size-4" />
          {file ? file.name : currentCvMediaId ? "Remplacer le CV PDF" : "Ajouter un CV PDF"}
        </button>
        <span className="text-xs font-normal text-text-muted">PDF uniquement, 5 Mo maximum.</span>
      </div>

      <div className="pt-4 border-t border-border/50">
        <button 
          type="submit" 
          disabled={isWorking}
          className="flex items-center justify-center gap-2 px-6 py-2 bg-accent text-bg-page font-mono text-xs font-bold uppercase tracking-wider rounded-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isWorking ? (
             <span className="size-4 animate-spin rounded-full border-2 border-bg-page border-r-transparent" />
          ) : (
            <Save className="size-4" />
          )}
          Enregistrer les paramètres
        </button>
      </div>
    </form>
  );
}
