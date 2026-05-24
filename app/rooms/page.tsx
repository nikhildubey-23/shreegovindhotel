"use client";

import { useState , useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedText from "@/components/AnimatedText";
import { rooms, Room } from "@/lib/data";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

      {/* Left Arrow */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((prev) => (prev - 1 + images.length) % images.length);
        }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(201, 169, 98, 0.8)" }}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft size={18} />
      </motion.button>

      {/* Right Arrow */}
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setIndex((prev) => (prev + 1) % images.length);
        }}
        whileHover={{ scale: 1.1, backgroundColor: "rgba(201, 169, 98, 0.8)" }}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight size={18} />
      </motion.button>
    </div>
  );
}

const roomTypes = ["Classic", "Standard", "Suite"];

const amenityIcons: Record<string, string> = {
  WiFi: "📶",
  TV: "📺",
  AC: "❄️",
  "Mini Fridge": "🧊",
  "Room Service": "🛎️",
  Safe: "🔐",
  "Clean Bedding": "🛏️",
  "Attached Bathroom": "🚿",
  "Living Area": "🛋️",
  "Premium Bath": "🛁",
  Balcony: "🌅",
};

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const allRooms = rooms;

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
            alt="Rooms Hero"
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
                <span className="font-cursive text-xl not-italic">✦</span> Accommodations <span className="font-cursive text-xl not-italic">✦</span>
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl text-white">
              <span className="font-cursive text-[#C9A962] text-5xl md:text-7xl block mb-2">
                <AnimatedText text="Opulent" delay={0.3} />
              </span>
              <span className="font-['Playfair_Display'] block">
                <AnimatedText text="Our Rooms & Suites" delay={0.6} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              className="text-white/80 mt-4 text-lg font-light tracking-wide"
            >
              Where every stay is a masterpiece of comfort
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

    <section className="relative py-10 md:py-10 overflow-hidden">

  <div className="absolute inset-0">
    <motion.div
      animate={{ scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
      transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
      className="absolute top-40 left-20 w-80 h-80 rounded-full bg-[#C9A962]/8 blur-3xl"
    />
    <motion.div
      animate={{ scale: [1.1, 1, 1.1], x: [0, 30, 0] }}
      transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      className="absolute bottom-10 right-20 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl"
    />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <AnimatePresence mode="wait">
      <motion.div
        key="rooms"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {allRooms.map((room, index) => (
          <ScrollReveal key={room.id} delay={index * 0.1}>
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
                boxShadow: "0 20px 40px rgba(201, 169, 98, 0.15)",
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                },
              }}
              className="group cursor-pointer rounded-lg overflow-hidden backdrop-blur-md"
              onClick={() => setSelectedRoom(room)}
            >
              <div className="relative h-64 overflow-hidden">
                <RoomImageSlider images={room.images} />

                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />

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

              <div className="bg-white/10 bg-black/30 backdrop-blur-lg border border-white/10 rounded-b-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-white font-['Playfair_Display'] text-xl">
                      {room.type} Room
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[#C9A962] text-2xl font-['Playfair_Display']">
                      ₹{room.price}
                    </span>

                    <span className="text-white/70 text-sm">
                      /night
                    </span>
                  </div>
                </div>

                <p className="text-white/70 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {room.amenities.slice(0, 4).map((amenity) => (
                    <motion.span
                      key={amenity}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(201, 169, 98, 0.2)",
                      }}
                      className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded transition-colors"
                    >
                      {amenity}
                    </motion.span>
                  ))}

                  {room.amenities.length > 4 && (
                    <span className="text-xs text-[#C9A962]">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>

                <Link href="/contact">
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-[#C9A962] text-sm border-b border-[#C9A962] pb-1 group/book"
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
      </motion.div>
    </AnimatePresence>
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
               className="bg-[#FDFBF7] bg-[#0C101A] max-w-4xl w-full max-h-[95vh] overflow-y-auto rounded-lg shadow-xl"
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

              {/* Image Gallery Navigation */}
               <div className="flex gap-3 p-4 justify-center bg-[#06080D] border-t border-gray-200 border-[#1E2533]">
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
                    <h3 className="text-gray-800 text-gray-100 font-['Playfair_Display'] text-3xl mb-1">
                      {selectedRoom.type} Room
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[#C9A962] text-4xl font-['Playfair_Display']">
                      ₹{selectedRoom.price}
                    </span>
                    <span className="text-gray-500 text-gray-400">/night</span>
                  </div>
                </div>

                <p className="text-gray-600 text-gray-300 mb-6">{selectedRoom.description}</p>

                <div className="mb-8">
                  <h4 className="text-gray-800 text-gray-100 font-['Playfair_Display'] text-lg mb-3">
                    Amenities
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedRoom.amenities.map((amenity) => (
                      <motion.div
                        key={amenity}
                        whileHover={{ scale: 1.05, borderColor: "#C9A962" }}
                         className="flex items-center gap-2 text-sm text-gray-300 bg-[#141A28] px-4 py-2 rounded-lg border border-[#1E2533] transition-colors"
                      >
                        <span>{amenityIcons[amenity] || "✓"}</span>
                        {amenity}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(201, 169, 98, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="block text-center gold-gradient text-white px-8 py-4 text-sm font-semibold tracking-[0.2em] shadow-lg hover:shadow-xl transition-shadow rounded-sm relative overflow-hidden"
                >
                  <motion.span
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <span className="relative z-10">BOOK THIS ROOM</span>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl text-gray-100 mb-6">
              <span className="font-cursive text-[#C9A962] text-4xl md:text-5xl block mb-2">Concierge</span>
              <span className="font-['Playfair_Display']">Need Assistance?</span>
            </h2>
            <p className="text-gray-400 mb-8 font-light">
              Our dedicated team is at your service to curate the perfect room for your sojourn.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(201, 169, 98, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="inline-block gold-gradient text-black-deep px-8 md:px-10 py-4 text-sm font-semibold tracking-[0.2em] transition-all duration-300"
            >
              CONTACT US
            </motion.a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
