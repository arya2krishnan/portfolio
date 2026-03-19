"use client";

import { LuDisc3, LuExternalLink } from "react-icons/lu";
import { motion } from "framer-motion";

const DJ_VIDEO_URL = "https://youtu.be/JDhL6urJWtA?si=HuVDiyt17SvaHhRu";

export default function DJCard() {
  return (
    <a href={DJ_VIDEO_URL} target="_blank" rel="noopener noreferrer">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        className="glow-border bg-[#111] rounded-xl flex flex-col items-center gap-4 md:gap-5 cursor-pointer relative group"
        style={{ padding: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
      >
        <LuDisc3 size={28} className="text-emerald-400/80" />
        <span className="text-slate-300 text-sm text-center">DJing</span>
        <LuExternalLink
          size={12}
          className="absolute top-2 right-2 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </motion.div>
    </a>
  );
}
