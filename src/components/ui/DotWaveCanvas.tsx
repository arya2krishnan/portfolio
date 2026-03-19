"use client";

import { useRef, useEffect } from "react";

interface DotWaveCanvasProps {
  className?: string;
}

export default function DotWaveCanvas({ className = "" }: DotWaveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let mouseX: number | null = null;
    let mouseY: number | null = null;
    let width = 0;
    let height = 0;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SPACING = 30;
    const DOT_RADIUS = 1.5;
    const MOUSE_RADIUS = 120;
    const MAX_DISPLACEMENT = 15;
    const BASE_OPACITY = 0.12;
    const BRIGHT_OPACITY = 0.35;

    function resize() {
      const rect = canvas!.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const dpr = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.scale(dpr, dpr);
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          // Base position
          let x = col * SPACING;
          let y = row * SPACING;

          // Wave animation (skip if reduced motion)
          if (!prefersReducedMotion) {
            y += Math.sin(time * 0.002 + col * 0.3 + row * 0.15) * 3;
            x += Math.cos(time * 0.001 + row * 0.2) * 1.5;
          }

          let opacity = BASE_OPACITY;

          // Mouse interaction
          if (mouseX !== null && mouseY !== null) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < MOUSE_RADIUS) {
              const force = (1 - dist / MOUSE_RADIUS);
              const displacement = force * MAX_DISPLACEMENT;
              const angle = Math.atan2(dy, dx);
              x += Math.cos(angle) * displacement;
              y += Math.sin(angle) * displacement;
              opacity = BASE_OPACITY + (BRIGHT_OPACITY - BASE_OPACITY) * force;
            }
          }

          ctx!.beginPath();
          ctx!.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(34, 211, 238, ${opacity})`;
          ctx!.fill();
        }
      }

      animationId = requestAnimationFrame(draw);
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouseX = null;
      mouseY = null;
    }

    function handleTouchMove(e: TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouseX = touch.clientX - rect.left;
        mouseY = touch.clientY - rect.top;
      }
    }

    function handleTouchEnd() {
      mouseX = null;
      mouseY = null;
    }

    // Debounced resize
    let resizeTimeout: ReturnType<typeof setTimeout>;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        const dpr = window.devicePixelRatio || 1;
        // Reset scale before re-applying
        ctx!.setTransform(1, 0, 0, 1, 0, 0);
        resize();
      }, 100);
    }

    resize();
    animationId = requestAnimationFrame(draw);

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimeout);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
