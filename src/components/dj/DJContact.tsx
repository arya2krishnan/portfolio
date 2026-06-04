"use client";

import { motion } from "framer-motion";
import { LuMail, LuInstagram } from "react-icons/lu";
import FadeInView from "@/components/ui/FadeInView";

const contacts = [
  {
    label: "Email",
    value: "arkadebeatss@gmail.com",
    href: "mailto:arkadebeatss@gmail.com",
    icon: LuMail,
  },
  {
    label: "Instagram",
    value: "@arya.krishnaan",
    href: "https://instagram.com/arya.krishnaan",
    icon: LuInstagram,
  },
];

export default function DJContact() {
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
              marginBottom: "0.75rem",
              letterSpacing: "-0.02em",
            }}
          >
            Booking
          </h2>
          <div style={{ marginBottom: "3rem" }} />
        </FadeInView>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            maxWidth: "480px",
          }}
        >
          {contacts.map(({ label, value, href, icon: Icon }, i) => (
            <FadeInView key={label} delay={i * 0.1}>
              <motion.a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ backgroundColor: "#f59e0b", color: "#0a0a0a" }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.25rem 1.5rem",
                  border: "1px solid rgba(245,158,11,0.4)",
                  borderRadius: "0.5rem",
                  color: "#f5f0e8",
                  textDecoration: "none",
                  transition: "background-color 0.2s, color 0.2s",
                }}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      opacity: 0.6,
                      marginBottom: "0.15rem",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </p>
                </div>
              </motion.a>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
