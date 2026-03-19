"use client";

import { useState } from "react";
import { LuMusic } from "react-icons/lu";
import { motion } from "framer-motion";
import Modal from "@/components/ui/Modal";
import Carousel from "@/components/ui/Carousel";
import AudioPlayer from "@/components/ui/AudioPlayer";
import { musicTracks } from "@/data/hobbies-media";

export default function MusicProductionCard() {
  const [open, setOpen] = useState(false);
  const hasTracks = musicTracks.length > 0;

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        onClick={() => hasTracks && setOpen(true)}
        className={`glow-border bg-[#111] rounded-xl flex flex-col items-center gap-4 md:gap-5 ${hasTracks ? "cursor-pointer" : "cursor-default"}`}
        style={{ padding: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
      >
        <LuMusic size={28} className="text-cyan-400/80" />
        <span className="text-slate-300 text-sm text-center">Music Production</span>
      </motion.div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Music Production">
        <Carousel
          items={musicTracks}
          renderItem={(track) => (
            <AudioPlayer src={track.src} title={track.title} artist={track.artist} />
          )}
        />
      </Modal>
    </>
  );
}
