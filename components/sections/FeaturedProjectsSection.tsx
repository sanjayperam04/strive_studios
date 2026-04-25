"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

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

const shellStyle = {
  paddingLeft: TOKENS.spacing.shellX,
  paddingRight: TOKENS.spacing.shellX,
};
const AUTO_SCROLL_SPEED = 36;

export default function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartScroll = useRef(0);
  const hasDragged = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frameId = 0;
    let previousTime = performance.now();

    const tick = (time: number) => {
      const delta = time - previousTime;
      previousTime = time;

      if (!isDragging && !isUserInteracting) {
        const loopPoint = track.scrollWidth / 2;
        track.scrollLeft += (AUTO_SCROLL_SPEED * delta) / 1000;

        if (loopPoint > 0 && track.scrollLeft >= loopPoint) {
          track.scrollLeft -= loopPoint;
        }
      }

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isDragging, isUserInteracting]);

  const slide = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * Math.min(track.clientWidth * 0.86, 620),
      behavior: "smooth",
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;

    setIsDragging(true);
    setIsUserInteracting(true);
    hasDragged.current = false;
    dragStartX.current = event.clientX;
    dragStartScroll.current = track.scrollLeft;
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || event.pointerType !== "mouse") return;
    const track = trackRef.current;
    if (!track) return;

    const distance = event.clientX - dragStartX.current;
    if (Math.abs(distance) > 6) {
      hasDragged.current = true;
    }
    track.scrollLeft = dragStartScroll.current - distance;
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    setIsDragging(false);
  };

  const handleProjectClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!hasDragged.current) return;
    event.preventDefault();
    hasDragged.current = false;
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        paddingTop: TOKENS.spacing.sectionTopMd,
        paddingBottom: TOKENS.spacing.sectionBottomLg,
        overflow: "hidden",
      }}
    >
      <div
        className="flex w-full flex-col"
        style={{
          ...shellStyle,
          gap: TOKENS.spacing.contentGap,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/35">
              Selected work
            </p>
            <div className="h-5" />
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-6xl">
              Projects with a pulse.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-white/35 md:inline">
              Drag, swipe, or use controls
            </span>
            <button
              type="button"
              onClick={() => slide(-1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all hover:border-white hover:bg-white hover:text-black"
              aria-label="Previous project"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => slide(1)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/55 transition-all hover:border-white hover:bg-white hover:text-black"
              aria-label="Next project"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        style={{ marginTop: TOKENS.spacing.sectionHeaderGap }}
      >
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={stopDragging}
          onPointerCancel={stopDragging}
          onPointerLeave={stopDragging}
          onMouseEnter={() => setIsUserInteracting(true)}
          onMouseLeave={() => setIsUserInteracting(false)}
          onTouchStart={() => setIsUserInteracting(true)}
          onTouchEnd={() => setIsUserInteracting(false)}
          onTouchCancel={() => setIsUserInteracting(false)}
          className={`no-scrollbar flex snap-x snap-mandatory overflow-x-auto pb-5 ${
            isDragging ? "cursor-grabbing select-none" : "cursor-grab"
          }`}
          style={{
            WebkitOverflowScrolling: "touch",
            gap: TOKENS.spacing.cardGap,
            paddingLeft: TOKENS.spacing.shellX,
            paddingRight: TOKENS.spacing.shellX,
            scrollPaddingLeft: TOKENS.spacing.shellX,
          }}
        >
          {[...PROJECTS, ...PROJECTS].map((project, loopIndex) => (
            <article
              key={`${project.index}-${loopIndex}`}
              className="group min-w-[82vw] snap-start border border-white/10 sm:min-w-[560px] lg:min-w-[660px]"
              style={{
                backgroundColor: "#111111",
                borderRadius: TOKENS.radius.cardLg,
                padding: TOKENS.spacing.mediaInset,
              }}
            >
              <a
                href={project.url || "#work"}
                target={project.url ? "_blank" : undefined}
                rel={project.url ? "noopener noreferrer" : undefined}
                onClick={handleProjectClick}
                className={`block ${project.url ? "cursor-inherit" : "pointer-events-none"}`}
                aria-label={project.url ? `Open ${project.title}` : project.title}
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-zinc-900">
                  <Image
                    src={project.image}
                    alt={`${project.title} project preview`}
                    fill
                    sizes="(min-width: 1024px) 640px, 82vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent opacity-80" />
                  <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-xs text-white/70 backdrop-blur">
                    {project.index}
                  </span>
                </div>
              </a>

              <div
                className="flex items-start justify-between gap-5"
                style={{ padding: TOKENS.spacing.cardPaddingCompact }}
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.15em] text-white/40">
                    {project.category} · {project.year}
                  </p>
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-white/50 transition-all hover:border-white hover:bg-white hover:text-black"
                    aria-label={`Open ${project.title}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                      <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
