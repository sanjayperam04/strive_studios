"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TOKENS } from "../../styles/tokens";

export default function WhyChooseUsSection() {
  const whyRef = useRef(null);
  const phoneCardRef = useRef(null);
  const statsCardRef = useRef(null);

  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsCardRef, { once: true, margin: "-50px" });

  const { scrollYProgress: phoneScrollProgress } = useScroll({
    target: phoneCardRef,
    offset: ["start end", "end start"],
  });
  const phoneY = useTransform(phoneScrollProgress, [0, 1], [60, -60]);

  return (
    <section
      id="about"
      ref={whyRef}
      style={{ padding: `0 ${TOKENS.spacing.sectionX} ${TOKENS.spacing.sectionBottomLg}`, overflow: "hidden" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={whyInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="text-center"
        style={{ marginBottom: "32px" }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-white/35">Why choose us</p>
        <div style={{ height: "28px" }} />
        <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          Tailored design solutions for every need.
        </h2>
        <div style={{ height: "28px" }} />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={whyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:h-[400px]"
          style={{ position: "relative", borderRadius: TOKENS.radius.card, overflow: "hidden", minHeight: "280px" }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/car-bg.png')" }} />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, rgba(23,37,84,0.6), rgba(23,37,84,0.2), rgba(23,37,84,0.5))" }}
          />
          <div style={{ position: "relative", zIndex: 10, padding: "32px", height: "100%", display: "flex", flexDirection: "column" }}>
            <p style={{ color: TOKENS.colors.accentBlue, fontSize: "12px", marginBottom: "12px" }}>Fast turnarounds</p>
            <h3 style={{ color: TOKENS.colors.textPrimary, fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>
              Delivering high-quality
              <br />
              designs, right on time
            </h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={whyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:h-[400px]"
          ref={phoneCardRef}
          style={{ background: TOKENS.colors.textPrimary, borderRadius: TOKENS.radius.card, overflow: "hidden", position: "relative", minHeight: "280px" }}
        >
          <div style={{ padding: "32px 32px 0" }}>
            <p style={{ color: TOKENS.colors.inverseMuted45, fontSize: "12px", marginBottom: "12px" }}>100% satisfaction</p>
            <h3 style={{ color: TOKENS.colors.textInverse, fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>
              Crafted with precision
              <br />
              to meet your vision.
            </h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <motion.img src="/phone-mockup.png" alt="Phone mockup" style={{ width: "clamp(140px, 40%, 220px)", objectFit: "contain", objectPosition: "top", y: phoneY }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={whyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:h-[400px]"
          ref={statsCardRef}
          style={{ background: TOKENS.colors.surface, borderRadius: TOKENS.radius.card, overflow: "hidden", minHeight: "280px", display: "flex", flexDirection: "column" }}
        >
          <div style={{ padding: "32px", display: "flex", flexDirection: "column", height: "100%" }}>
            <p style={{ color: TOKENS.colors.textMuted35, fontSize: "12px", marginBottom: "12px" }}>Exponential growth</p>
            <h3 style={{ color: TOKENS.colors.textPrimary, fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>
              Design that drives
              <br />
              impact and success.
            </h3>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "16px", paddingBottom: "8px" }}>
              {[
                ["Conversion rate", 84, "rgba(255,255,255,0.25)"],
                ["User engagement", 67, "rgba(255,255,255,0.15)"],
                ["Brand recall", 91, "gradient"],
              ].map(([label, val, color]) => (
                <div key={label as string}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: TOKENS.colors.textMuted30, fontSize: "11px" }}>{label}</span>
                    <span style={{ color: TOKENS.colors.textMuted35, fontSize: "11px" }}>+{val}%</span>
                  </div>
                  <div style={{ height: "4px", background: TOKENS.colors.textMuted5, borderRadius: TOKENS.radius.pill, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={statsInView ? { width: `${val}%` } : { width: "0%" }}
                      transition={{
                        duration: 1.2,
                        delay: 0.3 + (["Conversion rate", "User engagement", "Brand recall"].indexOf(label as string) * 0.15),
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        height: "100%",
                        borderRadius: TOKENS.radius.pill,
                        background: color === "gradient" ? "linear-gradient(to right, #a78bfa, #f472b6, #fb923c)" : (color as string),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
