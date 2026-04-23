"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

interface FeaturedProjectsSectionProps {
  onContactClick: () => void;
}

const PROJECTS = [
  {
    index: "01",
    title: "Campus Connect",
    category: "Brand Identity · Web",
    year: "2024",
    image: "/project-1.png",
    url: "https://campus-connect-six-pi.vercel.app",
  },
  {
    index: "02",
    title: "ASCEND",
    category: "UI Design · Development",
    year: "2024",
    image: "/project-2.png",
    url: "https://ascend-black.vercel.app",
  },
  {
    index: "03",
    title: "Velocity",
    category: "Web Design · Development",
    year: "2023",
    image: "/project-3.png",
    url: "https://v-velocity-junior-college-website.vercel.app",
  },
  {
    index: "04",
    title: "Vanta Digital",
    category: "Web Design · Development",
    year: "2025",
    image: "/project-4.png",
    url: undefined,
  },
];

export default function FeaturedProjectsSection({
  onContactClick,
}: FeaturedProjectsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true });

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        padding: `48px 0 ${TOKENS.spacing.sectionBottomLg}`,
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%" }}>
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center px-6 md:px-12"
          style={{ marginBottom: "64px" }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-white/35">
            Selected Works
          </p>
          <div style={{ height: "28px" }} />
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl text-white">
            Featured projects
          </h2>
        </motion.div>

        {/* ── Infinite Auto-Scrolling Marquee ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full overflow-hidden"
        >
          <div
            className="flex"
            style={{ animation: "projectsMarquee 15s linear infinite" }}
          >
            {/* Render twice for seamless loop */}
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="flex shrink-0" style={{ gap: "clamp(24px, 3vw, 40px)", paddingRight: "clamp(24px, 3vw, 40px)" }}>
                {PROJECTS.map((project) => (
                  <div
                    key={`${ri}-${project.index}`}
                    className="group shrink-0 flex flex-col gap-4"
                    style={{ width: "clamp(280px, 80vw, 560px)" }}
                  >
                    {/* Image */}
                    <a
                      href={project.url || "#"}
                      target={project.url ? "_blank" : undefined}
                      rel={project.url ? "noopener noreferrer" : undefined}
                      className={`relative w-full overflow-hidden rounded-2xl bg-zinc-900 ${project.url ? "cursor-pointer" : "cursor-default"}`}
                      style={{ aspectRatio: "16/10" }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </a>

                    {/* Text */}
                    <div className="flex items-start justify-between px-1">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-white">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/40">
                          {project.category} · {project.year}
                        </p>
                      </div>
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/50 hover:border-white hover:text-white transition-all"
                        >
                          <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                            <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    
    </section>
  );
}
