import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !lineRef.current || !wipeRef.current) return;

    const tl = gsap.timeline({ onComplete });

    // Fade in text first
    tl.fromTo([textRef.current, subRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out", delay: 0.3 }
    );

    // Draw progress line
    tl.to(lineRef.current, {
      width: "100%",
      duration: 1.2,
      ease: "power2.inOut",
    }, "-=0.2");

    // Wipe out upward
    tl.to(wipeRef.current, {
      clipPath: "inset(0% 0 0 0)",
      duration: 0.8,
      ease: "power3.inOut",
    }, "+=0.15");

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex flex-col items-center justify-center pointer-events-none px-6"
    >
      {/* Top film-strip decoration */}
      <div className="absolute top-0 left-0 right-0 flex overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 mx-[14px] mt-3 w-[10px] h-[16px] rounded-[3px] bg-[#FAF8F5]" />
        ))}
      </div>

      {/* Studio name */}
      <h1
        ref={textRef}
        className="font-serif italic text-[#FAF8F5] opacity-0 text-center leading-none mb-4"
        style={{ fontSize: "clamp(2rem, 10vw, 5rem)" }}
      >
        KASHMIR STUDIO
      </h1>

      {/* Tagline */}
      <p
        ref={subRef}
        className="font-mono text-[#FAF8F5]/50 tracking-[0.35em] mb-10 md:mb-14 opacity-0 text-center"
        style={{ fontSize: "clamp(8px, 2vw, 11px)" }}
      >
        EST. 2009 — FILM &amp; PHOTOGRAPHY
      </p>

      {/* Progress bar */}
      <div className="w-full max-w-[280px] sm:max-w-xs md:max-w-md h-[1px] bg-[#333] relative">
        <div ref={lineRef} className="absolute left-0 top-0 h-full bg-[#C8352A] w-0" />
      </div>

      {/* Bottom film-strip decoration */}
      <div className="absolute bottom-0 left-0 right-0 flex overflow-hidden opacity-20 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="flex-shrink-0 mx-[14px] mb-3 w-[10px] h-[16px] rounded-[3px] bg-[#FAF8F5]" />
        ))}
      </div>

      {/* Wipe panel */}
      <div
        ref={wipeRef}
        className="absolute inset-0 bg-[#FAF8F5]"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      />
    </div>
  );
}
