"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LuPlay, LuPause } from "react-icons/lu";

interface AudioPlayerProps {
  src: string;
  title: string;
  artist?: string;
}

export default function AudioPlayer({ src, title, artist }: AudioPlayerProps) {
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
    <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Track info */}
      <div className="mb-3">
        <p className="text-white text-sm font-medium truncate">{title}</p>
        {artist && (
          <p className="text-slate-500 text-xs font-mono truncate">{artist}</p>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-cyan-400/10 hover:bg-cyan-400/20 text-cyan-400 rounded-full transition-colors"
        >
          {playing ? <LuPause size={14} /> : <LuPlay size={14} />}
        </button>

        {/* Progress bar */}
        <div
          className="flex-1 h-1.5 bg-[#222] rounded-full cursor-pointer group"
          onClick={seek}
        >
          <div
            className="h-full bg-cyan-400 rounded-full relative transition-all"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* Time */}
        <span className="text-slate-500 text-xs font-mono flex-shrink-0 w-20 text-right">
          {fmt(currentTime)} / {fmt(duration)}
        </span>
      </div>
    </div>
  );
}
