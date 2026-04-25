"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

interface ProcessSectionProps {
  onContactClick: () => void;
}

const processSteps = [
  {
    num: "01",
    title: "Strategy",
    subtitle: "Find the sharp angle",
    description:
      "Clarify your offer, audience, and competitive edge. Map the visitor journey before designing screens.",
  },
  {
    num: "02",
    title: "Brand",
    subtitle: "Shape the language",
    description:
      "Logo, type, color — a system that works beyond the homepage and scales with your growth.",
  },
  {
    num: "03",
    title: "Design",
    subtitle: "Experience architecture",
    description:
      "High-converting page layouts for mobile and desktop. Prototyped interactions, nothing guessed.",
  },
  {
    num: "04",
    title: "Delivery",
    subtitle: "Build, test, launch",
    description:
      "Clean Next.js code, hosting, and launch QA. No agency maze — just your website going live.",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ProcessSection({
  onContactClick,
}: ProcessSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="w-full"
      style={{
        backgroundColor: TOKENS.colors.background,
        paddingTop: TOKENS.spacing.sectionTopMd,
        paddingBottom: TOKENS.spacing.sectionBottomLg,
      }}
    >
      {/* Header row */}
      <div
        style={{
          paddingLeft: TOKENS.spacing.shellX,
          paddingRight: TOKENS.spacing.shellX,
        }}
        className="flex items-end justify-between gap-8 flex-wrap"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <p
            className="text-xs uppercase tracking-[0.28em]"
            style={{
              color: TOKENS.colors.accentRedSoft,
              marginBottom: "1.25rem",
            }}
          >
            How we work
          </p>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: TOKENS.type.h2Fluid,
              color: TOKENS.colors.textPrimary,
              lineHeight: 1.05,
            }}
          >
            From idea
            <span style={{ color: TOKENS.colors.textMuted25 }}> to launch.</span>
          </h2>
        </motion.div>
      </div>

      {/* Steps — full width rows separated by lines */}
      <div style={{ marginTop: TOKENS.spacing.sectionHeaderGap }}>
        {processSteps.map((step, index) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.15 + index * 0.1 }}
            onHoverStart={() => setActiveStep(index)}
            onHoverEnd={() => setActiveStep(null)}
            className="group cursor-default"
            style={{
              borderTop: `1px solid ${TOKENS.colors.textMuted10}`,
              ...(index === processSteps.length - 1
                ? { borderBottom: `1px solid ${TOKENS.colors.textMuted10}` }
                : {}),
            }}
          >
            <div
              className="grid grid-cols-1 lg:grid-cols-[clamp(36px,4vw,64px)_1fr_1.5fr_auto] items-start lg:items-center transition-colors duration-300"
              style={{
                paddingLeft: TOKENS.spacing.shellX,
                paddingRight: TOKENS.spacing.shellX,
                paddingTop: "clamp(20px, 3vw, 36px)",
                paddingBottom: "clamp(20px, 3vw, 36px)",
                gap: "clamp(14px, 3vw, 36px)",
                background:
                  activeStep === index
                    ? TOKENS.colors.textMuted5
                    : "transparent",
              }}
            >
              {/* Step number */}
              <span
                className="font-mono pt-1 lg:pt-0"
                style={{
                  fontSize: "clamp(14px, 1.8vw, 22px)",
                  fontWeight: 700,
                  color:
                    activeStep === index
                      ? TOKENS.colors.accentRedSoft
                      : TOKENS.colors.textMuted10,
                  lineHeight: 1,
                  transition: "color 0.3s",
                }}
              >
                {step.num}
              </span>

              {/* Title */}
              <h3
                className="font-bold tracking-tight"
                style={{
                  fontSize: "clamp(20px, 2.8vw, 36px)",
                  color:
                    activeStep === index
                      ? TOKENS.colors.textPrimary
                      : TOKENS.colors.textMuted40,
                  lineHeight: 1,
                  transition: "color 0.3s",
                }}
              >
                {step.title}
              </h3>

              {/* Description — reveals on hover on desktop, always visible on mobile */}
              <p
                className={`text-[15px] lg:text-[16px] leading-relaxed max-w-xl opacity-100 translate-y-0 ${
                  activeStep === index
                    ? "lg:opacity-100 lg:translate-y-0"
                    : "lg:opacity-0 lg:translate-y-2"
                }`}
                style={{
                  color: TOKENS.colors.textMuted40,
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {step.description}
              </p>

              {/* Subtitle tag */}
              <div className="flex lg:justify-end pt-2 lg:pt-0">
                <span
                  className="uppercase tracking-[0.15em] text-[11px] lg:text-xs font-medium"
                  style={{
                    color:
                      activeStep === index
                        ? TOKENS.colors.textMuted40
                        : TOKENS.colors.textMuted20,
                    transition: "color 0.3s",
                  }}
                >
                  {step.subtitle}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
