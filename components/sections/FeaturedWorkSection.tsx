"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const projects = [
  {
    num: "01",
    title: "Campus Connect",
    category: "Brand Identity · Web",
    year: "2024",
    image: "/project-1.png",
    url: "https://campus-connect-six-pi.vercel.app",
  },
  {
    num: "02",
    title: "ASCEND",
    category: "UI Design · Development",
    year: "2024",
    image: "/project-2.png",
    url: "https://ascend-black.vercel.app",
  },
  {
    num: "03",
    title: "Velocity",
    category: "Web Design · Development",
    year: "2023",
    image: "/project-3.png",
    url: "https://v-velocity-junior-college-website.vercel.app",
  },
  {
    num: "04",
    title: "Vanta Digital",
    category: "Web Design · Development",
    year: "2025",
    image: "/project-4.png",
  },
];

/* Asymmetric layout offsets — magazine composition */
const layouts: Record<number, { width: string; ml: string; mr: string; aspect: string }> = {
  0: { width: "100%", ml: "0", mr: "0", aspect: "16/10" },
  1: { width: "65%", ml: "auto", mr: "0", aspect: "4/3" },
  2: { width: "100%", ml: "0", mr: "0", aspect: "16/10" },
  3: { width: "55%", ml: "0", mr: "auto", aspect: "4/3" },
};

function ProjectCard({
  project,
  layout,
}: {
  project: (typeof projects)[number];
  layout: { width: string; ml: string; mr: string; aspect: string };
}) {
  const [hovered, setHovered] = useState(false);

  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        style={{
          overflow: "hidden",
          borderRadius: "4px",
          position: "relative",
          aspectRatio: layout.aspect,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transform: hovered ? "scale(1.03)" : "scale(1)",
            transition: "transform 0.6s ease",
          }}
        />
      </div>

      {/* Metadata */}
      <div style={{ marginTop: "24px" }}>
        <h3
          style={{
            fontSize: "clamp(20px, 2vw, 32px)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: "8px",
            color: "#ffffff",
          }}
        >
          {project.title}
        </h3>
        <div
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.35)",
          }}
        >
          {project.category} · {project.year}
        </div>
      </div>
    </div>
  );

  return (
    <motion.article
      variants={fadeUp}
      style={{
        marginBottom: "clamp(60px, 8vw, 120px)",
        width: layout.width,
        marginLeft: layout.ml,
        marginRight: layout.mr,
      }}
    >
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "block",
            cursor: "pointer",
          }}
        >
          {inner}
        </a>
      ) : (
        inner
      )}
    </motion.article>
  );
}

export default function FeaturedWorkSection() {
  return (
    <motion.section
      id="work"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={stagger}
      style={{
        paddingTop: "clamp(100px, 12vw, 180px)",
        paddingBottom: "clamp(100px, 12vw, 180px)",
        paddingInline: "clamp(24px, 5vw, 80px)",
        backgroundColor: "#0a0a0a",
        color: "#ffffff",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.45)",
            marginBottom: "24px",
          }}
        >
          Selected work
        </motion.p>
        <motion.h2
          variants={fadeUp}
          style={{
            fontSize: "clamp(36px, 5vw, 72px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            marginBottom: "80px",
            color: "#ffffff",
          }}
        >
          Featured Projects
        </motion.h2>

        <div>
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.num}
              project={project}
              layout={layouts[idx] ?? layouts[0]}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
