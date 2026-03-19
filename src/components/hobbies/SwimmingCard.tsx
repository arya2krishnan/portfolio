"use client";

import { useState, useEffect, useCallback } from "react";
import { LuWaves } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

function Wave({
  delay,
  opacity,
  bottom,
  height,
}: {
  delay: number;
  opacity: number;
  bottom: string;
  height: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity, y: 0, x: [0, "-50%"] }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute left-0 w-[200%] pointer-events-none"
      style={{ bottom, height }}
      transition={{
        opacity: { duration: 0.6 },
        y: { duration: 0.6 },
        x: {
          duration: 3 + delay * 1.5,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          d="M0,40 C100,10 200,70 400,40 C600,10 700,70 900,40 C1000,20 1100,60 1200,40 L1200,120 L0,120 Z"
          fill="currentColor"
          className="text-emerald-400"
        />
      </svg>
    </motion.div>
  );
}

export default function SwimmingCard() {
  const [showWaves, setShowWaves] = useState(false);

  const handleClick = useCallback(() => {
    if (!showWaves) setShowWaves(true);
  }, [showWaves]);

  useEffect(() => {
    if (!showWaves) return;
    const timer = setTimeout(() => setShowWaves(false), 5000);
    return () => clearTimeout(timer);
  }, [showWaves]);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      onClick={handleClick}
      className="glow-border bg-[#111] rounded-xl flex flex-col items-center gap-4 md:gap-5 cursor-pointer relative overflow-hidden"
      style={{ padding: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
    >
      <LuWaves size={28} className="text-emerald-400/80 relative z-10" />
      <span className="text-slate-300 text-sm text-center relative z-10">Swimming</span>

      <AnimatePresence>
        {showWaves && (
          <>
            <Wave delay={0} opacity={0.3} bottom="0%" height="40%" />
            <Wave delay={0.7} opacity={0.2} bottom="20%" height="50%" />
            <Wave delay={1.4} opacity={0.15} bottom="40%" height="55%" />
            <Wave delay={2} opacity={0.1} bottom="55%" height="50%" />
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
