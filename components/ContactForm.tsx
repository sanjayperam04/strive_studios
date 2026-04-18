"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const serviceOptions = [
  "Website Design",
  "Development",
  "Branding",
  "UI/UX",
  "Motion Design",
  "Other",
];

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    services: [] as string[],
    message: "",
  });

  const toggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[60]"
            onClick={onClose}
          />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-full md:w-[60%] bg-[#0c0c0c] z-[70] overflow-y-auto"
            >
              {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/40 transition-all z-10"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <div className="px-12 md:px-16 pt-24 pb-20 flex flex-col h-full">

              {/* Header */}
              <div className="mb-16">
                <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-5">Get in touch</p>
                <h2 className="text-white text-4xl font-bold leading-tight">
                  Have a project in mind?<br />Let&apos;s make it happen.
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-14">

                {/* Name + Company */}
                <div className="grid grid-cols-2 gap-10">
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-widest mb-4 block">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-transparent border-b border-white/15 pb-4 text-white text-base placeholder-white/25 focus:border-white/50 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-white/40 text-xs uppercase tracking-widest mb-4 block">Company</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Your company"
                      className="w-full bg-transparent border-b border-white/15 pb-4 text-white text-base placeholder-white/25 focus:border-white/50 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-4 block">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full bg-transparent border-b border-white/15 pb-4 text-white text-base placeholder-white/25 focus:border-white/50 focus:outline-none transition-colors"
                  />
                </div>

                {/* Services — pill toggles */}
                <div>
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-5 block">What do you need?</label>
                  <div className="flex flex-wrap gap-3">
                    {serviceOptions.map((service) => {
                      const active = formData.services.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-5 py-2.5 rounded-full text-sm transition-all border ${
                            active
                              ? "bg-white text-black border-white"
                              : "bg-transparent text-white/60 border-white/20 hover:border-white/40 hover:text-white"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div className="flex-1 flex flex-col">
                  <label className="text-white/40 text-xs uppercase tracking-widest mb-4 block">Tell us more</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, goals, timeline..."
                    className="w-full flex-1 min-h-[140px] bg-transparent border-b border-white/15 pb-4 text-white text-base placeholder-white/25 focus:border-white/50 focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="submit"
                    className="group flex items-center gap-4 text-white"
                  >
                    <span className="text-xl font-semibold relative">
                      Send message
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
                    </span>
                    <div className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:[&>path]:stroke-black transition-all">
                        <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  <div className="text-right">
                    <p className="text-white/30 text-xs mb-2">Not ready yet?</p>
                    <a
                      href="mailto:hello@strivestudios.co"
                      className="text-white/50 hover:text-white text-sm transition-colors underline underline-offset-4"
                    >
                      hello@strivestudios.co
                    </a>
                  </div>
                </div>

              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
