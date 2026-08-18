import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PhilosophySection from "@/components/sections/PhilosophySection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClientsMarquee from "@/components/sections/ClientsMarquee";
import FeaturedWorkSection from "@/components/sections/FeaturedWorkSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import ProcessSection from "@/components/sections/ProcessSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactCTA from "@/components/sections/ContactCTA";
import SiteFooter from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <main style={{ background: "#0a0a0a", color: "#ffffff" }}>
      <Navbar />
      <Hero />
      <PhilosophySection />
      <ServicesSection />
      <ClientsMarquee />
      <FeaturedWorkSection />
      <StatsSection />
      <TestimonialSection />
      <ProcessSection />
      <FAQSection />
      <ContactCTA />
      <SiteFooter />
    </main>
  );
}
