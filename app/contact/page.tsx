"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import AnimatedText from "@/components/AnimatedText";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    roomType: "",
    guests: "1",
    message: "",
  });
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    
    const whatsappNumber = "919893519481"; 

    const text = `*New Booking Inquiry - Hotel Shri Govind*%0A%0A` +
                 `*Name:* ${formData.name}%0A` +
                 (formData.email ? `*Email:* ${formData.email}%0A` : "") +
                 `*Phone:* ${formData.phone}%0A` +
                 `*Guests:* ${formData.guests}%0A` +
                 `*Check-in:* ${formData.checkIn}%0A` +
                 `*Check-out:* ${formData.checkOut}%0A` +
                 `*Room Type:* ${formData.roomType}%0A` +
                 `*Message:* ${formData.message}`;

   
   const whatsappUrl = `https://wa.me/919893519481?text=${text}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            alt="Contact Hero"
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
                <span className="font-cursive text-xl not-italic">✦</span> Get in Touch <span className="font-cursive text-xl not-italic">✦</span>
              </span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl text-white">
              <span className="font-cursive text-[#C9A962] text-5xl md:text-7xl block mb-2">
                <AnimatedText text="Reach" delay={0.3} /> <AnimatedText text="Out" delay={0.5} />
              </span>
              <span className="font-['Playfair_Display'] block">
                <AnimatedText text="Contact Us" delay={0.7} />
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
              className="text-white/80 mt-4 text-lg font-light tracking-wide"
            >
              We await the pleasure of hearing from you
            </motion.p>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative py-24 md:py-32 overflow-hidden">

  <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#06080D] via-[#0C101A] to-[#06080D]">
    <motion.div
      animate={{ scale: [1, 1.3, 1], rotate: [0, 25, 0] }}
      transition={{ repeat: Infinity, duration: 13, ease: "easeInOut" }}
      className="absolute top-10 left-20 w-80 h-80 rounded-full bg-[#C9A962]/10 blur-3xl"
    />
    <motion.div
      animate={{ scale: [1.2, 1, 1.2], rotate: [0, -20, 0] }}
      transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
      className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#D4AF37]/8 blur-3xl"
    />
    <motion.div
      animate={{ y: [0, -20, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#B8860B]/5 blur-3xl"
    />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <ScrollReveal>
        <div>
          <span className="text-[#C9A962] tracking-[0.2em] text-sm uppercase mb-4 block">
            Booking Inquiry
          </span>

          <h2 className="text-3xl md:text-4xl text-white mb-6">
            <span className="font-cursive text-[#C9A962] text-4xl md:text-5xl block mb-2">Enquire</span>
            <span className="font-['Playfair_Display']">Reserve Your Stay</span>
          </h2>

          <p className="text-gray-300 mb-8 font-light tracking-wide">
            Complete the form below and our concierge team will personally attend to your reservation via WhatsApp.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm mb-2">
                  Name *
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-300 px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Email
                </label>

                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-300 px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors"
                  placeholder="your@email.com (optional)"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm mb-2">
                  Phone *
                </label>

                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-300 px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors"
                  placeholder="+91 9993917766"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Guests
                </label>

                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option
                      key={num}
                      value={num}
                      className="bg-[#0C101A]"
                    >
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm mb-2">
                  Check-in Date
                </label>

                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-white text-sm mb-2">
                  Check-out Date
                </label>

                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleChange}
                  className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-sm mb-2">
                Room Type
              </label>

              <select
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors"
              >
                <option value="" className="bg-[#0C101A]">
                  Select Room Type
                </option>

                <option value="Non-AC" className="bg-[#0C101A]">
                  Non AC Double bed (₹1000/night)
                </option>

                <option value="Standard" className="bg-[#0C101A]">
                  Standard (₹1200/night)
                </option>

                <option value="AC" className="bg-[#0C101A]">
                  AC Double Bed (₹1500/night)
                </option>

                <option value="Suite" className="bg-[#0C101A]">
                  Suite (₹2000/night)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-white text-sm mb-2">
                Message
              </label>

              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder:text-gray-300 px-4 py-3 focus:border-[#C9A962] focus:outline-none transition-colors resize-none"
                placeholder="Any special requests or inquiries?"
              />
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 20px rgba(201, 169, 98, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full gold-gradient text-white px-8 py-4 text-sm font-semibold tracking-[0.2em] shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
            >
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />

              <span className="relative z-10">
                SUBMIT INQUIRY
              </span>
            </motion.button>
          </form>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <div className="space-y-8">

          <div>
            <span className="text-[#C9A962] tracking-[0.2em] text-sm uppercase mb-4 block">
              Contact Information
            </span>

            <h2 className="text-3xl md:text-4xl text-white mb-6">
              <span className="font-cursive text-[#C9A962] text-4xl md:text-5xl block mb-2">Connect</span>
              <span className="font-['Playfair_Display']">Get In Touch</span>
            </h2>

            <p className="text-gray-300 mb-8 font-light tracking-wide">
              Have questions? Our concierge is at your service. Reach out through any of the channels below.
            </p>
          </div>

          <div className="space-y-6">

            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 8px 20px rgba(201, 169, 98, 0.15)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-lg"
            >
              <h3 className="text-white font-['Playfair_Display'] text-lg mb-2">
                📍 Address
              </h3>

              <p className="text-gray-300 text-sm">
                Hotel Shri Govind
                <br />
                Plot No. 01 Station Road In Front Of Chhattisgarh
                Gramin Bank Near Jagmal Chowk, Near Honda Showroom,
                Bilaspur
                <br />
                Chhattisgarh, India
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 8px 20px rgba(201, 169, 98, 0.15)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-lg"
            >
              <h3 className="text-white font-['Playfair_Display'] text-lg mb-2">
                📞 Phone
              </h3>

              <p className="text-gray-300 text-sm">
                +91 9893519481
                <br />
                +91 9993917766
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 8px 20px rgba(201, 169, 98, 0.15)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-lg"
            >
              <h3 className="text-white font-['Playfair_Display'] text-lg mb-2">
                ✉️ Email
              </h3>

              <p className="text-gray-300 text-sm">
                hotelshrigovind06@gmail.com
              </p>
            </motion.div>

            <motion.div
              whileHover={{
                y: -5,
                boxShadow: "0 8px 20px rgba(201, 169, 98, 0.15)",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-lg"
            >
              <h3 className="text-white font-['Playfair_Display'] text-lg mb-2">
                🧾 GSTIN
              </h3>

              <p className="text-gray-300 text-sm">
                22AATFH3393Q1ZL
              </p>
            </motion.div>
          </div>

          <motion.div
            whileHover={{
              y: -5,
              boxShadow: "0 8px 20px rgba(201, 169, 98, 0.15)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
            className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-lg"
          >
            <h3 className="text-white font-['Playfair_Display'] text-lg mb-4">
              🕐 Hours
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-300">
                  Front Desk
                </span>

                <p className="text-white">
                  24/7
                </p>
              </div>

              <div>
                <span className="text-gray-300">
                  Room Service
                </span>

                <p className="text-white">
                  24/7
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>

      {/* Map Section */}
      <section className="py-16 bg-[#0C101A]">
  <div className="max-w-7xl mx-auto px-6">
    <ScrollReveal>
      <div className="glass overflow-hidden relative group rounded-xl">
        <div className="relative h-[400px] w-full overflow-hidden rounded-xl">

          {/* Google Map */}
          <iframe
            src="https://www.google.com/maps?q=Hotel+O+Shri+Govind+Bilaspur&output=embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          />

        </div>
      </div>
    </ScrollReveal>

    {/* Nearby Highlights */}
    <div className="mt-12">
      <h3 className="text-2xl text-gray-800 dark:text-gray-100 text-center mb-8">
        <span className="font-cursive text-[#C9A962] text-3xl md:text-4xl block mb-1">Explore</span>
        <span className="font-['Playfair_Display']">Nearby Landmarks</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: "🚂", title: "Railway Station", desc: "Within 1 km - Easy access to Bilaspur Junction" },
          { icon: "🏥", title: "Life Care Hospital", desc: "Within 1 km - Medical assistance nearby" },
          { icon: "🛒", title: "Markets", desc: "Very close - Shopping & local markets nearby" },
        ].map((item, index) => (
          <ScrollReveal key={item.title} delay={index * 0.15}>
            <motion.div
              whileHover={{ y: -8, boxShadow: "0 12px 30px rgba(201, 169, 98, 0.12)" }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="glass p-6 text-center rounded-lg"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-4xl mb-3"
              >
                {item.icon}
              </motion.div>
              <h4 className="text-gray-800 dark:text-gray-100 font-semibold mb-2">
                {item.title}
              </h4>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {item.desc}
              </p>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  </div>
</section>
    </>
  );
}
