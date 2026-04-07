"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onContactClick?: () => void;
}

const menuItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About us", href: "#about-us" },
  { label: "Contact", href: "#contact", isContact: true },
];

export default function Navbar({ onContactClick }: NavbarProps) {
  const [open, setOpen] = useState(false);

  const handleMenuClick = (item: typeof menuItems[0]) => {
    if (item.isContact && onContactClick) {
      onContactClick();
      setOpen(false);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Top black bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black flex items-center justify-between px-6 md:px-10 h-16">
        <span className="text-white text-base font-medium ml-4">
          Strive Studios
        </span>

        {/* Hamburger — white circle, three lines */}
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:scale-95 transition-transform"
          aria-label="Open menu"
        >
          <span className="flex flex-col gap-[4px]">
            <span className="block w-[14px] h-[1.5px] bg-black" />
            <span className="block w-[14px] h-[1.5px] bg-black" />
            <span className="block w-[14px] h-[1.5px] bg-black" />
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
              className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20"
              onClick={() => setOpen(false)}
            />

            {/* Menu panel slides from right */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.76, 0, 0.24, 1], duration: 0.5 }}
              className="fixed top-0 right-0 h-full w-full md:w-[50%] lg:w-[40%] bg-black z-50 flex flex-col"
            >
              {/* Top bar with close button */}
              <div className="flex items-center justify-between px-8 md:px-12 h-16 border-b border-white/10">
                <span className="text-white text-base font-medium">Menu</span>
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-95 transition-transform"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center px-8 md:px-12 gap-6">
                {menuItems.map((item, i) => (
                  item.isContact ? (
                    <motion.button
                      key={item.label}
                      onClick={() => handleMenuClick(item)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                      className="group text-white text-5xl md:text-6xl font-bold tracking-tight py-3 relative text-left"
                    >
                      <span className="relative z-10 inline-block group-hover:translate-x-2 transition-transform duration-300">
                        {item.label}
                      </span>
                      <span className="absolute left-0 bottom-2 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-500" />
                    </motion.button>
                  ) : (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => handleMenuClick(item)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                      className="group text-white text-5xl md:text-6xl font-bold tracking-tight py-3 relative"
                    >
                      <span className="relative z-10 inline-block group-hover:translate-x-2 transition-transform duration-300">
                        {item.label}
                      </span>
                      <span className="absolute left-0 bottom-2 w-0 h-px bg-white/30 group-hover:w-full transition-all duration-500" />
                    </motion.a>
                  )
                ))}
              </nav>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="px-8 md:px-12 py-8 border-t border-white/10"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <span className="text-white/40 text-xs uppercase tracking-wider mb-1">Social</span>
                    <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Instagram</a>
                    <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">LinkedIn</a>
                    <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Dribbble</a>
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="text-white/40 text-xs uppercase tracking-wider mb-1">Contact</span>
                    <a href="mailto:hello@strivestudios.co" className="text-white/60 hover:text-white text-sm transition-colors">hello@strivestudios.co</a>
                    <a href="tel:+14065550120" className="text-white/60 hover:text-white text-sm transition-colors">+1 (406) 555-0120</a>
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
