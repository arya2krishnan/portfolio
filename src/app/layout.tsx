import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Arya Krishnan | Software Engineer",
    template: "%s | Arya Krishnan",
  },
  description:
    "Arya Krishnan — Software Engineer at Atlassian, UC Berkeley CS & Economics graduate. Full-stack developer building products that scale. Based in San Francisco.",
  keywords: [
    "Arya Krishnan",
    "software engineer",
    "full stack developer",
    "Atlassian",
    "UC Berkeley",
    "San Francisco",
    "React",
    "TypeScript",
    "Java",
    "Python",
    "web developer",
    "portfolio",
  ],
  authors: [{ name: "Arya Krishnan", url: "https://aryakrishnan.dev" }],
  creator: "Arya Krishnan",
  metadataBase: new URL("https://aryakrishnan.dev"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/arya-profile.jpg",
    apple: "/images/arya-profile.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://aryakrishnan.dev",
    title: "Arya Krishnan | Software Engineer",
    description:
      "Software Engineer at Atlassian. UC Berkeley CS & Economics. Full-stack developer building products that scale.",
    siteName: "Arya Krishnan",
    images: [
      {
        url: "/images/arya-profile.jpg",
        width: 800,
        height: 800,
        alt: "Arya Krishnan",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arya Krishnan | Software Engineer",
    description:
      "Software Engineer at Atlassian. UC Berkeley CS & Economics. Full-stack developer building products that scale.",
    images: ["/images/arya-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Arya Krishnan",
    url: "https://aryakrishnan.dev",
    image: "https://aryakrishnan.dev/images/arya-profile.jpg",
    jobTitle: "Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Atlassian",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of California, Berkeley",
    },
    knowsAbout: [
      "Software Engineering",
      "Full Stack Development",
      "React",
      "TypeScript",
      "Java",
      "Python",
    ],
    sameAs: [
      "https://github.com/arya2krishnan",
      "https://linkedin.com/in/aryakrishnan",
    ],
  };

  return (
    <html lang="en" className={mono.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
