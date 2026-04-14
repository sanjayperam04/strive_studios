"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TOKENS } from "../../styles/tokens";

interface ProcessSectionProps {
  onContactClick: () => void;
}

export default function ProcessSection({ onContactClick }: ProcessSectionProps) {
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-80px" });

  return (
    <section
      id="process"
      ref={aboutRef}
      style={{ padding: `0 ${TOKENS.spacing.sectionX} ${TOKENS.spacing.sectionBottomLg}`, overflow: "hidden" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={aboutInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center"
        style={{ marginBottom: "32px" }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-white/35">Our process</p>
        <div style={{ height: "28px" }} />
        <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          Building websites made
          <br />
          simple and stress-free
        </h2>
        <div style={{ height: "28px" }} />
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
        {[
          {
            num: "01",
            title: "Discovery",
            text: "We start by understanding your business goals, target users, and technical requirements. Through detailed consultations and research, we define the project scope, features, and technology stack that will bring your vision to life.",
          },
          {
            num: "02",
            title: "Build",
            text: "Our developers bring designs to life with clean, scalable code. Using modern frameworks like Next.js and React, we build fast, responsive websites with seamless functionality. Regular updates keep you in the loop throughout development.",
          },
          {
            num: "03",
            title: "Launch",
            text: "After thorough testing and optimization, we deploy your website to production. We handle hosting setup, domain configuration, and provide training so you can manage your site with confidence. Ongoing support ensures everything runs smoothly.",
          },
        ].map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 24 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            style={{ borderRadius: TOKENS.radius.card, overflow: "hidden", position: "relative", height: "400px" }}
          >
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/process-bg.jpg')" }} />
            <div className="absolute inset-0 bg-black/40" />
            <div style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
              <div>
                <p style={{ color: TOKENS.colors.textMuted40, fontSize: "12px", marginBottom: "12px" }}>{step.num}</p>
                <h3 style={{ color: TOKENS.colors.textPrimary, fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>{step.title}</h3>
              </div>
              <div style={{ marginTop: "auto" }}>
                <p style={{ color: TOKENS.colors.textNearWhite, fontSize: "14px", lineHeight: "1.6" }}>{step.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
        <button
          type="button"
          onClick={onContactClick}
          style={{
            backgroundColor: TOKENS.colors.textPrimary,
            color: TOKENS.colors.textInverse,
            fontSize: "15px",
            fontWeight: 500,
            padding: TOKENS.spacing.buttonPadding,
            borderRadius: TOKENS.radius.pill,
            border: "none",
            cursor: "pointer",
            transition: `all ${TOKENS.motion.quick}`,
            letterSpacing: "0.01em",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.88)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = TOKENS.colors.textPrimary;
          }}
        >
          Work with us
        </button>
      </div>
    </section>
  );
}
