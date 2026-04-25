"use client";

import { useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/sections/ServicesSection";
import FeaturedProjectsSection from "@/components/sections/FeaturedProjectsSection";
import WhyChooseUsSection from "@/components/sections/WhyChooseUsSection";
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

      <ServicesSection />

      {/* Isolation wrapper — prevents sticky cards from bleeding into next section */}
      <div className="relative z-10 bg-black">
        <FeaturedProjectsSection />

        <WhyChooseUsSection />


        <ProcessSection onContactClick={handleContactClick} />

        <ContactSection />

        <SiteFooter />
      </div>
    </main>
  );
}
