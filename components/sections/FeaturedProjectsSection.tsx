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

        {/* ── Horizontal Scrollable Container ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex w-full snap-x snap-mandatory overflow-x-auto pb-12 pt-4 hide-scrollbar"
          style={{
            paddingLeft: TOKENS.spacing.shellX,
            paddingRight: TOKENS.spacing.shellX,
            scrollPaddingLeft: TOKENS.spacing.shellX,
            gap: "clamp(24px, 3vw, 48px)",
          }}
        >
          {PROJECTS.map((project) => (
            <div
              key={project.index}
              className="group flex w-[85vw] shrink-0 snap-start flex-col gap-6 md:w-[60vw] lg:w-[45vw]"
            >
              {/* Image Container */}
              <a
                href={project.url || "#"}
                target={project.url ? "_blank" : undefined}
                rel={project.url ? "noopener noreferrer" : undefined}
                className={`relative w-full overflow-hidden rounded-2xl bg-zinc-900 ${
                  project.url ? "cursor-pointer" : "cursor-default"
                }`}
                style={{ aspectRatio: "2560/1428" }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </a>

              {/* Text Info */}
              <div className="flex flex-col gap-3 px-1">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs tracking-widest text-white/40">
                    {project.index}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <h3 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {project.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50">
                  <span>{project.category}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span>{project.year}</span>
                </div>

                {project.url && (
                  <div className="mt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 border-b border-white/20 pb-1 text-xs font-medium uppercase tracking-[0.1em] text-white/70 transition-colors hover:border-white hover:text-white"
                    >
                      View Live
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M4 12L12 4M12 4H6M12 4V10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Spacer to allow the last card to scroll fully left */}
          <div className="w-[4vw] shrink-0" />
        </motion.div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `,
        }}
      />
    </section>
  );
}
