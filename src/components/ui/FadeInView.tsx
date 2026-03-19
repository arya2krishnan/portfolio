"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}

const directionOffset = {
  up: { y: 30, x: 0 },
  down: { y: -30, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
};

export default function FadeInView({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: FadeInViewProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
