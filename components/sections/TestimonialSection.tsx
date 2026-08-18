"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function TestimonialSection() {
  return (
    <motion.section
      id="testimonial"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
      style={{
        paddingTop: "clamp(100px, 12vw, 180px)",
        paddingBottom: "clamp(100px, 12vw, 180px)",
        paddingInline: "clamp(24px, 5vw, 80px)",
        backgroundColor: "#0a0a0a",
        color: "#ffffff"
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", textAlign: "center" }}>
        <motion.div variants={fadeUp}>
          <div
            style={{
              fontSize: "clamp(80px, 10vw, 160px)",
              fontWeight: 700,
              lineHeight: 1,
              color: "rgba(255, 255, 255, 0.08)",
              marginBottom: "-20px"
            }}
          >
            {"\u201C"}
          </div>
        </motion.div>
        
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(22px, 2.8vw, 42px)",
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: "-0.02em",
            maxWidth: "900px",
            margin: "0 auto 48px"
          }}
        >
          Summit Studio transformed our entire digital presence. Their attention to detail and strategic thinking set them apart from every agency we've worked with.
        </motion.p>
        
        <motion.div variants={fadeUp}>
          <div style={{ fontSize: "15px", fontWeight: 600, marginBottom: "4px" }}>
            Alex Chen
          </div>
          <div style={{ fontSize: "14px", fontWeight: 400, color: "rgba(255, 255, 255, 0.35)" }}>
            CEO, Meridian Capital
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
