"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/landing/Navbar").then(mod => ({ default: mod.Navbar })), { ssr: false });
const Hero = dynamic(() => import("@/components/landing/Hero").then(mod => ({ default: mod.Hero })), { ssr: false });
const About = dynamic(() => import("@/components/landing/About").then(mod => ({ default: mod.About })), { ssr: false });
const Services = dynamic(() => import("@/components/landing/Services").then(mod => ({ default: mod.Services })), { ssr: false });
const Products = dynamic(() => import("@/components/landing/Products").then(mod => ({ default: mod.Products })), { ssr: false });
const Features = dynamic(() => import("@/components/landing/Features").then(mod => ({ default: mod.Features })), { ssr: false });
const Gallery = dynamic(() => import("@/components/landing/Gallery").then(mod => ({ default: mod.Gallery })), { ssr: false });
const NewsSection = dynamic(() => import("@/components/landing/News").then(mod => ({ default: mod.NewsSection })), { ssr: false });
const Contact = dynamic(() => import("@/components/landing/Contact").then(mod => ({ default: mod.Contact })), { ssr: false });
const Footer = dynamic(() => import("@/components/landing/Footer").then(mod => ({ default: mod.Footer })), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F4F8FA] font-sans selection:bg-[#3594C4] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Products />
        <Features />
        <Gallery />
        <NewsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
