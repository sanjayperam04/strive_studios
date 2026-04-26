"use client";

import { useEffect, useRef } from "react";

const CITIES = [
  { lat: 51.5074,  lng: -0.1278,  label: "London"    },
  { lat: 13.0827,  lng: 80.2707,  label: "Chennai"   },
  { lat: 12.9716,  lng: 77.5946,  label: "Bangalore" },
  { lat: 40.7128,  lng: -74.006,  label: "New York"  },
];

const ARCS = CITIES.flatMap((from, i) =>
  CITIES.slice(i + 1).map((to, j) => ({
    id: `${i}-${j}`,
    startLat: from.lat,
    startLng: from.lng,
    endLat: to.lat,
    endLng: to.lng,
    arcAlt: 0.3,
    color: ["rgba(192,57,43,0.9)", "rgba(220,80,60,0.8)"][j % 2],
  }))
);

export default function ContactGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof window === "undefined") return;

    import("globe.gl").then((mod) => {
      const GlobeGL = mod.default;
      const globe = new GlobeGL(el);
      globeRef.current = globe;

      globe
        .width(el.offsetWidth)
        .height(el.offsetHeight)
        .backgroundColor("rgba(0,0,0,0)")
        // dark earth texture so continents are visible
        .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
        .showAtmosphere(true)
        .atmosphereColor("rgba(192,57,43,0.25)")
        .atmosphereAltitude(0.12)
        // animated arcs between cities
        .arcsData(ARCS)
        .arcStartLat((d: any) => d.startLat)
        .arcStartLng((d: any) => d.startLng)
        .arcEndLat((d: any) => d.endLat)
        .arcEndLng((d: any) => d.endLng)
        .arcAltitude((d: any) => d.arcAlt)
        .arcColor((d: any) => d.color)
        .arcDashLength(0.9)
        .arcDashGap(2)
        .arcDashAnimateTime(2000)
        .arcStroke(1.4)
        // glowing city dots
        .pointsData(CITIES)
        .pointLat((d: any) => d.lat)
        .pointLng((d: any) => d.lng)
        .pointColor(() => "#ff4433")
        .pointAltitude(0.02)
        .pointRadius(0.6);

      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 0.5;
      globe.controls().enableZoom = false;
      globe.controls().enablePan = false;
    });

    const handleResize = () => {
      if (globeRef.current && el) {
        globeRef.current.width(el.offsetWidth).height(el.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      globeRef.current?._destructor?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
