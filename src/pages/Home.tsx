import { useState } from "react";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Work from "@/components/Work";
import VideoReel from "@/components/VideoReel";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useLenis } from "@/hooks/useLenis";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Cursor />
      <div className="grain">
        {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
        <Nav />
        <Hero />
        <Marquee />
        <About />
        <Work />
        <VideoReel />
        <Services />
        <Testimonials />
        <Stats />
        <Marquee />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
