import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

import portraitsHero from "@/assets/images/portraits-hero.png";
import portraitsDetail1 from "@/assets/images/portraits-detail-1.png";
import portraitsDetail2 from "@/assets/images/portraits-detail-2.png";

const sessionTypes = [
  {
    num: "01",
    name: "Individual Portraits",
    tag: "SOLO",
    desc: "For professionals, artists, or anyone who wants a photograph that tells their story honestly.",
  },
  {
    num: "02",
    name: "Couple Sessions",
    tag: "TOGETHER",
    desc: "Pre-wedding, anniversary, or simply because — a session that captures the chemistry between two people.",
  },
  {
    num: "03",
    name: "Family Portraits",
    tag: "FAMILY",
    desc: "Multi-generational, relaxed, and genuine. No stiff poses. Just your family as it actually is.",
  },
  {
    num: "04",
    name: "Maternity & Newborn",
    tag: "MILESTONE",
    desc: "The quietest, most profound moments of all — documented with tenderness and care.",
  },
];

const testimonials = [
  {
    quote: "The session felt like a conversation. By the end, we had forgotten there was a camera. The photographs showed.",
    name: "Nadia Tariq",
    tag: "Family Session, Islamabad",
  },
  {
    quote: "I had never liked photographs of myself. Kashmir Studio changed that. I finally look like myself.",
    name: "Bilal Chaudhry",
    tag: "Individual Portrait, Rawalpindi",
  },
];

export default function PortraitSessions() {
  const heroImgRef = useRef<HTMLImageElement>(null);
  const activeRef = useRef(0);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (heroImgRef.current) {
      gsap.fromTo(heroImgRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 1.3, ease: "power3.out" }
      );
    }

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

  const goTo = (next: number) => {
    const els = [quoteRef.current, nameRef.current, tagRef.current].filter(Boolean);
    gsap.to(els, { opacity: 0, y: -12, duration: 0.25, ease: "power2.in", onComplete: () => {
      activeRef.current = next;
      if (quoteRef.current) quoteRef.current.textContent = `"${testimonials[next].quote}"`;
      if (nameRef.current) nameRef.current.textContent = testimonials[next].name;
      if (tagRef.current) tagRef.current.textContent = testimonials[next].tag;
      gsap.to(els, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
    }});
  };

  return (
    <>
      <Cursor />
      <div className="grain bg-background min-h-screen">
        <Nav />

        {/* Hero */}
        <div className="relative w-full h-[70vh] overflow-hidden mt-16">
          <img
            ref={heroImgRef}
            src={portraitsHero}
            alt="Portrait session"
            className="w-full h-full object-cover opacity-0"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/40" />
          <div className="absolute bottom-10 left-6 md:left-12">
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#FAF8F5]/60 uppercase mb-3">Service</p>
            <h1 className="font-serif italic text-[#FAF8F5] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
              Portrait<br />Sessions
            </h1>
          </div>
          <Link href="/" className="absolute top-20 right-6 md:right-12 font-mono text-[10px] tracking-[0.3em] text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors uppercase">
            ← Back
          </Link>
        </div>

        {/* Intro */}
        <section className="px-6 md:px-12 py-20 reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-[55%_45%] gap-16">
            <p className="font-serif italic text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.35] text-foreground">
              A portrait is not a likeness. It is a truth — a single frame that says: this is who this person is, at this moment in time.
            </p>
            <div className="flex flex-col justify-end gap-4">
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                We don't direct. We don't pose. We observe, and we wait for the moment when you forget you're being photographed. That is when the real portrait appears.
              </p>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
                Our portrait sessions take place in Rawalpindi, Islamabad, and Gujar Khan — in locations chosen specifically for your story.
              </p>
            </div>
          </div>
        </section>

        {/* Dual images */}
        <section className="px-6 md:px-12 pb-20 reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-[38%_62%] gap-4">
            <div className="overflow-hidden" style={{ height: "500px" }}>
              <img src={portraitsDetail1} alt="Couple portrait" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden flex-1">
                <img src={portraitsDetail2} alt="Family portrait" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="bg-[#0A0A0A] p-8 flex flex-col justify-center">
                <p className="font-mono text-[10px] tracking-[0.3em] text-[#616161] uppercase mb-4">Session Duration</p>
                <p className="font-serif text-[#FAF8F5] text-[2rem] leading-none">1–3 Hours</p>
                <p className="font-sans text-[13px] text-[#616161] mt-3">Relaxed, unhurried, and crafted entirely around you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Session types */}
        <section className="px-6 md:px-12 py-20 reveal-section">
          <div className="flex items-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">Session Types</span>
            <div className="flex-1 h-[1px] bg-border ml-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
            {sessionTypes.map((type) => (
              <div key={type.num} className="py-8 border-b border-border">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="font-mono text-[11px] text-muted-foreground">{type.num}</span>
                  <span className="font-mono text-[10px] text-[#C8352A] tracking-[0.2em]">[ {type.tag} ]</span>
                </div>
                <h3 className="font-serif text-[clamp(1.3rem,2.5vw,1.8rem)] text-foreground mb-2">{type.name}</h3>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-6 md:px-12 py-20 bg-[#F5F1EB] reveal-section">
          <div className="flex items-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">They Said</span>
            <div className="flex-1 h-[1px] bg-border ml-6" />
          </div>
          <div className="max-w-2xl">
            <p ref={quoteRef} className="font-serif italic text-[clamp(1.2rem,2.4vw,1.8rem)] leading-[1.45] text-foreground mb-8">
              "{testimonials[0].quote}"
            </p>
            <div className="flex items-center gap-6">
              <div>
                <span ref={nameRef} className="font-sans text-[14px] font-medium text-foreground block">{testimonials[0].name}</span>
                <span ref={tagRef} className="font-mono text-[10px] text-muted-foreground tracking-[0.2em]">{testimonials[0].tag}</span>
              </div>
              <div className="flex gap-3 ml-auto">
                <button onClick={() => goTo(0)} data-testid="button-t1" className="font-mono text-[14px] text-muted-foreground hover:text-foreground transition-colors">←</button>
                <button onClick={() => goTo(1)} data-testid="button-t2" className="font-mono text-[14px] text-muted-foreground hover:text-foreground transition-colors">→</button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-20 bg-[#0A0A0A] reveal-section">
          <div className="max-w-2xl">
            <h2 className="font-serif italic text-[#FAF8F5] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-8">
              You deserve a photograph you'll keep forever.
            </h2>
            <Link
              href="/"
              className="inline-block font-mono text-[11px] tracking-[0.4em] uppercase bg-[#FAF8F5] text-[#0A0A0A] px-8 py-4 hover:bg-[#C8352A] hover:text-[#FAF8F5] transition-colors duration-300"
            >
              Book a Session
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
