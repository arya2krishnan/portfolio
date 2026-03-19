"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuMusic, LuExternalLink } from "react-icons/lu";

interface TrackInfo {
  name: string;
  artistName: string;
  albumName: string;
  artworkUrl: string | null;
  url: string | null;
}

function SoundBars() {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={{ height: ["4px", "16px", "8px", "14px", "4px"] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
          className="w-0.5 bg-cyan-400 rounded-full"
        />
      ))}
    </div>
  );
}

export default function NowPlaying() {
  const [tracks, setTracks] = useState<TrackInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/apple-music/now-playing");
        if (res.ok) {
          const json = await res.json();
          setTracks(json.recentTracks || []);
        }
      } catch {
        // silently fail
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-lg">
        <div className="glow-border bg-[#111] rounded-lg p-3 flex items-center gap-3 animate-pulse">
          <div className="w-10 h-10 rounded bg-[#1a1a1a]" />
          <div className="flex-1 space-y-2">
            <div className="h-2 bg-[#1a1a1a] rounded w-24" />
            <div className="h-2 bg-[#1a1a1a] rounded w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (tracks.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg glow-border bg-[#111] rounded-lg p-3 space-y-2"
    >
      <div className="flex items-center gap-2 mb-1">
        <SoundBars />
        <span className="text-[10px] font-mono text-slate-500">
          Recently played
        </span>
      </div>

      {tracks.map((track, i) => (
        <div
          key={`${track.name}-${i}`}
          className={`flex items-center gap-3 ${
            i === 0 ? "" : "opacity-60"
          }`}
        >
          <div className="w-8 h-8 rounded bg-[#1a1a1a] border border-[#222] flex items-center justify-center shrink-0 overflow-hidden">
            {track.artworkUrl ? (
              <img
                src={track.artworkUrl}
                alt={track.albumName}
                className="w-full h-full object-cover"
              />
            ) : (
              <LuMusic className="text-cyan-400/40" size={12} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white text-xs truncate">{track.name}</p>
            <p className="text-slate-400 text-[10px] truncate">
              {track.artistName}
            </p>
          </div>

          {track.url && (
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-cyan-400 transition-colors shrink-0"
            >
              <LuExternalLink size={10} />
            </a>
          )}
        </div>
      ))}
    </motion.div>
  );
}
