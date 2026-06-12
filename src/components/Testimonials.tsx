import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const testimonials = [
  {
    quote: "Fifteen years of weddings, and Kashmir Studio still made ours feel like the first one they had ever seen. Every frame was poetry.",
    attr: "AYESHA & BILAL · RAWALPINDI 2023",
  },
  {
    quote: "We didn't hire photographers. We invited storytellers. The difference showed in every single image.",
    attr: "FATIMA & USMAN · ISLAMABAD 2022",
  },
  {
    quote: "There are studios that document your wedding. And there is Kashmir Studio, which preserves your wedding forever.",
    attr: "SARA & AHMED · GUJAR KHAN 2023",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const attrRef = useRef<HTMLSpanElement>(null);

  const goTo = (next: number) => {
    if (!quoteRef.current || !attrRef.current) return;
    const tl = gsap.timeline();
    tl.to([quoteRef.current, attrRef.current], { opacity: 0, y: -16, duration: 0.3, ease: "power2.in" })
      .call(() => setActive(next))
      .to([quoteRef.current, attrRef.current], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
  };

  useEffect(() => {
    if (!quoteRef.current) return;
    quoteRef.current.textContent = testimonials[active].quote;
    if (attrRef.current) attrRef.current.textContent = `— ${testimonials[active].attr}`;
  }, [active]);

  return (
    <section className="px-4 sm:px-6 md:px-12 py-16 md:py-28">
      <div className="text-center mb-10 md:mb-16">
        <span className="font-mono text-[11px] tracking-[0.5em] text-muted-foreground uppercase">What They Say</span>
      </div>

      <div className="max-w-[900px] mx-auto text-center px-2">
        <p
          ref={quoteRef}
          className="font-serif italic text-[clamp(1.15rem,2.8vw,2.2rem)] leading-[1.45] text-foreground mb-8"
        >
          {testimonials[0].quote}
        </p>
        <span
          ref={attrRef}
          className="font-mono text-[10px] sm:text-[12px] text-muted-foreground tracking-[0.1em] sm:tracking-[0.15em]"
        >
          — {testimonials[0].attr}
        </span>
      </div>

      <div className="flex items-center justify-center gap-8 sm:gap-12 mt-10 md:mt-14">
        <button
          onClick={() => goTo((active - 1 + testimonials.length) % testimonials.length)}
          className="font-mono text-[18px] text-muted-foreground hover:text-foreground transition-colors p-2"
          data-testid="button-prev-testimonial"
          aria-label="Previous testimonial"
        >
          ←
        </button>
        <div className="flex gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              data-testid={`button-testimonial-${i}`}
              aria-label={`Testimonial ${i + 1}`}
              className={`w-6 h-[2px] transition-colors ${i === active ? "bg-foreground" : "bg-border"}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo((active + 1) % testimonials.length)}
          className="font-mono text-[18px] text-muted-foreground hover:text-foreground transition-colors p-2"
          data-testid="button-next-testimonial"
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </section>
  );
}
