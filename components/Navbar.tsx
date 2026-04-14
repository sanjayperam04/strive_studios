"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TOKENS } from "../styles/tokens";

interface NavbarProps {
  onContactClick?: () => void;
}

type MenuItem = {
  label: string;
  href: string;
  isContact?: boolean;
};

const menuItems: MenuItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About us", href: "#about-us" },
  { label: "Contact", href: "#contact", isContact: true },
];

export default function Navbar({ onContactClick }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const shellStyle = { paddingInline: TOKENS.spacing.shellX };
  const menuLabelStyle = { color: TOKENS.colors.textPrimary };
  const menuMetaLabelStyle = { color: TOKENS.colors.textMuted40 };
  const menuLinkStyle = { color: TOKENS.colors.textPrimary };
  const menuFooterLinkStyle = { color: TOKENS.colors.textMuted40 };

  const closeMenu = () => setOpen(false);

  const handleMenuClick = (item: MenuItem) => {
    if (item.isContact && onContactClick) {
      onContactClick();
      closeMenu();
    } else {
      closeMenu();
    }
  };

  return (
    <>
      {/* Top black bar */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between"
        style={{ backgroundColor: TOKENS.colors.background, ...shellStyle }}
      >
        <span className="text-base font-medium" style={menuLabelStyle}>
          Strive Studios
        </span>

        {/* Hamburger — white circle, three lines */}
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-95 transition-transform"
          style={{ backgroundColor: TOKENS.colors.textPrimary }}
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-[4px]">
            <span className="block w-[14px] h-[1.5px]" style={{ backgroundColor: TOKENS.colors.textInverse }} />
            <span className="block w-[14px] h-[1.5px]" style={{ backgroundColor: TOKENS.colors.textInverse }} />
            <span className="block w-[14px] h-[1.5px]" style={{ backgroundColor: TOKENS.colors.textInverse }} />
          </span>
        </button>
      </nav>

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
              className="fixed top-0 right-0 h-full w-full md:w-[50%] lg:w-[40%] z-50 flex flex-col"
              style={{ backgroundColor: TOKENS.colors.background }}
            >
              {/* Top bar with close button */}
              <div className="flex h-16 items-center justify-between border-b" style={{ borderColor: TOKENS.colors.textMuted10, ...shellStyle }}>
                <span className="text-base font-medium" style={menuLabelStyle}>Menu</span>
                <button
                  onClick={closeMenu}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-95 transition-transform"
                  style={{ backgroundColor: TOKENS.colors.textPrimary }}
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke={TOKENS.colors.textInverse} strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-1 flex-col justify-center gap-6" style={shellStyle}>
                {menuItems.map((item, i) => (
                  item.isContact ? (
                    <motion.button
                      key={item.label}
                      onClick={() => handleMenuClick(item)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                      className="group relative py-2 text-left text-3xl font-bold tracking-tight md:text-4xl"
                      style={menuLinkStyle}
                    >
                      <span className="relative z-10 inline-block group-hover:translate-x-2 transition-transform duration-300">
                        {item.label}
                      </span>
                      <span
                        className="absolute left-0 bottom-2 h-px w-0 transition-all duration-500 group-hover:w-full"
                        style={{ backgroundColor: TOKENS.colors.textMuted30 }}
                      />
                    </motion.button>
                  ) : (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => handleMenuClick(item)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                      className="group relative py-2 text-3xl font-bold tracking-tight md:text-4xl"
                      style={menuLinkStyle}
                    >
                      <span className="relative z-10 inline-block group-hover:translate-x-2 transition-transform duration-300">
                        {item.label}
                      </span>
                      <span
                        className="absolute left-0 bottom-2 h-px w-0 transition-all duration-500 group-hover:w-full"
                        style={{ backgroundColor: TOKENS.colors.textMuted30 }}
                      />
                    </motion.a>
                  )
                ))}
              </nav>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="border-t py-8"
                style={{ borderColor: TOKENS.colors.textMuted10, ...shellStyle }}
              >
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <span className="mb-1 text-xs uppercase tracking-wider" style={menuMetaLabelStyle}>Social</span>
                    <a href="#" className="text-sm transition-colors hover:text-white" style={menuFooterLinkStyle}>Instagram</a>
                    <a href="#" className="text-sm transition-colors hover:text-white" style={menuFooterLinkStyle}>LinkedIn</a>
                    <a href="mailto:hello@strivestudios.co" className="text-sm transition-colors hover:text-white" style={menuFooterLinkStyle}>Mail</a>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="mb-1 text-xs uppercase tracking-wider" style={menuMetaLabelStyle}>Contact</span>
                    <a href="mailto:hello@strivestudios.co" className="text-sm transition-colors hover:text-white" style={menuFooterLinkStyle}>hello@strivestudios.co</a>
                    <a href="tel:+14065550120" className="text-sm transition-colors hover:text-white" style={menuFooterLinkStyle}>+1 (406) 555-0120</a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
