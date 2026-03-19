"use client";

import { useState, useEffect } from "react";
import { LuEye } from "react-icons/lu";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("visited");

    const fetchCount = async () => {
      try {
        if (!hasVisited) {
          const res = await fetch("/api/visitor-count", { method: "POST" });
          const data = await res.json();
          setCount(data.count);
          sessionStorage.setItem("visited", "true");
        } else {
          const res = await fetch("/api/visitor-count");
          const data = await res.json();
          setCount(data.count);
        }
      } catch {
        // silently fail
      }
    };

    fetchCount();
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-1.5 text-slate-600 text-xs font-mono">
      <LuEye size={12} />
      <span>{count.toLocaleString()} visits</span>
    </div>
  );
}
