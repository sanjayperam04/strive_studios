"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

// ── DATA ─────────────────────────────────────────────────────────────────────

const services = [
  {
    num: "01",
    title: "Branding",
    bullets: [
      "Positioning that explains why you exist",
      "Logo, colour, and type systems that scale",
      "Brand guidelines your team can actually use",
      "Launch-ready assets for web, social, and pitch decks",
    ],
    description:
      "Build a brand that resonates with your audience through strategic positioning and compelling visual identity systems.",
    image: "/service-brand.png",
    bg: "#000000",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.55)",
    border: "rgba(255,255,255,0.08)",
    numColor: "rgba(255,255,255,0.06)",
    accent: "#c0392b",
  },
  {
    num: "02",
    title: "Website Design",
    bullets: [
      "Clear page flow from first impression to inquiry",
      "Responsive UI systems for mobile and desktop",
      "SEO-friendly content structure and headings",
      "High-impact visuals without hurting usability",
    ],
    description:
      "Create intuitive, beautiful websites that guide visitors toward action while performing flawlessly on every device.",
    image: "/service-web-design.png",
    bg: "#000000",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.55)",
    border: "rgba(255,255,255,0.08)",
    numColor: "rgba(255,255,255,0.06)",
    accent: "#c0392b",
  },
  {
    num: "03",
    title: "Development & Hosting",
    bullets: [
      "Next.js builds tuned for speed and stability",
      "Hosting, domains, analytics, and forms handled",
      "Launch QA across devices and browsers",
      "Maintenance support after the site goes live",
    ],
    description:
      "Robust technical implementation with performance, security, and scalability built in from day one.",
    image: "/service-dev.png",
    bg: "#000000",
    text: "#ffffff",
    muted: "rgba(255,255,255,0.55)",
    border: "rgba(255,255,255,0.08)",
    numColor: "rgba(255,255,255,0.06)",
    accent: "#c0392b",
  },
];

// ── HEADER ────────────────────────────────────────────────────────────────────

function ServicesHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });

  return (
    <div
      ref={ref}
      className="flex flex-col justify-center bg-black"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingLeft: TOKENS.spacing.shellX,
        paddingRight: TOKENS.spacing.shellX,
        paddingTop: "clamp(80px, 9vw, 128px)",
        paddingBottom: "clamp(80px, 9vw, 128px)",
      }}
    >
      <div aria-hidden style={{ position: "absolute", top: "-40%", right: "-5%", width: "50%", height: "180%", background: "radial-gradient(ellipse at top right, rgba(192,57,43,0.20) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-20%", left: "10%", width: "35%", height: "80%", background: "radial-gradient(ellipse at bottom left, rgba(192,57,43,0.13) 0%, transparent 55%)", pointerEvents: "none" }} />
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 w-full items-center">
        {/* Left — main heading */}
        <motion.div
          className="w-full"
          initial={{ x: "-60px", opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >


          <h2
            className="font-bold leading-[0.95] tracking-tight text-white"
            style={{ fontSize: "clamp(32px, 5vw, 72px)" }}
          >
            Our Services
          </h2>
        </motion.div>

        {/* Right — navigation list */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <div className="flex flex-col border-t border-white/10 mt-8 lg:mt-0">
            {services.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.2 + i * 0.1,
                }}
                className="group cursor-default flex items-center justify-between border-b border-white/10 transition-colors hover:bg-white/[0.02]"
                style={{
                  paddingTop: "clamp(16px, 2vw, 24px)",
                  paddingBottom: "clamp(16px, 2vw, 24px)",
                  paddingLeft: "clamp(16px, 2vw, 32px)",
                  paddingRight: "clamp(16px, 2vw, 32px)",
                }}
              >
                <div className="flex items-center gap-6 md:gap-8">
                  <span className="font-mono text-sm text-white/30 shrink-0 transition-colors group-hover:text-[#c0392b]/70">
                    {s.num}
                  </span>
                  <span
                    className="font-medium tracking-tight text-white/70 transition-colors group-hover:text-white"
                    style={{ fontSize: "clamp(18px, 2.5vw, 28px)" }}
                  >
                    {s.title.replace("\n", " ")}
                  </span>
                </div>
                <span className="text-white/20 transition-all duration-300 group-hover:translate-x-2 md:group-hover:text-[#c0392b]/60 hidden md:block">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
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
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const segStart = index / total;
  const segMid = (index + 0.6) / total;
  const segEnd = (index + 1) / total;

  const scale = useTransform(
    scrollYProgress,
    [segStart, segMid, segEnd],
    [1, 1, 0.92],
  );
  const y = useTransform(scrollYProgress, [segMid, segEnd], ["0%", "-6%"]);
  const opacity = useTransform(scrollYProgress, [segStart, segEnd], [1, 1]);

  const titleLines = service.title.split("\n");

  return (
    <div className="sticky top-0 h-[90vh] w-full" style={{ zIndex: index + 1 }}>
      <motion.div
        style={{
          scale,
          y,
          opacity,
          transformOrigin: "top center",
          height: "100%",
          width: "100%",
          backgroundColor: service.bg,
          boxShadow: index > 0 ? "0 -30px 60px -15px rgba(0,0,0,0.5)" : "none",
        }}
        className="relative flex h-full w-full flex-col overflow-hidden rounded-t-[1.5rem] md:rounded-t-[2.5rem]"
      >
        {/* Atmospheric glow — varies by card index */}
        {index === 0 && (
          <div aria-hidden style={{ position: "absolute", top: "-30%", left: "-10%", width: "55%", height: "90%", background: "radial-gradient(ellipse at top left, rgba(192,57,43,0.22) 0%, transparent 60%)", pointerEvents: "none", zIndex: 0 }} />
        )}
        {index === 1 && (
          <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-5%", width: "50%", height: "85%", background: "radial-gradient(ellipse at top right, rgba(192,57,43,0.20) 0%, transparent 58%)", pointerEvents: "none", zIndex: 0 }} />
        )}
        {index === 2 && (
          <div aria-hidden style={{ position: "absolute", bottom: "-15%", left: "20%", width: "60%", height: "80%", background: "radial-gradient(ellipse at bottom center, rgba(192,57,43,0.18) 0%, transparent 55%)", pointerEvents: "none", zIndex: 0 }} />
        )}

        {/* Title + Number */}
        <div
          className="flex flex-row items-start justify-between gap-6"
          style={{
            paddingLeft: TOKENS.spacing.shellX,
            paddingRight: TOKENS.spacing.shellX,
            paddingTop: "clamp(48px, 8vw, 96px)",
            paddingBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          <h3
            className="font-bold tracking-tight flex-1 min-w-0"
            style={{ fontSize: "clamp(26px, 4vw, 52px)", color: service.text }}
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block leading-tight">
                {line}
              </span>
            ))}
          </h3>
          <span
            className="font-bold leading-none select-none shrink-0"
            style={{
              fontSize: "clamp(24px, 3vw, 40px)",
              color: service.numColor,
            }}
          >
            {service.num}
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            marginLeft: TOKENS.spacing.shellX,
            marginRight: TOKENS.spacing.shellX,
            borderTop: `1px solid ${service.border}`,
          }}
        />

        {/* Content row */}
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-24"
          style={{
            paddingLeft: TOKENS.spacing.shellX,
            paddingRight: TOKENS.spacing.shellX,
            paddingTop: "clamp(48px, 6vw, 80px)",
            paddingBottom: "clamp(48px, 8vw, 120px)",
          }}
        >
          {/* Left side - Service details with expandable rows */}
          <div className="flex-1 min-w-0 w-full lg:w-1/2">
            <div className="flex flex-col gap-6 lg:gap-10">
              {service.bullets.map((bullet, i) => {
                const isExpanded = expandedIndex === i;

                return (
                  <div key={i} className="group">
                    {/* Clickable row header */}
                    <div
                      className="w-full flex items-center justify-between cursor-pointer py-6 px-6 -mx-6 rounded-xl transition-all duration-300"
                      onClick={() => setExpandedIndex(isExpanded ? null : i)}
                      aria-expanded={isExpanded}
                      onMouseEnter={() => {
                        setHoveredIndex(i);
                        setExpandedIndex(i);
                      }}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <p
                        className="text-[16px] md:text-[18px] leading-relaxed font-medium transition-opacity duration-300"
                        style={{
                          color: service.text,
                          opacity: isExpanded || hoveredIndex === i ? 1 : 0.6,
                        }}
                      >
                        {bullet}
                      </p>
                      {/* Chevron arrow on the right side */}
                      <span
                        className="ml-4 flex-shrink-0 transition-all duration-300 ease-[0.16,1,0.3,1]"
                        style={{
                          color: service.text,
                          opacity: isExpanded ? 1 : 0.3,
                          transform: isExpanded
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>

                    {/* Expandable detail panel */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : "0px",
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p
                        className="text-[15px] leading-relaxed px-6 pb-6 pt-3"
                        style={{
                          color: service.text,
                          opacity: 0.7,
                        }}
                      >
                        {service.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex-1 w-full lg:w-1/2 overflow-hidden rounded-2xl lg:rounded-3xl min-h-[300px] lg:min-h-[450px] aspect-[4/3] relative group shadow-2xl">
            <motion.div
              className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
              style={{
                background: `linear-gradient(to top, ${service.bg} 0%, transparent 40%)`,
              }}
            />
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
              style={{
                filter: "brightness(0.95)",
              }}
            />
          </div>
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
