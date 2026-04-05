"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = ["Home", "About", "Work", "Contact"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top black bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black flex items-center justify-between px-6 md:px-10 h-12">
        <span className="text-white text-sm font-normal">
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
              className="fixed top-0 right-0 h-full w-full md:w-[55%] lg:w-[45%] bg-white z-50 flex flex-col justify-between py-10 px-12"
            >
              {/* Close button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setOpen(false)}
                  className="w-10 h-10 rounded-full bg-black flex items-center justify-center hover:scale-95 transition-transform"
                  aria-label="Close menu"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* Nav links — stacked vertically */}
              <nav className="flex flex-col gap-2 mt-8">
                {menuItems.map((item, i) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                    className="menu-link text-black text-4xl md:text-5xl font-light tracking-tight hover:opacity-60 transition-opacity py-2"
                  >
                    {item}
                  </motion.a>
                ))}
              </nav>

              {/* Footer info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-2 gap-4 text-black/60 text-sm"
              >
                <div className="flex flex-col gap-1">
                  <span>Instagram</span>
                  <span>LinkedIn</span>
                  <span>Dribbble</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span>hello@strivestudios.co</span>
                  <span>+1 (406) 555-0120</span>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
