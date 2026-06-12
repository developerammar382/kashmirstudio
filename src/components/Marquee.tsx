import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Marquee() {
  const innerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scrollYRef = useRef(window.scrollY);
  const velocityRef = useRef(0);

  const text = "WEDDING FILMS  ·  EVENT PHOTOGRAPHY  ·  15 YEARS  ·  500+ MEMORIES  ·  KASHMIR STUDIO  ·  ";

  useEffect(() => {
    if (!innerRef.current) return;

    const halfWidth = innerRef.current.offsetWidth / 2;

    tweenRef.current = gsap.to(innerRef.current, {
      x: -halfWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % halfWidth),
      },
    });

    let rafId: number;
    const updateVelocity = () => {
      const currentY = window.scrollY;
      const delta = currentY - scrollYRef.current;
      scrollYRef.current = currentY;
      velocityRef.current += (delta - velocityRef.current) * 0.12;
      const ts = 1 + velocityRef.current * 0.06;
      if (tweenRef.current) {
        tweenRef.current.timeScale(Math.max(0.3, Math.min(ts, 5)));
      }
      rafId = requestAnimationFrame(updateVelocity);
    };
    rafId = requestAnimationFrame(updateVelocity);

    return () => {
      tweenRef.current?.kill();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="w-full h-[56px] bg-[#0A0A0A] overflow-hidden flex items-center">
      <div
        ref={innerRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{ width: "max-content" }}
      >
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="font-serif italic text-[22px] text-[#FAF8F5] opacity-90 pr-2"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
