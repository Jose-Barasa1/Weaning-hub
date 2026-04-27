import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="Weaning Hub Kenya home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft transition-transform group-hover:rotate-6">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
          <path d="M9 3v8a3 3 0 0 0 3 3 3 3 0 0 0 3-3V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 14v7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5 3v6a2 2 0 0 0 2 2v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-semibold tracking-tight text-foreground">
          Weaning Hub
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          Kenya
        </span>
      </span>
    </Link>
  );
}
