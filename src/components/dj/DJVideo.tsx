"use client";

import FadeInView from "@/components/ui/FadeInView";

export default function DJVideo() {
  const videoId = "JDhL6urJWtA";

  return (
    <section style={{ backgroundColor: "#0a0a0a", padding: "6rem 0" }}>
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
            Live
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: "0.5rem",
              border: "1px solid #2a2a2a",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="DJ Arya Live Set"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
