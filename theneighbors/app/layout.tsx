import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Import the component

export const metadata: Metadata = {
  title: "The Neighbors | Coffee & Books",
  description: "A chill space for coffee, books, and community.",
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
      </body>
    </html>
  );
}