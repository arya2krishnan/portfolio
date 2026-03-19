"use client";

import { useState } from "react";
import { LuCoffee } from "react-icons/lu";
import { motion } from "framer-motion";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import Carousel from "@/components/ui/Carousel";
import { coffeeImages } from "@/data/hobbies-media";

export default function CoffeeCard() {
  const [open, setOpen] = useState(false);
  const hasImages = coffeeImages.length > 0;

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        onClick={() => hasImages && setOpen(true)}
        className={`glow-border bg-[#111] rounded-xl flex flex-col items-center gap-4 md:gap-5 ${hasImages ? "cursor-pointer" : "cursor-default"}`}
        style={{ padding: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
      >
        <LuCoffee size={28} className="text-cyan-400/80" />
        <span className="text-slate-300 text-sm text-center">Coffee</span>
      </motion.div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Coffee">
        <Carousel
          items={coffeeImages}
          renderItem={(img) => (
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                />
              </div>
              {img.description && (
                <p className="text-slate-400 text-sm text-center">{img.description}</p>
              )}
            </div>
          )}
        />
      </Modal>
    </>
  );
}
