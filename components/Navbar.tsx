"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOKENS } from "../styles/tokens";


type MenuItem = {
  label: string;
  href: string;
};

const menuItems: MenuItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);

  // Show navbar only when scrolled within the hero (100vh)
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY < heroHeight - 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navPadding = { paddingInline: TOKENS.spacing.shellX };
  const menuPadding = { paddingInline: TOKENS.spacing.shellX };

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyTouchAction = document.body.style.touchAction;

    if (open) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.touchAction = previousBodyTouchAction;
    };
  }, [open]);

  const handleMenuClick = () => {
    closeMenu();
  };

  return (
    <>
      <motion.nav
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between"
        style={{ ...navPadding, pointerEvents: visible ? "auto" : "none" }}
      >
        <span style={{ fontSize: "17px", fontWeight: 600, letterSpacing: "0.01em", color: TOKENS.colors.textPrimary }}>
          Summit Studio<span style={{ color: TOKENS.colors.accentRed }}>.</span>
        </span>

        <button
          onClick={() => setOpen(true)}
          className="flex flex-col gap-[5px] text-white cursor-pointer"
          aria-label="Open menu"
        >
          <span className="block h-[1.5px] w-[22px] bg-current" />
          <span className="block h-[1.5px] w-[22px] bg-current" />
          <span className="block h-[1.5px] w-[22px] bg-current" />
        </button>
      </motion.nav>

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Blurred backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 backdrop-blur-sm"
              style={{ backgroundColor: TOKENS.colors.overlay20 }}
              onClick={closeMenu}
            />

            {/* Menu panel slides from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
              className="fixed top-0 right-0 h-full w-full overflow-hidden md:w-[50%] lg:w-[40%] z-50"
              style={{ backgroundColor: TOKENS.colors.background }}
            >
              {/* Close button */}
              <div className="absolute right-0 top-0 z-10 flex h-14 items-center justify-end" style={navPadding}>
                <button
                  onClick={closeMenu}
                  className="text-white/50 hover:text-white transition-colors duration-200 cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 3L17 17M17 3L3 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex h-full flex-col justify-center gap-6" style={menuPadding}>
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={handleMenuClick}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                    className="group relative pb-4 pt-1 text-3xl font-bold tracking-tight md:text-4xl"
                    style={{ color: TOKENS.colors.textPrimary }}
                  >
                    <span className="relative z-10 inline-block group-hover:translate-x-2 transition-transform duration-300">
                      {item.label}
                    </span>
                    <span
                      className="pointer-events-none absolute bottom-0 left-0 h-px w-0 transition-all duration-500 group-hover:w-full"
                      style={{ backgroundColor: TOKENS.colors.accentRed }}
                    />
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
