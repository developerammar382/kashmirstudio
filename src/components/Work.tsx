import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import weddingHero from "@/assets/images/wedding-hero.png";
import weddingDetail1 from "@/assets/images/wedding-detail-1.png";
import weddingDetail2 from "@/assets/images/wedding-detail-2.png";
import weddingDetail3 from "@/assets/images/wedding-detail-3.png";
import eventsHero from "@/assets/images/events-hero.png";
import eventsDetail1 from "@/assets/images/events-detail-1.png";
import eventsDetail2 from "@/assets/images/events-detail-2.png";
import portraitsHero from "@/assets/images/portraits-hero.png";
import portraitsDetail1 from "@/assets/images/portraits-detail-1.png";
import portraitsDetail2 from "@/assets/images/portraits-detail-2.png";

const frames = [
  { src: weddingHero,     label: "WEDDING",   tag: "Film",       href: "/wedding"   },
  { src: weddingDetail1,  label: "BRIDAL",    tag: "Detail",     href: "/wedding"   },
  { src: eventsHero,      label: "EVENTS",    tag: "Editorial",  href: "/events"    },
  { src: weddingDetail2,  label: "RECEPTION", tag: "Candid",     href: "/wedding"   },
  { src: portraitsHero,   label: "PORTRAIT",  tag: "Intimate",   href: "/portraits" },
  { src: eventsDetail1,   label: "CEREMONY",  tag: "Press",      href: "/events"    },
  { src: weddingDetail3,  label: "GOLDEN HR", tag: "Cinematic",  href: "/wedding"   },
  { src: portraitsDetail1,label: "COUPLE",    tag: "Session",    href: "/portraits" },
  { src: eventsDetail2,   label: "GATHERING", tag: "Social",     href: "/events"    },
  { src: portraitsDetail2,label: "FAMILY",    tag: "Portrait",   href: "/portraits" },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stripRef   = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(Array.from(headerRef.current.children),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" } }
      );
    }

    const strip   = stripRef.current;
    const section = sectionRef.current;
    if (!strip || !section) return;

    const getTotal = () => strip.scrollWidth - window.innerWidth;

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getTotal() + 120}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(strip, { x: -self.progress * getTotal() });
      },
      invalidateOnRefresh: true,
    });

    return () => { st.kill(); };
  }, []);

  const holeCount = 60;

  return (
    <div ref={sectionRef} className="w-full overflow-hidden" style={{ height: "100dvh" }}>
      <div ref={headerRef} className="flex justify-between items-end px-6 md:px-12 pt-16 pb-6">
        <span className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none text-foreground">SELECTED</span>
        <span className="font-mono text-[11px] tracking-[0.5em] text-muted-foreground uppercase self-end pb-2">Our Work</span>
        <span className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-none text-foreground">WORK</span>
      </div>

      <div className="relative bg-[#0A0A0A] mx-0" style={{ height: "calc(100dvh - 140px)" }}>
        {/* Top sprocket holes */}
        <div className="absolute top-3 left-0 right-0 flex pointer-events-none overflow-hidden z-10">
          {Array.from({ length: holeCount }).map((_, i) => (
            <div key={i} className="flex-shrink-0 mx-[14px] w-[10px] h-[16px] rounded-[3px] bg-[#FAF8F5] opacity-20" />
          ))}
        </div>
        {/* Bottom sprocket holes */}
        <div className="absolute bottom-3 left-0 right-0 flex pointer-events-none overflow-hidden z-10">
          {Array.from({ length: holeCount }).map((_, i) => (
            <div key={i} className="flex-shrink-0 mx-[14px] w-[10px] h-[16px] rounded-[3px] bg-[#FAF8F5] opacity-20" />
          ))}
        </div>

        <div
          ref={stripRef}
          className="absolute top-0 left-0 flex items-center h-full pl-12 pr-24"
          style={{ gap: "20px", willChange: "transform" }}
        >
          {frames.map((frame, i) => (
            <Link
              key={i}
              href={frame.href}
              className="flex-shrink-0 relative group block overflow-hidden"
              style={{ width: "380px", height: "240px" }}
            >
              {/* Real image */}
              <img
                src={frame.src}
                alt={frame.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                draggable={false}
              />

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/35 transition-colors duration-300" />

              {/* Vermillion border on hover */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#C8352A] transition-colors duration-200 pointer-events-none" />

              {/* Frame number */}
              <span className="absolute top-3 left-3 font-mono text-[10px] text-[#FAF8F5] opacity-60 z-10">
                {`\u25CE 00${i + 1}`}
              </span>

              {/* Tag top-right */}
              <span className="absolute top-3 right-3 font-mono text-[9px] tracking-[0.2em] text-[#C8352A] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                {frame.tag}
              </span>

              {/* Label bottom */}
              <span className="absolute bottom-3 left-3 font-mono text-[10px] text-[#FAF8F5] tracking-[0.3em] opacity-80 group-hover:opacity-100 transition-opacity duration-200 z-10">
                {frame.label}
              </span>

              {/* View arrow bottom-right */}
              <span className="absolute bottom-3 right-3 font-mono text-[10px] text-[#FAF8F5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                VIEW →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
