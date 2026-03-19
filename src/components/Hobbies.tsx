"use client";

import { useState, useCallback } from "react";
import {
  LuMusic,
  LuMountain,
  LuWaves,
  LuCoffee,
  LuDisc3,
  LuGuitar,
  LuCookingPot,
  LuMapPin,
  LuPlay,
  LuPause,
  LuPlane,
} from "react-icons/lu";
import { GiBasketballBall } from "react-icons/gi";
import { motion } from "framer-motion";
import { hobbies, travels } from "@/data/resume";
import SectionHeader from "@/components/ui/SectionHeader";
import FadeInView from "@/components/ui/FadeInView";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

const hobbyIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  music: LuMusic,
  disc: LuDisc3,
  guitar: LuGuitar,
  mountain: LuMountain,
  basketball: GiBasketballBall,
  waves: LuWaves,
  coffee: LuCoffee,
  cooking: LuCookingPot,
};

function VinylPlayer() {
  const [spinning, setSpinning] = useState(false);
  const [rpm, setRpm] = useState(0);

  const toggleSpin = useCallback(() => {
    setSpinning((prev) => !prev);
    setRpm((prev) => (prev === 0 ? 33 : 0));
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        {/* Turntable base */}
        <div className="w-44 h-44 sm:w-64 sm:h-64 rounded-full bg-[#111] border border-[#222] flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.05)]">
          {/* Vinyl record */}
          <motion.div
            animate={{ rotate: spinning ? 360 : 0 }}
            transition={{
              duration: spinning ? 60 / (rpm || 33) : 0.5,
              repeat: spinning ? Infinity : 0,
              ease: "linear",
            }}
            className="w-36 h-36 sm:w-52 sm:h-52 rounded-full bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-center relative"
          >
            {/* Grooves */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full border border-[#1a1a1a]"
                style={{
                  width: `${85 - i * 12}%`,
                  height: `${85 - i * 12}%`,
                }}
              />
            ))}
            {/* Label */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400/20 to-cyan-600/20 border border-cyan-400/30 flex items-center justify-center z-10">
              <LuDisc3 className="text-cyan-400" size={24} />
            </div>
          </motion.div>
        </div>
        {/* Tonearm */}
        <motion.div
          animate={{ rotate: spinning ? 15 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-4 right-4 origin-top-right"
        >
          <div className="w-1 h-24 bg-slate-600 rounded-full" />
        </motion.div>
      </div>

      <button
        onClick={toggleSpin}
        className="flex items-center gap-2 px-4 py-2 bg-[#161616] border border-[#222] rounded-lg text-slate-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all text-sm font-mono"
      >
        {spinning ? <LuPause size={14} /> : <LuPlay size={14} />}
        {spinning ? "Stop" : "Play"}
      </button>
      <p className="text-slate-600 text-xs font-mono mb-4">
        {spinning ? `${rpm} RPM` : "Click to spin the vinyl"}
      </p>
    </div>
  );
}

function HobbyGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {hobbies.map((hobby, i) => {
        const Icon = hobbyIconMap[hobby.icon] || LuMusic;
        return (
          <FadeInView key={hobby.name} delay={i * 0.05}>
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="glow-border bg-[#111] rounded-xl flex flex-col items-center gap-4 md:gap-5 cursor-default"
              style={{ padding: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
            >
              <Icon size={28} className="text-cyan-400/80" />
              <span className="text-slate-300 text-sm text-center">{hobby.name}</span>
            </motion.div>
          </FadeInView>
        );
      })}
    </div>
  );
}

function TravelGallery() {
  return (
    <div className="mt-20 md:mt-24">
      <div className="flex items-center gap-3 mb-10 md:mb-12">
        <LuPlane className="text-cyan-400" size={24} />
        <h3 className="text-lg md:text-xl font-semibold text-white">Travels</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {travels.map((dest, i) => (
          <FadeInView key={dest.location} delay={i * 0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="glow-border bg-[#111] rounded-lg overflow-hidden group cursor-default"
            >
              <ImagePlaceholder label={`${dest.location} photo`} />
              <div className="p-6 sm:p-8 md:p-10 flex items-center gap-3">
                <LuMapPin size={14} className="text-cyan-400/60" />
                <span className="text-white text-sm">{dest.location}</span>
                <span className="text-slate-500 text-xs">{dest.country}</span>
              </div>
            </motion.div>
          </FadeInView>
        ))}
      </div>
    </div>
  );
}

function DJVideoSection() {
  return (
    <div className="mb-16 md:mb-20">
      <h3 className="text-lg md:text-xl font-semibold text-white mb-6 md:mb-8 flex items-center gap-3">
        <LuDisc3 className="text-cyan-400" size={24} />
        DJ Showcase
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
        <div>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2207483395&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            className="rounded-lg"
          />
          <div className="mt-2 text-[10px] text-slate-500 font-mono truncate">
            <a href="https://soundcloud.com/arya-krishnan-36947335" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Arya Krishnan</a>
            {" · "}
            <a href="https://soundcloud.com/arya-krishnan-36947335/halloween-dj-set" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Halloween DJ Set - Hiphop/RnB/House/Pop</a>
          </div>
        </div>
        <VinylPlayer />
      </div>
    </div>
  );
}

export default function Hobbies() {
  return (
    <section id="hobbies" className="py-8 sm:py-10 md:py-12 relative">
      <div className="section-container">
        <SectionHeader icon={LuMusic} title="Beyond the Code" />
        <DJVideoSection />
        <HobbyGrid />
        <TravelGallery />
      </div>
    </section>
  );
}
