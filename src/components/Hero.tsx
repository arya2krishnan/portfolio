"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { LuGithub, LuLinkedin, LuMail, LuMapPin, LuTrophy } from "react-icons/lu";
import { personalInfo } from "@/data/resume";
import NowPlaying from "@/components/NowPlaying";
import DotWaveCanvas from "@/components/ui/DotWaveCanvas";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const fullText = `> const arya = { role: "SWE", loc: "SF" };`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 35);
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const handleAvatarClick = useCallback(() => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next === 4) {
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 4000);
      setClickCount(0);
    }
  }, [clickCount]);

  return (
    <section className="relative overflow-hidden">
      <DotWaveCanvas className="absolute inset-0 z-0" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10 pt-28 pb-10 sm:pt-32 sm:pb-12 md:pt-32 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Profile picture */}
          <div className="mb-4 md:mb-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <Image
                src="/images/arya-profile.jpg"
                alt="Arya Krishnan"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Name with click easter egg */}
          <h1
            onClick={handleAvatarClick}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 cursor-default select-none"
          >
            {personalInfo.name}
          </h1>

          {/* Terminal line */}
          <div className="font-mono text-xs sm:text-sm text-slate-400 mb-4 bg-[#111] border border-[#222] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 inline-block max-w-full overflow-x-auto">
            <span className="text-cyan-400 whitespace-nowrap">{typedText}</span>
            <span className={`text-cyan-400 ${showCursor ? "opacity-100" : "opacity-0"}`}>
              |
            </span>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-cyan-400 font-mono mb-2 md:mb-3">
            {personalInfo.title}
          </p>

          <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
            <LuMapPin size={14} />
            <span>{personalInfo.location}</span>
          </div>

          <p className="text-slate-400 text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
            Building products at Atlassian. UC Berkeley CS & Econ grad. Passionate about
            shipping at scale, AI-augmented development, and making great coffee.
          </p>

          {/* Social links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {[
              { icon: LuGithub, href: personalInfo.github, label: "GitHub" },
              { icon: LuLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
              { icon: LuMail, href: `mailto:${personalInfo.email}`, label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-3 py-2 bg-[#161616] border border-[#222] rounded-lg text-slate-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all text-xs font-mono"
              >
                <Icon size={16} />
                {label}
              </motion.a>
            ))}
          </div>

          {/* Now Playing */}
          <div className="mt-5 md:mt-6">
            <NowPlaying />
          </div>
        </motion.div>
      </div>

      {/* Achievement toast */}
      {showAchievement && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 achievement-toast">
          <div className="bg-[#161616] border border-cyan-400/40 rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-lg flex items-center gap-3">
            <LuTrophy className="text-cyan-400 shrink-0" size={24} />
            <div>
              <p className="text-cyan-400 font-mono text-sm font-semibold">
                Achievement Unlocked!
              </p>
              <p className="text-slate-400 text-xs">
                You found the easter egg. Curiosity is a superpower.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
