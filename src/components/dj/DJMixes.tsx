"use client";

import FadeInView from "@/components/ui/FadeInView";

const mixes = [
  {
    title: "Christmas Set 12/13/25",
    url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2333054711&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    height: 300,
  },
  {
    title: "Bay Area Mix",
    url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2333054093&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    height: 300,
  },
  {
    title: "Afrobeats & House Mix",
    url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2333056463&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true",
    height: 300,
  },
  {
    title: "Halloween DJ Set — Hip-Hop / R&B / House / Pop",
    url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2207483395&color=%23000000&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true",
    height: 166,
  },
  {
    title: "Christmas Set 2",
    url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2333055755&color=%23000000&inverse=false&auto_play=false&show_user=true",
    height: 166,
  },
];

export default function DJMixes() {
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
            Mixes
          </h2>
        </FadeInView>

        {/* Visual mixes — 2 col grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.5rem",
            marginBottom: "1.5rem",
          }}
        >
          {mixes.slice(0, 2).map((mix) => (
            <FadeInView key={mix.title} delay={0.1}>
              <div
                style={{
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  border: "1px solid #2a2a2a",
                }}
              >
                <iframe
                  width="100%"
                  height={mix.height}
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay; encrypted-media"
                  src={mix.url}
                  style={{ display: "block" }}
                />
              </div>
            </FadeInView>
          ))}
        </div>

        {/* Third visual mix — full width */}
        <FadeInView delay={0.1}>
          <div
            style={{
              borderRadius: "0.5rem",
              overflow: "hidden",
              border: "1px solid #2a2a2a",
              marginBottom: "1.5rem",
            }}
          >
            <iframe
              width="100%"
              height={mixes[2].height}
              scrolling="no"
              frameBorder="no"
              allow="autoplay; encrypted-media"
              src={mixes[2].url}
              style={{ display: "block" }}
            />
          </div>
        </FadeInView>

        {/* Standard players — 2 col */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {mixes.slice(3).map((mix) => (
            <FadeInView key={mix.title} delay={0.1}>
              <div
                style={{
                  borderRadius: "0.5rem",
                  overflow: "hidden",
                  border: "1px solid #2a2a2a",
                }}
              >
                <iframe
                  width="100%"
                  height={mix.height}
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay; encrypted-media"
                  src={mix.url}
                  style={{ display: "block" }}
                />
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
