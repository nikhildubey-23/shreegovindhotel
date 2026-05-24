import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoldenEmbers from "@/components/GoldenEmbers";
import CosmoBackground from "@/components/CosmoBackground";

export const metadata: Metadata = {
  title: "Hotel O Shri Govind - A Luxury Hotel",
  description: "Experience luxury at Hotel O Shri Govind. Premium accommodations, world-class amenities, and unparalleled hospitality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <CosmoBackground />
        <GoldenEmbers />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
