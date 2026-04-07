"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    services: [] as string[],
    message: "",
  });

  const serviceOptions = [
    "Product Design",
    "UI/UX",
    "Illustration/Graphics",
    "Other / Not yet sure",
    "Branding",
    "Motion Design",
    "Development",
  ];

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
            className="fixed inset-0 bg-black/50 backdrop-blur-lg z-[60]"
            onClick={onClose}
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 h-full w-full md:w-[45%] bg-[#0a0a0a] z-[70] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/15 transition-all z-10"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Form Content */}
            <div className="px-10 py-12 h-full flex flex-col">
              {/* Header */}
              <div className="mb-12">
                <h2 className="text-white text-[28px] font-semibold leading-tight">
                  Get in touch to find out<br />how we can collaborate.
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                {/* Name and Company Row */}
                <div className="grid grid-cols-2 gap-5 mb-10">
                  <div>
                    <label className="text-white text-sm mb-3 block">
                      Your Full Name <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 rounded-full px-5 py-3.5 pr-12 text-white text-sm placeholder-white/40 focus:border-white/40 focus:bg-white/[0.08] focus:outline-none transition-all"
                        placeholder="Ilya Renn"
                      />
                      {formData.fullName && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="text-white text-sm mb-3 block">
                      Your Company <span className="text-blue-400">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full bg-white/5 border border-white/20 rounded-full px-5 py-3.5 pr-12 text-white text-sm placeholder-white/40 focus:border-white/40 focus:bg-white/[0.08] focus:outline-none transition-all"
                        placeholder="UIB Internal"
                      />
                      {formData.company && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-10">
                  <label className="text-white text-sm mb-3 block">
                    Email Address <span className="text-blue-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/20 rounded-full px-5 py-3.5 pr-12 text-white text-sm placeholder-white/40 focus:border-white/40 focus:bg-white/[0.08] focus:outline-none transition-all"
                      placeholder="ilya@uib.net"
                    />
                    {formData.email && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Type of Work */}
                <div className="mb-10">
                  <label className="text-white text-sm mb-2 block">
                    Type of Work <span className="text-blue-400">*</span>
                  </label>
                  <p className="text-white/50 text-xs mb-5">(Pick the areas you'd like to explore with us)</p>
                  
                  <div className="space-y-3">
                    {serviceOptions.map((service) => (
                      <label
                        key={service}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={formData.services.includes(service)}
                            onChange={() => toggleService(service)}
                            className="sr-only"
                          />
                          <div
                            className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                              formData.services.includes(service)
                                ? "bg-blue-500 border-blue-500"
                                : "border-white/40 group-hover:border-white/60"
                            }`}
                          >
                            {formData.services.includes(service) && (
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className="text-white text-sm group-hover:text-white/80 transition-colors">
                          {service}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="mb-10 flex-1 flex flex-col">
                  <label className="text-white text-sm mb-3 block">
                    Tell us about your project
                  </label>
                  <div className="relative flex-1 flex flex-col">
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full flex-1 min-h-[140px] bg-white/5 border border-white/20 rounded-3xl px-5 py-4 pr-12 text-white text-sm placeholder-white/40 focus:border-white/40 focus:bg-white/[0.08] focus:outline-none transition-all resize-none"
                      placeholder="Hey!"
                    />
                    {formData.message && (
                      <div className="absolute right-4 top-4 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Section */}
                <div className="flex items-center justify-between pt-6">
                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="bg-white text-black font-semibold px-9 py-3.5 rounded-full hover:bg-white/90 transition-all text-sm"
                    >
                      Submit
                    </button>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-white/90 transition-all cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <path d="M3 9H15M15 9L9 3M15 9L9 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-white/40 text-xs">Not yet sure?</span>
                    <a 
                      href="mailto:hello@strivestudios.co" 
                      className="text-white/70 hover:text-white text-sm border border-white/30 px-6 py-2 rounded-full hover:border-white/50 transition-all"
                    >
                      Book an intro call
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
