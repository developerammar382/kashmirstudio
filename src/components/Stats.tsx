import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const stats = [
  { end: 15, suffix: "+", label: "YEARS" },
  { end: 500, suffix: "+", label: "EVENTS" },
  { end: 10, suffix: "K+", label: "PHOTOGRAPHS" },
  { end: 3, suffix: "", label: "CITIES" },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    numRefs.current.forEach((el, i) => {
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stats[i].end,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => { if (el) el.textContent = Math.round(obj.val).toString(); },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0A0A0A] py-14 md:py-28 px-4 sm:px-6 md:px-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0 divide-x-0 md:divide-x divide-[#333]">
        {stats.map((s, i) => (
          <div key={i} className="px-4 md:px-10 md:first:pl-0 md:last:pr-0 text-center md:text-left">
            <p className="font-serif text-[clamp(2.5rem,8vw,6rem)] leading-none text-[#FAF8F5]">
              <span ref={(el) => { numRefs.current[i] = el; }}>0</span>
              {s.suffix}
            </p>
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#616161] mt-3 uppercase">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
