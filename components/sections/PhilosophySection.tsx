"use client";

import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function PhilosophySection() {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      style={{
        paddingTop: "clamp(100px, 12vw, 180px)",
        paddingBottom: "clamp(100px, 12vw, 180px)",
        paddingInline: "clamp(24px, 5vw, 80px)",
        backgroundColor: "#0a0a0a",
      }}
    >
      <div style={{ maxWidth: "1000px" }}>
        <motion.h2
          variants={fadeUp}
          style={{
            fontSize: "clamp(34px, 4.5vw, 68px)",
            fontWeight: 600,
            lineHeight: 1.12,
            letterSpacing: "-0.025em",
            marginBottom: "36px",
            color: "#ffffff",
          }}
        >
          Crafted Experiences, <br />
          Engineered Results
        </motion.h2>
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(16px, 1.3vw, 20px)",
            fontWeight: 400,
            lineHeight: 1.8,
            color: "rgba(255, 255, 255, 0.45)",
            maxWidth: "540px",
            margin: 0,
          }}
        >
          Every project is a collaboration between strategy, design, and engineering. Here's how we help brands stand out.
        </motion.p>
      </div>
    </motion.section>
  );
}
