"use client";

import { useState, useCallback, useRef } from "react";
import {
  LuMusic,
  LuDisc3,
  LuPlay,
  LuPause,
  LuPlane,
  LuLightbulb,
  LuKeyRound,
} from "react-icons/lu";
import { motion } from "framer-motion";
import { hobbies, travels } from "@/data/resume";
import { soundEffects } from "@/data/hobbies-media";
import SectionHeader from "@/components/ui/SectionHeader";
import FadeInView from "@/components/ui/FadeInView";
import HobbyCard from "@/components/hobbies/HobbyCard";
import TravelDestinationCard from "@/components/hobbies/TravelDestinationCard";
import SongRecForm from "@/components/SongRecForm";
import NowPlaying from "@/components/NowPlaying";

function VinylPlayer() {
  const [spinning, setSpinning] = useState(false);
  const [rpm, setRpm] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const rpmToPlaybackRate = (r: number) => {
    // 45 RPM = normal speed (1.0x), scale others proportionally
    if (r === 0) return 1;
    return r / 45;
  };

  const handleRpmChange = useCallback(
    (newRpm: number) => {
      setRpm(newRpm);
      if (audioRef.current) {
        audioRef.current.playbackRate = rpmToPlaybackRate(newRpm);
      }
    },
    []
  );

  const toggleSpin = useCallback(() => {
    const nextSpinning = !spinning;
    setSpinning(nextSpinning);
    const startRpm = nextSpinning ? 45 : 0;
    setRpm(startRpm);

    if (nextSpinning && soundEffects.jazzSong) {
      if (!audioRef.current) {
        audioRef.current = new Audio(soundEffects.jazzSong);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;
      }
      audioRef.current.playbackRate = rpmToPlaybackRate(startRpm);
      audioRef.current.play().catch(() => {});
    } else if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [spinning]);

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
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400/20 to-emerald-600/20 border border-emerald-400/30 flex items-center justify-center z-10">
              <LuDisc3 className="text-emerald-400" size={24} />
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
        className="flex items-center gap-2 px-4 py-2 bg-[#161616] border border-[#222] rounded-lg text-slate-300 hover:text-emerald-400 hover:border-emerald-400/30 transition-all text-sm font-mono"
      >
        {spinning ? <LuPause size={14} /> : <LuPlay size={14} />}
        {spinning ? "Stop" : "Play"}
      </button>
      {spinning && (
        <div className="w-full max-w-[200px]">
          <div className="relative">
            <input
              type="range"
              min={33}
              max={78}
              step={1}
              value={rpm}
              onChange={(e) => handleRpmChange(Number(e.target.value))}
              className="w-full h-1 bg-[#222] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-400 [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(52,211,153,0.5)] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-400 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
            />
          </div>
          {/* RPM labels aligned to slider positions */}
          <div className="relative h-4 mt-1">
            {[33, 45, 78].map((tick) => {
              const pct = ((tick - 33) / (78 - 33)) * 100;
              // Account for thumb width (6px half = ~3% of 200px track)
              const adjusted = `calc(${pct}% + ${6 - pct * 0.12}px)`;
              return (
                <button
                  key={tick}
                  onClick={() => handleRpmChange(tick)}
                  className={`absolute text-[10px] font-mono transition-colors -translate-x-1/2 ${
                    rpm === tick
                      ? "text-emerald-400"
                      : "text-slate-600 hover:text-slate-400"
                  }`}
                  style={{ left: adjusted }}
                >
                  {tick}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <p className="text-slate-600 text-xs font-mono mb-4">
        {spinning ? `${rpm} RPM · ${rpmToPlaybackRate(rpm).toFixed(2)}x` : "Click to spin the vinyl"}
      </p>
    </div>
  );
}

function HobbyGrid() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-10 md:mb-12">
        <LuLightbulb className="text-emerald-400" size={24} />
        <h3 className="text-lg md:text-xl font-semibold text-white">Interests</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
      {hobbies.map((hobby, i) => (
        <FadeInView key={hobby.name} delay={i * 0.05}>
          <HobbyCard hobby={hobby} />
        </FadeInView>
      ))}
      </div>
    </div>
  );
}

function TravelGallery() {
  return (
    <div className="mt-20 md:mt-24">
      <div className="flex items-center gap-3 mb-10 md:mb-12">
        <LuPlane className="text-emerald-400" size={24} />
        <h3 className="text-lg md:text-xl font-semibold text-white">Travels</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
        {travels.map((dest, i) => (
          <FadeInView key={dest.location} delay={i * 0.1}>
            <TravelDestinationCard dest={dest} />
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
        <LuDisc3 className="text-emerald-400" size={24} />
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
            <a href="https://soundcloud.com/arya-krishnan-36947335" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Arya Krishnan</a>
            {" · "}
            <a href="https://soundcloud.com/arya-krishnan-36947335/halloween-dj-set" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">Halloween DJ Set - Hiphop/RnB/House/Pop</a>
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
        <SectionHeader icon={LuKeyRound} title="Decoded" />
        <div className="mb-16 md:mb-20">
          <NowPlaying />
        </div>
        <DJVideoSection />
        <SongRecForm />
        <HobbyGrid />
        <TravelGallery />
      </div>
    </section>
  );
}
