"use client";

import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.45)",
        }}
      />

      <div
        className="flex items-center justify-center flex-col"
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          textAlign: "center",
          paddingInline: "clamp(24px, 5vw, 80px)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(52px, 8.5vw, 150px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            marginBottom: "32px",
            color: "#ffffff",
          }}
        >
          Summit Studio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            fontSize: "clamp(15px, 1.2vw, 19px)",
            fontWeight: 400,
            lineHeight: 1.75,
            color: "rgba(255, 255, 255, 0.55)",
            maxWidth: "480px",
            margin: "0 auto 48px",
          }}
        >
          Branding, website design, and development<br />
          for businesses that want to be remembered.
        </motion.p>

        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ color: "#ffffff", y: -2 }}
          style={{
            fontSize: "13px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(255, 255, 255, 0.5)",
            textDecoration: "none",
          }}
        >
          Get started →
        </motion.a>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="flex items-center flex-col"
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: "11px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(255, 255, 255, 0.25)",
            marginBottom: "12px",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "40px",
            background: "rgba(255, 255, 255, 0.12)",
          }}
        />
      </motion.div>
    </section>
  );
}
