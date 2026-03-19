import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Arya Krishnan | Software Engineer",
  description:
    "Software Engineer at Atlassian. UC Berkeley CS & Economics. Building products that scale.",
  keywords: ["software engineer", "full stack", "Atlassian", "UC Berkeley"],
  icons: {
    icon: "/images/arya-profile.jpg",
    apple: "/images/arya-profile.jpg",
  },
  openGraph: {
    title: "Arya Krishnan | Software Engineer",
    description:
      "Software Engineer at Atlassian. UC Berkeley CS & Economics. Building products that scale.",
    images: ["/images/arya-profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={mono.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
