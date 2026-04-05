"use client";

import { motion } from "framer-motion";

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
        className="absolute left-8 md:left-10"
        style={{ top: "38%" }}
      >
        <p className="text-white text-[20px] md:text-[23px] font-normal leading-[1.75] mb-8">
          We craft bold, unforgettable digital<br />
          experiences that captivate and inspire.
        </p>

        {/* Minimal text link */}
        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="group inline-flex items-center gap-2 text-white text-sm font-normal tracking-wide"
        >
          <span className="relative">
            Get started
            <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300 ease-out" />
          </span>
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </motion.a>
      </motion.div>

      {/* Brand name — bottom-right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-8 right-0 pr-8 md:pr-12 overflow-hidden"
      >
        <h1
          className="text-white font-bold leading-none tracking-tight select-none whitespace-nowrap"
          style={{ fontSize: "clamp(56px, 8.5vw, 130px)" }}
        >
          Strive Studios
        </h1>
      </motion.div>

    </section>
  );
}
