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

const OG_IMAGE = "https://x2gu29gptmtx0gyc.public.blob.vercel-storage.com/dj/photos/4e.jpg";

export const metadata: Metadata = {
  title: "DJ Arya",
  description:
    "DJ Arya — 5+ years DJing private events. Weddings, birthdays, themed nights. Currently booking.",
  openGraph: {
    title: "DJ Arya",
    description:
      "5+ years DJing weddings, birthdays & themed nights. Currently booking.",
    images: [{ url: OG_IMAGE, width: 3444, height: 4590 }],
    type: "website",
    url: "https://dj.aryakrishnan.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "DJ Arya",
    description:
      "5+ years DJing weddings, birthdays & themed nights. Currently booking.",
    images: [OG_IMAGE],
  },
};

export default function DJLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${mono.variable}`}>
      {children}
    </div>
  );
}
