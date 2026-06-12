import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] px-4 sm:px-6 md:px-12 py-14 md:py-20">
      <p className="font-serif italic text-center text-[clamp(1.8rem,6vw,5rem)] text-[#FAF8F5] leading-none mb-10 md:mb-12">
        Kashmir Studio
      </p>

      {/* Nav links */}
      <div className="flex justify-center gap-6 sm:gap-10 mb-10 md:mb-12">
        {[
          { label: "Wedding Films", href: "/wedding" },
          { label: "Events", href: "/events" },
          { label: "Portraits", href: "/portraits" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-[#616161] hover:text-[#FAF8F5] transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1a1a1a] pt-8">
        <span className="font-mono text-[10px] text-[#616161] tracking-[0.3em] uppercase text-center sm:text-left">
          Est. 2009 — Gujar Khan, Pakistan
        </span>
        <span className="font-mono text-[10px] text-[#616161] tracking-[0.2em] uppercase text-center">
          &copy; {new Date().getFullYear()} Kashmir Studio. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
