"use client";

import { LuCode } from "react-icons/lu";
import { skillCategories } from "@/data/resume";
import SectionHeader from "@/components/ui/SectionHeader";
import FadeInView from "@/components/ui/FadeInView";

function SkillPill({ name, proficient }: { name: string; proficient: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-xs font-mono border transition-all hover:scale-105 hover:shadow-[0_0_12px_rgba(34,211,238,0.15)] cursor-default ${
        proficient
          ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/20"
          : "bg-[#1a1a1a] text-slate-400 border-[#222]"
      }`}
    >
      {proficient && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
      {name}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-8 sm:py-10 md:py-12 relative">
      <div className="section-container">
        <SectionHeader icon={LuCode} title="Skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-4xl">
          {skillCategories.map((cat, i) => (
            <FadeInView key={cat.category} delay={i * 0.1}>
              <div className="bg-[#111] border border-[#222] rounded-xl" style={{ padding: "clamp(1rem, 2vw, 1.5rem)" }}>
                <h3 className="text-white font-mono text-sm md:text-base mb-5 md:mb-6 uppercase tracking-wider">
                  {cat.category}
                </h3>
                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  {cat.skills.map((skill) => (
                    <SkillPill
                      key={skill.name}
                      name={skill.name}
                      proficient={skill.proficient}
                    />
                  ))}
                </div>
              </div>
            </FadeInView>
          ))}
        </div>

        <div className="mt-4 md:mt-6 flex items-center gap-6 text-xs text-slate-500 font-mono">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Proficient
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            Familiar
          </span>
        </div>
      </div>
    </section>
  );
}
