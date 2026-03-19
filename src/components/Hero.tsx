"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LuGithub, LuLinkedin, LuMail, LuMapPin, LuTrophy } from "react-icons/lu";
import { personalInfo } from "@/data/resume";
import NowPlaying from "@/components/NowPlaying";
import DotWaveCanvas from "@/components/ui/DotWaveCanvas";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [clickCount, setClickCount] = useState(0);
  const [showAchievement, setShowAchievement] = useState(false);
  const [pfpEnlarged, setPfpEnlarged] = useState(false);

  const locations = ["SF", "NYC", "Berkeley", "Fremont"];
  const locIndexRef = useRef(0);
  const hasTypedOnce = useRef(false);
  const isAnimating = useRef(false);
  const sectionRef = useRef<HTMLElement>(null);

  const prefix = `> const arya = { role: "SWE", loc: "`;
  const suffix = `" };`;

  // Type out the full string on mount
  useEffect(() => {
    const fullText = `${prefix}${locations[0]}${suffix}`;
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        hasTypedOnce.current = true;
      }
    }, 35);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cycle location when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasTypedOnce.current && !isAnimating.current) {
          isAnimating.current = true;
          const prevLoc = locations[locIndexRef.current];
          locIndexRef.current = (locIndexRef.current + 1) % locations.length;
          const newLoc = locations[locIndexRef.current];

          // Phase 1: delete old location char by char
          let deleteCount = 0;
          const deleteInterval = setInterval(() => {
            deleteCount++;
            const remaining = prevLoc.slice(0, prevLoc.length - deleteCount);
            setTypedText(`${prefix}${remaining}${suffix}`);
            if (deleteCount >= prevLoc.length) {
              clearInterval(deleteInterval);
              // Phase 2: type new location char by char
              let typeCount = 0;
              const typeInterval = setInterval(() => {
                typeCount++;
                const typed = newLoc.slice(0, typeCount);
                setTypedText(`${prefix}${typed}${suffix}`);
                if (typeCount >= newLoc.length) {
                  clearInterval(typeInterval);
                  isAnimating.current = false;
                }
              }, 200);
            }
          }, 150);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <section ref={sectionRef} className="relative overflow-hidden">
      <DotWaveCanvas className="absolute inset-0 z-0" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 md:w-96 h-64 md:h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 md:w-96 h-64 md:h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="section-container relative z-10 pt-28 pb-10 sm:pt-32 sm:pb-12 md:pt-32 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Profile picture */}
          <div className="mb-4 md:mb-5">
            <div
              onClick={() => setPfpEnlarged(true)}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.15)] cursor-pointer hover:border-emerald-400/60 transition-all"
            >
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
            <span className="text-emerald-400 whitespace-nowrap">{typedText}</span>
            <span className={`text-emerald-400 ${showCursor ? "opacity-100" : "opacity-0"}`}>
              |
            </span>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-emerald-400 font-mono mb-2 md:mb-3">
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
                className="flex items-center gap-2 px-3 py-2 bg-[#161616] border border-[#222] rounded-lg text-slate-300 hover:text-emerald-400 hover:border-emerald-400/30 transition-all text-xs font-mono"
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

      {/* Enlarged profile picture overlay */}
      <AnimatePresence>
        {pfpEnlarged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setPfpEnlarged(false)}
          >
            <motion.div
              initial={{ scale: 0.3, borderRadius: "9999px" }}
              animate={{ scale: 1, borderRadius: "9999px" }}
              exit={{ scale: 0.3, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-emerald-400/30 shadow-[0_0_60px_rgba(52,211,153,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/arya-profile.jpg"
                alt="Arya Krishnan"
                width={384}
                height={384}
                className="w-full h-full object-cover"
                priority
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement toast */}
      {showAchievement && (
        <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 achievement-toast">
          <div className="bg-[#161616] border border-emerald-400/40 rounded-lg px-4 sm:px-6 py-3 sm:py-4 shadow-lg flex items-center gap-3">
            <LuTrophy className="text-emerald-400 shrink-0" size={24} />
            <div>
              <p className="text-emerald-400 font-mono text-sm font-semibold">
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
