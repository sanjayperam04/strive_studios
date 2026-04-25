"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

const SERVICE_OPTIONS = [
  "Branding",
  "Website Design",
  "Development & Hosting",
  "Full Service (Brand + Web)",
];

const BUDGET_OPTIONS = [
  "$1,000 – $3,000",
  "$3,000 – $7,000",
  "$7,000 – $15,000",
  "$15,000+",
];

const CONTACT_LINKS = [
  { label: "Email", value: "hello@strivestudios.co", href: "mailto:hello@strivestudios.co" },
  { label: "Instagram", value: "@summitstudios", href: "https://instagram.com" },
  { label: "Twitter / X", value: "@summitstudios", href: "https://twitter.com" },
  { label: "LinkedIn", value: "Summit Studios", href: "https://linkedin.com" },
];

const ease = [0.22, 1, 0.36, 1] as const;
type Status = "idle" | "loading" | "success" | "error";

function Chevron() {
  return (
    <span
      style={{
        position: "absolute",
        right: "16px",
        top: "50%",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        color: TOKENS.colors.textMuted40,
        display: "flex",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M2 5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", service: "", budget: "", message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          services: formData.service ? [formData.service] : [],
          message: formData.message,
          budget: formData.budget,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        setErrorMsg(data.message || "Something went wrong.");
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
    color: TOKENS.colors.accentRedSoft,
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
      }}
    >
      {/* ── Contact top ───────────────────────────────────── */}
      <div style={shell}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
          style={{
            fontSize: "10px",
            color: TOKENS.colors.accentRedSoft,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "clamp(16px, 2vw, 24px)",
          }}
        >
          Let&apos;s Work Together
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease, delay: 0.07 }}
          style={{
            fontSize: TOKENS.type.h2Fluid,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: TOKENS.colors.textPrimary,
            marginBottom: "clamp(36px, 5vw, 56px)",
          }}
        >
          Contact
          <span style={{ color: TOKENS.colors.textMuted20 }}> Us.</span>
        </motion.h2>

        {/* Two-column bottom: copy+button | links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease, delay: 0.14 }}
          className="grid grid-cols-1 lg:grid-cols-2 items-start"
          style={{ gap: "clamp(40px, 6vw, 80px)" }}
        >
          {/* Left — paragraph + button */}
          <div>
            <p
              style={{
                fontSize: "16px",
                color: TOKENS.colors.textMuted40,
                lineHeight: 1.8,
                marginBottom: "clamp(28px, 3.5vw, 40px)",
                maxWidth: "46ch",
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
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
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
                    borderTop: i === 0 ? `1px solid ${TOKENS.colors.textMuted10}` : "none",
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
                    className="contact-form-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "clamp(32px, 6vw, 88px)",
                      alignItems: "start",
                    }}
                  >
                    {/* ── Left col ── */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "clamp(20px, 2.5vw, 28px)",
                      }}
                    >
                      <h3
                        style={{
                          fontSize: "clamp(20px, 2.4vw, 30px)",
                          fontWeight: 700,
                          lineHeight: 1.1,
                          letterSpacing: "-0.01em",
                          textTransform: "uppercase",
                          color: TOKENS.colors.textPrimary,
                        }}
                      >
                        Tell Us About
                        <br />
                        Your Project
                      </h3>

                      {/* First + Last */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div>
                          <label style={labelStyle}>First Name</label>
                          <input
                            type="text"
                            placeholder="Alex"
                            required
                            className="contact-input"
                            value={formData.firstName}
                            onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                            style={inputStyle}
                            onFocus={focusRed}
                            onBlur={blurReset}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Last Name</label>
                          <input
                            type="text"
                            placeholder="Johnson"
                            className="contact-input"
                            value={formData.lastName}
                            onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                            style={inputStyle}
                            onFocus={focusRed}
                            onBlur={blurReset}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label style={labelStyle}>Email Address</label>
                        <input
                          type="email"
                          placeholder="alex@company.com"
                          required
                          className="contact-input"
                          value={formData.email}
                          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                          style={inputStyle}
                          onFocus={focusRed}
                          onBlur={blurReset}
                        />
                      </div>

                      {/* Message */}
                      <div>
                        <label style={labelStyle}>Tell Us About Your Project</label>
                        <textarea
                          placeholder="What are you building, who is it for, and when do you need it?"
                          required
                          rows={7}
                          className="contact-textarea"
                          value={formData.message}
                          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                          style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65, minHeight: "148px" }}
                          onFocus={focusRed}
                          onBlur={blurReset}
                        />
                      </div>
                    </div>

                    {/* ── Right col ── */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "clamp(20px, 2.5vw, 28px)",
                      }}
                    >
                      {/* Spacer — aligns first dropdown with first input on left */}
                      <div style={{ height: "clamp(46px, 5.5vw, 68px)" }} aria-hidden="true" />

                      {/* Service */}
                      <div>
                        <label style={labelStyle}>Service Interested In</label>
                        <div style={{ position: "relative" }}>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                            className="contact-select"
                            style={{
                              ...inputStyle,
                              appearance: "none",
                              WebkitAppearance: "none",
                              cursor: "pointer",
                              paddingRight: "44px",
                              color: formData.service ? TOKENS.colors.textPrimary : "rgba(255,255,255,0.3)",
                            }}
                            onFocus={focusRed}
                            onBlur={blurReset}
                          >
                            <option value="" disabled>Select a service</option>
                            {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <Chevron />
                        </div>
                      </div>

                      {/* Budget */}
                      <div>
                        <label style={labelStyle}>Budget Range</label>
                        <div style={{ position: "relative" }}>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData((p) => ({ ...p, budget: e.target.value }))}
                            className="contact-select"
                            style={{
                              ...inputStyle,
                              appearance: "none",
                              WebkitAppearance: "none",
                              cursor: "pointer",
                              paddingRight: "44px",
                              color: formData.budget ? TOKENS.colors.textPrimary : "rgba(255,255,255,0.3)",
                            }}
                            onFocus={focusRed}
                            onBlur={blurReset}
                          >
                            <option value="" disabled>Select a budget</option>
                            {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                          </select>
                          <Chevron />
                        </div>
                      </div>

                      {/* Error */}
                      <AnimatePresence>
                        {status === "error" && errorMsg && (
                          <motion.p
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            style={{ fontSize: "13px", color: "#f87171", marginTop: "-8px" }}
                          >
                            {errorMsg}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        style={{
                          width: "100%",
                          padding: "19px 32px",
                          backgroundColor: "#ffffff",
                          color: "#000000",
                          border: "none",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: 700,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          cursor: status === "loading" ? "wait" : "pointer",
                          opacity: status === "loading" ? 0.6 : 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          fontFamily: "inherit",
                          transition: "opacity 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          status !== "loading" && (e.currentTarget.style.opacity = "0.85")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.opacity = status === "loading" ? "0.6" : "1")
                        }
                      >
                        {status === "loading" ? (
                          "Sending…"
                        ) : (
                          <>
                            Send Message
                            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p style={{ fontSize: "13px", color: TOKENS.colors.textMuted35, lineHeight: 1.65 }}>
                        We respond to every inquiry within one business day.
                      </p>
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
