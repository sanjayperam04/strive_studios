"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const stats = [
  { value: 30, suffix: "+", label: "Brands Launched" },
  { value: 98, suffix: "%", label: "Client Retention" },
  { value: 4.9, suffix: "★", label: "Avg. Project Rating" },
  { value: 100, suffix: "%", label: "On-Time Delivery" },
];

function AnimatedStat({ value, isDecimal }: { value: number, isDecimal: boolean }) {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (!isInView) return;
    
    let startTimestamp: number | null = null;
    const duration = 1500;
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      const nextValue = progress * value;
      setCurrent(nextValue);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  }, [isInView, value]);
  
  const displayValue = isDecimal ? current.toFixed(1) : Math.floor(current);
  
  return <span ref={ref}>{displayValue}</span>;
}

export default function StatsSection() {
  return (
    <div style={{ backgroundColor: "#0a0a0a" }}>
      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", width: "100%" }} />
      <motion.section initial="hidden" whileInView="visible" viewport={{ once:true, amount:0.15 }} variants={stagger} style={{ paddingTop: "clamp(100px,12vw,180px)", paddingBottom: "clamp(100px,12vw,180px)", paddingInline: "clamp(24px,5vw,80px)" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "clamp(24px,3vw,48px)" }}>
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={fadeUp}>
                <div style={{ fontSize: "clamp(36px,4.5vw,64px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "12px", color: "#ffffff" }}>
                  <AnimatedStat value={stat.value} isDecimal={stat.value % 1 !== 0} />{stat.suffix}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 400, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.08)", width: "100%" }} />
    </div>
  );
}
