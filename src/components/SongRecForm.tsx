"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { LuSearch, LuSend, LuCheck, LuMusic } from "react-icons/lu";
import Image from "next/image";

interface SearchResult {
  trackName: string;
  artistName: string;
  albumName: string;
  albumArt: string;
  appleMusicUrl: string;
}

export default function SongRecForm() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState<SearchResult | null>(null);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const search = useCallback(async (q: string) => {
    if (q.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    try {
      const res = await fetch(`/api/music-search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.results || []);
      setShowDropdown((data.results || []).length > 0);
    } catch {
      setResults([]);
      setShowDropdown(false);
    }
  }, []);

  const handleInputChange = (val: string) => {
    setQuery(val);
    setSelected(null);
    setSubmitted(false);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(val), 300);
  };

  const handleSelect = (result: SearchResult) => {
    setSelected(result);
    setQuery(result.trackName);
    setShowDropdown(false);
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/song-recs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...selected,
          submittedBy: name.trim() || "Anonymous",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setSelected(null);
          setQuery("");
          setName("");
          setSubmitted(false);
        }, 3000);
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="mb-16 md:mb-20" ref={containerRef}>
      <h3 className="text-lg md:text-xl font-semibold text-white mb-2 flex items-center gap-3">
        <LuMusic className="text-emerald-400" size={24} />
        Song Recs
      </h3>
      <p className="text-slate-500 text-sm font-mono mb-6">
        Always looking to spin a new track! Drop your song rec below! :)
      </p>

      <div className="max-w-lg space-y-3">
        {/* Search input */}
        <div className="relative">
          <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => results.length > 0 && !selected && setShowDropdown(true)}
            placeholder="Search for a song..."
            className="w-full pl-10 pr-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400/50 font-mono text-sm transition-colors"
          />

          {/* Dropdown results */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[#111] border border-[#222] rounded-lg overflow-hidden z-50 shadow-xl">
              {results.map((r, i) => (
                <button
                  key={`${r.trackName}-${r.artistName}-${i}`}
                  onClick={() => handleSelect(r)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#1a1a1a] transition-colors text-left"
                >
                  {r.albumArt ? (
                    <Image
                      src={r.albumArt}
                      alt={r.albumName}
                      width={40}
                      height={40}
                      className="rounded flex-shrink-0"
                      unoptimized
                    />
                  ) : (
                    <div className="w-10 h-10 bg-[#222] rounded flex items-center justify-center flex-shrink-0">
                      <LuMusic className="text-slate-600" size={16} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm truncate">{r.trackName}</p>
                    <p className="text-slate-500 text-xs truncate">{r.artistName}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Selected track preview */}
        {selected && (
          <div className="flex items-center gap-3 p-3 bg-[#111] border border-emerald-400/20 rounded-lg">
            {selected.albumArt ? (
              <Image
                src={selected.albumArt}
                alt={selected.albumName}
                width={48}
                height={48}
                className="rounded flex-shrink-0"
                unoptimized
              />
            ) : (
              <div className="w-12 h-12 bg-[#222] rounded flex items-center justify-center flex-shrink-0">
                <LuMusic className="text-slate-600" size={20} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-medium truncate">{selected.trackName}</p>
              <p className="text-slate-400 text-xs truncate">{selected.artistName} · {selected.albumName}</p>
            </div>
            {submitted && <LuCheck className="text-emerald-400 flex-shrink-0" size={20} />}
          </div>
        )}

        {/* Name + Submit */}
        {selected && !submitted && (
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 px-3 py-2.5 bg-[#0a0a0a] border border-[#222] rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400/50 font-mono text-sm transition-colors"
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-700 text-black disabled:text-slate-400 rounded-lg font-semibold text-sm transition-colors flex items-center gap-2"
            >
              <LuSend size={14} />
              {submitting ? "..." : "Send"}
            </button>
          </div>
        )}

        {submitted && (
          <p className="text-emerald-400 text-sm font-mono">Thanks for the rec! 🎵</p>
        )}
      </div>
    </div>
  );
}
