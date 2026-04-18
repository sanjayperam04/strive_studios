"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

const services = [
  {
    num: "01",
    title: "Website Design",
    description:
      "We design stunning, pixel-perfect websites that captivate from the first scroll. Every layout, interaction, and detail is crafted to leave a lasting impression.",
    tags: ["UI Design", "UX Design", "Interaction Design", "Prototyping"],
  },
  {
    num: "02",
    title: "Development & Hosting",
    description:
      "Clean, fast, production-ready code with seamless deployment. We build with Next.js and modern tooling, then handle hosting so you never have to think about it.",
    tags: ["Next.js", "React", "TypeScript", "Vercel", "CMS Integration"],
  },
  {
    num: "03",
    title: "Branding",
    description:
      "We build brand identities that are bold, memorable, and built to last. From logo systems to full visual languages, we craft brands that mean something.",
    tags: ["Logo Design", "Visual Identity", "Brand Strategy", "Guidelines"],
  },
];

const serviceVisuals = [
  <div key="1" className="relative h-full w-full">
    <img
      src="/service-1.jpg"
      alt="Website Design"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
  </div>,
  <div key="2" className="relative h-full w-full">
    <img
      src="/service-2.jpg"
      alt="Development & Hosting"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
  </div>,
  <div key="3" className="relative h-full w-full">
    <img
      src="/service-3.jpg"
      alt="Branding"
      className="h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
  </div>,
];

export default function ServicesSection() {
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    serviceRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveService(i);
        },
        { threshold: 0.4 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="services">
      <div
        className="pb-6 pt-40 text-center"
        style={{
          paddingLeft: TOKENS.spacing.shellX,
          paddingRight: TOKENS.spacing.shellX,
        }}
      >
        <p className="text-xs uppercase tracking-[0.25em] text-white/40">
          Things we do
        </p>
        <div style={{ height: "32px" }} />
        <h2 className="text-4xl font-bold leading-none tracking-tight md:text-5xl">
          Our Services
        </h2>
        <div style={{ height: "32px" }} />
      </div>
      <div className="border-t border-white/[0.08]" />

      <div className="flex">
        <div className="w-full md:w-[52%]">
          {services.map((s, i) => (
            <div
              key={s.num}
              ref={(el) => {
                serviceRefs.current[i] = el;
              }}
              style={{
                paddingLeft: TOKENS.spacing.shellX,
                paddingRight: "48px",
                paddingTop: "96px",
                paddingBottom: "96px",
              }}
              className="flex min-h-[75vh] flex-col justify-center border-t border-white/[0.06]"
            >
              <span className="mb-6 block text-xs tracking-widest text-white/20">
                {s.num}
              </span>
              <h3 className="text-3xl font-bold leading-none tracking-tight md:text-4xl">
                {s.title}
              </h3>
              <div className="h-12" />
              <p className="max-w-md text-base font-light leading-relaxed text-white/40 md:text-lg">
                {s.description}
              </p>
              <div className="h-8" />
              <div className="flex flex-wrap gap-3">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 text-xs text-white/40 transition-all hover:border-white/25 hover:bg-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="sticky top-12 hidden h-[calc(100vh-3rem)] w-[48%] border-l border-white/[0.06] md:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full w-full flex-col bg-zinc-950"
            >
              <div className="flex-1">{serviceVisuals[activeService]}</div>
              <div className="flex items-center justify-between border-t border-white/[0.06] px-10 py-5">
                <span className="text-xs uppercase tracking-[0.2em] text-white/20">
                  {services[activeService].title}
                </span>
                <span
                  className="text-xs"
                  style={{ color: TOKENS.colors.textMuted15 }}
                >
                  {services[activeService].num} / 0{services.length}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
