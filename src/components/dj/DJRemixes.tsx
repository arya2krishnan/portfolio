"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { LuPlay, LuPause } from "react-icons/lu";
import FadeInView from "@/components/ui/FadeInView";

const BLOB = "https://x2gu29gptmtx0gyc.public.blob.vercel-storage.com";

const remixes = [
  {
    title: "Don't — Remix",
    src: `${BLOB}/hobbies/music_production/dont-remix.mp3`,
  },
  {
    title: "Hot — Remix",
    src: `${BLOB}/hobbies/music_production/hot-remix.mp3`,
  },
  {
    title: "No Guidance — Afro House Remix",
    src: `${BLOB}/hobbies/music_production/no-guidance-afrohouse-remix.mp3`,
  },
  {
    title: "Yukon — Remix",
    src: `${BLOB}/hobbies/music_production/yukon-remix.mp3`,
  },
  {
    title: "Swang x Cloonee — Edit",
    src: `${BLOB}/hobbies/music_production/swang-x-cloonee.mp3`,
  },
  {
    title: "Stay x Low Life — Edit",
    src: `${BLOB}/hobbies/music_production/fisher-x-low-life.mp3`,
  },
];

function RemixPlayer({ title, src }: { title: string; src: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setCurrentTime(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("loadedmetadata", onMeta);
    audio.addEventListener("ended", onEnd);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  }, [playing]);

  const seek = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const audio = audioRef.current;
      if (!audio || !duration) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const pct = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pct * duration;
    },
    [duration]
  );

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      whileHover={{ borderColor: "rgba(245,158,11,0.4)" }}
      style={{
        backgroundColor: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: "0.5rem",
        padding: "1.25rem",
        transition: "border-color 0.2s",
      }}
    >
      <audio ref={audioRef} src={src} preload="metadata" />

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8rem",
          color: "#e2e8f0",
          marginBottom: "0.25rem",
          fontWeight: 500,
        }}
      >
        {title}
      </p>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.7rem",
          color: "#64748b",
          marginBottom: "1rem",
        }}
      >
        Arya Krishnan
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <button
          onClick={toggle}
          style={{
            flexShrink: 0,
            width: "2rem",
            height: "2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: playing
              ? "rgba(245,158,11,0.2)"
              : "rgba(245,158,11,0.1)",
            color: "#f59e0b",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          {playing ? <LuPause size={13} /> : <LuPlay size={13} />}
        </button>

        <div
          style={{
            flex: 1,
            height: "4px",
            backgroundColor: "#222",
            borderRadius: "2px",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={seek}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: "#f59e0b",
              borderRadius: "2px",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.65rem",
            color: "#64748b",
            flexShrink: 0,
            minWidth: "72px",
            textAlign: "right",
          }}
        >
          {fmt(currentTime)} / {fmt(duration)}
        </span>
      </div>
    </motion.div>
  );
}

export default function DJRemixes() {
  return (
    <section style={{ backgroundColor: "#111", padding: "6rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        <FadeInView>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "#f5f0e8",
              marginBottom: "3rem",
              letterSpacing: "-0.02em",
            }}
          >
            Remixes
          </h2>
        </FadeInView>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1rem",
          }}
        >
          {remixes.map((remix, i) => (
            <FadeInView key={remix.title} delay={i * 0.08}>
              <RemixPlayer title={remix.title} src={remix.src} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
