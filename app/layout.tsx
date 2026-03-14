import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spark IDX — Real Estate Data for Vercel",
  description:
    "Connect MLS listing data from Spark API to your Next.js app. Headless IDX with ISR, image optimization, and full SEO.",
  openGraph: {
    title: "Spark IDX Integration for Vercel",
    description: "Headless IDX powered by Spark API + Vercel",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-sans/style.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/geist@1.3.1/dist/fonts/geist-mono/style.min.css"
        />
      </head>
      <body className="noise-overlay">{children}</body>
    </html>
  );
}
