"use client";

import FadeInView from "@/components/ui/FadeInView";

const items = [
  "Weddings",
  "Sweet 16s",
  "Birthdays",
  "Parties",
];

export default function DJExperience() {
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
              marginBottom: "1.5rem",
              letterSpacing: "-0.02em",
            }}
          >
            Experience
          </h2>
        </FadeInView>

        <FadeInView delay={0.1}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.9rem",
              color: "#94a3b8",
              lineHeight: 1.9,
              maxWidth: "560px",
            }}
          >
            Experience in{" "}
            {items.map((item, i) => (
              <span key={item}>
                <span style={{ color: "#f5f0e8" }}>{item.toLowerCase()}</span>
                {i < items.length - 2 ? ", " : i === items.length - 2 ? ", and " : ""}
              </span>
            ))}
            {" "}since 2019.
          </p>
        </FadeInView>
      </div>
    </section>
  );
}
