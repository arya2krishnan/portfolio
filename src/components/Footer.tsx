"use client";

import { LuGithub, LuLinkedin, LuMail, LuHeart } from "react-icons/lu";
import { personalInfo } from "@/data/resume";
import VisitorCounter from "@/components/VisitorCounter";

const socialLinks = [
  { icon: LuGithub, href: personalInfo.github, label: "GitHub" },
  { icon: LuLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
  { icon: LuMail, href: `mailto:${personalInfo.email}`, label: "Email" },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#222] py-4 md:py-6">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 text-center md:text-left">
          <VisitorCounter />

          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-cyan-400 transition-colors"
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="text-slate-600 text-xs font-mono flex items-center gap-1">
            Made with <LuHeart size={12} className="text-cyan-400/60" /> by Arya Krishnan
          </p>
        </div>
      </div>
    </footer>
  );
}
