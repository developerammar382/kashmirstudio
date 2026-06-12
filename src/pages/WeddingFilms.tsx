import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

import weddingHero from "@/assets/images/wedding-hero.png";
import weddingDetail1 from "@/assets/images/wedding-detail-1.png";
import weddingDetail2 from "@/assets/images/wedding-detail-2.png";
import weddingDetail3 from "@/assets/images/wedding-detail-3.png";

const inclusions = [
  "Full-day cinema coverage",
  "Two-camera setup",
  "Highlight film (5–8 minutes)",
  "Full ceremony & reception edit",
  "Colour-graded footage",
  "Private online delivery",
  "USB archive copy",
];

const process = [
  { num: "01", title: "Consultation", desc: "We meet — in person or over call — to understand your day, your vision, and the moments that matter most to you." },
  { num: "02", title: "Pre-Wedding Coverage", desc: "Mehndi, dholki, baraat — we document every ceremony leading up to the main event with the same cinematic care." },
  { num: "03", title: "The Wedding Day", desc: "Two cinematographers, zero interference. We are observers who happen to have cameras. You won't feel followed." },
  { num: "04", title: "Edit & Delivery", desc: "Your film is colour-graded, scored, and delivered within 6–8 weeks — crafted to be watched for generations." },
];

export default function WeddingFilms() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const els = [heroImgRef.current, headingRef.current].filter(Boolean);
    gsap.fromTo(els,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.15, ease: "power3.out", delay: 0.1 }
    );

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" } }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <>
      <Cursor />
      <div className="grain bg-background min-h-screen">
        <Nav />

        {/* Hero */}
        <div ref={heroRef} className="relative w-full h-[70vh] overflow-hidden mt-16">
          <img
            ref={heroImgRef}
            src={weddingHero}
            alt="Cinematic wedding coverage"
            className="w-full h-full object-cover opacity-0"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/50" />
          <div className="absolute bottom-10 left-6 md:left-12">
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#FAF8F5]/60 uppercase mb-3">Service</p>
            <h1 className="font-serif italic text-[#FAF8F5] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
              Wedding<br />Films
            </h1>
          </div>
          <Link href="/" className="absolute top-20 right-6 md:right-12 font-mono text-[10px] tracking-[0.3em] text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors uppercase">
            ← Back
          </Link>
        </div>

        {/* Intro */}
        <section className="px-6 md:px-12 py-20 reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-12">
            <div>
              <p className="font-serif italic text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.35] text-foreground">
                A wedding film is not a recording of an event. It is the preservation of a feeling — the weight of the moment, the texture of light, the way two people looked at each other for the first time as husband and wife.
              </p>
            </div>
            <div className="md:pt-4">
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-6">
                For fifteen years, we have been trusted by families across Rawalpindi, Islamabad, and Gujar Khan to tell the story of their most important day. We don't just film weddings — we craft cinema.
              </p>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                Every edit is unhurried. Every frame is considered. The result is a film you will return to again and again, for the rest of your life.
              </p>
            </div>
          </div>
        </section>

        {/* Images grid */}
        <section className="px-6 md:px-12 pb-20 reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 overflow-hidden" style={{ height: "420px" }}>
              <img src={weddingDetail2} alt="Wedding reception" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="overflow-hidden" style={{ height: "200px" }}>
                <img src={weddingDetail1} alt="Bridal detail" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="overflow-hidden" style={{ height: "200px" }}>
                <img src={weddingDetail3} alt="Couple at sunset" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className="px-6 md:px-12 py-20 bg-[#F5F1EB] reveal-section">
          <div className="flex items-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">What's Included</span>
            <div className="flex-1 h-[1px] bg-border ml-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inclusions.map((item, i) => (
              <div key={i} className="flex items-start gap-4 py-4 border-b border-border">
                <span className="font-mono text-[10px] text-[#C8352A] mt-1">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-sans text-[15px] text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="px-6 md:px-12 py-20 reveal-section">
          <div className="flex items-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">Our Process</span>
            <div className="flex-1 h-[1px] bg-border ml-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {process.map((step) => (
              <div key={step.num}>
                <span className="font-mono text-[11px] text-[#C8352A] mb-3 block">{step.num}</span>
                <h3 className="font-serif text-[clamp(1.4rem,2.5vw,2rem)] text-foreground mb-3">{step.title}</h3>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-20 bg-[#0A0A0A] reveal-section">
          <div className="max-w-2xl">
            <h2 className="font-serif italic text-[#FAF8F5] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-8">
              Your wedding deserves a film as extraordinary as the day itself.
            </h2>
            <Link
              href="/"
              className="inline-block font-mono text-[11px] tracking-[0.4em] uppercase bg-[#FAF8F5] text-[#0A0A0A] px-8 py-4 hover:bg-[#C8352A] hover:text-[#FAF8F5] transition-colors duration-300"
            >
              Book a Consultation
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
