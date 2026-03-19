"use client";

import Image from "next/image";
import { LuFolderGit2, LuAward, LuExternalLink } from "react-icons/lu";
import { projects } from "@/data/resume";
import type { Project } from "@/data/resume";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";
import FadeInView from "@/components/ui/FadeInView";
import Tag from "@/components/ui/Tag";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeInView delay={index * 0.1}>
      <TiltCard className="h-full flex flex-col">
        <div className="flex items-start justify-between mb-5 md:mb-6">
          <div className="flex items-center gap-3">
            {project.logo && (
              <Image
                src={project.logo}
                alt={`${project.name} logo`}
                width={32}
                height={32}
                className="rounded-lg object-contain"
              />
            )}
            <div>
              <h3 className="text-white font-semibold text-lg md:text-xl mb-1">{project.name}</h3>
              <p className="text-cyan-400/80 font-mono text-sm">{project.tagline}</p>
            </div>
          </div>
          {project.award && (
            <div className="flex items-center gap-1 text-yellow-400/80 text-xs font-mono shrink-0">
              <LuAward size={14} />
              <span>Winner</span>
            </div>
          )}
        </div>

        {project.award && (
          <p className="text-yellow-400/60 text-xs font-mono mb-5">{project.award}</p>
        )}

        <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Tag key={t} label={t} variant="accent" />
          ))}
        </div>

        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-mono transition-colors"
          >
            <LuExternalLink size={14} />
            View Project
          </a>
        )}
      </TiltCard>
    </FadeInView>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-8 sm:py-10 md:py-12 relative">
      <div className="section-container">
        <SectionHeader icon={LuFolderGit2} title="Projects" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
