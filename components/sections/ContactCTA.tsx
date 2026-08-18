"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

export default function ContactCTA() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <motion.section
      id="contact"
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
        <motion.h2 
          variants={fadeUp}
          style={{ 
            fontSize: "clamp(42px, 6vw, 96px)", 
            fontWeight: 700, 
            lineHeight: 1.05, 
            letterSpacing: "-0.03em", 
            marginBottom: "40px" 
          }}
        >
          Let's Build<br />Something<span style={{ color: "#c0392b" }}>.</span>
        </motion.h2>
        
        <motion.p 
          variants={fadeUp}
          style={{ 
            fontSize: "clamp(15px, 1.2vw, 19px)", 
            lineHeight: 1.7, 
            color: "rgba(255, 255, 255, 0.45)", 
            maxWidth: "440px", 
            margin: "0 auto 48px" 
          }}
        >
          Ready to build something bold? Tell us what you're working on.
        </motion.p>
        
        <motion.div 
          variants={fadeUp}
          style={{ 
            display: "flex", 
            gap: "24px", 
            justifyContent: "center", 
            flexWrap: "wrap",
            alignItems: "center"
          }}
        >
          <button 
            onClick={() => setIsFormOpen(true)}
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              gap: "8px", 
              background: "white", 
              color: "#0a0a0a", 
              fontSize: "14px", 
              fontWeight: 600, 
              padding: "16px 36px", 
              borderRadius: "999px", 
              border: "none", 
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 0 0 rgba(255,255,255,0)"
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(255,255,255,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 0 0 rgba(255,255,255,0)";
            }}
          >
            Start a project
          </button>
          
          <a 
            href="mailto:hello@summitstudios.co"
            style={{
              fontSize: "clamp(18px, 2.5vw, 24px)",
              color: "#c0392b",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-block",
              letterSpacing: "-0.01em",
              borderBottom: "1px solid rgba(192, 57, 43, 0.4)",
              paddingBottom: "4px",
              transition: "border-color 0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = "#c0392b"}
            onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(192, 57, 43, 0.4)"}
          >
            hello@summitstudios.co
          </a>
        </motion.div>
      </div>

      <ContactForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </motion.section>
  );
}
