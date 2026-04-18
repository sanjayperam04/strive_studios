"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

const services = [
  {
    num: "01",
    subtitle: "DIGITAL PRESENCE",
    title: "Website Design",
    description:
      "We design stunning, pixel-perfect websites that captivate from the first scroll. Every layout, interaction, and detail is crafted to leave a lasting impression.",
    tags: ["UI Design", "UX Design", "Interaction", "Prototyping"],
    image: "/service-1.jpg",
  },
  {
    num: "02",
    subtitle: "ENGINEERING",
    title: "Development & Hosting",
    description:
      "Clean, fast, production-ready code with seamless deployment. We build with Next.js and modern tooling, then handle hosting so you never have to think about it.",
    tags: ["Next.js", "React", "TypeScript", "Vercel"],
    image: "/service-2.jpg",
  },
  {
    num: "03",
    subtitle: "IDENTITY",
    title: "Branding",
    description:
      "We build brand identities that are bold, memorable, and built to last. From logo systems to full visual languages, we craft brands that mean something.",
    tags: ["Logo Design", "Visual Identity", "Strategy", "Guidelines"],
    image: "/service-3.jpg",
  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
  };
}

const ServiceCard = ({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={cardRef}
      initial={fadeUp(0.1 + index * 0.1).initial}
      animate={
        inView
          ? fadeUp(0.1 + index * 0.1).animate
          : fadeUp(0.1 + index * 0.1).initial
      }
      transition={fadeUp(0.1 + index * 0.1).transition}
      className="group relative w-full grid grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0a0a] transition-colors hover:border-white/20 md:h-[500px] lg:h-[600px] md:grid-cols-[1.1fr_0.9fr]"
    >
      {/* ── Left Text Content ── */}
      <div
        className="flex h-full w-full flex-col justify-between"
        style={{
          padding: "clamp(40px, 6vw, 80px)",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div>
          {/* Index & Subtitle */}
          <div className="mb-10 flex items-center gap-6 text-sm font-bold tracking-[0.2em] text-white/40">
            <span>{service.num}</span>
            <span>{service.subtitle}</span>
          </div>

          {/* Title */}
          <h3 className="mb-12 text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
            {service.title}
          </h3>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-4">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-8 py-3 text-[11px] font-bold uppercase tracking-widest text-white/40 transition-colors group-hover:border-white/30 group-hover:text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description (Acts like the stats block from the design) */}
        <div className="mt-16 md:mt-0">
          <p className="text-base leading-relaxed text-white/60 md:text-lg">
            {service.description}
          </p>
        </div>
      </div>

      {/* ── Right Image Content ── */}
      <div
        className="relative h-[300px] w-full overflow-hidden md:h-full"
        style={{ boxSizing: "border-box" }}
      >
        <motion.div
          className="h-full w-full"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-100"
          />
        </motion.div>

        {/* Action Arrow Overlay */}
        <div className="absolute bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-black md:bottom-10 md:right-10">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            <path
              d="M4 12L12 4M12 4H6M12 4V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  return (
    <section
      id="services"
      ref={sectionRef}
      style={{
        paddingBottom: TOKENS.spacing.sectionBottomMd,
      }}
      className="relative w-full bg-black"
    >
      <div className="w-full max-w-none">
        {/* ── Header ── */}
        <motion.div
          initial={fadeUp(0).initial}
          animate={inView ? fadeUp(0).animate : fadeUp(0).initial}
          transition={fadeUp(0).transition}
          className="text-center"
          style={{
            paddingLeft: TOKENS.spacing.shellX,
            paddingRight: TOKENS.spacing.shellX,
            marginBottom: "64px",
          }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/35">
            Things we do
          </p>
          <div style={{ height: "28px" }} />
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
            Our Services
          </h2>
        </motion.div>

        {/* ── Stacked Cards Container ── */}
        <div
          className="flex flex-col gap-8 md:gap-12"
          style={{
            paddingTop: "0px",
            paddingLeft: TOKENS.spacing.shellX,
            paddingRight: TOKENS.spacing.shellX,
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
