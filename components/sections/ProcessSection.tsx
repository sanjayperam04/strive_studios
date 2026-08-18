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

const steps = [
  { num: "01", title: "Strategy", subtitle: "Find the sharp angle", description: "Clarify your offer, audience, and competitive edge. Map the visitor journey before designing screens." },
  { num: "02", title: "Brand", subtitle: "Shape the language", description: "Logo, type, colour — a system that works beyond the homepage and scales with your growth." },
  { num: "03", title: "Design", subtitle: "Experience architecture", description: "High-converting page layouts for mobile and desktop. Prototyped interactions, nothing guessed." },
  { num: "04", title: "Delivery", subtitle: "Build, test, launch", description: "Clean Next.js code, hosting, and launch QA. No agency maze — just your website going live." },
];

export default function ProcessSection() {
  return (
    <motion.section
      id="process"
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
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ marginBottom: "80px" }}>
          <div style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: "24px", color: "rgba(255, 255, 255, 0.45)" }}>
            How we work
          </div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em" }}>
            From idea <span style={{ color: "rgba(255, 255, 255, 0.2)" }}>to launch.</span>
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((step, index) => (
            <motion.div key={index} variants={fadeUp}>
              <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", width: "100%" }} />
              <div className="grid grid-cols-1 lg:grid-cols-[80px_1fr_1.5fr]" style={{ paddingBlock: "40px", gap: "24px" }}>
                <div style={{ fontSize: "14px", fontWeight: 500, color: "rgba(255, 255, 255, 0.2)" }}>
                  {step.num}
                </div>
                <div>
                  <div style={{ fontSize: "clamp(22px, 2.5vw, 36px)", fontWeight: 600, letterSpacing: "-0.02em" }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.35)", marginTop: "8px" }}>
                    {step.subtitle}
                  </div>
                </div>
                <div style={{ fontSize: "clamp(15px, 1.1vw, 18px)", lineHeight: 1.7, color: "rgba(255, 255, 255, 0.45)", maxWidth: "480px" }}>
                  {step.description}
                </div>
              </div>
            </motion.div>
          ))}
          <motion.div variants={fadeUp} style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", width: "100%" }} />
        </div>
      </div>
    </motion.section>
  );
}
