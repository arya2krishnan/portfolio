"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LuBriefcase, LuChevronDown } from "react-icons/lu";
import { experiences } from "@/data/resume";
import type { Experience as ExperienceType } from "@/data/resume";
import SectionHeader from "@/components/ui/SectionHeader";

function ExperienceCard({ exp, index }: { exp: ExperienceType; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-6 sm:pl-8 md:pl-10 pb-8 sm:pb-10 md:pb-12 last:pb-0"
    >
      {/* Timeline connector */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-[#222]" />
      <div
        className={`absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-[3.5px] ${
          index === 0 ? "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "bg-slate-600"
        }`}
      />

      <div
        onClick={() => setExpanded(!expanded)}
        className="glow-border bg-[#111] rounded-xl cursor-pointer group"
        style={{ padding: "clamp(1rem, 2vw, 1.5rem)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors mb-1">
              {exp.company}
            </h3>
            <p className="text-cyan-400/80 font-mono text-sm mb-1">{exp.role}</p>
            <p className="text-slate-500 text-sm mt-2">
              {exp.location} &middot; {exp.period}
            </p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-slate-500 mt-1"
          >
            <LuChevronDown size={18} />
          </motion.div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <ul className="mt-4 space-y-1.5 md:space-y-2">
            {exp.bullets.map((bullet, i) => (
              <li key={i} className="text-slate-400 text-xs md:text-sm flex items-start gap-2">
                <span className="text-cyan-400/60 mt-1.5 shrink-0">&#9656;</span>
                {bullet}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-8 sm:py-10 md:py-12 relative">
      <div className="section-container">
        <SectionHeader icon={LuBriefcase} title="Experience" />
        <div className="ml-0 sm:ml-4">
          {experiences.map((exp, i) => (
            <ExperienceCard key={`${exp.company}-${exp.period}`} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
