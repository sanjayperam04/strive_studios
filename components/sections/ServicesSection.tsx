"use client";
import React from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const services = [
  { num: "01", title: "Branding", description: "Strategic positioning, visual identity systems, and brand guidelines. We build brands that command attention and ensure consistency across every touchpoint." },
  { num: "02", title: "Website Design", description: "Beautiful interfaces backed by behavioural insight. Every layout, interaction, and micro-animation is crafted to guide users toward conversion." },
  { num: "03", title: "Development", description: "From performant Next.js builds to hosting and launch QA. We ship clean, scalable code that loads fast and ranks higher." },
];

export default function ServicesSection() {
  return (
    <motion.section id="services" initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.15 }} variants={stagger} style={{ paddingTop: "clamp(100px,12vw,180px)", paddingBottom: "clamp(100px,12vw,180px)", paddingInline: "clamp(24px,5vw,80px)", backgroundColor: "#0a0a0a", color: "#ffffff" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.p variants={fadeUp} style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.45)", marginBottom: "24px" }}>
          What we do
        </motion.p>
        <motion.h2 variants={fadeUp} style={{ fontSize: "clamp(36px,5vw,72px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "80px", color: "#ffffff" }}>
          Our Services
        </motion.h2>
        
        <div>
          {services.map((service) => (
            <React.Fragment key={service.num}>
              <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", width: "100%" }} />
              <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1.5fr]" style={{ gap: "24px", paddingTop: "40px", paddingBottom: "40px" }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255,255,255,0.2)" }}>
                  {service.num}
                </div>
                <div style={{ fontSize: "clamp(24px,3vw,40px)", fontWeight: 600, letterSpacing: "-0.02em", color: "#ffffff" }}>
                  {service.title}
                </div>
                <div style={{ fontSize: "clamp(15px,1.1vw,18px)", fontWeight: 400, lineHeight: 1.7, color: "rgba(255,255,255,0.45)", maxWidth: "480px" }}>
                  {service.description}
                </div>
              </motion.div>
            </React.Fragment>
          ))}
          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", width: "100%" }} />
        </div>
      </div>
    </motion.section>
  );
}
