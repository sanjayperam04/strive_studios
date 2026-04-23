"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

interface ProcessSectionProps {
  onContactClick: () => void;
}

const STEPS = [
  {
    num: "01",
    title: "Discovery & Strategy",
    text: "We dive deep into your brand, understanding your goals, audience, and market landscape to craft a strategic foundation that sets the trajectory for success.",
  },
  {
    num: "02",
    title: "Design & Prototyping",
    text: "Translating strategy into visual language. We create pixel-perfect, interactive prototypes that bring your vision to life before a single line of code is written.",
  },
  {
    num: "03",
    title: "Development & Launch",
    text: "Our engineers build scalable, lightning-fast digital experiences using cutting-edge tech. We rigorously test and seamlessly launch your project to the world.",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: easeOut, delay },
  };
}

export default function ProcessSection({
  onContactClick,
}: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      id="process"
      ref={sectionRef}
      style={{
        paddingLeft: TOKENS.spacing.shellX,
        paddingRight: TOKENS.spacing.shellX,
        paddingBottom: TOKENS.spacing.sectionBottomLg,
      }}
      className="relative bg-black"
    >
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {/* ── Top Label ── */}
        <motion.div
          initial={fadeUp(0).initial}
          animate={inView ? fadeUp(0).animate : fadeUp(0).initial}
          transition={fadeUp(0).transition}
          className="mb-16 text-center md:mb-32"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/35">
            Our process
          </p>
        </motion.div>

        {/* ── 2-Column Sticky Layout ── */}
        <div className="flex flex-col gap-16 md:flex-row md:items-start md:gap-24">
          {/* Left: Sticky Header */}
          <div className="md:sticky md:top-32 md:w-5/12 lg:w-1/3">
            <motion.h2
              initial={fadeUp(0.1).initial}
              animate={inView ? fadeUp(0.1).animate : fadeUp(0.1).initial}
              transition={fadeUp(0.1).transition}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight text-white"
            >
              Building <br className="hidden md:block" />
              websites made <br className="hidden md:block" />
              <span className="text-white/30">simple and stress-free.</span>
            </motion.h2>

            {/* Desktop Action Button */}
            <motion.button
              initial={fadeUp(0.2).initial}
              animate={inView ? fadeUp(0.2).animate : fadeUp(0.2).initial}
              transition={fadeUp(0.2).transition}
              type="button"
              onClick={onContactClick}
              className="group mt-12 hidden items-center gap-4 text-sm font-medium tracking-wide text-white/60 transition-colors hover:text-white md:inline-flex"
            >
              Start a project
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-white group-hover:bg-white">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M4 12L12 4M12 4H6M12 4V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-black"
                  />
                </svg>
              </span>
            </motion.button>
          </div>

          {/* Right: Scrolling Steps */}
          <div className="flex w-full flex-col gap-12 md:w-7/12 md:gap-24 lg:w-2/3 lg:pl-12">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={fadeUp(0.15 + i * 0.1).initial}
                animate={
                  inView
                    ? fadeUp(0.15 + i * 0.1).animate
                    : fadeUp(0.15 + i * 0.1).initial
                }
                transition={fadeUp(0.15 + i * 0.1).transition}
                className="group relative flex flex-col gap-6 border-t border-white/10 pt-8 transition-colors hover:border-white/30 md:pt-12"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm tracking-[0.2em] text-white/30 transition-colors group-hover:text-white/60">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  {step.title}
                </h3>
                <p className="max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
                  {step.text}
                </p>
              </motion.div>
            ))}

            {/* Mobile Action Button */}
            <motion.button
              initial={fadeUp(0.4).initial}
              animate={inView ? fadeUp(0.4).animate : fadeUp(0.4).initial}
              transition={fadeUp(0.4).transition}
              type="button"
              onClick={onContactClick}
              className="group mt-4 inline-flex items-center gap-4 text-sm font-medium tracking-wide text-white/60 transition-colors hover:text-white md:hidden"
            >
              Start a project
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all group-hover:border-white group-hover:bg-white">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M4 12L12 4M12 4H6M12 4V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="group-hover:stroke-black"
                  />
                </svg>
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
