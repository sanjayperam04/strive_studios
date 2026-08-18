"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="flex items-center justify-between"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: "64px",
          paddingInline: "clamp(24px, 5vw, 80px)",
          background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid transparent",
          transition: "all 0.3s ease",
        }}
      >
        <div className="flex items-center" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.01em", color: "#ffffff" }}>
          Summit Studio
          <span style={{ color: "#c0392b", marginLeft: "2px" }}>.</span>
        </div>
        <button
          onClick={() => setMenuOpen(true)}
          style={{
            fontSize: "13px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(255, 255, 255, 0.6)",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
          }}
        >
          Menu
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 40,
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
              }}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                height: "100%",
                width: "max(400px, 45%)",
                maxWidth: "100%",
                background: "#0a0a0a",
                zIndex: 50,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                paddingInline: "clamp(24px, 5vw, 80px)",
              }}
            >
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  position: "absolute",
                  top: "22px",
                  right: "clamp(24px, 5vw, 80px)",
                  fontSize: "13px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "rgba(255, 255, 255, 0.6)",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  padding: 0,
                }}
              >
                Close
              </button>
              <div className="flex flex-col" style={{ width: "100%" }}>
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                    whileHover={{ x: 8, color: "#c0392b", transition: { duration: 0.3 } }}
                    style={{
                      fontSize: "clamp(32px, 5vw, 48px)",
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: "#ffffff",
                      textDecoration: "none",
                      paddingBlock: "24px",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "block",
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
