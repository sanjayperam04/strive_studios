"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TOKENS } from "../styles/tokens";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Card recedes into the distance
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.78]);
  // Dark vignette grows as next section covers the hero
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.75], [0, 0.82]);
  // Content fades + lifts out early
  const contentOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const contentY       = useTransform(scrollYProgress, [0, 0.32], [0, -24]);
  // Background subtly zooms while it recedes (parallax depth feel)
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="sticky top-0 w-full h-screen"
      style={{ zIndex: 0 }}
    >
      {/* ── Clipping / scaling card shell ──────────────────── */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={{
          scale,
          transformOrigin: "top center",
        }}
      >
        {/* Background image with slight counter-zoom for depth */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/hero-bg.jpg')",
            scale: bgScale,
            transformOrigin: "center center",
          }}
        />

        {/* Base tint */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Scroll-driven dark veil */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </motion.div>

      {/* ── Hero content — fades out independently ─────────── */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute"
          style={{ top: "38%", left: TOKENS.spacing.shellX, right: TOKENS.spacing.shellX }}
        >
          <p className="max-w-xl text-white text-[20px] md:text-[23px] font-normal leading-[1.75] mb-8">
            Branding, website design, and development<br />
            for businesses that want to be remembered.
          </p>

          <motion.a
            href="#contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="group inline-flex items-center gap-0 text-white text-sm font-normal tracking-wide"
          >
            <span className="relative">
              Get started
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c0392b] group-hover:w-full transition-all duration-300 ease-out" />
            </span>
            <span className="group-hover:translate-x-1 group-hover:text-[#c0392b] transition-all duration-300">→</span>
          </motion.a>
        </motion.div>

        {/* Brand name — bottom-right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-8 right-0 overflow-hidden"
          style={{ paddingRight: TOKENS.spacing.shellX }}
        >
          <h1
            className="text-white font-bold leading-none tracking-tight select-none whitespace-nowrap"
            style={{ fontSize: "clamp(44px, 6.5vw, 100px)" }}
          >
            Summit Studio
          </h1>
        </motion.div>
      </motion.div>
    </section>
  );
}
