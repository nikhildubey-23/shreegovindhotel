"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedText from "@/components/AnimatedText";
import { galleryImages, GalleryImage } from "@/lib/data";

const categories = ["All", "Rooms", "Facilities", "Exterior"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (image: GalleryImage, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

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
            alt="Gallery Hero"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/50 z-0" />
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex items-center justify-center"
        >
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
                <span className="font-cursive text-xl not-italic">✦</span> Memories <span className="font-cursive text-xl not-italic">✦</span>
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl text-white">
              <span className="font-cursive text-[#C9A962] text-5xl md:text-7xl block mb-2">
                <AnimatedText text="Timeless" delay={0.3} />
              </span>
              <span className="font-['Playfair_Display'] block">
                <AnimatedText text="Our Gallery" delay={0.6} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              className="text-white/80 mt-4 text-lg font-light tracking-wide"
            >
              Framing elegance, one moment at a time
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 text-sm tracking-wider transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#C9A962] text-white"
                    : "glass  text-gray-200 hover:bg-black/10"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

     <section className="relative py-10 md:py-10 overflow-hidden">

  <div className="absolute inset-0">
    <motion.div
      animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
      className="absolute top-10 right-10 w-96 h-96 rounded-full bg-[#C9A962]/10 blur-3xl"
    />
    <motion.div
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
      transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
      className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#D4AF37]/8 blur-3xl"
    />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {filteredImages.map((image, index) => (
        <ScrollReveal key={image.id} delay={index * 0.05}>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut",
              delay: index * 0.15,
            }}
            className="break-inside-avoid [perspective:800px] cursor-pointer rounded-lg mb-4"
            onClick={() => openLightbox(image, index)}
          >
            <motion.div
              whileHover={{ rotateY: 180 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative w-full h-64 [transform-style:preserve-3d] rounded-lg overflow-hidden shadow-xl"
            >
              {/* Front */}
              <div className="absolute inset-0 [backface-visibility:hidden] rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-all duration-300" />
              </div>

              {/* Back */}
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#C9A962]/20" />
              </div>
            </motion.div>
          </motion.div>
        </ScrollReveal>
      ))}
    </div>
  </div>
</section>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative max-w-5xl w-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1, backgroundColor: "#C9A962", color: "#000" }}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 rounded-full text-gray-200 transition-colors flex items-center justify-center text-xl"
              >
                ×
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                whileHover={{ scale: 1.1, backgroundColor: "#C9A962", color: "#000" }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 rounded-full text-gray-200 transition-colors flex items-center justify-center text-2xl"
              >
                ←
              </motion.button>

              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                whileHover={{ scale: 1.1, backgroundColor: "#C9A962", color: "#000" }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 rounded-full text-gray-200 transition-colors flex items-center justify-center text-2xl"
              >
                →
              </motion.button>

              <div className="relative h-[80vh] flex items-center justify-center">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4"
              >
                <span className="text-gray-300 text-sm">
                  {currentIndex + 1} / {filteredImages.length}
                </span>
                <span className="bg-[#C9A962] text-black-deep px-3 py-1 text-xs">
                  {selectedImage.category}
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gray-100 mb-6">
              <span className="font-cursive text-[#C9A962] text-4xl md:text-5xl block mb-2">Cherish</span>
              <span className="font-['Playfair_Display']">Share Your Moments</span>
            </h2>
            <p className="text-gray-400 mb-8 font-light">
              Create lasting memories at Hotel O Shri Govind and share your enchanting experience with the world.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(201, 169, 98, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-block gold-gradient text-black-deep px-10 py-4 text-sm font-semibold tracking-[0.2em] transition-all duration-300"
            >
              BOOK YOUR STAY
            </motion.a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
