"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string }[];
  startIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function Lightbox({
  images,
  startIndex = 0,
  isOpen,
  onClose,
}: LightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) setIndex(startIndex);
  }, [isOpen, startIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    },
    [onClose, images.length]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (typeof window === "undefined" || !isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
        onClick={() => {
          if (zoomed) setZoomed(false);
          else onClose();
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <LuX size={24} />
        </button>

        {/* Nav arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i - 1 + images.length) % images.length);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <LuChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIndex((i) => (i + 1) % images.length);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
            >
              <LuChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: zoomed ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.stopPropagation();
            setZoomed(!zoomed);
          }}
          className="relative max-w-[90vw] max-h-[85vh] cursor-zoom-in"
          style={{ cursor: zoomed ? "zoom-out" : "zoom-in" }}
        >
          <Image
            src={images[index].src}
            alt={images[index].alt}
            width={1200}
            height={800}
            className="object-contain max-h-[85vh] w-auto"
            priority
          />
        </motion.div>

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-mono">
            {index + 1} / {images.length}
          </div>
        )}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
