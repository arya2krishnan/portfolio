"use client";

import { useState } from "react";
import { LuMapPin } from "react-icons/lu";
import { motion } from "framer-motion";
import Image from "next/image";
import type { TravelDestination } from "@/data/resume";
import Modal from "@/components/ui/Modal";
import Carousel from "@/components/ui/Carousel";
import Lightbox from "@/components/ui/Lightbox";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export default function TravelDestinationCard({ dest }: { dest: TravelDestination }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const hasPhotos = dest.photos.length > 0;

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        onClick={() => hasPhotos && setModalOpen(true)}
        className={`glow-border bg-[#111] rounded-lg overflow-hidden group ${hasPhotos ? "cursor-pointer" : "cursor-default"}`}
      >
        {/* Cover image or placeholder */}
        {hasPhotos ? (
          <div className="relative aspect-video">
            <Image
              src={dest.photos[0].src}
              alt={dest.photos[0].alt}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <ImagePlaceholder label={`${dest.location} photo`} />
        )}

        <div className="p-6 sm:p-8 md:p-10 flex items-center gap-3">
          <LuMapPin size={14} className="text-cyan-400/60" />
          <span className="text-white text-sm">{dest.location}</span>
          <span className="text-slate-500 text-xs">{dest.country}</span>
          {hasPhotos && (
            <span className="ml-auto text-slate-600 text-xs font-mono">
              {dest.photos.length} photos
            </span>
          )}
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
              renderItem={(photo, index) => (
                <div
                  className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                  />
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
