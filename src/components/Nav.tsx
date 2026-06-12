import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "Wedding Films", href: "/wedding" },
  { label: "Events", href: "/events" },
  { label: "Portraits", href: "/portraits" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex items-center justify-between px-4 sm:px-6 md:px-12 ${
          scrolled ? "backdrop-blur-sm bg-[#FAF8F5]/90 border-b border-[#D1D1D1]" : ""
        }`}
        style={{ height: "clamp(52px, 8vw, 64px)" }}
      >
        <Link href="/" className="font-serif italic text-[20px] sm:text-[22px] text-foreground leading-none">
          KS
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-mono text-[10px] tracking-[0.25em] uppercase transition-colors duration-200 ${
                location === link.href
                  ? "text-[#C8352A]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <span className="w-2 h-2 rounded-full bg-[#C8352A] ml-2 inline-block" />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-foreground py-2 px-1 touch-manipulation"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 bg-background z-[90] flex flex-col justify-center px-8 gap-8 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          href="/"
          className="font-serif italic text-[clamp(2rem,10vw,3.5rem)] text-foreground hover:text-[#C8352A] transition-colors"
        >
          Home
        </Link>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="font-serif italic text-[clamp(2rem,10vw,3.5rem)] text-foreground hover:text-[#C8352A] transition-colors"
          >
            {link.label}
          </Link>
        ))}

        <div className="border-t border-border pt-8 mt-4">
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase mb-2">
            kashmirstudio35@gmail.com
          </p>
          <p className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            03339566039
          </p>
        </div>
      </div>
    </>
  );
}
