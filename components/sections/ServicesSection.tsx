"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// ── DATA ─────────────────────────────────────────────────────────────────────

const services = [
  {
    num: "01",
    title: "Website\nDesign",
    approach: "Approach",
    col1: "We design stunning, pixel-perfect websites by structuring digital products around clarity, usability, and strong visual systems.\n\nOur process begins by defining how the product should work — shaping navigation, hierarchy, and interactions before translating it into refined visual design.",
    col2: "Through wireframes, layout systems, and thoughtful visual direction, we align user needs with product logic and business goals.\n\nThe result is a clear, structured digital experience that feels modern, purposeful, and easy to navigate across devices.",
    cta: "Discuss design",
    image: "/service-web-design.png",
    bg: "#ffffff",
    text: "#0a0a0a",
    muted: "rgba(0,0,0,0.45)",
    border: "rgba(0,0,0,0.1)",
    numColor: "rgba(0,0,0,0.15)",
  },
  {
    num: "02",
    title: "Development\n& Hosting",
    approach: "Approach",
    col1: "We build clean, fast, production-ready code with seamless deployment. Using Next.js and modern tooling, we turn designs into fully functional websites.\n\nEvery project is engineered for performance — optimised load times, responsive layouts, and scalable architecture from day one.",
    col2: "We handle hosting setup, domain configuration, and ongoing maintenance so you never have to think about infrastructure.\n\nThe result is a website that runs reliably, loads fast, and is ready to grow with your business.",
    cta: "Discuss development",
    image: "/service-dev.png",
    bg: "#818181",
    text: "#0a0a0a",
    muted: "rgba(0,0,0,0.45)",
    border: "rgba(0,0,0,0.1)",
    numColor: "rgba(0,0,0,0.15)",
  },
  {
    num: "03",
    title: "Branding",
    approach: "Approach",
    col1: "We build brand identities that are bold, memorable, and built to last. From logo systems to full visual languages, we craft brands that mean something.\n\nOur branding process starts with understanding your business, your audience, and what sets you apart.",
    col2: "We translate that understanding into a cohesive visual identity — logo, colour, typography, and guidelines that work across every touchpoint.\n\nThe result is a brand that communicates clearly, builds trust, and leaves a lasting impression.",
    cta: "Discuss branding",
    image: "/service-brand.png",
    bg: "#3a3a3a",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.5)",
    border: "rgba(255,255,255,0.12)",
    numColor: "rgba(255,255,255,0.15)",
  },
];

// ── HEADER ────────────────────────────────────────────────────────────────────

