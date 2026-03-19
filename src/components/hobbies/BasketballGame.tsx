"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, type PanInfo } from "framer-motion";
import { GiBasketballBall } from "react-icons/gi";

const SWIPE_THRESHOLD = -60; // negative = upward swipe
const WIN_SCORE = 10;

export default function BasketballGame() {
  const [score, setScore] = useState(0);
  const [shooting, setShooting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-close when score exceeds 10
  useEffect(() => {
    if (score > WIN_SCORE) {
      const timer = setTimeout(() => {
        setModalOpen(false);
        setScore(0);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [score]);

  // Close when clicking outside the card
  useEffect(() => {
    if (!modalOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setModalOpen(false);
        setScore(0);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [modalOpen]);

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.y < SWIPE_THRESHOLD && !shooting) {
        setShooting(true);
        setTimeout(() => {
          setScore((s) => s + 1);
          setShooting(false);
        }, 600);
      }
    },
    [shooting]
  );

  if (!modalOpen) {
    return (
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        onClick={() => setModalOpen(true)}
        className="glow-border bg-[#111] rounded-xl flex flex-col items-center gap-4 md:gap-5 cursor-pointer"
        style={{ padding: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
      >
        <GiBasketballBall size={28} className="text-emerald-400/80" />
        <span className="text-slate-300 text-sm text-center">Basketball</span>
      </motion.div>
    );
  }

  return (
    <div ref={cardRef}>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="glow-border bg-[#111] rounded-xl flex flex-col items-center cursor-default relative overflow-hidden"
        style={{
          padding: "clamp(0.75rem, 1.5vw, 1.25rem)",
          minHeight: "200px",
        }}
      >
        {/* Score */}
        <div className="text-emerald-400 font-mono text-xs mb-2">
          Score: {score}
        </div>

        {/* Hoop */}
        <div className="relative w-16 h-10 mb-4">
          {/* Backboard */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-slate-500 rounded" />
          {/* Rim */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-10 h-3 border-2 border-orange-500 rounded-b-full" />
          {/* Net lines */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-8 h-5 border-l border-r border-b border-dashed border-slate-600/50 rounded-b" />
        </div>

        {/* Ball */}
        <motion.div
          drag={!shooting ? "y" : false}
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.5}
          onDragEnd={handleDragEnd}
          animate={
            shooting
              ? {
                  y: -120,
                  x: 0,
                  scale: 0.5,
                  opacity: 0,
                }
              : { y: 0, x: 0, scale: 1, opacity: 1 }
          }
          transition={
            shooting
              ? { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
              : { type: "spring", stiffness: 300, damping: 20 }
          }
          className="mt-auto cursor-grab active:cursor-grabbing touch-none"
        >
          <GiBasketballBall size={36} className="text-orange-500" />
        </motion.div>

        <p className="text-slate-600 text-[10px] font-mono mt-2">
          Swipe up to shoot
        </p>
      </motion.div>
    </div>
  );
}
