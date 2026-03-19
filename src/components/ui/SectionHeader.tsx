"use client";

import { motion } from "framer-motion";
import { type IconType } from "react-icons";

interface SectionHeaderProps {
  icon: IconType;
  title: string;
}

export default function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-3 mb-6 sm:mb-8 md:mb-10"
    >
      <Icon className="text-cyan-400" size={24} />
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">{title}</h2>
    </motion.div>
  );
}
