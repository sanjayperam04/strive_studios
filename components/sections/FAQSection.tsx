"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const faqs = [
  { q: "What services does Summit Studio offer?", a: "We specialise in three core areas: brand identity and strategy, website design and UI/UX, and full-stack development and hosting. Every project is tailored — we don't do templates." },
  { q: "How long does a typical project take?", a: "Most projects run four to eight weeks from kickoff to launch. Complex builds with custom functionality may take longer. We'll give you a clear timeline before we start." },
  { q: "What is your pricing structure?", a: "We price by project scope, not by the hour. After an initial discovery call, we provide a fixed quote so there are no surprises. Most engagements start from $5,000." },
  { q: "Do you work with international clients?", a: "Absolutely. We work with brands across India, the UK, the US, and beyond. Our process is built for async collaboration across time zones." },
  { q: "What happens after launch?", a: "Launch is the beginning, not the end. We offer ongoing support packages for content updates, performance monitoring, and iterative improvements based on real analytics." },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section
      id="faq"
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
            Questions
          </div>
          <h2 style={{ fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.025em" }}>
            Frequently Asked<br />Questions
          </h2>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div key={index} variants={fadeUp}>
                <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", width: "100%" }} />
                <div 
                  onClick={() => toggleOpen(index)}
                  style={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    paddingBlock: "28px", 
                    cursor: "pointer" 
                  }}
                >
                  <div style={{ fontSize: "clamp(16px, 1.2vw, 20px)", fontWeight: 500 }}>
                    {faq.q}
                  </div>
                  <div 
                    style={{ 
                      fontSize: "20px", 
                      color: "rgba(255, 255, 255, 0.4)", 
                      transition: "transform 0.3s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)"
                    }}
                  >
                    +
                  </div>
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ fontSize: "clamp(15px, 1.1vw, 18px)", lineHeight: 1.7, color: "rgba(255, 255, 255, 0.45)", maxWidth: "700px", paddingBottom: "28px" }}>
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          <motion.div variants={fadeUp} style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", width: "100%" }} />
        </div>
      </div>
    </motion.section>
  );
}
