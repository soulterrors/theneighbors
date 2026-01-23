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
          <Navbar />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}
