"use client";

import Image from "next/image";

interface MediaItemProps {
  src: string;
  alt: string;
  type: "image" | "video";
  fill?: boolean;
  className?: string;
  onClick?: () => void;
}

/**
 * Renders either an <Image> or <video> depending on type.
 * Used inside carousels and lightboxes to handle mixed media.
 */
export default function MediaItem({
  src,
  alt,
  type,
  fill = false,
  className = "",
  onClick,
}: MediaItemProps) {
  if (type === "video") {
    return (
      <video
        src={src}
        controls
        playsInline
        muted
        className={`${fill ? "w-full h-full object-cover" : ""} ${className}`}
        onClick={(e) => {
          if (onClick) {
            e.preventDefault();
            onClick();
          }
        }}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        onClick={onClick}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={800}
      className={`object-contain ${className}`}
      onClick={onClick}
    />
  );
}
