"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", name: "Facebook" },
    { icon: <FaInstagram />, href: "#", name: "Instagram" },
    { icon: <FaTwitter />, href: "#", name: "Twitter" },
  ];
  return (
    <footer className="bg-gradient-to-b from-[#0C101A] to-[#06080D] border-t border-[#C9A962]/10 relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#C9A962]/5 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none"
      />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-30 lg:gap-8">

          {/* Section 1: Brand & About */}
          <ScrollReveal>
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div>
                  <h2 className=" text-gray-100 font-['Playfair_Display'] text-xl font-semibold leading-relaxed tracking-wider">
                    Hotel Shri Govind
                  </h2>
                  <p className="text-[#C9A962] text-xs tracking-widest uppercase">A Luxury Hotel</p>
                </div>
              </Link>
              <p className=" text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
                Experience the pinnacle of luxury hospitality. Where every moment is
                crafted to perfection, and every guest is family.
              </p>
             <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, backgroundColor: "#C9A962", color: "#fff", y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 border border-[#D4CFC5] border-[#30363D] flex items-center justify-center  text-gray-300 transition-colors duration-300 rounded-sm"
                    aria-label={social.name}
                  >
                    <span className="text-lg">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Section 2: Quick Links */}
          <ScrollReveal delay={0.15}>
            <div className="flex flex-col md:items-center">
              <div className="w-full md:w-fit">
                <h3 className=" text-gray-100 font-['Playfair_Display'] text-lg mb-6">Quick Links</h3>
                <ul className="space-y-4">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About Us", href: "/about" },
                    { name: "Our Rooms", href: "/rooms" },
                    { name: "Gallery", href: "/gallery" },
                    { name: "Contact", href: "/contact" },
                  ].map((link) => (
                    <motion.li key={link.name} whileHover={{ x: 5 }}>
                      <Link
                        href={link.href}
                        className=" text-gray-400 hover:text-[#C9A962] transition-all text-sm flex items-center gap-2 group"
                      >
                        <span className="h-[1px] w-0 bg-[#C9A962] transition-all group-hover:w-3"></span>
                        {link.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Section 3: Contact Info */}
          <ScrollReveal delay={0.3}>
            <div className="lg:col-span-1">
              <h3 className="text-gray-900 text-gray-100 font-['Playfair_Display'] text-lg mb-6">Contact Info</h3>
              <ul className="space-y-6 text-sm">
                <li className="flex flex-col gap-1">
                  <span className="text-[#C9A962] font-medium uppercase text-[10px] tracking-[0.2em]">Address</span>
                  <p className=" text-gray-400 leading-relaxed">
                    Plot No. 01 Station Road In Front Of Chhattisgarh Gramin Bank Near Jagmal Chowk, Near Honda Showroom, Bilaspur<br /> Chhattisgarh, India
                  </p>
                  <motion.a
                    href="https://www.google.com/maps/place/Hotel+O+Shri+Govind/@22.0701414,82.1708773,17.06z/data=!4m9!3m8!1s0x3a280b2ff547e43f:0x3fc9ce6df66adff!5m2!4m1!1i2!8m2!3d22.0700981!4d82.1734423!16s%2Fg%2F11y_w_h3dm?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="text-[#C9A962] text-xs mt-2 hover:underline inline-block"
                  >
                    📍 View on Map
                  </motion.a>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-[#C9A962] font-medium uppercase text-[10px] tracking-[0.2em]">Contact Details</span>
                  <p className=" text-gray-400">+91 9893519481 <br/>+91 9993917766
                  </p>
                  <p className=" text-gray-400">hotelshrigovind06@gmail.com</p>
                </li>
                <li className="flex flex-col gap-1">
                  <span className="text-[#C9A962] font-medium uppercase text-[10px] tracking-[0.2em]">Identification</span>
                  <p className=" text-gray-400">GSTIN: 22AATFH3393Q1ZL</p>
                </li>
              </ul>
            </div>
          </ScrollReveal>

        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="border-t border-[#E5E0D8] border-[#30363D] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className=" text-gray-400 text-xs tracking-wide">
            &copy; {currentYear} HOTEL SHRI GOVIND. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="#" className=" text-gray-400 hover:text-[#C9A962] text-xs transition-colors uppercase tracking-widest">
              Privacy Policy
            </Link>
            <Link href="#" className=" text-gray-400 hover:text-[#C9A962] text-xs transition-colors uppercase tracking-widest">
              Terms & Conditions
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
