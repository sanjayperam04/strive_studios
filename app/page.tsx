"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    num: "01", title: "Website Design",
    description: "We design stunning, pixel-perfect websites that captivate from the first scroll. Every layout, interaction, and detail is crafted to leave a lasting impression.",
    tags: ["UI Design", "UX Design", "Interaction Design", "Prototyping"],
  },
  {
    num: "02", title: "Development & Hosting",
    description: "Clean, fast, production-ready code with seamless deployment. We build with Next.js and modern tooling, then handle hosting so you never have to think about it.",
    tags: ["Next.js", "React", "TypeScript", "Vercel", "CMS Integration"],
  },
  {
    num: "03", title: "Branding",
    description: "We build brand identities that are bold, memorable, and built to last. From logo systems to full visual languages, we craft brands that mean something.",
    tags: ["Logo Design", "Visual Identity", "Brand Strategy", "Guidelines"],
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
  <div key="2" className="w-full h-full flex items-center justify-center p-16">
    <div className="w-full max-w-sm space-y-3 font-mono">
      {["import { motion } from 'framer-motion'", "", "const Page = () => {", "  return (", "    <motion.div", "      animate={{ opacity: 1 }}", "    />", "  )", "}"].map((line, i) => (
        <div key={i} className="flex gap-4">
          <span className="text-white/15 w-4 text-right shrink-0 text-xs">{line ? i + 1 : ""}</span>
          <span className="text-white/35 text-xs">{line}</span>
        </div>
      ))}
    </div>
  </div>,
  <div key="3" className="w-full h-full flex items-center justify-center p-16">
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
  const phoneCardRef = useRef(null);
  const statsCardRef = useRef(null);
  const workInView = useInView(workRef, { once: true, margin: "-80px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-80px" });

  const statsInView = useInView(statsCardRef, { once: true, margin: "-50px" });
  const aboutRef = useRef(null);
  const aboutInView = useInView(aboutRef, { once: true, margin: "-80px" });

  const { scrollYProgress: phoneScrollProgress } = useScroll({
    target: phoneCardRef,
    offset: ["start end", "end start"],
  });
  const phoneY = useTransform(phoneScrollProgress, [0, 1], [60, -60]);

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
      <section id="work" ref={workRef} style={{ padding: "8rem 3% 8rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={workInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px" }}
          >
            <h2 style={{ fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Featured<br />projects{" "}
              <span style={{ fontSize: "clamp(18px, 2vw, 28px)", fontWeight: 400, color: "rgba(255,255,255,0.25)", verticalAlign: "middle", marginLeft: "8px" }}>(0{projects.length})</span>
            </h2>
            <a href="#contact" style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px", textDecoration: "none", paddingBottom: "4px" }}
              onMouseEnter={e => (e.currentTarget.style.color = "white")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}
            >
              <span>→</span><span>View all</span>
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                animate={workInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className={`relative ${p.color} rounded-2xl overflow-hidden`} style={{ aspectRatio: "16/9" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-start justify-between mt-3 px-1">
                  <span className="text-white text-sm font-normal">{p.title}</span>
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
      <section id="about" ref={whyRef} style={{ padding: "0 3% 12rem", overflow: "hidden" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
            style={{ marginBottom: "48px" }}
          >
            <p className="text-white/35 text-xs tracking-[0.25em] uppercase mb-4">Why choose us</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Tailored design solutions<br />for every need
            </h2>          </motion.div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>

            {/* Card 1 — car image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden", height: "480px" }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/car-bg.png')" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(23,37,84,0.6), rgba(23,37,84,0.2), rgba(23,37,84,0.5))" }} />
              <div style={{ position: "relative", zIndex: 10, padding: "32px", height: "100%", display: "flex", flexDirection: "column" }}>
                <p style={{ color: "rgba(147,197,253,0.6)", fontSize: "12px", marginBottom: "12px" }}>Fast turnarounds</p>
                <h3 style={{ color: "white", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>
                  Delivering high-quality<br />designs, right on time
                </h3>
              </div>
            </motion.div>

            {/* Card 2 — white phone */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              ref={phoneCardRef}
              style={{ background: "white", borderRadius: "16px", overflow: "hidden", position: "relative", height: "480px" }}
            >
              <div style={{ padding: "32px 32px 0" }}>
                <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "12px", marginBottom: "12px" }}>100% satisfaction</p>
                <h3 style={{ color: "black", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>
                  Crafted with precision<br />to meet your vision.
                </h3>
              </div>
              {/* Phone with parallax — rises up on scroll in, goes down on scroll out */}
              <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                <motion.img
                  src="/phone-mockup.png"
                  alt="Phone mockup"
                  style={{ width: "220px", objectFit: "contain", objectPosition: "top", y: phoneY }}
                />
              </div>
            </motion.div>

            {/* Card 3 — dark stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              ref={statsCardRef}
              style={{ background: "#18181b", borderRadius: "16px", overflow: "hidden", height: "480px", display: "flex", flexDirection: "column" }}
            >
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", height: "100%" }}>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "12px", marginBottom: "12px" }}>Exponential growth</p>
                <h3 style={{ color: "white", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>
                  Design that drives<br />impact and success.
                </h3>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: "16px", paddingBottom: "8px" }}>
                  {[["Conversion rate", 84, "rgba(255,255,255,0.25)"], ["User engagement", 67, "rgba(255,255,255,0.15)"], ["Brand recall", 91, "gradient"]].map(([label, val, color]) => (
                    <div key={label as string}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                        <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "11px" }}>{label}</span>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>+{val}%</span>
                      </div>
                      <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "99px", overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: "0%" }}
                          animate={statsInView ? { width: `${val}%` } : { width: "0%" }}
                          transition={{ duration: 1.2, delay: 0.3 + (["Conversion rate", "User engagement", "Brand recall"].indexOf(label as string) * 0.15), ease: [0.16, 1, 0.3, 1] }}
                          style={{
                            height: "100%",
                            borderRadius: "99px",
                            background: color === "gradient" ? "linear-gradient(to right, #a78bfa, #f472b6, #fb923c)" : color as string
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
      </section>

      {/* ── ABOUT US ─────────────────────────────────────────────────────── */}
      <div className="h-12" />
      <section id="about-us" ref={aboutRef} className="px-10 md:px-16 pb-32">

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={aboutInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-6xl font-bold tracking-tight leading-none"
          style={{ marginBottom: "80px" }}
        >About us</motion.h2>

        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* Left — statement + copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-bold leading-[1.08] tracking-tight mb-8" style={{ fontSize: "clamp(36px, 4vw, 64px)" }}>
              We craft bold, purposeful digital experiences that help brands stand out and connect with the right audience.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-8">
              Good design isn't just about looking great — it's about telling a story, building trust, and making a lasting impression.
            </p>
            <a href="#contact" className="group inline-flex items-center gap-2 text-white text-sm font-normal">
              <span className="relative">
                Start a project
                <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </motion.div>

          {/* Right — stat rows with dividers, no boxes */}
          <div className="border-t border-white/[0.08]">
            {[
              { num: "50+", label: "Projects completed", desc: "Delivered across web, brand and strategy" },
              { num: "99%", label: "Client satisfaction", desc: "Measured across every project we ship" },
              { num: "10+", label: "Industries served", desc: "From tech startups to luxury brands" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                animate={aboutInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                className="flex items-center justify-between border-b border-white/[0.08] py-8"
              >
                <div>
                  <p className="text-white text-base font-normal mb-1">{stat.label}</p>
                  <p className="text-white/35 text-sm">{stat.desc}</p>
                </div>
                <span className="font-bold leading-none tracking-tight shrink-0 ml-8" style={{ fontSize: "clamp(48px, 5.5vw, 80px)" }}>
                  {stat.num}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── OUR PROCESS ──────────────────────────────────────────────────── */}
      <div className="h-48" />
      <section id="process" ref={aboutRef} style={{ padding: "0 3% 12rem", overflow: "hidden" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
            style={{ marginBottom: "48px" }}
          >
            <p className="text-white/35 text-xs tracking-[0.25em] uppercase mb-4">Our process</p>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Building websites made<br />simple and stress-free
            </h2>
          </motion.div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>

            {/* Card 1 — Discovery */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ background: "white", borderRadius: "16px", overflow: "hidden", position: "relative", height: "480px" }}
            >
              <div style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div>
                  <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "12px", marginBottom: "12px" }}>01</p>
                  <h3 style={{ color: "black", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>Discovery</h3>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "14px", lineHeight: "1.6" }}>
                    We start by understanding your business goals, target users, and technical requirements. Through detailed consultations and research, we define the project scope, features, and technology stack that will bring your vision to life.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Design */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ background: "white", borderRadius: "16px", overflow: "hidden", position: "relative", height: "480px" }}
            >
              <div style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div>
                  <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "12px", marginBottom: "12px" }}>02</p>
                  <h3 style={{ color: "black", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>Build</h3>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "14px", lineHeight: "1.6" }}>
                    Our developers bring designs to life with clean, scalable code. Using modern frameworks like Next.js and React, we build fast, responsive websites with seamless functionality. Regular updates keep you in the loop throughout development.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Deliver */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ background: "white", borderRadius: "16px", overflow: "hidden", position: "relative", height: "480px" }}
            >
              <div style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column" }}>
                <div>
                  <p style={{ color: "rgba(0,0,0,0.45)", fontSize: "12px", marginBottom: "12px" }}>03</p>
                  <h3 style={{ color: "black", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>Launch</h3>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ color: "rgba(0,0,0,0.6)", fontSize: "14px", lineHeight: "1.6" }}>
                    After thorough testing and optimization, we deploy your website to production. We handle hosting setup, domain configuration, and provide training so you can manage your site with confidence. Ongoing support ensures everything runs smoothly.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────────────────────── */}
      <div className="h-48" />
      <section id="contact" ref={contactRef} style={{ padding: "0 3% 0" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={contactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-5xl">
            <h2 className="text-white font-bold tracking-tight leading-[1.05] mb-12" style={{ fontSize: "clamp(56px, 8vw, 120px)" }}>
              Have a project<br />in mind?
            </h2>
            
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
              <a
                href="mailto:hello@strivestudios.co"
                className="text-white/50 hover:text-white text-2xl md:text-3xl font-light transition-colors"
              >
                hello@strivestudios.co
              </a>
              
              <div className="h-px md:h-12 w-12 md:w-px bg-white/10" />
              
              <div className="flex gap-6">
                <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Instagram</a>
                <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">LinkedIn</a>
                <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Dribbble</a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={contactInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-32"
        >
          {/* Main footer content */}
          <div className="border-t border-white/[0.06] pt-16 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              
              {/* Left — Brand */}
              <div className="md:col-span-5">
                <h3 className="text-white text-2xl font-bold mb-4">Strive Studios</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
                  A digital agency crafting bold websites and brand experiences that help businesses stand out and connect with their audience.
                </p>
                <a 
                  href="mailto:hello@strivestudios.co" 
                  className="text-white/50 text-sm hover:text-white transition-colors"
                >
                  hello@strivestudios.co
                </a>
              </div>

              {/* Right — Links */}
              <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
                
                {/* Navigation */}
                <div>
                  <h4 className="text-white text-sm font-medium mb-4">Navigation</h4>
                  <div className="flex flex-col gap-3">
                    {["Services", "Work", "About", "Contact"].map(l => (
                      <a 
                        key={l} 
                        href={`#${l.toLowerCase()}`} 
                        className="text-white/40 text-sm hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h4 className="text-white text-sm font-medium mb-4">Services</h4>
                  <div className="flex flex-col gap-3">
                    {["Website Design", "Development", "Branding"].map(l => (
                      <a 
                        key={l} 
                        href="#services" 
                        className="text-white/40 text-sm hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Social */}
                <div>
                  <h4 className="text-white text-sm font-medium mb-4">Connect</h4>
                  <div className="flex flex-col gap-3">
                    {["Instagram", "LinkedIn", "Dribbble"].map(l => (
                      <a 
                        key={l} 
                        href="#" 
                        className="text-white/40 text-sm hover:text-white transition-colors"
                      >
                        {l}
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-white/30 text-xs">© 2025 Strive Studios. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/30 text-xs hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/30 text-xs hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </motion.footer>
      </section>
    </main>
  );
}
