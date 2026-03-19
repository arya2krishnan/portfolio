"use client";

import { useState } from "react";
import { LuGraduationCap, LuChevronDown } from "react-icons/lu";
import { motion } from "framer-motion";
import { education } from "@/data/resume";
import SectionHeader from "@/components/ui/SectionHeader";
import FadeInView from "@/components/ui/FadeInView";
import Tag from "@/components/ui/Tag";

export default function Education() {
  const [showCourses, setShowCourses] = useState(false);

  return (
    <section id="education" className="py-8 sm:py-10 md:py-12 relative">
      <div className="section-container">
        <SectionHeader icon={LuGraduationCap} title="Education" />

        <FadeInView>
          <div className="glow-border bg-[#111] rounded-xl" style={{ padding: "clamp(1rem, 2vw, 1.5rem)" }}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h3 className="text-white font-semibold text-lg md:text-xl mb-2">{education.school}</h3>
                <p className="text-emerald-400/80 font-mono text-sm md:text-base mt-2">
                  {education.degrees.join(" | ")}
                </p>
              </div>
              <span className="text-slate-500 font-mono text-sm">{education.graduation}</span>
            </div>

            <button
              onClick={() => setShowCourses(!showCourses)}
              className="flex items-center gap-2 mt-6 text-slate-400 hover:text-emerald-400 transition-colors text-sm md:text-base font-mono"
            >
              <span>Relevant Coursework</span>
              <motion.div
                animate={{ rotate: showCourses ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <LuChevronDown size={14} />
              </motion.div>
            </button>

            <motion.div
              initial={false}
              animate={{
                height: showCourses ? "auto" : 0,
                opacity: showCourses ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2.5 md:gap-3 mt-4">
                {education.coursework.map((course) => (
                  <Tag key={course} label={course} />
                ))}
              </div>
            </motion.div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
