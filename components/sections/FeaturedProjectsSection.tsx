"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TOKENS } from "../../styles/tokens";

interface FeaturedProjectsSectionProps {
  onContactClick: () => void;
}

const projects = [
  {
    title: "Campus Connect",
    tags: ["Web Development", "Branding"],
    image: "/project-1.png",
    url: "https://campus-connect-six-pi.vercel.app",
  },
  {
    title: "ASCEND",
    tags: ["UI Design", "Development"],
    image: "/project-2.png",
    url: "https://ascend-black.vercel.app",
  },
  {
    title: "Velocity",
    tags: ["Web Development", "College Website"],
    image: "/project-3.png",
    url: "https://v-velocity-junior-college-website.vercel.app",
  },
  { title: "Vanta Digital", tags: ["Web Design", "Development"], image: "/project-4.png" },
];

export default function FeaturedProjectsSection({ onContactClick }: FeaturedProjectsSectionProps) {
  const workRef = useRef(null);
  const workInView = useInView(workRef, { once: true, margin: "-80px" });

  return (
    <section id="work" ref={workRef} style={{ padding: `8rem ${TOKENS.spacing.sectionX} 8rem` }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={workInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px" }}
      >
        <h2 style={{ fontSize: TOKENS.type.h2Fluid, fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
          Featured
          <br />
          projects{" "}
          <span
            style={{
              fontSize: TOKENS.type.metaFluid,
              fontWeight: 400,
              color: TOKENS.colors.textMuted25,
              verticalAlign: "middle",
              marginLeft: "8px",
            }}
          >
            (0{projects.length})
          </span>
        </h2>
        <button
          type="button"
          onClick={onContactClick}
          style={{
            color: TOKENS.colors.textMuted35,
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            textDecoration: "none",
            paddingBottom: "4px",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
          onMouseLeave={(e) => (e.currentTarget.style.color = TOKENS.colors.textMuted35)}
        >
          <span>→</span>
          <span>View all</span>
        </button>
      </motion.div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {projects.map((p, i) => {
          const card = (
            <>
              <div className="relative overflow-hidden rounded-2xl bg-zinc-900" style={{ aspectRatio: "16/9" }}>
                <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
                {p.url && (
                  <div className="absolute right-4 top-4 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-start justify-between px-1">
                <span className="text-sm font-normal text-white">{p.title}</span>
                <div className="flex flex-col items-end gap-0.5 pt-0.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="text-xs leading-relaxed text-white/35">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          );

          if (!p.url) {
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 28 }}
                animate={workInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: i * 0.1 }}
                className="group block"
              >
                {card}
              </motion.div>
            );
          }

          return (
            <motion.a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 28 }}
              animate={workInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className="group block cursor-pointer"
            >
              {card}
            </motion.a>
          );
        })}
      </div>
    </section>
  );
}
