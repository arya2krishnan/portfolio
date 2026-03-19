"use client";

import { useState } from "react";
import Image from "next/image";
import { LuMusic, LuExternalLink, LuTrash2 } from "react-icons/lu";

interface SongRec {
  id: string;
  trackName: string;
  artistName: string;
  albumName: string;
  albumArt: string;
  appleMusicUrl: string;
  submittedBy: string;
  submittedAt: string;
}

export default function SongRecsAdmin() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [recs, setRecs] = useState<SongRec[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setAuthenticated(true);
      setAuthError(false);
      fetchRecs();
    } else {
      setAuthError(true);
    }
  };

  const fetchRecs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/song-recs?pw=${encodeURIComponent(password)}`);
      if (res.ok) {
        const data = await res.json();
        setRecs(data.recs || []);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="max-w-sm w-full bg-[#111] border border-[#222] rounded-lg p-6 space-y-4"
        >
          <h1 className="text-white text-xl font-bold">Song Recs Dashboard</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-emerald-400/50"
            autoFocus
          />
          {authError && <p className="text-red-400 text-sm">Wrong password</p>}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-lg font-semibold transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-white text-2xl font-bold flex items-center gap-3">
            <LuMusic className="text-emerald-400" />
            Song Recs
          </h1>
          <span className="text-slate-500 text-sm font-mono">
            {recs.length} recommendation{recs.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <p className="text-slate-500 font-mono text-sm">Loading...</p>
        ) : recs.length === 0 ? (
          <p className="text-slate-500 font-mono text-sm">No recommendations yet.</p>
        ) : (
          <div className="space-y-3">
            {recs.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center gap-4 p-4 bg-[#111] border border-[#222] rounded-lg"
              >
                {rec.albumArt ? (
                  <Image
                    src={rec.albumArt}
                    alt={rec.albumName}
                    width={56}
                    height={56}
                    className="rounded flex-shrink-0"
                    unoptimized
                  />
                ) : (
                  <div className="w-14 h-14 bg-[#222] rounded flex items-center justify-center flex-shrink-0">
                    <LuMusic className="text-slate-600" size={20} />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium truncate">{rec.trackName}</p>
                  <p className="text-slate-400 text-sm truncate">
                    {rec.artistName} · {rec.albumName}
                  </p>
                  <p className="text-slate-600 text-xs mt-1">
                    from <span className="text-slate-400">{rec.submittedBy}</span>
                    {" · "}
                    {new Date(rec.submittedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {rec.appleMusicUrl && (
                  <a
                    href={rec.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors flex-shrink-0"
                  >
                    <LuExternalLink size={18} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
