"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  showDots?: boolean;
  showArrows?: boolean;
}

const SWIPE_THRESHOLD = 50;

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export default function Carousel<T>({
  items,
  renderItem,
  showDots = true,
  showArrows = true,
}: CarouselProps<T>) {
  const [[current, direction], setCurrent] = useState([0, 0]);

  const paginate = useCallback(
    (dir: number) => {
      setCurrent(([prev]) => {
        const next = (prev + dir + items.length) % items.length;
        return [next, dir];
      });
    },
    [items.length]
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
      else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
    },
    [paginate]
  );

  if (items.length === 0) return null;

  return (
    <div className="relative">
      {/* Slide area */}
      <div className="overflow-hidden relative min-h-[200px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
            className="w-full"
          >
            {renderItem(items[current], current)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      {showArrows && items.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-10"
          >
            <LuChevronLeft size={20} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-10"
          >
            <LuChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dots */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent([i, i > current ? 1 : -1])}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current
                  ? "bg-cyan-400 w-6"
                  : "bg-slate-600 hover:bg-slate-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
