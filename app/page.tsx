"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    num: "01", title: "Branding",
    description: "We build brand identities that are bold, memorable, and built to last. From logo systems to full visual languages, we craft brands that mean something.",
    tags: ["Logo Design", "Visual Identity", "Brand Strategy", "Guidelines"],
  },
  {
    num: "02", title: "Web Design",
    description: "Award-worthy websites that balance beauty with performance. Every layout, interaction, and detail is considered to create experiences users remember.",
    tags: ["UI Design", "Interaction Design", "Prototyping", "Design Systems"],
  },
  {
    num: "03", title: "Development",
    description: "Clean, fast, production-ready code. We build with Next.js, React, and modern tooling to deliver sites that are as solid under the hood as they look.",
    tags: ["Next.js", "React", "TypeScript", "CMS Integration"],
  },
  {
    num: "04", title: "Strategy",
    description: "Great digital products start with clear thinking. We help you define your positioning, audience, and roadmap before a single pixel is placed.",
    tags: ["Digital Strategy", "UX Research", "Positioning", "Roadmapping"],
  },
];

const projects = [
  { title: "Apex Collective", tags: ["Branding", "UI Design"], color: "bg-zinc-200" },
  { title: "Orbit Studio", tags: ["UI Design", "Development"], color: "bg-stone-300" },
  { title: "Meridian Labs", tags: ["Strategy", "Branding"], color: "bg-neutral-200" },
  { title: "Vanta Digital", tags: ["Web Design", "Development"], color: "bg-zinc-300" },
];

// ─── SERVICE VISUALS ─────────────────────────────────────────────────────────

