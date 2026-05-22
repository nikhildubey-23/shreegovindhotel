import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LuxuryScene3D from "@/components/LuxuryScene3D";
import WaveBackground from "@/components/WaveBackground";
import FloatingParticles from "@/components/FloatingParticles";

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
        <LuxuryScene3D />
        <WaveBackground />
        <FloatingParticles />
        <Navbar />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
