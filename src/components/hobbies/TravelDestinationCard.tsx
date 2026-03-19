"use client";

import { useState, useRef } from "react";
import { LuMapPin } from "react-icons/lu";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TravelDestination } from "@/data/resume";
import Modal from "@/components/ui/Modal";
import Carousel from "@/components/ui/Carousel";
import Lightbox from "@/components/ui/Lightbox";

export default function TravelDestinationCard({ dest }: { dest: TravelDestination }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [coverIndex, setCoverIndex] = useState(0);

  const hasPhotos = dest.photos.length > 0;

  // Find the first image (not video) for cover, falling back to coverIndex
  const coverPhoto = dest.photos[coverIndex] || dest.photos[0];
  const coverIsVideo = coverPhoto?.type === "video";

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        onClick={() => hasPhotos && setModalOpen(true)}
        className={`glow-border bg-[#111] rounded-lg overflow-hidden group ${hasPhotos ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Cover image or video thumbnail */}
        {hasPhotos && coverPhoto ? (
          <div className="relative aspect-video">
            {coverIsVideo ? (
              <video
                src={coverPhoto.src}
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <Image
                src={coverPhoto.src}
                alt={coverPhoto.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
          </div>
        ) : null}

        <div className="p-6 sm:p-8 md:p-10 flex items-center gap-3">
          <LuMapPin size={14} className="text-emerald-400/60" />
          <span className="text-white text-sm">{dest.location}</span>
          <span className="text-slate-500 text-xs">{dest.country}</span>
        </div>
      </motion.div>

      {/* Photo carousel modal */}
      {hasPhotos && (
        <>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title={dest.location}
          >
            <Carousel
              items={dest.photos}
              onIndexChange={(i) => setCoverIndex(i)}
              renderItem={(photo, index) => (
                <div
                  className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  {photo.type === "video" ? (
                    <video
                      src={photo.src}
                      controls
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 90vw, 700px"
                      className="object-cover"
                    />
                  )}
                </div>
              )}
            />
          </Modal>

          <Lightbox
            images={dest.photos}
            startIndex={lightboxIndex}
            isOpen={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />
        </>
      )}
    </>
  );
}
