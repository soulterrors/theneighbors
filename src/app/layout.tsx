import type { Metadata } from "next";
import { Inter, EB_Garamond } from 'next/font/google';
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

// Optimize font loading with next/font to prevent CLS and self-host fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-eb-garamond',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "The Neighbors | Coffee & Chapters",
  description: "A chill space for coffee and books.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${ebGaramond.variable}`}>
      <body className="antialiased">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:top-4 focus:left-4 focus:px-6 focus:py-3 focus:bg-[#ece9e1] focus:text-[#1c1c1c] focus:font-bold focus:shadow-lg focus:rounded-md transition-all"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="outline-none">{children}</main>
          <Footer />
      </body>
    </html>
  );
}
