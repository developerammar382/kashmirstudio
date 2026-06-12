import { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string | undefined;

type Status = "idle" | "sending" | "success" | "error";

const initForm = { name: "", email: "", phone: "", type: "", date: "", message: "" };

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);

  const [form, setForm]     = useState(initForm);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const animate = (el: HTMLDivElement | null, delay = 0) => {
      if (!el) return;
      gsap.fromTo(el,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" } }
      );
    };
    animate(leftRef.current);
    animate(rightRef.current, 0.15);
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  form.name,
          reply_to:   form.email,
          phone:      form.phone,
          event_type: form.type,
          event_date: form.date,
          message:    form.message,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setForm(initForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section ref={sectionRef} className="px-4 sm:px-6 md:px-12 py-16 md:py-28">
      <div className="flex items-center mb-10 md:mb-14">
        <div className="flex-1 h-[1px] bg-border" />
        <span className="font-mono text-[10px] tracking-[0.4em] text-muted-foreground ml-6 uppercase">Contact</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-12 md:gap-24">

        {/* Left — studio info */}
        <div ref={leftRef}>
          <h2 className="font-serif text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[0.95] text-foreground mb-6">
            LET'S CREATE<br />SOMETHING<br />TOGETHER.
          </h2>
          <div className="w-10 h-[2px] bg-[#C8352A] mb-8" />
          <div className="font-mono text-[12px] leading-[2.5] text-muted-foreground">
            <p>kashmirstudio35@gmail.com</p>
            <p>03339566039</p>
            <p>Gujar Khan · Rawalpindi · Islamabad</p>
          </div>
          <div className="mt-10 font-mono text-[11px] text-muted-foreground tracking-[0.2em] flex gap-5">
            <span className="hover:text-foreground transition-colors cursor-pointer">IG</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">FB</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">YT</span>
          </div>
        </div>

        {/* Right — form */}
        <div ref={rightRef}>
          {status === "success" ? (
            <div className="flex flex-col justify-center h-full py-12">
              <div className="w-8 h-[2px] bg-[#C8352A] mb-6" />
              <h3 className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] text-foreground mb-4 leading-tight">
                Message received.
              </h3>
              <p className="font-sans text-[15px] text-muted-foreground leading-relaxed mb-8">
                Thank you for reaching out. We'll be in touch within 24 hours to discuss your vision.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#C8352A] hover:underline text-left"
              >
                ← Send another message
              </button>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col">

              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
                <div className="mt-6">
                  <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your full name"
                    data-testid="input-name"
                    className="w-full bg-transparent border-0 border-b border-border pb-3 font-sans text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div className="mt-6">
                  <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="your@email.com"
                    data-testid="input-email"
                    className="w-full bg-transparent border-0 border-b border-border pb-3 font-sans text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              {/* Phone + Event type row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-8">
                <div className="mt-6">
                  <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="03xx xxxxxxx"
                    data-testid="input-phone"
                    className="w-full bg-transparent border-0 border-b border-border pb-3 font-sans text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
                <div className="mt-6">
                  <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Event Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    data-testid="select-event-type"
                    className="w-full bg-transparent border-0 border-b border-border pb-3 font-sans text-[15px] text-foreground focus:outline-none appearance-none"
                  >
                    <option value="">Select event type</option>
                    <option value="Wedding Film">Wedding Film</option>
                    <option value="Event Photography">Event Photography</option>
                    <option value="Portrait Session">Portrait Session</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Date */}
              <div className="mt-6">
                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Event Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  data-testid="input-date"
                  className="w-full bg-transparent border-0 border-b border-border pb-3 font-sans text-[15px] text-foreground focus:outline-none"
                />
              </div>

              {/* Message */}
              <div className="mt-6">
                <label className="block font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Message *</label>
                <textarea
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us about your vision"
                  data-testid="textarea-message"
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-border pb-3 font-sans text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none resize-none"
                />
              </div>

              {/* Error state */}
              {status === "error" && (
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#C8352A] mt-4">
                  {!SERVICE_ID
                    ? "EmailJS not configured yet. Add your credentials to the Secrets tab."
                    : "Something went wrong. Please try again or email us directly."}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending"}
                data-testid="button-submit"
                className="mt-8 w-full bg-[#0A0A0A] text-[#FAF8F5] font-mono text-[11px] sm:text-[12px] tracking-[0.3em] sm:tracking-[0.4em] uppercase py-[18px] border-none transition-colors duration-300 hover:bg-[#C8352A] disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {status === "sending" ? "SENDING..." : "SEND INQUIRY"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
