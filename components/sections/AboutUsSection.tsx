"use client";

import { TOKENS } from "../../styles/tokens";

interface AboutUsSectionProps {
  onContactClick: () => void;
}

export default function AboutUsSection({
  onContactClick,
}: AboutUsSectionProps) {
  return (
    <section
      id="about-us"
      style={{
        paddingLeft: TOKENS.spacing.shellX,
        paddingRight: TOKENS.spacing.shellX,
        paddingBottom: TOKENS.spacing.sectionBottomMd,
      }}
    >
      <div className="text-center" style={{ marginBottom: "64px" }}>
        <p className="text-xs uppercase tracking-[0.25em] text-white/35">
          Who we are
        </p>
        <div style={{ height: "28px" }} />
        <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
          About us
        </h2>
      </div>

      <div className="grid items-start gap-16 md:grid-cols-2 md:gap-24">
        <div className="flex flex-col items-start gap-8">
          <h3
            className="font-bold leading-[1.2] tracking-tight text-white"
            style={{ fontSize: TOKENS.type.h3Fluid }}
          >
            We craft bold, purposeful digital experiences that help brands stand
            out and connect with the right audience.
          </h3>
          <p className="text-lg leading-[1.6] text-white/50">
            Good design isn&apos;t just about looking great - it&apos;s about
            telling a story, building trust, and making a lasting impression.
          </p>
          <button
            type="button"
            onClick={onContactClick}
            className="group inline-flex items-center gap-2 text-sm font-normal text-white"
          >
            <span className="relative">
              Start a project
              <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </div>

        <div className="border-t border-white/[0.08]">
          {[
            {
              num: "50+",
              label: "Projects completed",
              desc: "Delivered across web, brand and strategy",
            },
            {
              num: "99%",
              label: "Client satisfaction",
              desc: "Measured across every project we ship",
            },
            {
              num: "10+",
              label: "Industries served",
              desc: "From tech startups to luxury brands",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center justify-between border-b border-white/[0.08] py-12"
            >
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium text-white">{stat.label}</p>
                <p className="text-base text-white/40">{stat.desc}</p>
              </div>
              <span
                className="ml-8 shrink-0 font-bold leading-none tracking-tight"
                style={{ fontSize: TOKENS.type.statFluid }}
              >
                {stat.num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
