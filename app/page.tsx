"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ContactForm from "../components/ContactForm";
import ServicesSection from "../components/sections/ServicesSection";
import FeaturedProjectsSection from "../components/sections/FeaturedProjectsSection";
import WhyChooseUsSection from "../components/sections/WhyChooseUsSection";
import AboutUsSection from "../components/sections/AboutUsSection";
import ProcessSection from "../components/sections/ProcessSection";
import SiteFooter from "../components/sections/SiteFooter";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="bg-black text-white">
      <Navbar onContactClick={() => setIsContactOpen(true)} />
      <Hero />
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <div className="h-40" />
      <ServicesSection />

      <div className="h-48" />
      <FeaturedProjectsSection onContactClick={() => setIsContactOpen(true)} />

      <div className="h-20" />
      <WhyChooseUsSection />

      <div className="h-12" />
      <AboutUsSection onContactClick={() => setIsContactOpen(true)} />

      <div className="h-8" />
      <ProcessSection onContactClick={() => setIsContactOpen(true)} />

      <SiteFooter />
    </main>
  );
}