function ServicesHeader() {
  const ref = useRef<HTMLDivElement>(null);
  // Trigger only when the section is well into view — not on page load
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });

  return (
    <div
      ref={ref}
      className="h-screen flex flex-col justify-center bg-black overflow-hidden"
      style={{ padding: "clamp(32px, 5vw, 80px)" }}
    >
      <div className="flex flex-col md:flex-row items-start md:justify-between gap-8 md:gap-16 w-full">

        {/* Left — slides in from the left */}
        <motion.div
          className="flex-1"
          initial={{ x: "-60px", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
            Things we do
          </p>

          <div style={{ height: "48px" }} />

          <h2
            className="font-bold leading-[1.0] tracking-tight text-white"
            style={{ fontSize: "clamp(32px, 4.5vw, 64px)" }}
          >
            Our Services
          </h2>
        </motion.div>

        {/* Right — slides in from the right, staggered list */}
        <div className="w-full md:flex-1 flex flex-col justify-center pl-0 md:pl-12">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ x: "60px", opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.15 + i * 0.1,
              }}
              className="flex items-center gap-6 py-4 group"
            >
              <span className="text-xs text-white/25 tracking-widest font-mono w-6 shrink-0">
                {s.num}
              </span>
              <span
                className="font-semibold tracking-tight text-white/70 group-hover:text-white transition-colors"
                style={{ fontSize: "clamp(18px, 2vw, 28px)" }}
              >
                {s.title.replace("\n", " ")}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

// ── SERVICE CARD ──────────────────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  containerRef,
}: {
  service: (typeof services)[0];
  index: number;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const total = services.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const segStart = index / total;
  const segMid = (index + 0.6) / total;
  const segEnd = (index + 1) / total;

  const scale = useTransform(scrollYProgress, [segStart, segMid, segEnd], [1, 1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [segMid, segEnd], [0, 20]);
  const y = useTransform(scrollYProgress, [segMid, segEnd], ["0%", "-4%"]);
  const opacity = useTransform(scrollYProgress, [segMid, segEnd], [1, 0.7]);

  const titleLines = service.title.split("\n");

  return (
    <div className="sticky top-0 h-screen w-full" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{
          scale,
          borderRadius,
          y,
          opacity,
          transformOrigin: "top center",
          height: "100%",
          width: "100%",
          overflow: "hidden",
          willChange: "transform",
          backgroundColor: service.bg,
        }}
        className="relative flex h-full w-full flex-col"
      >
        {/* Title + Number */}
        <div
          className="flex items-start justify-between"
          style={{ padding: "clamp(16px, 2vw, 32px)" }}
        >
          <h3
            className="font-bold leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(32px, 5vw, 72px)", color: service.text }}
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h3>
          <span
            className="font-bold leading-none select-none"
            style={{ fontSize: "clamp(40px, 6vw, 88px)", color: service.numColor }}
          >
            {service.num}
          </span>
        </div>

        {/* Divider */}
        <div className="mx-4" style={{ borderTop: `1px solid ${service.border}` }} />

        {/* Content row */}
        <div
          className="flex flex-col md:flex-row flex-1 gap-4 md:gap-8"
          style={{ padding: "clamp(24px, 3vw, 48px)", paddingTop: "clamp(20px, 2.5vw, 36px)" }}
        >
          {/* Label */}
          <div className="hidden md:block w-[10%] shrink-0">
            <p className="text-xs tracking-wide" style={{ color: service.muted }}>{service.approach}</p>
          </div>

          {/* Description col 1 */}
          <div className="w-full md:w-[22%] shrink-0">
            {service.col1.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 text-sm leading-relaxed last:mb-0" style={{ color: service.muted }}>
                {para}
              </p>
            ))}
          </div>

          {/* Description col 2 */}
          <div className="hidden md:block w-[22%] shrink-0">
            {service.col2.split("\n\n").map((para, i) => (
              <p key={i} className="mb-4 text-sm leading-relaxed last:mb-0" style={{ color: service.muted }}>
                {para}
              </p>
            ))}
          </div>

          {/* Image */}
          <div className="w-full md:flex-1 overflow-hidden rounded-xl" style={{ height: "clamp(200px, 35vw, 400px)" }}>
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover"
              style={{ filter: "brightness(0.95)" }}
            />
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            borderTop: `1px solid ${service.border}`,
            padding: "clamp(16px, 2vw, 28px)",
            paddingLeft: "clamp(28px, 4vw, 60px)",
            paddingRight: "clamp(28px, 4vw, 60px)",
          }}
        >
          <button className="group flex items-center gap-2 text-sm transition-colors"
            style={{ color: service.muted }}
          >
            <span className="relative">
              {service.cta}
              <span className="absolute bottom-0 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: service.text }}
              />
            </span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── EXPORT ────────────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="services" className="relative w-full bg-black">
      <ServicesHeader />
      <div className="border-t border-white/[0.08]" />
      <div
        ref={containerRef}
        style={{ height: `${services.length * 100}vh` }}
        className="relative"
      >
        {services.map((service, i) => (
          <ServiceCard
            key={service.num}
            service={service}
            index={i}
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
          />
        ))}
      </div>
    </section>
  );
}
