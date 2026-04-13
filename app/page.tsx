"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";

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
  { title: "Campus Connect", tags: ["Web Development", "Branding"], image: "/project-1.png", url: "https://campus-connect-six-pi.vercel.app" },
  { title: "ASCEND", tags: ["UI Design", "Development"], image: "/project-2.png", url: "https://ascend-black.vercel.app" },
  { title: "Velocity", tags: ["Web Development", "College Website"], image: "/project-3.png", url: "https://v-velocity-junior-college-website.vercel.app" },
  { title: "Vanta Digital", tags: ["Web Design", "Development"], image: "/project-4.png" },
];

// ─── SERVICE VISUALS ─────────────────────────────────────────────────────────

const serviceVisuals = [
  <div key="1" className="w-full h-full relative">
    <img src="/service-1.jpg" alt="Website Design" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
  </div>,
  <div key="2" className="w-full h-full relative">
    <img src="/service-2.jpg" alt="Development & Hosting" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
  </div>,
  <div key="3" className="w-full h-full relative">
    <img src="/service-3.jpg" alt="Branding" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
  </div>,
];

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function Home() {
  // Contact form state
  const [isContactOpen, setIsContactOpen] = useState(false);

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
  const phoneCardRef = useRef(null);
  const statsCardRef = useRef(null);
  const workInView = useInView(workRef, { once: true, margin: "-80px" });
  const whyInView = useInView(whyRef, { once: true, margin: "-80px" });

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
      <Navbar onContactClick={() => setIsContactOpen(true)} />
      <Hero />
      <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      <div className="h-40" />

      {/* ── SERVICES ─────────────────────────────────────────────────────── */}
      <section id="services">
        <div className="pt-40 pb-6" style={{ paddingLeft: "clamp(24px, 3vw, 48px)", paddingRight: "clamp(24px, 3vw, 48px)" }}>
          <p className="text-white/40 text-xs tracking-[0.25em] uppercase">Things we do</p>
          <div style={{ height: "32px" }} />
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none">Our Services</h2>
          <div style={{ height: "32px" }} />
        </div>
        <div className="border-t border-white/[0.08]" />

        <div className="flex">
          {/* Left scrollable */}
          <div className="w-full md:w-[52%]">
            {services.map((s, i) => (
              <div
                key={s.num}
                ref={(el) => { serviceRefs.current[i] = el; }}
                style={{ paddingLeft: "clamp(24px, 3vw, 48px)", paddingRight: "48px", paddingTop: "96px", paddingBottom: "96px" }}
                className="border-t border-white/[0.06] min-h-[75vh] flex flex-col justify-center"
              >
                <span className="text-white/20 text-xs tracking-widest mb-6 block">{s.num}</span>
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-none">{s.title}</h3>
                <div className="h-12"></div>
                <p className="text-white/40 text-base md:text-lg font-light leading-relaxed max-w-md">{s.description}</p>
                <div className="h-8"></div>
                <div className="flex flex-wrap gap-3">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs text-white/40 bg-white/[0.03] border border-white/15 px-3 py-1.5 rounded-full hover:bg-white/[0.06] hover:border-white/25 transition-all">{tag}</span>
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
      <section id="work" ref={workRef} style={{ padding: "8rem 6% 8rem" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={workInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px" }}
          >
            <h2 style={{ fontSize: "clamp(36px, 4.5vw, 56px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
              Featured<br />projects{" "}
              <span style={{ fontSize: "clamp(14px, 1.5vw, 20px)", fontWeight: 400, color: "rgba(255,255,255,0.25)", verticalAlign: "middle", marginLeft: "8px" }}>(0{projects.length})</span>
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
              <motion.a
                key={p.title}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 28 }}
                animate={workInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="group cursor-pointer block"
              >
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900" style={{ aspectRatio: "16/9" }}>
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover"
                  />
                  {p.url && (
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex items-start justify-between mt-3 px-1">
                  <span className="text-white text-sm font-normal">{p.title}</span>
                  <div className="flex flex-col items-end gap-0.5 pt-0.5">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-white/35 text-xs leading-relaxed">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────── */}
      <div className="h-20" />
      <section id="about" ref={whyRef} style={{ padding: "0 6% 12rem", overflow: "hidden" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={whyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
            style={{ marginBottom: "32px" }}
          >
            <p className="text-white/35 text-xs tracking-[0.25em] uppercase">Why choose us</p>
            <div style={{ height: "28px" }} />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
              Tailored design solutions<br />for every need
            </h2>
            <div style={{ height: "28px" }} />
          </motion.div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>

            {/* Card 1 — car image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ position: "relative", borderRadius: "16px", overflow: "hidden", height: "400px" }}
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
              style={{ background: "white", borderRadius: "16px", overflow: "hidden", position: "relative", height: "400px" }}
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
              style={{ background: "#18181b", borderRadius: "16px", overflow: "hidden", height: "400px", display: "flex", flexDirection: "column" }}
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
      <section id="about-us" style={{ paddingLeft: "clamp(24px, 3vw, 48px)", paddingRight: "clamp(24px, 3vw, 48px)", paddingBottom: "8rem" }}>

        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight leading-none"
          style={{ marginBottom: "80px" }}
        >About us</h2>

        <div className="grid md:grid-cols-2 gap-20 items-start">

          {/* Left — statement + copy */}
          <div>
            <h2 className="font-bold leading-[1.08] tracking-tight mb-8" style={{ fontSize: "clamp(24px, 2.8vw, 40px)" }}>
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
          </div>

          {/* Right — stat rows with dividers, no boxes */}
          <div className="border-t border-white/[0.08]">
            {[
              { num: "50+", label: "Projects completed", desc: "Delivered across web, brand and strategy" },
              { num: "99%", label: "Client satisfaction", desc: "Measured across every project we ship" },
              { num: "10+", label: "Industries served", desc: "From tech startups to luxury brands" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="flex items-center justify-between border-b border-white/[0.08] py-8"
              >
                <div>
                  <p className="text-white text-base font-normal mb-1">{stat.label}</p>
                  <p className="text-white/35 text-sm">{stat.desc}</p>
                </div>
                <span className="font-bold leading-none tracking-tight shrink-0 ml-8" style={{ fontSize: "clamp(36px, 4vw, 56px)" }}>
                  {stat.num}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── OUR PROCESS ──────────────────────────────────────────────────── */}
      <div className="h-8" />
      <section id="process" ref={aboutRef} style={{ padding: "0 6% 12rem", overflow: "hidden" }}>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center"
            style={{ marginBottom: "32px" }}
          >
            <p className="text-white/35 text-xs tracking-[0.25em] uppercase">Our process</p>
            <div style={{ height: "28px" }} />
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.05]">
              Building websites made<br />simple and stress-free
            </h2>
            <div style={{ height: "28px" }} />
          </motion.div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>

            {/* Card 1 — Discovery */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ borderRadius: "16px", overflow: "hidden", position: "relative", height: "400px" }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/process-bg.jpg')" }} />
              <div className="absolute inset-0 bg-black/40" />
              <div style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "12px" }}>01</p>
                  <h3 style={{ color: "white", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>Discovery</h3>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", lineHeight: "1.6" }}>
                    We start by understanding your business goals, target users, and technical requirements. Through detailed consultations and research, we define the project scope, features, and technology stack that will bring your vision to life.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Build */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ borderRadius: "16px", overflow: "hidden", position: "relative", height: "400px" }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/process-bg.jpg')" }} />
              <div className="absolute inset-0 bg-black/40" />
              <div style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "12px" }}>02</p>
                  <h3 style={{ color: "white", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>Build</h3>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", lineHeight: "1.6" }}>
                    Our developers bring designs to life with clean, scalable code. Using modern frameworks like Next.js and React, we build fast, responsive websites with seamless functionality. Regular updates keep you in the loop throughout development.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Launch */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ borderRadius: "16px", overflow: "hidden", position: "relative", height: "400px" }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/process-bg.jpg')" }} />
              <div className="absolute inset-0 bg-black/40" />
              <div style={{ padding: "32px", height: "100%", display: "flex", flexDirection: "column", position: "relative", zIndex: 10 }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "12px", marginBottom: "12px" }}>03</p>
                  <h3 style={{ color: "white", fontSize: "24px", fontWeight: 400, lineHeight: 1.35 }}>Launch</h3>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "14px", lineHeight: "1.6" }}>
                    After thorough testing and optimization, we deploy your website to production. We handle hosting setup, domain configuration, and provide training so you can manage your site with confidence. Ongoing support ensures everything runs smoothly.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Contact Button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
            <button
              onClick={() => setIsContactOpen(true)}
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "15px",
                fontWeight: 500,
                padding: "14px 40px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                letterSpacing: "0.01em"
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.88)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "white"; }}
            >
              Work with us
            </button>
          </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06] mt-48">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-20">
            
            {/* Brand Column */}
            <div className="md:col-span-2">
              <h3 className="text-white text-2xl font-bold mb-4">Strive Studios</h3>
              <p className="text-white/40 text-base leading-relaxed max-w-md">
                We craft bold, purposeful digital experiences that help brands stand out and connect with the right audience.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white text-sm font-medium mb-6">Navigation</h4>
              <div className="flex flex-col gap-3">
                {["Services", "Work", "About"].map(l => (
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

            {/* Connect */}
            <div>
              <h4 className="text-white text-sm font-medium mb-6">Connect</h4>
              <div className="flex flex-col gap-3">
                <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">Instagram</a>
                <a href="#" className="text-white/40 text-sm hover:text-white transition-colors">LinkedIn</a>
                <a href="mailto:hello@strivestudios.co" className="text-white/40 text-sm hover:text-white transition-colors">Mail</a>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-white/30 text-xs">© 2025 Strive Studios. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/30 text-xs hover:text-white/60 transition-colors">Terms of Service</a>
            </div>
          </div>

        </div>
      </footer>
    </main>
  );
}
