"use client";

import Image from "next/image";
import FadeInView from "@/components/ui/FadeInView";

const BLOB = "https://x2gu29gptmtx0gyc.public.blob.vercel-storage.com";

const photos = [
  `${BLOB}/dj/photos/1.jpg`,
  `${BLOB}/dj/photos/2b.jpg`,
  `${BLOB}/dj/photos/3.jpg`,
  `${BLOB}/dj/photos/4e.jpg`,
  `${BLOB}/dj/photos/5b.jpg`,
];

export default function DJPhotos() {
  return (
    <section style={{ backgroundColor: "#111", padding: "6rem 0" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        <FadeInView>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              fontStyle: "italic",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              color: "#f5f0e8",
              marginBottom: "3rem",
              letterSpacing: "-0.02em",
            }}
          >
            Events
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div className="columns-2 md:columns-3 gap-3">
            {photos.map((src, i) => (
              <div
                key={i}
                style={{
                  breakInside: "avoid",
                  marginBottom: "0.75rem",
                  borderRadius: "0.375rem",
                  overflow: "hidden",
                  border: "1px solid #2a2a2a",
                }}
              >
                <Image
                  src={src}
                  alt={`DJ Arya event ${i + 1}`}
                  width={600}
                  height={800}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
