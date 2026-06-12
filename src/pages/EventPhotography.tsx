import { useEffect, useRef } from "react";
import { Link } from "wouter";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

import eventsHero from "@/assets/images/events-hero.png";
import eventsDetail1 from "@/assets/images/events-detail-1.png";
import eventsDetail2 from "@/assets/images/events-detail-2.png";

const eventTypes = [
  { num: "01", name: "Corporate Events", desc: "Conferences, launches, galas, and award ceremonies documented with editorial precision." },
  { num: "02", name: "Social Gatherings", desc: "Birthday milestones, anniversaries, and family celebrations captured with warmth and candour." },
  { num: "03", name: "Cultural Ceremonies", desc: "Mehndi, Walima, Nikah, and every ceremony in between — told with cultural sensitivity and artistry." },
  { num: "04", name: "Brand Activations", desc: "Product launches and experiential events photographed to deliver high-impact commercial imagery." },
];

const stats = [
  { val: "500+", label: "Events Documented" },
  { val: "15", label: "Years Experience" },
  { val: "3", label: "Cities Covered" },
  { val: "24h", label: "Delivery Available" },
];

export default function EventPhotography() {
  const heroImgRef = useRef<HTMLImageElement>(null);

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

  return (
    <>
      <Cursor />
      <div className="grain bg-background min-h-screen">
        <Nav />

        {/* Hero */}
        <div className="relative w-full h-[70vh] overflow-hidden mt-16">
          <img
            ref={heroImgRef}
            src={eventsHero}
            alt="Event photography"
            className="w-full h-full object-cover opacity-0"
          />
          <div className="absolute inset-0 bg-[#0A0A0A]/45" />
          <div className="absolute bottom-10 left-6 md:left-12">
            <p className="font-mono text-[10px] tracking-[0.4em] text-[#FAF8F5]/60 uppercase mb-3">Service</p>
            <h1 className="font-serif italic text-[#FAF8F5] text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
              Event<br />Photography
            </h1>
          </div>
          <Link href="/" className="absolute top-20 right-6 md:right-12 font-mono text-[10px] tracking-[0.3em] text-[#FAF8F5]/70 hover:text-[#FAF8F5] transition-colors uppercase">
            ← Back
          </Link>
        </div>

        {/* Stats bar */}
        <div className="bg-[#0A0A0A] reveal-section">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#222] px-6 md:px-12">
            {stats.map((s, i) => (
              <div key={i} className="py-8 px-4 md:px-8 first:pl-0">
                <p className="font-serif text-[#FAF8F5] text-[clamp(1.8rem,4vw,3rem)] leading-none">{s.val}</p>
                <p className="font-mono text-[10px] tracking-[0.3em] text-[#616161] mt-2 uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Intro */}
        <section className="px-6 md:px-12 py-20 reveal-section">
          <div className="max-w-3xl">
            <p className="font-serif italic text-[clamp(1.4rem,2.8vw,2.2rem)] leading-[1.35] text-foreground mb-8">
              The best event photograph is the one nobody saw being taken — a genuine moment, caught with precision, that outlasts the event itself.
            </p>
            <p className="font-sans text-[15px] text-muted-foreground leading-relaxed">
              We work invisibly. No staging, no interruptions, no posing. Our photographers move through your event as guests, with the discipline to recognise and capture the moments that matter — before they vanish.
            </p>
          </div>
        </section>

        {/* Dual image */}
        <section className="px-6 md:px-12 pb-20 reveal-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="overflow-hidden" style={{ height: "380px" }}>
              <img src={eventsDetail1} alt="Event speaker" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="overflow-hidden" style={{ height: "380px" }}>
              <img src={eventsDetail2} alt="Family gathering" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </section>

        {/* Event types */}
        <section className="px-6 md:px-12 py-20 reveal-section">
          <div className="flex items-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">What We Cover</span>
            <div className="flex-1 h-[1px] bg-border ml-6" />
          </div>
          <div>
            {eventTypes.map((type) => (
              <div key={type.num} className="py-8 border-b border-border grid grid-cols-[2.5rem_1fr] gap-6 items-start">
                <span className="font-mono text-[11px] text-[#C8352A] pt-1">{type.num}</span>
                <div>
                  <h3 className="font-serif text-[clamp(1.3rem,2.5vw,2rem)] text-foreground mb-2">{type.name}</h3>
                  <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">{type.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deliverables */}
        <section className="px-6 md:px-12 py-20 bg-[#F5F1EB] reveal-section">
          <div className="flex items-center mb-14">
            <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground uppercase">Deliverables</span>
            <div className="flex-1 h-[1px] bg-border ml-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Full Gallery", desc: "100–500+ fully edited, colour-graded photographs delivered via private online gallery." },
              { title: "Fast Turnaround", desc: "Standard 7–10 day delivery. Rush 24-hour delivery available for corporate clients." },
              { title: "Commercial License", desc: "Full commercial usage rights included for all corporate and brand event coverage." },
            ].map((d, i) => (
              <div key={i} className="border-t border-border pt-6">
                <span className="font-mono text-[10px] text-[#C8352A] tracking-[0.3em] block mb-3">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="font-serif text-[1.3rem] text-foreground mb-3">{d.title}</h4>
                <p className="font-sans text-[14px] text-muted-foreground leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 md:px-12 py-20 bg-[#0A0A0A] reveal-section">
          <div className="max-w-2xl">
            <h2 className="font-serif italic text-[#FAF8F5] text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] mb-8">
              Every event has a story. Let us tell yours.
            </h2>
            <Link
              href="/"
              className="inline-block font-mono text-[11px] tracking-[0.4em] uppercase bg-[#FAF8F5] text-[#0A0A0A] px-8 py-4 hover:bg-[#C8352A] hover:text-[#FAF8F5] transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
