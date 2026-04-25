"use client";

import { useState } from "react";
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
  { label: "Blog", href: "#" },
  { label: "FAQ", href: "#" },
];

const FOOTER_SOCIAL = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Behance", href: "#" },
];

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const currentYear = new Date().getFullYear();

  const shell: React.CSSProperties = {
    paddingLeft: TOKENS.spacing.shellX,
    paddingRight: TOKENS.spacing.shellX,
  };

  const colTitleStyle: React.CSSProperties = {
    fontSize: "10px",
    color: TOKENS.colors.textMuted30,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 500,
    marginBottom: "20px",
  };

  const linkStyle: React.CSSProperties = {
    fontSize: "14px",
    color: TOKENS.colors.textMuted40,
    textDecoration: "none",
    display: "block",
    transition: "color 0.2s",
    lineHeight: 1,
  };

  const handleSubscribe = () => {
    if (email.includes("@")) setSubscribed(true);
  };

  return (
    <footer style={{ backgroundColor: TOKENS.colors.background, overflow: "hidden" }}>

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]"
          style={{ gap: "clamp(40px, 5vw, 48px)" }}
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
                marginBottom: "32px",
                maxWidth: "30ch",
              }}
            >
              Bold digital experiences for ambitious brands that refuse to blend in.
            </p>

            {/* Email signup */}
            <div>
              <p style={{ ...colTitleStyle, marginBottom: "12px" }}>
                Subscribe for Studio Updates
              </p>
              {subscribed ? (
                <p style={{ fontSize: "13px", color: TOKENS.colors.accentRedSoft }}>
                  You&apos;re subscribed — thanks!
                </p>
              ) : (
                <div style={{ display: "flex" }}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                    placeholder="your@email.com"
                    className="contact-input"
                    style={{
                      flex: 1,
                      minWidth: 0,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRight: "none",
                      borderRadius: "4px 0 0 4px",
                      color: TOKENS.colors.textPrimary,
                      fontSize: "13px",
                      padding: "11px 14px",
                      outline: "none",
                      fontFamily: "inherit",
                      transition: "border-color 0.2s",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(192,57,43,0.45)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)")}
                  />
                  <button
                    onClick={handleSubscribe}
                    style={{
                      backgroundColor: "#ffffff",
                      color: "#000000",
                      border: "none",
                      borderRadius: "0 4px 4px 0",
                      padding: "11px 16px",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                      transition: "opacity 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <p style={colTitleStyle}>Services</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
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
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
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
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
              {FOOTER_SOCIAL.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-white/90"
                    style={{ ...linkStyle, display: "flex", alignItems: "center", gap: "7px" }}
                  >
                    <span
                      className="group-hover:text-[#c0392b] transition-colors duration-200"
                      style={{ fontSize: "12px", color: TOKENS.colors.textMuted25 }}
                    >
                      ↗
                    </span>
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
            fontWeight: 900,
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
