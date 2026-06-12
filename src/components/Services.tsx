import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const services = [
  {
    num: "01",
    name: "Wedding Films",
    tag: "CINEMATIC",
    href: "/wedding",
    desc: "Documentation of your ceremony with a director's eye for light, composition, and emotion. Every cut is intentional. Every frame is earned.",
  },
  {
    num: "02",
    name: "Event Photography",
    tag: "EDITORIAL",
    href: "/events",
    desc: "Still imagery that captures the electricity of your most important gatherings — candid, composed, and always true to the moment.",
  },
  {
    num: "03",
    name: "Portrait Sessions",
    tag: "INTIMATE",
    href: "/portraits",
    desc: "One-on-one sessions crafted around your story, your light, your truth. No formulas. No presets. Only you.",
  },
];

export default function Services() {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      gsap.fromTo(row,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.9,
          ease: "power3.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: row, start: "top 88%" },
        }
      );
    });
  }, []);

  return (
    <section className="px-4 sm:px-6 md:px-12 py-16 md:py-28">
      <div className="flex items-center mb-10 md:mb-14">
        <span className="font-mono text-[11px] tracking-[0.5em] text-muted-foreground uppercase">Services</span>
        <div className="flex-1 h-[1px] bg-border ml-6" />
      </div>

      <div>
        {services.map((s, i) => (
          <div
            key={i}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="py-7 md:py-10 border-b border-border first:border-t group"
          >
            <div className="grid grid-cols-[2rem_1fr] md:grid-cols-[3rem_1fr_auto] gap-4 md:gap-8 items-start">
              <span className="font-mono text-[12px] text-muted-foreground pt-1">{s.num}</span>
              <div>
                <div className="flex items-start justify-between md:block">
                  <h3 className="font-serif text-[clamp(1.4rem,3vw,2.5rem)] text-foreground mb-2 md:mb-3 group-hover:text-[#C8352A] transition-colors duration-300">
                    {s.name}
                  </h3>
                  {/* Tag visible on mobile inline, hidden on desktop (rendered right column) */}
                  <span className="md:hidden font-mono text-[10px] text-[#C8352A] tracking-[0.15em] pt-1 whitespace-nowrap">
                    [ {s.tag} ]
                  </span>
                </div>
                <p className="font-sans text-[13px] sm:text-[14px] text-muted-foreground leading-relaxed max-w-lg">{s.desc}</p>
                <Link
                  href={s.href}
                  className="inline-block mt-3 md:mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[#C8352A] hover:underline"
                  data-testid={`link-service-${i}`}
                >
                  View Service →
                </Link>
              </div>
              <span className="hidden md:block font-mono text-[11px] text-[#C8352A] tracking-[0.15em] pt-1 whitespace-nowrap">
                [ {s.tag} ]
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
