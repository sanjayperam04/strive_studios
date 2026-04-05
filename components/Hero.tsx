"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/menu-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/20" />

      {/* Tagline — absolute, left side, vertically centered */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute left-8 md:left-10"
        style={{ top: "38%" }}
      >
        <p className="text-white text-[20px] md:text-[23px] font-normal leading-[1.75] mb-8">
          We craft bold, unforgettable digital<br />
          experiences that captivate and inspire.<br />
          Based globally, working worldwide.
        </p>

        <motion.a
          href="#work"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3.5 hover:bg-white/90 transition-all group w-fit"
        >
          <span className="text-black text-[15px] font-normal leading-none">
            Get started
          </span>
          <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center shrink-0 group-hover:scale-95 transition-transform">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </motion.a>
      </motion.div>

      {/* Brand name — absolute, bottom-right, bleeds slightly off right */}
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
