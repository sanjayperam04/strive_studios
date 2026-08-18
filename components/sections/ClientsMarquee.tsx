"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const clients = ["Campus Connect", "ASCEND", "Velocity", "Vanta Digital", "LuxeHaven", "Pulse Fitness", "Meridian Capital", "Solaris"];
const extendedClients = [...clients, ...clients];

export default function ClientsMarquee() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section 
      style={{ 
        paddingTop: "clamp(60px,8vw,120px)", 
        paddingBottom: "clamp(60px,8vw,120px)", 
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        position: "relative"
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", width: "100%" }} />
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div 
        style={{ 
          display: "flex", 
          width: "max-content", 
          animation: "marquee 45s linear infinite",
          animationPlayState: isPaused ? "paused" : "running",
          paddingTop: "40px",
          paddingBottom: "40px"
        }}
      >
        {extendedClients.map((client, idx) => (
          <React.Fragment key={idx}>
            <div style={{ 
              fontSize: "clamp(14px,1.1vw,18px)", 
              fontWeight: 500, 
              textTransform: "uppercase", 
              letterSpacing: "0.12em", 
              color: "rgba(255,255,255,0.25)", 
              whiteSpace: "nowrap" 
            }}>
              {client}
            </div>
            {idx !== extendedClients.length - 1 && (
              <div style={{ 
                paddingInline: "60px",
                fontSize: "clamp(14px,1.1vw,18px)", 
                color: "rgba(255,255,255,0.25)"
              }}>
                •
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", width: "100%" }} />
    </section>
  );
}
