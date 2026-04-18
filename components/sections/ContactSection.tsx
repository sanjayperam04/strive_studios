"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TOKENS } from "../../styles/tokens";

const SERVICES = [
  "Website Design",
  "Development",
  "Branding",
  "UI/UX",
  "Other",
];

const INFO_ROWS = [
  { label: "Response time", value: "Within 24 hours" },
  { label: "Scope", value: "Websites · Brand systems · Product" },
  {
    label: "Email",
    value: "hello@strivestudios.co",
    href: "mailto:hello@strivestudios.co",
  },
];

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: easeOut, delay },
  };
}

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-10%" });

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    services: [] as string[],
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggle = (s: string) =>
    setFormData((p) => ({
      ...p,
      services: p.services.includes(s)
        ? p.services.filter((x) => x !== s)
        : [...p.services, s],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          services: formData.services,
          message: formData.message,
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        backgroundColor: TOKENS.colors.background,
        paddingLeft: TOKENS.spacing.shellX,
        paddingRight: TOKENS.spacing.shellX,
        paddingBottom: TOKENS.spacing.sectionBottomLg,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "60vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.025) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* ── Top label ── */}
        <motion.p
          {...fadeUp(0)}
          animate={inView ? fadeUp(0).animate : fadeUp(0).initial}
          style={{
            color: TOKENS.colors.textMuted35,
            fontSize: "11px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: "28px",
            textAlign: "center",
          }}
        >
          Let&apos;s work together
        </motion.p>

        {/* ── Headline ── */}
        <div>
          <div
            className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-16 md:gap-24"
            style={{ alignItems: "start" }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <motion.h2
                {...fadeUp(0.1)}
                animate={inView ? fadeUp(0.1).animate : fadeUp(0.1).initial}
                style={{
                  fontSize: "clamp(48px, 7vw, 108px)",
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: TOKENS.colors.textPrimary,
                  marginBottom: "clamp(48px, 6vw, 96px)",
                }}
              >
                Start a
                <br />
                <span style={{ color: TOKENS.colors.textMuted20 }}>
                  project.
                </span>
              </motion.h2>

              {/* Left — info */}
              <motion.div
                {...fadeUp(0.2)}
                animate={inView ? fadeUp(0.2).animate : fadeUp(0.2).initial}
                style={{ width: "100%" }}
              >
                {/* Availability badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    border: `1px solid ${TOKENS.colors.textMuted10}`,
                    borderRadius: TOKENS.radius.pill,
                    padding: "8px 16px",
                    marginBottom: "clamp(32px, 4vw, 48px)",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#4ade80",
                      display: "inline-block",
                      boxShadow: "0 0 6px #4ade80",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: TOKENS.colors.textMuted40,
                      letterSpacing: "0.08em",
                    }}
                  >
                    Accepting new projects
                  </span>
                </div>

                {/* Info rows */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  {INFO_ROWS.map((row, i) => (
                    <motion.div
                      key={row.label}
                      {...fadeUp(0.25 + i * 0.07)}
                      animate={
                        inView
                          ? fadeUp(0.25 + i * 0.07).animate
                          : fadeUp(0.25 + i * 0.07).initial
                      }
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "16px",
                        padding: "18px 0",
                        borderTop:
                          i === 0
                            ? `1px solid ${TOKENS.colors.textMuted10}`
                            : "none",
                        borderBottom: `1px solid ${TOKENS.colors.textMuted10}`,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          color: TOKENS.colors.textMuted35,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          flexShrink: 0,
                        }}
                      >
                        {row.label}
                      </span>
                      {row.href ? (
                        <a
                          href={row.href}
                          style={{
                            fontSize: "14px",
                            color: TOKENS.colors.textNearWhite,
                            textAlign: "right",
                            textDecoration: "none",
                          }}
                          className="hover:opacity-70 transition-opacity"
                        >
                          {row.value}
                        </a>
                      ) : (
                        <span
                          style={{
                            fontSize: "14px",
                            color: TOKENS.colors.textNearWhite,
                            textAlign: "right",
                          }}
                        >
                          {row.value}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Socials */}
                <motion.div
                  {...fadeUp(0.5)}
                  animate={inView ? fadeUp(0.5).animate : fadeUp(0.5).initial}
                  style={{ display: "flex", gap: "10px", marginTop: "32px" }}
                >
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      style={{
                        color: TOKENS.colors.textMuted40,
                        border: `1px solid ${TOKENS.colors.textMuted10}`,
                        borderRadius: "10px",
                        padding: "10px",
                        display: "inline-flex",
                        transition: "color 0.2s, border-color 0.2s",
                      }}
                      className="hover:!text-white hover:!border-white/30"
                    >
                      {s.icon}
                    </a>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Right — form aligned with headline */}
            <motion.div
              {...fadeUp(0.3)}
              animate={inView ? fadeUp(0.3).animate : fadeUp(0.3).initial}
              style={{ alignSelf: "start" }}
            >
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: easeOut }}
                    style={{
                      border: `1px solid ${TOKENS.colors.textMuted10}`,
                      borderRadius: TOKENS.radius.card,
                      padding: "clamp(28px, 3.5vw, 48px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                      alignItems: "center",
                      minHeight: "100%",
                      height: "640px",
                      justifyContent: "center",
                      textAlign: "center",
                      background: "rgba(255,255,255,0.01)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "50%",
                        background: "rgba(74, 222, 128, 0.1)",
                        border: "1px solid rgba(74, 222, 128, 0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M4 10l4 4 8-8"
                          stroke="#4ade80"
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
                        textAlign: "center",
                      }}
                    >
                      Message sent.
                    </h3>
                    <p
                      style={{
                        color: TOKENS.colors.textMuted40,
                        fontSize: "15px",
                        lineHeight: 1.65,
                        maxWidth: "36ch",
                      }}
                    >
                      Thanks for reaching out. We&apos;ll review your project
                      and get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={false}
                    style={{
                      border: `1px solid ${TOKENS.colors.textMuted10}`,
                      borderRadius: TOKENS.radius.card,
                      padding: "clamp(28px, 3.5vw, 48px)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "28px",
                      background: "rgba(255,255,255,0.01)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    {/* Name + Company */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <Field label="Name" required>
                        <Input
                          name="name"
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(v) =>
                            setFormData((p) => ({ ...p, name: v }))
                          }
                          required
                        />
                      </Field>
                      <Field label="Company">
                        <Input
                          name="company"
                          placeholder="Optional"
                          value={formData.company}
                          onChange={(v) =>
                            setFormData((p) => ({ ...p, company: v }))
                          }
                        />
                      </Field>
                    </div>

                    {/* Email */}
                    <Field label="Email" required>
                      <Input
                        name="email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(v) =>
                          setFormData((p) => ({ ...p, email: v }))
                        }
                        required
                      />
                    </Field>

                    {/* Services */}
                    <div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: TOKENS.colors.textMuted35,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          marginBottom: "14px",
                        }}
                      >
                        What do you need?
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "8px",
                        }}
                      >
                        {SERVICES.map((s) => {
                          const active = formData.services.includes(s);
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => toggle(s)}
                              style={{
                                fontSize: "13px",
                                padding: "7px 16px",
                                borderRadius: TOKENS.radius.pill,
                                border: `1px solid ${active ? TOKENS.colors.textPrimary : TOKENS.colors.textMuted10}`,
                                background: active
                                  ? TOKENS.colors.textPrimary
                                  : "transparent",
                                color: active
                                  ? TOKENS.colors.textInverse
                                  : TOKENS.colors.textMuted40,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                fontWeight: active ? 600 : 400,
                              }}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <Field label="Tell us more" required>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="Describe your project, goals, timeline…"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            message: e.target.value,
                          }))
                        }
                        style={{
                          width: "100%",
                          background: "transparent",
                          border: "none",
                          borderBottom: `1px solid ${TOKENS.colors.textMuted10}`,
                          color: TOKENS.colors.textPrimary,
                          fontSize: "16px",
                          lineHeight: 1.6,
                          padding: "6px 0 12px",
                          outline: "none",
                          resize: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) =>
                          (e.currentTarget.style.borderBottomColor =
                            "rgba(255,255,255,0.4)")
                        }
                        onBlur={(e) =>
                          (e.currentTarget.style.borderBottomColor =
                            TOKENS.colors.textMuted10)
                        }
                      />
                    </Field>

                    {/* Error */}
                    <AnimatePresence>
                      {status === "error" && errorMsg && (
                        <motion.p
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          style={{
                            fontSize: "13px",
                            color: "#f87171",
                            marginTop: "-12px",
                          }}
                        >
                          {errorMsg}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "4px",
                      }}
                    >
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="group"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          background: "none",
                          border: "none",
                          cursor: status === "loading" ? "wait" : "pointer",
                          padding: 0,
                          opacity: status === "loading" ? 0.5 : 1,
                          transition: "opacity 0.2s",
                        }}
                      >
                        <span
                          style={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: TOKENS.colors.textPrimary,
                            position: "relative",
                          }}
                          className="after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full"
                        >
                          {status === "loading" ? "Sending…" : "Send message"}
                        </span>
                        <div
                          style={{
                            width: "42px",
                            height: "42px",
                            borderRadius: "50%",
                            border: `1px solid ${TOKENS.colors.textMuted20}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "background 0.2s, border-color 0.2s",
                            flexShrink: 0,
                          }}
                          className="group-hover:!bg-white group-hover:!border-white"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            className="group-hover:[&>path]:stroke-black transition-all"
                          >
                            <path
                              d="M3 8H13M13 8L8 3M13 8L8 13"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Small helpers ── */

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        style={{
          fontSize: "11px",
          color: TOKENS.colors.textMuted35,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        {label}
        {required && (
          <span style={{ color: TOKENS.colors.textMuted20 }}> *</span>
        )}
      </p>
      {children}
    </div>
  );
}

function Input({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      required={required}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: "transparent",
        border: "none",
        borderBottom: `1px solid ${TOKENS.colors.textMuted10}`,
        color: TOKENS.colors.textPrimary,
        fontSize: "16px",
        lineHeight: 1.2,
        padding: "6px 0 12px",
        outline: "none",
        transition: "border-color 0.2s",
      }}
      onFocus={(e) =>
        (e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.4)")
      }
      onBlur={(e) =>
        (e.currentTarget.style.borderBottomColor = TOKENS.colors.textMuted10)
      }
    />
  );
}
