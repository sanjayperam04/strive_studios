"use client";

import { motion } from "framer-motion";
import { TOKENS } from "../styles/tokens";

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Tagline — left side, vertically centered */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute"
        style={{ top: "38%", left: TOKENS.spacing.shellX, right: TOKENS.spacing.shellX }}
      >
        <p className="max-w-xl text-white text-[20px] md:text-[23px] font-normal leading-[1.75] mb-8">
          We craft bold, unforgettable digital<br />
          experiences that captivate and inspire.
        </p>

        {/* Minimal text link */}
        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="group inline-flex items-center gap-0 text-white text-sm font-normal tracking-wide"
        >
          <br />
          <br />
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

    </section>
  );
}
