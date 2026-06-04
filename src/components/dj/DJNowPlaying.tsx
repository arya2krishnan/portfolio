"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuMusic, LuChevronDown, LuChevronUp } from "react-icons/lu";
import FadeInView from "@/components/ui/FadeInView";

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
          style={{
            width: "2px",
            backgroundColor: "#f59e0b",
            borderRadius: "9999px",
          }}
        />
      ))}
    </div>
  );
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="13" height="13">
      <path d="M20.44 1.642a.8.8 0 0 0-.464-.078l-11.2 3.2a.7.7 0 0 0-.476.636v10.933a3.6 3.6 0 0 0-1.5-.333C5.026 16 3.6 17.12 3.6 18.5S5.026 21 6.8 21s3.2-1.12 3.2-2.5V9.16l9.6-2.743v7.916a3.6 3.6 0 0 0-1.5-.333c-1.774 0-3.2 1.12-3.2 2.5s1.426 2.5 3.2 2.5 3.2-1.12 3.2-2.5V2.4a.8.8 0 0 0-.44-.712z" />
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} width="12" height="12">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function buildSpotifySearchUrl(track: TrackInfo): string {
  const query = encodeURIComponent(`${track.name} ${track.artistName}`);
  return `https://open.spotify.com/search/${query}`;
}

function FlipTrackCard({
  front,
  back,
  flipped,
}: {
  front: TrackInfo;
  back: TrackInfo | null;
  flipped: boolean;
}) {
  const track = flipped && back ? back : front;

  return (
    <div className="relative h-10" style={{ perspective: "600px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${track.name}-${track.artistName}`}
          initial={{ rotateX: flipped ? -90 : 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: flipped ? 90 : -90, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex items-center gap-3 w-full"
          style={{ transformOrigin: "center center" }}
        >
          <div
            className="w-8 h-8 rounded flex items-center justify-center shrink-0 overflow-hidden"
            style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}
          >
            {track.artworkUrl ? (
              <img
                src={track.artworkUrl}
                alt={track.albumName}
                className="w-full h-full object-cover"
              />
            ) : (
              <LuMusic size={12} style={{ color: "rgba(245,158,11,0.4)" }} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-white text-xs truncate">{track.name}</p>
            <p className="text-xs truncate" style={{ color: "#64748b", fontSize: "10px" }}>
              {track.artistName}
            </p>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {track.url && (
              <a
                href={track.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Listen on Apple Music"
                className="p-1 rounded transition-colors"
                style={{ color: "#64748b" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fc3c44")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
              >
                <AppleMusicIcon />
              </a>
            )}
            <a
              href={buildSpotifySearchUrl(track)}
              target="_blank"
              rel="noopener noreferrer"
              title="Find on Spotify"
              className="p-1 rounded transition-colors"
              style={{ color: "#64748b" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#1DB954")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
            >
              <SpotifyIcon />
            </a>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function DJNowPlaying() {
  const [tracks, setTracks] = useState<TrackInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showingSecondPage, setShowingSecondPage] = useState(false);

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

  const firstPage = tracks.slice(0, 5);
  const secondPage = tracks.slice(5, 10);
  const hasSecondPage = secondPage.length > 0;

  const togglePage = useCallback(() => {
    if (hasSecondPage) setShowingSecondPage((v) => !v);
  }, [hasSecondPage]);

  if (!isLoading && tracks.length === 0) return null;

  return (
    <section style={{ backgroundColor: "#0a0a0a", padding: "6rem 0" }}>
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
            What I&apos;m Listening To
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          {isLoading ? (
            <div style={{ maxWidth: "32rem" }}>
              <div
                style={{
                  backgroundColor: "#111",
                  border: "1px solid #2a2a2a",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "0.25rem", backgroundColor: "#1a1a1a" }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div style={{ height: "8px", backgroundColor: "#1a1a1a", borderRadius: "4px", width: "6rem" }} />
                  <div style={{ height: "8px", backgroundColor: "#1a1a1a", borderRadius: "4px", width: "8rem" }} />
                </div>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                maxWidth: "32rem",
                backgroundColor: "#111",
                border: "1px solid #2a2a2a",
                borderRadius: "0.5rem",
                padding: "0.75rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <SoundBars />
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: "#64748b",
                  }}
                >
                  Recently played
                </span>
                {hasSecondPage && (
                  <button
                    onClick={togglePage}
                    style={{
                      marginLeft: "auto",
                      color: "#64748b",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px",
                      borderRadius: "4px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#f59e0b")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#64748b")}
                    title={showingSecondPage ? "Show 1-5" : "Show 6-10"}
                  >
                    {showingSecondPage ? <LuChevronUp size={14} /> : <LuChevronDown size={14} />}
                  </button>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {firstPage.map((track, i) => (
                  <FlipTrackCard
                    key={i}
                    front={track}
                    back={secondPage[i] || null}
                    flipped={showingSecondPage}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </FadeInView>
      </div>
    </section>
  );
}
