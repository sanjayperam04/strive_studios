"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function SiteFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        paddingTop: "clamp(100px, 12vw, 180px)",
        paddingBottom: "clamp(40px, 4vw, 60px)",
        paddingInline: "clamp(24px, 5vw, 80px)",
        backgroundColor: "#0a0a0a",
        color: "#ffffff"
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        
        <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", width: "100%" }} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4" style={{ gap: "48px", paddingTop: "60px", paddingBottom: "80px" }}>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
              Summit Studio<span style={{ color: "#c0392b" }}>.</span>
            </div>
            <div style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(255, 255, 255, 0.35)", maxWidth: "280px" }}>
              Bold digital experiences for ambitious brands that refuse to blend in.
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.35)", marginBottom: "20px" }}>
              Navigation
            </div>
            <div>
              {footerLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href}
                  style={{ 
                    fontSize: "14px", 
                    color: "rgba(255, 255, 255, 0.5)", 
                    textDecoration: "none", 
                    marginBottom: "12px", 
                    display: "block",
                    transition: "color 0.3s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "white"}
                  onMouseOut={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)"}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.35)", marginBottom: "20px" }}>
              Social
            </div>
            <div>
              {socialLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href}
                  style={{ 
                    fontSize: "14px", 
                    color: "rgba(255, 255, 255, 0.5)", 
                    textDecoration: "none", 
                    marginBottom: "12px", 
                    display: "block",
                    transition: "color 0.3s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = "white"}
                  onMouseOut={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)"}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255, 255, 255, 0.35)", marginBottom: "20px" }}>
              Contact
            </div>
            <div>
              <a 
                href="mailto:hello@summitstudios.co"
                style={{ 
                  fontSize: "14px", 
                  color: "rgba(255, 255, 255, 0.5)", 
                  textDecoration: "none",
                  display: "block",
                  transition: "color 0.3s"
                }}
                onMouseOver={(e) => e.currentTarget.style.color = "white"}
                onMouseOut={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)"}
              >
                hello@summitstudios.co
              </a>
              <div style={{ fontSize: "14px", color: "rgba(255, 255, 255, 0.3)", marginTop: "8px" }}>
                Chennai & Bangalore, India
              </div>
            </div>
          </div>
        </div>
        
        <div 
          style={{ 
            textAlign: "center", 
            paddingBlock: "clamp(40px, 6vw, 80px)",
            fontSize: "clamp(48px, 10vw, 160px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "rgba(255, 255, 255, 0.04)",
            userSelect: "none"
          }}
        >
          Summit Studio<span style={{ color: "#c0392b" }}>.</span>
        </div>
        
        <div style={{ height: "1px", backgroundColor: "rgba(255, 255, 255, 0.08)", width: "100%" }} />
        
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "24px", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.25)" }}>
            © 2025 Summit Studio. All rights reserved.
          </div>
          <button 
            onClick={scrollToTop}
            style={{ 
              fontSize: "13px", 
              color: "rgba(255, 255, 255, 0.35)", 
              background: "none", 
              border: "none", 
              cursor: "pointer",
              transition: "color 0.3s"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = "white"}
            onMouseOut={(e) => e.currentTarget.style.color = "rgba(255, 255, 255, 0.35)"}
          >
            Back to Top ↑
          </button>
        </div>
        
      </div>
    </footer>
  );
}
