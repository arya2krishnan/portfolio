"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LuMusic, LuExternalLink, LuTrendingUp, LuCrown } from "react-icons/lu";

interface NowPlayingData {
  isPlaying: boolean;
  track?: string;
  artist?: string;
  album?: string;
  albumArt?: string;
  url?: string;
}

interface TopArtist {
  name: string;
  playcount: string;
  url: string;
  image: string | null;
}

interface TopArtistsData {
  monthly: TopArtist[];
  yearly: TopArtist[];
}

function SoundBars({ playing }: { playing: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          animate={
            playing
              ? {
                  height: ["4px", "16px", "8px", "14px", "4px"],
                }
              : { height: "4px" }
          }
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
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [topArtists, setTopArtists] = useState<TopArtistsData | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await fetch("/api/now-playing");
        const json = await res.json();
        setData(json);
      } catch {
        // silently fail
      }
    };

    const fetchTopArtists = async () => {
      try {
        const res = await fetch("/api/top-artists");
        const json = await res.json();
        setTopArtists(json);
      } catch {
        // silently fail
      }
    };

    fetchNowPlaying();
    fetchTopArtists();
    const npInterval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(npInterval);
  }, []);

  if (!data) return null;

  const hasTopArtists = topArtists && (topArtists.monthly.length > 0 || topArtists.yearly.length > 0);

  return (
    <div className="space-y-3 max-w-lg">
      {/* Last played / Now playing */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glow-border bg-[#111] rounded-lg p-3 flex items-center gap-3"
      >
        <div className="w-10 h-10 rounded bg-[#1a1a1a] border border-[#222] flex items-center justify-center shrink-0 overflow-hidden">
          {data.albumArt ? (
            <img src={data.albumArt} alt={data.album} className="w-full h-full object-cover" />
          ) : (
            <LuMusic className="text-cyan-400/40" size={16} />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <SoundBars playing={data.isPlaying} />
            <span className="text-[10px] font-mono text-slate-500">
              {data.isPlaying ? "Now playing" : "Last played"}
            </span>
          </div>
          <p className="text-white text-xs truncate mt-0.5">{data.track}</p>
          <p className="text-slate-400 text-[10px] truncate">{data.artist}</p>
        </div>

        {data.url && (
          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-cyan-400 transition-colors shrink-0"
          >
            <LuExternalLink size={12} />
          </a>
        )}
      </motion.div>

      {/* Top artists row */}
      {hasTopArtists && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3"
        >
          {/* Top 5 this month */}
          {topArtists.monthly.length > 0 && (
            <div className="flex-1 glow-border bg-[#111] rounded-lg p-3">
              <div className="flex items-center gap-1.5 mb-2">
                <LuTrendingUp className="text-cyan-400/60" size={12} />
                <span className="text-[10px] font-mono text-slate-500">Top artists this month</span>
              </div>
              <ol className="space-y-1">
                {topArtists.monthly.map((artist, i) => (
                  <li key={artist.name} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-cyan-400/40 w-3">{i + 1}</span>
                    <a
                      href={artist.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-slate-300 hover:text-cyan-400 transition-colors truncate"
                    >
                      {artist.name}
                    </a>
                    <span className="text-[10px] text-slate-600 font-mono ml-auto shrink-0">
                      {artist.playcount} plays
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Top artist YTD */}
          {topArtists.yearly.length > 0 && (
            <div className="glow-border bg-[#111] rounded-lg p-3 flex flex-col items-center justify-center min-w-[120px]">
              <div className="flex items-center gap-1.5 mb-2">
                <LuCrown className="text-cyan-400/60" size={12} />
                <span className="text-[10px] font-mono text-slate-500">Artist of the year</span>
              </div>
              <a
                href={topArtists.yearly[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white hover:text-cyan-400 transition-colors font-semibold text-center"
              >
                {topArtists.yearly[0].name}
              </a>
              <span className="text-[10px] text-slate-600 font-mono mt-0.5">
                {topArtists.yearly[0].playcount} plays
              </span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
