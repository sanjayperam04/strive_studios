"use client";

import { TOKENS } from "../../styles/tokens";

const FOOTER_SERVICES = [
  { label: "Branding", href: "#services" },
  { label: "Website Design", href: "#services" },
  { label: "Development & Hosting", href: "#services" },
  { label: "Full-Service Packages", href: "#services" },
];

const FOOTER_STUDIO = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

const FOOTER_SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  const shell: React.CSSProperties = {
    paddingLeft: TOKENS.spacing.shellX,
    paddingRight: TOKENS.spacing.shellX,
  };

  const colTitleStyle: React.CSSProperties = {
    fontSize: "10px",
    color: TOKENS.colors.textMuted30,
    letterSpacing: "0.22em",
    textTransform: "uppercase",
    fontWeight: 600,
    marginBottom: "28px",
  };

  const linkStyle: React.CSSProperties = {
    fontSize: "15px",
    color: TOKENS.colors.textMuted40,
    textDecoration: "none",
    display: "block",
    transition: "color 0.2s",
    lineHeight: 1,
  };

  return (
    <footer style={{ backgroundColor: TOKENS.colors.background, overflow: "hidden", position: "relative" }}>
      <div aria-hidden style={{ position: "absolute", top: "0%", right: "-5%", width: "45%", height: "50%", background: "radial-gradient(ellipse at top right, rgba(192,57,43,0.16) 0%, transparent 58%)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "10%", left: "-5%", width: "40%", height: "55%", background: "radial-gradient(ellipse at bottom left, rgba(192,57,43,0.13) 0%, transparent 55%)", pointerEvents: "none" }} />

      {/* ── Top grid ──────────────────────────────────────── */}
      <div
        style={{
          ...shell,
          borderTop: `1px solid ${TOKENS.colors.textMuted10}`,
          paddingTop: "clamp(56px, 7vw, 88px)",
          paddingBottom: "clamp(48px, 6vw, 72px)",
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]"
          style={{ gap: "clamp(48px, 6vw, 80px)" }}
        >

          {/* Col 1 — Brand */}
          <div style={{ paddingRight: "clamp(0px, 3vw, 48px)" }}>
            <p
              style={{
                fontSize: "17px",
                fontWeight: 600,
                color: TOKENS.colors.textPrimary,
                letterSpacing: "0.01em",
                marginBottom: "14px",
              }}
            >
              Summit Studio
              <span style={{ color: TOKENS.colors.accentRed }}>.</span>
            </p>
            <p
              style={{
                fontSize: "14px",
                color: TOKENS.colors.textMuted40,
                lineHeight: 1.75,
                marginBottom: "0",
                maxWidth: "32ch",
              }}
            >
              Bold digital experiences for ambitious brands that refuse to blend in.
            </p>

          </div>

          {/* Col 2 — Services */}
          <div>
            <p style={colTitleStyle}>Services</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
              {FOOTER_SERVICES.map((item) => (
                <li key={item.label}>
                  <a href={item.href} style={linkStyle} className="hover:text-white/90">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Studio */}
          <div>
            <p style={colTitleStyle}>Studio</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
              {FOOTER_STUDIO.map((item) => (
                <li key={item.label}>
                  <a href={item.href} style={linkStyle} className="hover:text-white/90">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Follow Us */}
          <div>
            <p style={colTitleStyle}>Follow Us</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
              {FOOTER_SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-white/90"
                    style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "7px" }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* ── Big name bar ──────────────────────────────────── */}
      <div
        style={{
          ...shell,
          borderTop: `1px solid ${TOKENS.colors.textMuted6}`,
          paddingTop: "clamp(16px, 2vw, 24px)",
          paddingBottom: "clamp(16px, 2vw, 24px)",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "clamp(52px, 10.5vw, 168px)",
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}
        >
          <span style={{ color: TOKENS.colors.textPrimary }}>Summit Studio</span>
          <span style={{ color: TOKENS.colors.accentRed }}>.</span>
        </p>
      </div>

      {/* ── Bottom bar ────────────────────────────────────── */}
      <div
        style={{
          ...shell,
          borderTop: `1px solid ${TOKENS.colors.textMuted6}`,
          paddingTop: "18px",
          paddingBottom: "28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <p style={{ fontSize: "12px", color: TOKENS.colors.textMuted30 }}>
          © {currentYear} Summit Studio. All rights reserved.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "24px", flexWrap: "wrap" }}>
          <a
            href="#"
            style={{ fontSize: "12px", color: TOKENS.colors.textMuted30, textDecoration: "none", transition: "color 0.2s" }}
            className="hover:text-white/80"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            style={{ fontSize: "12px", color: TOKENS.colors.textMuted30, textDecoration: "none", transition: "color 0.2s" }}
            className="hover:text-white/80"
          >
            Terms of Use
          </a>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              fontSize: "12px",
              color: TOKENS.colors.textMuted30,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
              padding: 0,
              transition: "color 0.2s",
            }}
            className="hover:text-white/80"
          >
            Back to Top ↑
          </button>
        </div>
      </div>

    </footer>
  );
}
