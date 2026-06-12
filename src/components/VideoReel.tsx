import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function VideoReel() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (headRef.current) {
      gsap.fromTo(Array.from(headRef.current.children),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%" } }
      );
    }
    if (frameRef.current) {
      gsap.fromTo(frameRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out",
          scrollTrigger: { trigger: frameRef.current, start: "top 85%" } }
      );
    }
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 md:px-12 py-16 md:py-28 bg-[#F5F1EB]">
      <div ref={headRef} className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-4">
        <div>
          <span className="font-mono text-[10px] tracking-[0.5em] text-muted-foreground uppercase block mb-3">Showreel</span>
          <h2 className="font-serif text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-foreground">
            See the Work<br />
            <span className="italic">in Motion</span>
          </h2>
        </div>
        <p className="font-sans text-[14px] text-muted-foreground max-w-xs leading-relaxed">
          Fifteen years distilled into a few minutes of film. Every wedding, every ceremony, every quiet moment in between.
        </p>
      </div>

      {/* Video player frame */}
      <div
        ref={frameRef}
        className="relative w-full overflow-hidden bg-[#0A0A0A]"
        style={{ aspectRatio: "16/9" }}
      >
        {!playing ? (
          <>
            {/* Placeholder poster */}
            <div
              className="absolute inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center cursor-pointer group"
              onClick={() => setPlaying(true)}
            >
              {/* Decorative film-strip top */}
              <div className="absolute top-3 left-0 right-0 flex pointer-events-none overflow-hidden opacity-30">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 mx-[14px] w-[10px] h-[14px] rounded-[3px] bg-[#FAF8F5]" />
                ))}
              </div>

              {/* Wordmark */}
              <p className="font-serif italic text-[#FAF8F5] text-[clamp(1.2rem,3vw,2rem)] opacity-30 mb-8 tracking-wide select-none">
                Kashmir Studio
              </p>

              {/* Play button */}
              <button
                onClick={() => setPlaying(true)}
                className="relative flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#FAF8F5]/40 group-hover:border-[#C8352A] transition-colors duration-300"
                aria-label="Play showreel"
              >
                <div className="absolute inset-0 rounded-full bg-[#C8352A] scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                <svg className="relative z-10 w-5 h-5 sm:w-6 sm:h-6 ml-1 text-[#FAF8F5]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>

              <span className="font-mono text-[10px] tracking-[0.4em] text-[#FAF8F5]/50 uppercase mt-6 select-none">
                Play Showreel
              </span>

              {/* Decorative film-strip bottom */}
              <div className="absolute bottom-3 left-0 right-0 flex pointer-events-none overflow-hidden opacity-30">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div key={i} className="flex-shrink-0 mx-[14px] w-[10px] h-[14px] rounded-[3px] bg-[#FAF8F5]" />
                ))}
              </div>

              {/* Corner labels */}
              <span className="absolute top-6 left-4 sm:left-6 font-mono text-[9px] sm:text-[10px] text-[#FAF8F5]/40 tracking-[0.3em]">◉ KASHMIR STUDIO / SHOWREEL</span>
              <span className="absolute bottom-6 right-4 sm:right-6 font-mono text-[9px] sm:text-[10px] text-[#FAF8F5]/40 tracking-[0.2em]">2009 — {new Date().getFullYear()}</span>
            </div>
          </>
        ) : (
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
            title="Kashmir Studio Showreel"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Caption row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5 gap-3">
        <span className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
          Wedding Films · 2009–{new Date().getFullYear()}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">
          Replace src URL with your actual YouTube/Vimeo embed link
        </span>
      </div>
    </section>
  );
}
