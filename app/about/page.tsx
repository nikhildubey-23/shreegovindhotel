"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedText from "@/components/AnimatedText";

const timeline = [
  {
    year: "2015",
    title: "The Beginning",
    description: "Hotel O Shri Govind opened its doors to welcome guests seeking luxury and comfort.",
  },
  {
    year: "2018",
    title: "Major Renovation",
    description: "Underwent a complete transformation with state-of-the-art amenities and modern interiors.",
  },
  {
    year: "2020",
    title: "Recognition",
    description: "Awarded as the Best Luxury Hotel in the region by Hospitality Excellence Awards.",
  },
  {
    year: "2024",
    title: "Expansion",
    description: "Added new suites and facilities, cementing our position as the premier luxury destination.",
  },
];

const experiences = [
  {
    title: "Royal Accommodations",
    description: "12 meticulously designed rooms and suites offering the perfect blend of traditional elegance and modern comfort.",
    icon: "👑",
  },
  {
    title: "Culinary Excellence",
    description: "Our multi-cuisine restaurant presents a symphony of flavors crafted by master chefs.",
    icon: "🍴",
  },
  {
    title: "Wellness & Rejuvenation",
    description: "Indulge in our spa therapies and wellness treatments designed to restore your body and mind.",
    icon: "✨",
  },
  {
    title: "Impeccable Service",
    description: "Our dedicated staff ensures every detail of your stay is perfect, delivering 24/7 personalized service.",
    icon: "💫",
  },
];

export default function AboutPage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <section ref={heroRef} className="relative h-[60vh] overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ y }}
          className="absolute inset-0"
        >
          <Image
            src="/mainimg.png"
            alt="About Hero"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/50 z-0" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mb-4"
            >
              <span className="text-[#C9A962] tracking-[0.3em] text-sm uppercase mb-4 block">
                <span className="font-cursive text-xl not-italic">✦</span> Discover Our Story <span className="font-cursive text-xl not-italic">✦</span>
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl text-white">
              <span className="font-cursive text-[#C9A962] text-5xl md:text-7xl block mb-2">
                <AnimatedText text="Our" delay={0.3} /> <AnimatedText text="Legacy" delay={0.5} />
              </span>
              <span className="font-['Playfair_Display'] block">
                <AnimatedText text="About Us" delay={0.7} />
              </span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden">

  <div className="absolute inset-0">
    <motion.div
      animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
      transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#C9A962]/10 blur-3xl"
    />
    <motion.div
      animate={{ scale: [1.2, 1, 1.2], rotate: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
      className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#D4AF37]/8 blur-3xl"
    />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

      <ScrollReveal>
        <div className="relative">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute -top-4 -left-4 w-full h-full border-2 border-[#C9A962]"
          />

          <div className="relative h-[400px] lg:h-[500px] overflow-hidden rounded-xl">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/mainimg.png"
                alt="Hotel"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="backdrop-blur-md bg-white/10 border border-white/10 p-8 md:p-10 rounded-2xl">
          
          <span className="text-[#C9A962] tracking-[0.2em] text-sm uppercase mb-4 block">
            Our Story
          </span>

          <h2 className="text-3xl md:text-4xl text-white mb-6">
            <span className="font-cursive text-[#C9A962] text-4xl md:text-5xl block mb-2">A Legacy</span>
            <span className="font-['Playfair_Display']">of Luxury & Hospitality</span>
          </h2>

          <p className="text-white/80 mb-6 leading-relaxed font-light tracking-wide">
            Welcome to Hotel Shri Govind, where timeless luxury meets cherished tradition and every moment becomes an everlasting memory. Since our inception, we have devoted ourselves to curating an unparalleled experience of refined comfort and understated elegance.
          </p>

          <p className="text-white/70 mb-8 leading-relaxed font-light tracking-wide">
            Our estate stands as a testament to gracious hospitality, blending contemporary sophistication with the warmth of a bygone era. Each room is a sanctuary of tranquillity, every service a whispered promise of excellence.
          </p>

          <p className="text-[#C9A962] text-sm mt-4">
            Since 2026
          </p>
        </div>
      </ScrollReveal>

    </div>
  </div>
</section>

      <section className="py-20 px-6 md:px-10 relative overflow-hidden">
  <motion.div
    animate={{ scale: [1, 1.1, 1], rotate: [0, 3, 0] }}
    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    className="absolute inset-0 opacity-10"
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-3xl " />
  </motion.div>

  <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center text-center">
    <ScrollReveal>
      <h2 className="text-3xl md:text-4xl text-gray-100 mb-6 leading-tight">
        <span className="font-cursive text-[#C9A962] text-4xl md:text-5xl block mb-2">Indulge</span>
        <span className="font-['Playfair_Display']">Experience Luxury Firsthand</span>
      </h2>

      <p className="text-gray-400 mb-8 max-w-2xl mx-auto font-light">
        We cordially invite you to be our honoured guest and discover the enchanting magic of true hospitality.
      </p>

      <motion.a
        href="/rooms"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 20px rgba(201, 169, 98, 0.3)",
        }}
        whileTap={{ scale: 0.98 }}
        className="inline-block gold-gradient text-black-deep px-8 md:px-10 py-4 text-sm font-semibold tracking-[0.2em] transition-all duration-300"
      >
        EXPLORE ROOMS
      </motion.a>
    </ScrollReveal>
  </div>
</section>
    </>
  );
}
