"use client";

import { TOKENS } from "../../styles/tokens";

interface AboutUsSectionProps {
  onContactClick: () => void;
}

export default function AboutUsSection({ onContactClick }: AboutUsSectionProps) {
  return (
    <section
      id="about-us"
      style={{
        paddingLeft: TOKENS.spacing.shellX,
        paddingRight: TOKENS.spacing.shellX,
        paddingBottom: TOKENS.spacing.sectionBottomMd,
      }}
    >
      <h2 className="text-3xl font-bold leading-none tracking-tight md:text-4xl" style={{ marginBottom: "80px" }}>
        About us
      </h2>

      <div className="grid items-start gap-20 md:grid-cols-2">
        <div>
          <h3 className="mb-8 font-bold leading-[1.08] tracking-tight" style={{ fontSize: TOKENS.type.h3Fluid }}>
            We craft bold, purposeful digital experiences that help brands stand out and connect with the right audience.
          </h3>
          <p className="mb-8 text-lg leading-relaxed text-white/40">
            Good design isn&apos;t just about looking great - it&apos;s about telling a story, building trust, and making a lasting impression.
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
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

        <div className="border-t border-white/[0.08]">
          {[
            { num: "50+", label: "Projects completed", desc: "Delivered across web, brand and strategy" },
            { num: "99%", label: "Client satisfaction", desc: "Measured across every project we ship" },
            { num: "10+", label: "Industries served", desc: "From tech startups to luxury brands" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center justify-between border-b border-white/[0.08] py-8">
              <div>
                <p className="mb-1 text-base font-normal text-white">{stat.label}</p>
                <p className="text-sm text-white/35">{stat.desc}</p>
              </div>
              <span className="ml-8 shrink-0 font-bold leading-none tracking-tight" style={{ fontSize: TOKENS.type.statFluid }}>
                {stat.num}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
