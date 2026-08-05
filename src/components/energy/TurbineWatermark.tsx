export default function TurbineWatermark({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute select-none opacity-[0.03] ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="size-full animate-spin-slow"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100,20 C102,20 105,50 105,95 C105,100 100,105 100,105 C100,105 95,100 95,95 C95,50 98,20 100,20 Z" />
        <path d="M100,105 C100,105 105,100 145,120 C175,135 185,160 185,160 C185,160 155,165 130,150 C110,135 100,105 100,105 Z" />
        <path d="M100,105 C100,105 95,100 55,120 C25,135 15,160 15,160 C15,160 45,165 70,150 C90,135 100,105 100,105 Z" />
        <circle cx="100" cy="105" r="8" />
      </svg>
      {/* Turbine Pillar */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M96,105 L104,105 L110,200 L90,200 Z" />
      </svg>
    </div>
  );
}
