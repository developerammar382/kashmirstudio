import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import gsap from "gsap";
import { playClick, playShutter } from "@/lib/sound";

export default function TransitionOverlay() {
  const panelRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Hidden below viewport to start
    gsap.set(panel, { clipPath: "inset(0 0 100% 0)" });

    const handleClick = (e: MouseEvent) => {
      // ── Sound on any button click ──────────────────────────────────────
      const btn = (e.target as Element).closest("button");
      if (btn && !btn.closest("a")) {
        playClick();
      }

      // ── Intercept internal anchor clicks ───────────────────────────────
      const anchor = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      // Skip external, hash, mailto, tel
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("//") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#")
      ) {
        return;
      }

      // Normalise href against BASE_URL prefix
      const base = import.meta.env.BASE_URL.replace(/\/$/, "");
      const routePath = href.startsWith(base) ? href.slice(base.length) || "/" : href;

      // Don't animate if already on the same page
      const currentPath = window.location.pathname.replace(base, "") || "/";
      if (routePath === currentPath) return;

      // Block rapid double-fires
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      isAnimating.current = true;

      playShutter();

      const label = labelRef.current;

      const tl = gsap.timeline();

      // ── Wipe IN (dark panel slides up from bottom) ──────────────────
      tl.to(panel, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.52,
        ease: "power3.inOut",
      });

      // Fade in label
      if (label) {
        tl.to(label, { opacity: 1, duration: 0.18 }, "-=0.1");
      }

      // ── Navigate + scroll at peak of transition ─────────────────────
      tl.call(() => {
        navigate(routePath);
        window.scrollTo({ top: 0, behavior: "instant" });
      });

      // Brief hold so the new page mounts beneath
      tl.to({}, { duration: 0.08 });

      // Fade out label
      if (label) {
        tl.to(label, { opacity: 0, duration: 0.15 }, "<");
      }

      // ── Wipe OUT (panel slides off to top) ──────────────────────────
      tl.to(panel, {
        clipPath: "inset(100% 0 0% 0)",
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => {
          // Reset for next use
          gsap.set(panel, { clipPath: "inset(0 0 100% 0)" });
          isAnimating.current = false;
        },
      });
    };

    document.addEventListener("click", handleClick, true); // capture phase
    return () => document.removeEventListener("click", handleClick, true);
  }, [navigate]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[250] bg-[#0A0A0A] pointer-events-none flex items-center justify-center"
    >
      <span
        ref={labelRef}
        className="font-mono text-[9px] tracking-[0.6em] uppercase text-[#FAF8F5]/25 opacity-0 select-none"
      >
        Kashmir Studio
      </span>
    </div>
  );
}
