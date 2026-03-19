"use client";

import { useState } from "react";
import { LuCookingPot } from "react-icons/lu";
import { motion } from "framer-motion";
import Image from "next/image";
import Modal from "@/components/ui/Modal";
import Carousel from "@/components/ui/Carousel";
import Lightbox from "@/components/ui/Lightbox";
import { cookingImages } from "@/data/hobbies-media";

export default function CookingCard() {
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [carouselSync, setCarouselSync] = useState<number | undefined>(undefined);
  const hasImages = cookingImages.length > 0;

  return (
    <>
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        onClick={() => hasImages && setOpen(true)}
        className={`glow-border bg-[#111] rounded-xl flex flex-col items-center gap-4 md:gap-5 ${hasImages ? "cursor-pointer" : "cursor-default"}`}
        style={{ padding: "clamp(0.75rem, 1.5vw, 1.25rem)" }}
      >
        <LuCookingPot size={28} className="text-emerald-400/80" />
        <span className="text-slate-300 text-sm text-center">Cooking</span>
      </motion.div>

      <Modal isOpen={open} onClose={() => setOpen(false)} title="Cooking">
        <Carousel
          items={cookingImages}
          externalIndex={carouselSync}
          renderItem={(item, index) => (
            <div
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setLightboxIndex(index)}
            >
              {item.type === "video" ? (
                <video
                  src={item.src}
                  controls
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="(max-width: 640px) 90vw, 600px" />
              )}
            </div>
          )}
        />
      </Modal>

      <Lightbox
        images={cookingImages}
        startIndex={lightboxIndex >= 0 ? lightboxIndex : 0}
        isOpen={lightboxIndex >= 0}
        onClose={(finalIndex) => {
          setCarouselSync(finalIndex);
          setLightboxIndex(-1);
        }}
      />
    </>
  );
}
