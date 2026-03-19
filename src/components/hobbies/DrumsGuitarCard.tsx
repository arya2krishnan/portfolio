"use client";

import { useState, useRef, useCallback } from "react";
import { LuGuitar } from "react-icons/lu";
import { GiDrumKit } from "react-icons/gi";
import { motion, AnimatePresence } from "framer-motion";
import { soundEffects } from "@/data/hobbies-media";

export default function DrumsGuitarCard() {
  const [isGuitar, setIsGuitar] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    const nextIsGuitar = !isGuitar;
    setIsGuitar(nextIsGuitar);

    // Play sound effect if available
    const src = nextIsGuitar ? soundEffects.guitarStrum : soundEffects.drumHit;
    if (src) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      audioRef.current = new Audio(src);
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, [isGuitar]);

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="glow-border bg-[#111] rounded-xl flex flex-col items-center gap-4 md:gap-5 cursor-pointer relative overflow-hidden"
      style={{ padding: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
    >
      {/* Ripple effect on switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isGuitar ? "guitar" : "drums"}
          initial={{ scale: 0.5, rotate: -90, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isGuitar ? (
            <LuGuitar size={28} className="text-cyan-400/80" />
          ) : (
            <GiDrumKit size={28} className="text-cyan-400/80" />
          )}
        </motion.div>
      </AnimatePresence>

      <span className="text-slate-300 text-sm text-center">
        {isGuitar ? "Guitar" : "Drums"}
      </span>

      {/* Hit flash */}
      <AnimatePresence>
        {!isGuitar && (
          <motion.div
            initial={{ opacity: 0.6, scale: 0.5 }}
            animate={{ opacity: 0, scale: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-xl bg-cyan-400/20 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
