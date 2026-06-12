import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const hasMoved = useRef(false);

  const [isFinePointer] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );

  useEffect(() => {
    if (!isFinePointer) return;

    const ring = ringRef.current;
    const dot  = dotRef.current;
    const text = textRef.current;
    if (!ring || !dot) return;

    // Start hidden far off-screen
    gsap.set([ring, dot], { x: -200, y: -200, opacity: 0 });

    // ── Track mouse ────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      // Dot snaps instantly
      gsap.set(dot, { x: e.clientX, y: e.clientY });

      // Ring follows with slight inertia
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.18,
        ease: "power2.out",
        overwrite: "auto",
      });

      if (!hasMoved.current) {
        hasMoved.current = true;
        gsap.to([ring, dot], { opacity: 1, duration: 0.4 });
      }
    };

    const onLeave = () => gsap.to([ring, dot], { opacity: 0, duration: 0.25 });
    const onEnter = () => {
      if (hasMoved.current) gsap.to([ring, dot], { opacity: 1, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    // ── Hover state on interactive elements ───────────────────────────
    let hoverActive = false;

    const enterHover = () => {
      if (hoverActive) return;
      hoverActive = true;
      gsap.to(ring, {
        width: 56,
        height: 56,
        borderColor: "#C8352A",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { opacity: 0, duration: 0.15 });
      if (text) gsap.to(text, { opacity: 1, duration: 0.2, delay: 0.08 });
    };

    const leaveHover = () => {
      if (!hoverActive) return;
      hoverActive = false;
      gsap.to(ring, {
        width: 20,
        height: 20,
        borderColor: "#0A0A0A",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(dot, { opacity: 1, duration: 0.15, delay: 0.1 });
      if (text) gsap.to(text, { opacity: 0, duration: 0.12 });
    };

    const onOver = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button")) enterHover();
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element).closest("a, button");
      if (!el) return;
      const related = (e.relatedTarget as Element)?.closest?.("a, button");
      if (!related) leaveHover();
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout",  onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout",  onOut);
    };
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full border border-[#0A0A0A] pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          width: 20,
          height: 20,
          transform: "translate(-50%, -50%)",
          willChange: "transform, width, height",
          opacity: 0,
        }}
      >
        <span
          ref={textRef}
          className="font-mono text-[7px] tracking-[0.15em] text-[#C8352A] uppercase opacity-0 select-none"
        >
          VIEW
        </span>
      </div>

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[5px] h-[5px] rounded-full bg-[#0A0A0A] pointer-events-none z-[9999]"
        style={{
          transform: "translate(-50%, -50%)",
          willChange: "transform",
          opacity: 0,
        }}
      />
    </>
  );
}
