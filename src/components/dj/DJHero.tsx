"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const grain = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

const BLOB = "https://x2gu29gptmtx0gyc.public.blob.vercel-storage.com";

const photos = [
  `${BLOB}/dj/photos/1.jpg`,
  `${BLOB}/dj/photos/2b.jpg`,
  `${BLOB}/dj/photos/3.jpg`,
  `${BLOB}/dj/photos/4e.jpg`,
  `${BLOB}/dj/photos/5b.jpg`,
];

const loopedPhotos = [...photos, ...photos, ...photos];

function SprocketRow({ count }: { count: number }) {
  return (
    <div style={{ backgroundColor: "#1a1a1a", height: "22px", display: "flex", alignItems: "center", overflow: "hidden", flexShrink: 0 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            flexShrink: 0,
            width: "16px",
            height: "11px",
            backgroundColor: "#0a0a0a",
            borderRadius: "2px",
            marginLeft: i === 0 ? "8px" : "18px",
          }}
        />
      ))}
    </div>
  );
}

export default function DJHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [loopPx, setLoopPx] = useState(0);
  const [sprocketCount, setSprocketCount] = useState(30);

  // Measure actual rendered width of one set of photos
  useEffect(() => {
    function measure() {
      if (!stripRef.current) return;
      const totalWidth = stripRef.current.scrollWidth;
      setLoopPx(totalWidth / 3); // tripled array, so 1/3 = one loop
      setSprocketCount(Math.ceil(window.innerWidth / 34) + 4);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const filmX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, loopPx > 0 ? -loopPx : -1200]
  );

  return (
    <section ref={sectionRef} style={{ height: "280vh", position: "relative" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          backgroundColor: "#0a0a0a",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Grain */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ backgroundImage: grain, opacity: 0.045, zIndex: 1 }} />

        {/* Amber glow */}
        <div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,158,11,0.10) 0%, transparent 70%)", zIndex: 0 }} />

        {/* Headline */}
        <div className="relative flex-1 flex items-center justify-center text-center px-6" style={{ zIndex: 2, minHeight: 0 }}>
          <div style={{ maxWidth: "900px" }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.3em", color: "#f59e0b", textTransform: "uppercase", marginBottom: "1rem" }}
            >
              DJ · San Francisco
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic", fontSize: "clamp(4rem, 16vw, 12rem)", lineHeight: 0.9, letterSpacing: "-0.02em", color: "#f5f0e8", marginBottom: "1.5rem" }}
            >
              ARYA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)", color: "#94a3b8", maxWidth: "480px", margin: "0 auto", lineHeight: 1.8 }}
            >
              5+ years DJing private events — weddings, birthdays, themed nights.
              Currently booking for 2026.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#f59e0b", textTransform: "uppercase", marginTop: "2rem", opacity: 0.5 }}
            >
              scroll
            </motion.p>
          </div>
        </div>

        {/* Film strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ position: "relative", zIndex: 2, backgroundColor: "#111", flexShrink: 0 }}
        >
          <SprocketRow count={sprocketCount} />

          <div style={{ overflow: "hidden", backgroundColor: "#111" }}>
            <motion.div
              ref={stripRef}
              style={{
                display: "flex",
                gap: "3px",
                x: filmX,
                willChange: "transform",
              }}
            >
              {loopedPhotos.map((src, i) => (
                <div
                  key={i}
                  style={{
                    flexShrink: 0,
                    width: "clamp(140px, 20vw, 260px)",
                    height: "clamp(160px, 22vw, 300px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top", filter: "sepia(0.15) contrast(1.05)" }}
                    sizes="(max-width: 768px) 140px, 260px"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          <SprocketRow count={sprocketCount} />
        </motion.div>
      </div>
    </section>
  );
}
