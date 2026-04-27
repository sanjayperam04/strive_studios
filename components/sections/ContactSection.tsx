"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Globe from "../Globe";
import { TOKENS } from "../../styles/tokens";


const CONTACT_LINKS = [
  { label: "Email", value: "hello@strivestudios.co", href: "mailto:hello@strivestudios.co" },
  { label: "Instagram", value: "@summitstudios", href: "https://instagram.com" },
  { label: "Twitter / X", value: "@summitstudios", href: "https://twitter.com" },
  { label: "LinkedIn", value: "Summit Studios", href: "https://linkedin.com" },
];

const ease = [0.22, 1, 0.36, 1] as const;
type Status = "idle" | "loading" | "success" | "error";


export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (isFormOpen) {
      const t = setTimeout(() => {
        formPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [isFormOpen]);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload = {
      name: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      message: formData.message,
      subject: `New Project Inquiry from ${formData.firstName} ${formData.lastName}`.trim(),
    };

    const keys = [
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY_SANJAY,
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY_RUPIN,
    ];

    try {
      const results = await Promise.allSettled(
        keys.map((access_key) =>
          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, access_key }),
          }).then((r) => r.json())
        )
      );

      const anySuccess = results.some(
        (r) => r.status === "fulfilled" && r.value?.success
      );

      if (anySuccess) {
        setStatus("success");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  };

  const shell: React.CSSProperties = {
    paddingLeft: TOKENS.spacing.shellX,
    paddingRight: TOKENS.spacing.shellX,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "4px",
    color: TOKENS.colors.textPrimary,
    fontSize: "15px",
    padding: "14px 16px",
    outline: "none",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
    display: "block",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "10px",
    color: TOKENS.colors.textMuted40,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: "10px",
    display: "block",
  };

  const focusRed = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(192,57,43,0.45)";
  };
  const blurReset = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: TOKENS.colors.background,
        paddingTop: TOKENS.spacing.sectionTopMd,
        paddingBottom: TOKENS.spacing.sectionBottomLg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div aria-hidden style={{ position: "absolute", top: "-25%", left: "-8%", width: "55%", height: "85%", background: "radial-gradient(ellipse at top left, rgba(192,57,43,0.18) 0%, transparent 58%)", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "45%", height: "65%", background: "radial-gradient(ellipse at bottom right, rgba(192,57,43,0.13) 0%, transparent 55%)", pointerEvents: "none" }} />
      {/* ── Contact top ───────────────────────────────────── */}
      <div style={shell}>

        {/* Eyebrow + heading — full width */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          style={{ marginBottom: "clamp(32px, 4vw, 52px)" }}
        >
          <p style={{
            fontSize: "10px",
            color: TOKENS.colors.textMuted40,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "clamp(14px, 1.8vw, 20px)",
          }}>
            Let&apos;s Work Together
          </p>
          <h2 style={{
            fontSize: TOKENS.type.h2Fluid,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: TOKENS.colors.textPrimary,
          }}>
            Contact
            <span style={{ color: TOKENS.colors.textMuted20 }}> Us.</span>
          </h2>
        </motion.div>

        {/* Divider */}
        <div style={{ borderTop: `1px solid ${TOKENS.colors.textMuted10}`, marginBottom: 0 }} />

        {/* Two-column grid — both start from the divider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease, delay: 0.12 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          style={{ gap: "clamp(40px, 6vw, 80px)" }}
        >
          {/* Left — paragraph + button */}
          <div style={{ paddingTop: "clamp(28px, 3.5vw, 44px)" }}>
            <p
              style={{
                fontSize: "16px",
                color: TOKENS.colors.textMuted40,
                lineHeight: 1.8,
                marginBottom: "clamp(28px, 3.5vw, 40px)",
              }}
            >
              Ready to build something bold? We partner with ambitious brands to
              create digital experiences that leave a mark. Tell us what
              you&apos;re working on.
            </p>

            <motion.button
              onClick={() => setIsFormOpen((v) => !v)}
              animate={{
                backgroundColor: isFormOpen ? "transparent" : "#ffffff",
                borderColor: isFormOpen ? "rgba(255,255,255,0.14)" : "#ffffff",
                color: isFormOpen ? "rgba(255,255,255,0.45)" : "#000000",
              }}
              transition={{ duration: 0.2 }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 22px",
                border: "1px solid",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {isFormOpen ? (
                <>
                  Close Form
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 2L10 10M10 2L2 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </>
              ) : (
                <>
                  Send Message
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </>
              )}
            </motion.button>
          </div>

          {/* Right — contact links */}
          <ul style={{ listStyle: "none", padding: 0, margin: 0, paddingTop: "clamp(28px, 3.5vw, 44px)" }}>
            {CONTACT_LINKS.map((link, i) => (
              <motion.li
                key={link.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease, delay: 0.18 + i * 0.07 }}
              >
                <a
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between"
                  style={{
                    padding: "18px 0",
                    borderTop: `1px solid ${TOKENS.colors.textMuted10}`,
                    borderBottom: `1px solid ${TOKENS.colors.textMuted10}`,
                    textDecoration: "none",
                    gap: "16px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      color: TOKENS.colors.textMuted30,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      flexShrink: 0,
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="group-hover:text-[#c0392b] transition-colors duration-200"
                    style={{
                      fontSize: "14px",
                      color: "rgba(255,255,255,0.72)",
                      textAlign: "right",
                    }}
                  >
                    {link.value}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* ── Expandable form panel ─────────────────────────── */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            key="form-panel"
            ref={formPanelRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.52, ease }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                ...shell,
                borderTop: `1px solid ${TOKENS.colors.textMuted10}`,
                marginTop: "clamp(44px, 5.5vw, 72px)",
                paddingTop: "clamp(44px, 5.5vw, 72px)",
              }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease }}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "clamp(56px, 8vw, 96px) 40px",
                      gap: "20px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        background: TOKENS.colors.accentRedMuted,
                        border: `1px solid ${TOKENS.colors.accentRed}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M4 10l4 4 8-8"
                          stroke={TOKENS.colors.accentRed}
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3
                      style={{
                        fontSize: "clamp(22px, 2.5vw, 30px)",
                        fontWeight: 700,
                        color: TOKENS.colors.textPrimary,
                        lineHeight: 1.2,
                      }}
                    >
                      Message Sent.
                    </h3>
                    <p
                      style={{
                        color: TOKENS.colors.textMuted40,
                        fontSize: "15px",
                        lineHeight: 1.7,
                        maxWidth: "38ch",
                      }}
                    >
                      Thanks for reaching out. We&apos;ll be in touch within one
                      business day.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form-fields"
                    onSubmit={handleSubmit}
                    initial={false}
                    className="grid grid-cols-1 lg:grid-cols-2 w-full items-start"
                    style={{ gap: "clamp(40px, 5vw, 72px)" }}
                  >
                    {/* ── Left col — fields + button ── */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "clamp(20px, 2.5vw, 28px)" }}>
                      <h3 style={{
                        fontSize: "clamp(20px, 2.4vw, 30px)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: "-0.01em",
                        textTransform: "uppercase",
                        color: TOKENS.colors.textPrimary,
                      }}>
                        Tell Us About<br />Your Project
                      </h3>

                      {/* First + Last */}
                      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: "16px" }}>
                        <div>
                          <label style={labelStyle}>First Name</label>
                          <input type="text" placeholder="Alex" required className="contact-input"
                            value={formData.firstName}
                            onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                            style={inputStyle} onFocus={focusRed} onBlur={blurReset} />
                        </div>
                        <div>
                          <label style={labelStyle}>Last Name</label>
                          <input type="text" placeholder="Johnson" className="contact-input"
                            value={formData.lastName}
                            onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                            style={inputStyle} onFocus={focusRed} onBlur={blurReset} />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label style={labelStyle}>Email Address</label>
                        <input type="email" placeholder="alex@company.com" required className="contact-input"
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          style={inputStyle} onFocus={focusRed} onBlur={blurReset} />
                      </div>

                      {/* Message */}
                      <div>
                        <label style={labelStyle}>Tell Us About Your Project</label>
                        <textarea placeholder="What are you building, who is it for, and when do you need it?"
                          required rows={6} className="contact-textarea"
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65, minHeight: "140px" }}
                          onFocus={focusRed} onBlur={blurReset} />
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {status === "error" && errorMsg && (
                          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                            style={{ fontSize: "13px", color: "#f87171" }}>
                            {errorMsg}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit button — left bottom */}
                      <button type="submit" disabled={status === "loading"}
                        className="contact-submit-btn"
                        style={{
                          padding: "16px 32px",
                          backgroundColor: "#ffffff", color: "#000000",
                          border: "none", borderRadius: "4px",
                          fontSize: "11px", fontWeight: 700,
                          letterSpacing: "0.22em", textTransform: "uppercase",
                          cursor: status === "loading" ? "wait" : "pointer",
                          opacity: status === "loading" ? 0.6 : 1,
                          display: "inline-flex", alignItems: "center", gap: "10px",
                          fontFamily: "inherit", transition: "opacity 0.2s", alignSelf: "flex-start",
                        }}
                        onMouseEnter={(e) => status !== "loading" && (e.currentTarget.style.opacity = "0.85")}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = status === "loading" ? "0.6" : "1")}
                      >
                        {status === "loading" ? "Sending…" : (
                          <>Send Message
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>

                    {/* ── Right col — globe ── */}
                    <div className="contact-globe-col" style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "16px",
                    }}>
                      <p style={{ fontSize: "10px", color: TOKENS.colors.textMuted30, letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "center" }}>
                        Clients across the globe
                      </p>

                      <div className="contact-globe-wrapper" style={{ width: "100%" }}>
                        <Globe />
                      </div>

                      {/* City markers */}
                      <div className="flex flex-wrap justify-center" style={{ gap: "10px 24px" }}>
                        {["London", "Chennai", "Bangalore", "New York"].map((city) => (
                          <span key={city} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: TOKENS.colors.textMuted40 }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#c0392b", display: "inline-block", flexShrink: 0 }} />
                            {city}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
