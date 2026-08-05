"use client";

import { useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type CvButtonProps = {
  hasCv: boolean;
  locale: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function CvButton({ hasCv, locale, href, className, children, onClick }: CvButtonProps) {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();
    if (!hasCv) {
      e.preventDefault();
      setShowPopup(true);
    }
  };

  return (
    <>
      <a href={href} target={hasCv ? "_blank" : undefined} rel="noreferrer" onClick={handleClick} className={className} data-analytics-event="cv_open">
        {children}
      </a>
      
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[#0b1120]/60 backdrop-blur-sm" 
              onClick={() => setShowPopup(false)} 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="relative bg-surface border border-border shadow-[0_2rem_6rem_rgba(0,10,15,.28)] rounded-xl p-8 max-w-sm w-full text-center overflow-hidden"
            >
               <button onClick={() => setShowPopup(false)} className="absolute right-4 top-4 text-text-muted hover:text-accent transition-colors">
                 <X className="size-5" />
               </button>
               
               <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-full bg-accent/10 border border-accent/20">
                 <ArrowUpRight className="size-6 text-accent" />
               </div>
               
               <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                 {locale === 'fr' ? 'CV sur demande' : 'Resume upon request'}
               </h3>
               
               <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                 {locale === 'fr' 
                   ? "Mon CV complet n'est pas encore téléchargeable publiquement. Merci de me contacter pour l'obtenir." 
                   : "My full resume is not yet available for public download. Please contact me directly to get it."}
               </p>
               
               <Link 
                 href={`/${locale}/contact`} 
                 onClick={() => setShowPopup(false)} 
                 className="button-primary w-full justify-center"
               >
                 {locale === 'fr' ? 'Me contacter' : 'Contact me'}
               </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
