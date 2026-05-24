"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedText from "@/components/AnimatedText";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  facilities,
  testimonials,
  highlights,
  rooms,
  galleryImages,
  type Room,
} from "@/lib/data";


/* ─────────────────────────────────────────────
   RoomImageSlider
───────────────────────────────────────────── */
function RoomImageSlider({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-64 overflow-hidden group">
      <AnimatePresence>
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[index]}
            alt="Room"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((prev) => (prev - 1 + images.length) % images.length);
        }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(201,169,98,0.8)" }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft size={18} />
      </motion.button>

      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((prev) => (prev + 1) % images.length);
        }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(201,169,98,0.8)" }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight size={18} />
      </motion.button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Counter
───────────────────────────────────────────── */
function Counter({
  end,
  suffix = "",
  label,
}: {
  end: number;
  suffix?: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center"
    >
      <span className="text-5xl font-['Playfair_Display'] text-[#C9A962]">
        {count}
        {suffix}
      </span>
      <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{label}</p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>


      {/* ══ HERO ══ */}
      <section
        ref={heroRef}
        className="relative w-full h-screen overflow-hidden bg-gray-900"
      >
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ y }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="block md:hidden h-full w-full relative">
            <Image
              src="/mobilemainimg.png"
              alt="Hotel Hero Mobile"
              fill
              priority
              quality={75}
              className="object-fill"
              sizes="100vw"
            />
          </div>
          <div className="hidden md:block h-full w-full relative">
            <Image
              src="/mainimg.png"
              alt="Hotel Hero"
              fill
              priority
              quality={75}
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 bg-black/50 z-0" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-20 h-full w-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-4"
          >
            <span className="text-[#C9A962] tracking-[0.3em] text-sm uppercase font-medium">
              <span className="font-cursive text-xl not-italic">✦</span> Welcome to Hotel Shri Govind <span className="font-cursive text-xl not-italic">✦</span>
            </span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-4 drop-shadow-lg leading-tight">
            <span className="font-cursive text-[#C9A962] block text-6xl sm:text-8xl md:text-9xl lg:text-[8rem] mb-2 animate-gold-pulse">
              <AnimatedText text="Luxurious" delay={0.3} />
            </span>
            <span className="font-['Playfair_Display'] block tracking-wide">
              <AnimatedText text="Stay" delay={0.6} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 font-light tracking-wide"
          >
            A timeless sanctuary where every moment is wrapped in elegance, every detail whispers luxury, and your comfort is our cherished art.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gold-gradient text-gray-800 px-10 py-4 text-sm rounded-sm font-semibold tracking-[0.2em] animate-pulse-gold shadow-xl hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10">BOOK NOW</span>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 bg-[#C9A962] rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ HIGHLIGHTS — transparent, canvas shows through ══ */}
      <section className="py-20 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 0.1} scale={0.9}>
                <Counter end={item.number} suffix={item.suffix} label={item.label} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ROOMS ══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#C9A962] tracking-[0.2em] text-sm uppercase mb-4 block">
                Accommodations
              </span>
              <h2 className="text-3xl md:text-5xl text-white">
                <span className="font-cursive text-[#C9A962] text-4xl md:text-6xl block mb-2">Opulent</span>
                <span className="font-['Playfair_Display']">Luxurious Rooms</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rooms.map((room, index) => (
              <ScrollReveal key={room.id} delay={index * 0.2}>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: index * 0.3,
                  }}
                  whileHover={{
                    y: -15,
                    boxShadow: "0 20px 40px rgba(201,169,98,0.15)",
                    transition: { type: "spring", stiffness: 300, damping: 15 },
                  }}
                  className="group cursor-pointer rounded-lg overflow-hidden"
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <RoomImageSlider images={room.images} />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-[#C9A962] text-white px-3 py-1 text-xs font-semibold">
                        {room.type}
                      </span>
                    </div>
                    {room.available && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500/80 text-white px-2 py-1 text-xs">
                          Available
                        </span>
                      </div>
                    )}
                  </div>

                   <div className="bg-[#F5F3F0] dark:bg-[#0C101A] rounded-lg p-6">                                                                    
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-gray-800 dark:text-gray-100 font-['Playfair_Display'] text-xl">
                        {room.type} Room
                      </h3>
                      <div className="text-right">
                        <span className="text-[#C9A962] text-2xl font-['Playfair_Display']">
                          ₹{room.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          /night
                        </span>
                      </div>
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {room.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {room.amenities.slice(0, 4).map((amenity) => (
                        <motion.span
                          key={amenity}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(201,169,98,0.2)" }}
                          className="text-xs bg-white/5 text-gray-800/70 dark:text-gray-300 px-2 py-1 rounded transition-colors"
                        >
                          {amenity}
                        </motion.span>
                      ))}
                    </div>

                    <Link href="/contact">
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="text-gray-800 dark:text-gray-200 text-sm border-b border-[#C9A962] pb-1 group/book"
                      >
                        <span className="inline-block transition-transform duration-300 group-hover/book:translate-x-1">
                          Book Now →
                        </span>
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/rooms">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(201,169,98,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="border border-[#C9A962] text-[#C9A962] px-8 py-3 text-sm tracking-wider hover:bg-[#C9A962] hover:text-black transition-all duration-300"
              >
                VIEW ALL ROOMS
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-[#0C101A] max-w-4xl w-full max-h-[95vh] overflow-y-auto rounded-lg shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-80 overflow-hidden">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={selectedRoom.images[activeImageIndex]}
                    alt={selectedRoom.type}
                    fill
                    className="object-cover"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                <motion.button
                  onClick={() => setSelectedRoom(null)}
                  whileHover={{ scale: 1.1, backgroundColor: "#C9A962", color: "#fff" }}
                  className="absolute top-4 right-4 w-10 h-10 bg-[#141A28] rounded-full text-gray-200 transition-colors flex items-center justify-center text-xl"
                >
                  ×
                </motion.button>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#C9A962] text-white px-3 py-1 text-xs font-semibold">
                    {selectedRoom.type}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 p-4 justify-center bg-[#06080D] border-t border-[#1E2533]">
                {selectedRoom.images.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-24 h-20 relative rounded-lg overflow-hidden border-2 transition-all shadow-sm ${
                      activeImageIndex === idx ? "border-[#C9A962] ring-2 ring-[#C9A962]/30" : "border-[#1E2533] hover:border-[#C9A962]"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-gray-100 font-['Playfair_Display'] text-3xl mb-1">
                      {selectedRoom.type} Room
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[#C9A962] text-4xl font-['Playfair_Display']">
                      ₹{selectedRoom.price}
                    </span>
                    <span className="text-gray-400">/night</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">{selectedRoom.description}</p>

                <div className="mb-8">
                  <h4 className="text-gray-100 font-['Playfair_Display'] text-lg mb-3">
                    Amenities
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedRoom.amenities.map((amenity) => (
                      <motion.div
                        key={amenity}
                        whileHover={{ scale: 1.05, borderColor: "#C9A962" }}
                        className="flex items-center gap-2 text-sm text-gray-300 bg-[#141A28] px-4 py-2 rounded-lg border border-[#1E2533] transition-colors"
                      >
                        <span>{amenity}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(201,169,98,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="block text-center gold-gradient text-white px-8 py-4 text-sm font-semibold tracking-[0.2em] shadow-lg hover:shadow-xl transition-shadow rounded-sm relative overflow-hidden w-full"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/20"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                    <span className="relative z-10">BOOK THIS ROOM</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══ FACILITIES ══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#C9A962] tracking-[0.2em] text-sm uppercase mb-4 block">
                Amenities
              </span>
              <h2 className="text-3xl md:text-5xl text-white">
                <span className="font-cursive text-[#C9A962] text-4xl md:text-6xl block mb-2">Exquisite</span>
                <span className="font-['Playfair_Display']">World-Class Facilities</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <ScrollReveal key={facility.id} delay={index * 0.1}>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: index * 0.2,
                  }}
                  whileHover={{
                    y: -12,
                    boxShadow: "0 12px 30px rgba(201,169,98,0.18)",
                    transition: { type: "spring", stiffness: 300, damping: 15 },
                  }}
                   className="backdrop-blur-md bg-[#0C101A]/80 border border-white/10 p-8 text-center group cursor-pointer h-full flex flex-col items-center rounded-2xl"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-5xl mb-4 transition-transform duration-300"
                  >
                    {facility.icon}
                  </motion.div>
                  <h3 className="text-white font-['Playfair_Display'] text-xl mb-2">
                    {facility.name}
                  </h3>
                  <p className="text-white/70 text-sm line-clamp-2 min-h-[2.5rem] w-full">
                    {facility.description}
                  </p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#C9A962] tracking-[0.2em] text-sm uppercase mb-4 block">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-5xl text-white">
                <span className="font-cursive text-[#C9A962] text-4xl md:text-6xl block mb-2">Cherished</span>
                <span className="font-['Playfair_Display']">What Our Guests Say</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => {
              const cols = 3;
              const centerOffset = (index - Math.floor(cols / 2)) * 60;
              return (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: centerOffset, y: 40, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.7,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 3,
                      ease: "easeInOut",
                      delay: index * 0.3,
                    }}
                    whileHover={{
                      y: -12,
                      boxShadow: "0 12px 30px rgba(201,169,98,0.15)",
                      transition: { type: "spring", stiffness: 300, damping: 15 },
                    }}
                     className="bg-[#0C101A]/80 backdrop-blur-md border border-white/10 p-8 rounded-lg"
                  >
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="text-[#C9A962]"
                        >
                          ★
                        </motion.span>
                      ))}
                    </div>

                    <p className="text-white/80 mb-6 line-clamp-3 min-h-[72px] italic">
                      &quot;{testimonial.text}&quot;
                    </p>

                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                        style={{
                          backgroundColor: `hsl(${
                            testimonial.name
                              .split("")
                              .reduce((a, c) => a + c.charCodeAt(0), 0) % 360
                          }, 55%, 50%)`,
                        }}
                      >
                        {testimonial.name.charAt(0).toUpperCase()}
                      </motion.div>
                      <div>
                        <p className="text-white font-semibold">{testimonial.name}</p>
                        <p className="text-white/60 text-sm">{testimonial.location}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ GALLERY ══ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-[#C9A962] tracking-[0.2em] text-sm uppercase mb-4 block">
                Gallery
              </span>
              <h2 className="text-3xl md:text-5xl text-white">
                <span className="font-cursive text-[#C9A962] text-4xl md:text-6xl block mb-2">Timeless</span>
                <span className="font-['Playfair_Display']">Capturing Luxury</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.slice(0, 6).map((image, index) => (
              <ScrollReveal key={image.id} delay={index * 0.1}>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }}
                  className="relative h-48 md:h-64 [perspective:800px] cursor-pointer rounded-lg"
                >
                  <motion.div
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="relative w-full h-full [transform-style:preserve-3d]"
                  >
                    <div className="absolute inset-0 [backface-visibility:hidden] rounded-lg overflow-hidden border border-white/10">
                      <Image src={image.src} alt={image.alt} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>
                    <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-lg overflow-hidden border border-white/10">
                      <Image src={image.src} alt={image.alt} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
                    </div>
                  </motion.div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery">
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(201,169,98,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="border border-[#C9A962] text-[#C9A962] px-8 py-3 text-sm tracking-wider hover:bg-[#C9A962] hover:text-black transition-all duration-300 bg-white/5 backdrop-blur-sm"
              >
                VIEW ALL GALLERY
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ CTA — opaque, covers canvas ══ */}
      <section className="py-24 md:py-32 bg-[#FFFFFF] dark:bg-[#06080D] relative overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute inset-0 opacity-10"
        >
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#C9A962] blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#C9A962] blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </motion.div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl text-gray-800 dark:text-gray-100 mb-6">
              <span className="font-cursive text-[#C9A962] text-4xl md:text-6xl block mb-2">Enchanted</span>
              <span className="font-['Playfair_Display']">Ready for an Unforgettable Stay?</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg font-light">
              Surrender to the allure of grandeur. Reserve your sanctuary today and immerse yourself in the art of bespoke hospitality, where every whisper of luxury awaits your arrival.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(201,169,98,0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="gold-gradient text-black-deep px-10 py-4 text-sm font-semibold tracking-[0.2em] rounded-sm relative overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative z-10">BOOK NOW</span>
              </motion.button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}