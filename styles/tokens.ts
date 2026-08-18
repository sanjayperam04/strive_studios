/**
 * Editorial Design System Tokens
 * ───────────────────────────────
 * Premium agency aesthetic: generous whitespace,
 * restrained colour palette, typography-first hierarchy.
 */

export const TOKENS = {
  colors: {
    bg: "#0a0a0a",
    surface: "#111111",
    text: "#ffffff",
    textPrimary: "#ffffff",
    textMuted: "rgba(255,255,255,0.45)",
    textMuted40: "rgba(255,255,255,0.45)",
    textMuted30: "rgba(255,255,255,0.30)",
    textMuted20: "rgba(255,255,255,0.20)",
    textMuted10: "rgba(255,255,255,0.10)",
    textFaint: "rgba(255,255,255,0.2)",
    textMicro: "rgba(255,255,255,0.1)",
    accent: "#c0392b",
    accentRed: "#c0392b",
    accentBlue: "#3b82f6",
    accentRedMuted: "rgba(192,57,43,0.15)",
    background: "#0a0a0a",
    accentSoft: "rgba(192,57,43,0.6)",
    divider: "rgba(255,255,255,0.08)",
    overlay: "rgba(0,0,0,0.6)",
    textInverse: "#000000",
    inverseMuted45: "rgba(0,0,0,0.45)",
    textMuted35: "rgba(255,255,255,0.35)",
    textMuted5: "rgba(255,255,255,0.05)",
  },

  radius: {
    card: "8px",
    pill: "9999px",
  },

  spacing: {
    shellX: "clamp(24px, 5vw, 80px)",
    sectionY: "clamp(100px, 12vw, 180px)",
    sectionTopMd: "clamp(80px, 10vw, 140px)",
    sectionBottomLg: "clamp(100px, 12vw, 180px)",
    contentMax: "1400px",
    contentGap: "clamp(40px, 6vw, 80px)",
    sectionHeaderGap: "clamp(48px, 6vw, 80px)",
    narrowMax: "900px",
    headingGap: "24px",
    bodyGap: "32px",
  },

  type: {
    hero: "clamp(52px, 8.5vw, 150px)",
    h2: "clamp(36px, 5vw, 72px)",
    h2Fluid: "clamp(36px, 5vw, 72px)",
    h3: "clamp(24px, 3vw, 40px)",
    body: "clamp(16px, 1.3vw, 20px)",
    small: "15px",
    label: "12px",
    footer: "clamp(48px, 10vw, 160px)",
  },

  /** Power3.out equivalent */
  ease: [0.16, 1, 0.3, 1] as const,
  duration: 0.7,
} as const;

/* ── Re-usable Framer Motion variants ───────────────── */

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export const viewportOpts = { once: true, amount: 0.15 } as const;
