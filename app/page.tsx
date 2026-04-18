"use client";

import { useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ContactSection from "@/components/sections/ContactSection";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  const handleContactClick = useCallback(() => {
    const target = document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />

      <div className="h-40" />
      <ServicesSection />

      <div className="h-48" />
      <FeaturedProjectsSection onContactClick={handleContactClick} />

      <div className="h-20" />
      <WhyChooseUsSection />

      <div className="h-12" />
      <AboutUsSection onContactClick={handleContactClick} />

      <div className="h-8" />
      <ProcessSection onContactClick={handleContactClick} />

      <ContactSection />

      <SiteFooter />
    </main>
  );
}
