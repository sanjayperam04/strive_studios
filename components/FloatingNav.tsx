"use client";

import { useEffect, useState } from "react";

interface FloatingNavProps {
  onContactClick?: () => void;
}

type MenuItem = {
  label: string;
  href: string;
  isContact?: boolean;
};

const menuItems: MenuItem[] = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About us", href: "#about-us" },
  { label: "Contact", href: "#contact", isContact: true },
];

export default function FloatingNav({ onContactClick }: FloatingNavProps) {
  const [activeHash, setActiveHash] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const syncHash = () => {
      setActiveHash(window.location.hash || "");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => {
      window.removeEventListener("hashchange", syncHash);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isItemActive = (item: MenuItem) => {
    if (item.isContact) return false;
    return activeHash === item.href;
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.isContact && onContactClick) {
      onContactClick();
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: "14px",
        left: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 16px",
        borderRadius: "14px",
        backgroundColor: isScrolled ? "rgba(8, 8, 8, 0.66)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
        border: isScrolled ? "1px solid rgba(255,255,255,0.14)" : "1px solid transparent",
        boxShadow: isScrolled ? "0 10px 28px rgba(0,0,0,0.30)" : "none",
        transition: "all 220ms ease",
      }}
    >
      <span style={{ color: "white", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Summit Studios
      </span>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", justifyContent: "flex-end" }}>
        {menuItems.map((item) =>
          item.isContact ? (
            <button
              key={item.label}
              onClick={() => handleMenuClick(item)}
              type="button"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: "999px",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                opacity: 0.96,
                padding: "8px 12px",
                transition: "all 180ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              {item.label}
            </button>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={() => handleMenuClick(item)}
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "13px",
                fontWeight: 600,
                opacity: isItemActive(item) ? 1 : 0.72,
                padding: "8px 10px",
                borderRadius: "999px",
                background: isItemActive(item) ? "rgba(255,255,255,0.15)" : "transparent",
                border: isItemActive(item) ? "1px solid rgba(255,255,255,0.22)" : "1px solid transparent",
                transition: "all 180ms ease",
              }}
              onMouseEnter={(e) => {
                if (!isItemActive(item)) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.08)";
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.14)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isItemActive(item)) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.border = "1px solid transparent";
                }
              }}
            >
              {item.label}
            </a>
          )
        )}
      </div>
    </nav>
  );
}
