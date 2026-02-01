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
            className="absolute left-4 top-4 z-[200] -translate-y-[150%] rounded bg-[#1c1c1c] px-4 py-2 text-sm font-medium text-[#fdfcf8] transition-transform focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-[#a68a56]"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
