"use client";

import { useState } from "react";

declare global {
  interface Window {
    MusicKit: {
      configure: (config: {
        developerToken: string;
        app: { name: string; build: string };
      }) => Promise<MusicKitInstance>;
    };
  }
}

interface MusicKitInstance {
  authorize: () => Promise<string>;
  isAuthorized: boolean;
  musicUserToken: string;
}

export default function AuthorizeMusicPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

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
    } else {
      setAuthError(true);
    }
  };

  const handleAuthorize = async () => {
    setStatus("loading");
    setMessage("Loading MusicKit...");

    try {
      // Get developer token
      const tokenRes = await fetch("/api/apple-music/token");
      if (!tokenRes.ok) throw new Error("Failed to get developer token");
      const { token: devToken } = await tokenRes.json();

      // Load MusicKit JS
      if (!window.MusicKit) {
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://js-cdn.music.apple.com/musickit/v3/musickit.js";
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Failed to load MusicKit JS"));
          document.head.appendChild(script);
        });

        await new Promise<void>((resolve) => {
          const check = () => {
            if (window.MusicKit) resolve();
            else setTimeout(check, 100);
          };
          check();
        });
      }

      setMessage("Configuring MusicKit...");
      const instance = await window.MusicKit.configure({
        developerToken: devToken,
        app: { name: "Arya's Website", build: "1.0.0" },
      });

      setMessage("Waiting for Apple Music authorization...");
      await instance.authorize();

      if (!instance.isAuthorized || !instance.musicUserToken) {
        throw new Error("Authorization failed");
      }

      setMessage("Storing token...");
      const storeRes = await fetch("/api/apple-music/store-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userToken: instance.musicUserToken }),
      });

      if (!storeRes.ok) throw new Error("Failed to store token");

      setStatus("success");
      setMessage("Apple Music authorized and token stored! Visitors can now see your listening data.");
    } catch (e) {
      setStatus("error");
      setMessage(e instanceof Error ? e.message : "Unknown error");
    }
  };

  // Password gate
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="max-w-sm w-full bg-[#111] border border-[#222] rounded-lg p-6 space-y-4"
        >
          <h1 className="text-white text-xl font-bold">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#333] rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400/50"
            autoFocus
          />
          {authError && (
            <p className="text-red-400 text-sm">Wrong password</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg font-semibold transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  // Authorized view
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111] border border-[#222] rounded-lg p-6 space-y-4">
        <h1 className="text-white text-xl font-bold">Apple Music Authorization</h1>
        <p className="text-slate-400 text-sm">
          Sign in with your Apple Music account to let visitors see what you&apos;re listening to.
          This only needs to be done once (or when the token expires).
        </p>

        <button
          onClick={handleAuthorize}
          disabled={status === "loading"}
          className="w-full px-4 py-3 bg-cyan-500 hover:bg-cyan-400 disabled:bg-slate-700 text-black disabled:text-slate-400 rounded-lg font-semibold transition-colors"
        >
          {status === "loading" ? "Authorizing..." : "Authorize Apple Music"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              status === "success"
                ? "text-green-400"
                : status === "error"
                ? "text-red-400"
                : "text-slate-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
