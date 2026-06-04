import type { Metadata } from "next";
import { Playfair_Display, JetBrains_Mono } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Arya — DJ & Producer | San Francisco",
  description:
    "DJ Arya — 5+ years DJing private events in the Bay Area. Weddings, birthdays, themed nights. Now booking for 2026.",
};

export default function DJLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