const serviceVisuals = [
  <div key="1" className="w-full h-full flex items-center justify-center p-16">
    <div className="w-full max-w-sm space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10" />
        <div className="space-y-2">
          <div className="h-2.5 w-28 bg-white/20 rounded-full" />
          <div className="h-2 w-16 bg-white/10 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="aspect-square rounded-2xl bg-white/10" />
        <div className="aspect-square rounded-2xl bg-white/5" />
        <div className="aspect-square rounded-2xl bg-white/15" />
      </div>
      <div className="space-y-2.5">
        <div className="h-2 w-full bg-white/10 rounded-full" />
        <div className="h-2 w-4/5 bg-white/7 rounded-full" />
        <div className="h-2 w-3/5 bg-white/5 rounded-full" />
      </div>
    </div>
  </div>,
  <div key="2" className="w-full h-full flex items-center justify-center p-16">
    <div className="w-full max-w-sm">
      <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="h-8 bg-white/5 flex items-center px-4 gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="p-6 space-y-4">
          <div className="h-3 w-2/3 bg-white/20 rounded-full" />
          <div className="h-2 w-full bg-white/10 rounded-full" />
          <div className="h-2 w-4/5 bg-white/7 rounded-full" />
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="h-20 rounded-xl bg-white/10" />
            <div className="h-20 rounded-xl bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  </div>,
  <div key="3" className="w-full h-full flex items-center justify-center p-16">
    <div className="w-full max-w-sm space-y-3 font-mono">
      {["import { motion } from 'framer-motion'", "", "const Hero = () => {", "  return (", "    <motion.div", "      animate={{ opacity: 1 }}", "    />", "  )", "}"].map((line, i) => (
        <div key={i} className="flex gap-4">
          <span className="text-white/15 w-4 text-right shrink-0 text-xs">{line ? i + 1 : ""}</span>
          <span className="text-white/35 text-xs">{line}</span>
        </div>
      ))}
    </div>
  </div>,
  <div key="4" className="w-full h-full flex items-center justify-center p-16">
    <div className="w-full max-w-sm space-y-6">
      {["Discovery", "Define", "Design", "Deliver"].map((step, i) => (
        <div key={step} className="flex items-center gap-5">
          <span className="text-white/20 text-xs w-5 shrink-0">{`0${i + 1}`}</span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-white/40 text-sm">{step}</span>
        </div>
      ))}
    </div>
  </div>,
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  // Services sticky scroll
  const [activeService, setActiveService] = useState(0);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    serviceRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveService(i); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Section refs for scroll animations
  const workRef = useRef(null);
  const whyRef = useRef(null);
  const contactRef = useRef(null);
  const workInView = useInView(workRef, { once: true, margin: "-80px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />

      <div className="h-24" />

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services">
        <div className="px-10 md:px-16 pt-32 pb-20">
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-5">Things we do</p>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-none">Our services</h2>
        </div>

        <div className="flex">
          {/* Left scrollable */}
          <div className="w-full md:w-[52%]">
            {services.map((s, i) => (
              <div
                key={s.num}
                ref={(el) => { serviceRefs.current[i] = el; }}
                className="px-10 md:px-16 py-24 border-t border-white/[0.06] min-h-[75vh] flex flex-col justify-center"
              >
                <span className="text-white/20 text-xs tracking-widest mb-6 block">{s.num}</span>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 leading-none">{s.title}</h3>
                <p className="text-white/40 text-base md:text-lg font-light leading-relaxed max-w-md mb-10">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs text-white/30 border border-white/10 px-4 py-2 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right sticky visual */}
          <div className="hidden md:block w-[48%] sticky top-12 h-[calc(100vh-3rem)] border-l border-white/[0.06]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-zinc-950 flex flex-col"
              >
                <div className="flex-1">{serviceVisuals[activeService]}</div>
                <div className="px-10 py-5 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-white/20 text-xs tracking-[0.2em] uppercase">{services[activeService].title}</span>
                  <span className="text-white/15 text-xs">{services[activeService].num} / 0{services.length}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <div className="h-48" />

      {/* ── FEATURED PROJECTS ────────────────────────────────────────────── */}
      <section id="work" ref={workRef} className="px-10 md:px-16 pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={workInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Featured<br />projects{" "}
            <span className="text-white/25 text-xl font-normal align-middle ml-1">(0{projects.length})</span>
          </h2>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors pb-1">
            <span>→</span><span>View all</span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 28 }}
              animate={workInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`relative ${p.color} rounded-2xl overflow-hidden`} style={{ aspectRatio: "16/10" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="flex items-start justify-between mt-4 px-1">
                <span className="text-white text-base font-normal">{p.title}</span>
                <div className="flex flex-col items-end gap-0.5 pt-0.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-white/35 text-xs leading-relaxed">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <div className="h-48" />
      <section id="about" ref={whyRef} className="pb-48 overflow-hidden">
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 20px" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
            style={{ marginBottom: "48px" }}
          >
            <p className="text-white/35 text-xs tracking-[0.25em] uppercase mb-4">Why choose us</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Tailored design solutions<br />for every need
            </h2>
          </motion.div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>

            {/* Card 1 — car image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden", height: "340px" }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/car-bg.png')" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(23,37,84,0.6), rgba(23,37,84,0.2), rgba(23,37,84,0.5))" }} />
              <div style={{ position: "relative", zIndex: 10, padding: "28px", height: "100%", display: "flex", flexDirection: "column" }}>
                <p style={{ color: "rgba(147,197,253,0.6)", fontSize: "11px", marginBottom: "10px" }}>Fast turnarounds</p>
                <h3 style={{ color: "white", fontSize: "17px", fontWeight: 400, lineHeight: 1.4 }}>
                  Delivering high-quality<br />designs, right on time
                </h3>
              </div>
            </motion.div>

            {/* Card 2 — white phone */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ background: "white", borderRadius: "16px", overflow: "hidden", position: "relative", height: "340px" }}
            >
              <div style={{ padding: "28px 28px 0" }}>
                <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "11px", marginBottom: "10px" }}>100% satisfaction</p>
                <h3 style={{ color: "black", fontSize: "17px", fontWeight: 400, lineHeight: 1.4 }}>
                  Crafted with precision<br />to meet your vision.
                </h3>
              </div>
              {/* Phone centered, top visible, overflows bottom */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/phone-mockup.png" alt="Phone mockup" style={{ width: "220px", objectFit: "contain", objectPosition: "top" }} />
              </div>
            </motion.div>

            {/* Card 3 — dark stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ background: "#18181b", borderRadius: "16px", overflow: "hidden", height: "340px", display: "flex", flexDirection: "column" }}
            >
              <div style={{ padding: "28px", display: "flex", flexDirection: "column", height: "100%" }}>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", marginBottom: "10px" }}>Exponential growth</p>
                <h3 style={{ color: "white", fontSize: "17px", fontWeight: 400, lineHeight: 1.4 }}>
                  Design that drives<br />impact and success.
                </h3>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "12px", paddingBottom: "8px" }}>
                  {[["Conversion rate", "84", "rgba(255,255,255,0.25)"], ["User engagement", "67", "rgba(255,255,255,0.15)"], ["Brand recall", "91", "gradient"]].map(([label, val, color]) => (
                    <div key={label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{label}</span>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>+{val}%</span>
                      </div>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${val}%`, borderRadius: "99px", background: color === "gradient" ? "linear-gradient(to right, #a78bfa, #f472b6, #fb923c)" : color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <div className="h-48" />
      <section id="contact" ref={contactRef} className="px-10 md:px-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={contactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-8">Get in touch</p>
          <h2 className="font-bold tracking-tight leading-none mb-14" style={{ fontSize: "clamp(40px, 7vw, 110px)" }}>
            Let&apos;s work<br />
            <span className="text-white/20">together.</span>
          </h2>
          <a
            href="mailto:hello@strivestudios.co"
            className="inline-flex items-center gap-3 bg-white text-black text-sm font-normal px-6 py-3.5 rounded-full hover:bg-white/90 transition-colors group"
          >
            Start a project
            <span className="w-6 h-6 rounded-full bg-black flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3M9 1V7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={contactInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32 border-t border-white/[0.06]"
        >
          {/* Big brand name */}
          <div className="pt-10 pb-10">
            <p className="text-white/5 font-bold tracking-tight leading-none select-none"
              style={{ fontSize: "clamp(60px, 12vw, 180px)" }}>
              Strive Studios
            </p>
          </div>

          {/* Footer bottom row */}
          <div className="border-t border-white/[0.06] pt-6 pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-white text-sm font-normal">Strive Studios</span>
              <span className="text-white/30 text-xs">Digital Agency — Web Design & Development</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 text-xs">
              <div className="flex flex-col gap-1.5">
                <span className="text-white/20 uppercase tracking-widest text-[10px] mb-1">Navigation</span>
                {["Home", "Services", "Work", "Contact"].map(l => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="text-white/40 hover:text-white transition-colors">{l}</a>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-white/20 uppercase tracking-widest text-[10px] mb-1">Social</span>
                {["Instagram", "LinkedIn", "Dribbble"].map(l => (
                  <a key={l} href="#" className="text-white/40 hover:text-white transition-colors">{l}</a>
                ))}
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-white/20 uppercase tracking-widest text-[10px] mb-1">Contact</span>
                <a href="mailto:hello@strivestudios.co" className="text-white/40 hover:text-white transition-colors">hello@strivestudios.co</a>
                <span className="text-white/40">Based globally</span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/[0.06] py-5 flex items-center justify-between">
            <span className="text-white/20 text-xs">© 2025 Strive Studios. All rights reserved.</span>
            <span className="text-white/20 text-xs">Crafted with precision.</span>
          </div>
        </motion.footer>
      </section>
    </main>
  );
}
