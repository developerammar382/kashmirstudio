import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const kashmirRef = useRef<HTMLHeadingElement>(null);
  const studioRef = useRef<HTMLHeadingElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const subinfoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const els = [kashmirRef, studioRef, ghostRef, stripRef, lineRef, taglineRef];
    if (els.some((r) => !r.current)) return;

    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(kashmirRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" }
    )
    .fromTo(studioRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out" }, "-=0.9"
    )
    .fromTo(taglineRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.4"
    )
    .fromTo(ghostRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: "power2.out" }, "-=0.6"
    )
    .fromTo(lineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 0.7, ease: "power2.out" }, "-=0.5"
    )
    .fromTo(stripRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power2.out" }, "-=0.5"
    );

    if (dotRef.current) {
      gsap.to(dotRef.current, {
        y: 12, duration: 0.9, repeat: -1, yoyo: true, ease: "power1.inOut",
      });
    }
  }, []);

  return (
    <section className="relative w-full bg-background overflow-hidden" style={{ height: "100dvh" }}>

      {/* Ghost "15" — only md+ to avoid overflow on phones */}
      <div
        ref={ghostRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 font-serif leading-none select-none pointer-events-none opacity-0 hidden md:block"
        style={{
          fontSize: "clamp(14rem, 28vw, 32rem)",
          color: "transparent",
          WebkitTextStroke: "1px #D9D4CB",
        }}
      >
        15
      </div>

      {/* Main heading block */}
      <div className="absolute left-4 sm:left-6 md:left-12 top-[38%] sm:top-[40%] -translate-y-1/2 z-10">
        <h1
          ref={kashmirRef}
          className="font-serif leading-[0.88] text-foreground opacity-0 block"
          style={{ fontSize: "clamp(3rem, 12vw, 13rem)" }}
        >
          KASHMIR
        </h1>
        <h1
          ref={studioRef}
          className="font-serif leading-[0.88] text-foreground opacity-0 block"
          style={{ fontSize: "clamp(3rem, 12vw, 13rem)" }}
        >
          STUDIO
        </h1>

        <p
          ref={taglineRef}
          className="font-mono tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground uppercase mt-4 md:mt-8 opacity-0"
          style={{ fontSize: "clamp(8px, 2vw, 11px)" }}
        >
          Film &amp; Photography — Est. 2009
        </p>
      </div>

      {/* Scroll indicator — desktop only */}
      <div className="absolute bottom-[88px] left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1 z-10">
        <div ref={lineRef} className="w-[1px] h-[52px] bg-foreground opacity-40 origin-top" />
        <div ref={dotRef} className="w-[5px] h-[5px] rounded-full bg-foreground opacity-50" />
      </div>

      {/* Bottom info strip */}
      <div
        ref={stripRef}
        className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] flex items-center justify-between opacity-0"
        style={{ height: "clamp(48px, 8vw, 68px)", padding: "0 clamp(16px, 4vw, 40px)" }}
      >
        <span
          className="font-mono text-[#FAF8F5] tracking-[0.1em] sm:tracking-[0.2em]"
          style={{ fontSize: "clamp(7px, 2vw, 11px)" }}
        >
          FILM &amp; PHOTOGRAPHY
        </span>

        {/* Middle text — only show on md+ */}
        <span
          ref={subinfoRef}
          className="hidden md:block font-mono text-[#FAF8F5] tracking-[0.15em]"
          style={{ fontSize: "clamp(7px, 1.5vw, 11px)" }}
        >
          GUJAR KHAN · RAWALPINDI · ISLAMABAD
        </span>

        {/* On mobile, show location condensed */}
        <span
          className="md:hidden font-mono text-[#FAF8F5] tracking-[0.08em]"
          style={{ fontSize: "clamp(7px, 2vw, 10px)" }}
        >
          RAWALPINDI · ISB
        </span>

        <span
          className="font-mono text-[#FAF8F5] tracking-[0.1em] sm:tracking-[0.15em]"
          style={{ fontSize: "clamp(7px, 2vw, 11px)" }}
        >
          03339566039
        </span>
      </div>
    </section>
  );
}
