import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const ruleTopRef = useRef<HTMLDivElement>(null);
  const ruleBottomRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const num500Ref = useRef<HTMLSpanElement>(null);
  const num15Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ruleTopRef.current) {
      gsap.fromTo(ruleTopRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ruleTopRef.current, start: "top 85%" } }
      );
    }
    if (ruleBottomRef.current) {
      gsap.fromTo(ruleBottomRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ruleBottomRef.current, start: "top 90%" } }
      );
    }
    if (leftRef.current) {
      gsap.fromTo(leftRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: leftRef.current, start: "top 80%" } }
      );
    }

    const animateCounter = (ref: React.RefObject<HTMLSpanElement | null>, end: number) => {
      if (!ref.current) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: end,
        duration: 1.5,
        ease: "power2.out",
        onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.val).toString(); },
        scrollTrigger: { trigger: ref.current, start: "top 80%" }
      });
    };

    animateCounter(num500Ref, 500);
    animateCounter(num15Ref, 15);

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 md:px-12 py-16 md:py-28">
      <div className="flex items-center mb-10 md:mb-14">
        <div ref={ruleTopRef} className="flex-1 h-[1px] bg-border origin-left" />
        <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground ml-6 uppercase">About the Studio</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-10 md:gap-0">
        <div ref={leftRef}>
          <p className="font-serif italic text-[clamp(1.3rem,3vw,2.5rem)] leading-[1.3] text-foreground mb-6">
            Every frame is a vow kept.<br />Every edit is a memory rescued.
          </p>
          <p className="font-sans text-[15px] md:text-[16px] text-muted-foreground leading-relaxed max-w-xl">
            Kashmir Studio has documented over 500 weddings and events across Rawalpindi, Islamabad, and beyond — for fifteen years, we have been trusted with the moments that define lives.
          </p>
        </div>

        <div className="flex flex-row md:flex-col justify-start gap-8 md:gap-8 md:pl-16 md:border-l border-border pt-6 md:pt-0 border-t md:border-t-0">
          <div className="flex-1">
            <p className="font-serif text-[clamp(3rem,9vw,7rem)] leading-none text-foreground">
              <span ref={num500Ref}>0</span>+
            </p>
            <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase mt-2">Events Documented</p>
          </div>
          <div className="flex-1">
            <p className="font-serif text-[clamp(3rem,9vw,7rem)] leading-none text-foreground">
              <span ref={num15Ref}>0</span>
            </p>
            <p className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase mt-2">Years Active</p>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-10 md:mt-14">
        <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground mr-6 uppercase">Est. 2009, Gujar Khan</span>
        <div ref={ruleBottomRef} className="flex-1 h-[1px] bg-border origin-left" />
      </div>
    </section>
  );
}
