import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";

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
    <html lang="en">
      <body className="antialiased">
          <Navbar />
          <main>{children}</main>
          <Footer />
      </body>
    </html>
  );
}