"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none z-10">
        <defs>
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noise)" opacity="0.4" />
      </svg>

      <motion.div
        animate={{
          y: [0, -60, 40, -30, 0],
          x: [0, 50, -30, 20, 0],
          scale: [1, 1.15, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-48 top-10 h-[600px] w-[600px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(0,100,255,0.5) 0%, rgba(0,180,255,0.2) 40%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <motion.div
        animate={{
          y: [0, 50, -50, 20, -20, 0],
          x: [0, -30, 40, -40, 20, 0],
          scale: [1, 0.85, 1.15, 0.95, 1.08, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -left-40 bottom-10 h-[500px] w-[500px] rounded-full opacity-60"
        style={{
          background:
            "radial-gradient(circle, rgba(79,70,229,0.5) 0%, rgba(99,102,241,0.2) 40%, transparent 70%)",
          filter: "blur(140px)",
        }}
      />

      <motion.div
        animate={{
          y: [0, 70, -30, 50, -40, 0],
          x: [0, -50, 30, -20, 40, 0],
          scale: [1, 1.1, 0.85, 1.12, 0.92, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-48 top-0 h-[650px] w-[650px] rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(circle, rgba(0,150,255,0.5) 0%, rgba(0,200,255,0.15) 40%, transparent 70%)",
          filter: "blur(150px)",
        }}
      />

      <motion.div
        animate={{
          y: [0, -40, 60, -20, 30, 0],
          x: [0, 30, -40, 50, -20, 0],
          scale: [1, 0.9, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -right-32 bottom-20 h-[450px] w-[450px] rounded-full opacity-50"
        style={{
          background:
            "radial-gradient(circle, rgba(0,200,255,0.45) 0%, rgba(0,255,230,0.15) 40%, transparent 70%)",
          filter: "blur(130px)",
        }}
      />

      <motion.div
        animate={{
          y: [0, -30, 50, -50, 20, 0],
          x: [0, 40, -20, 30, -40, 0],
          scale: [1, 1.12, 0.92, 1.08, 0.88, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/3 top-1/4 h-[350px] w-[350px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(124,58,237,0.4) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <motion.div
        animate={{
          y: [0, 40, -40, 60, -20, 0],
          x: [0, -20, 50, -30, 20, 0],
          scale: [1, 0.88, 1.18, 0.92, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute right-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full opacity-35"
        style={{
          background:
            "radial-gradient(circle, rgba(0,229,255,0.4) 0%, rgba(0,255,255,0.12) 40%, transparent 70%)",
          filter: "blur(110px)",
        }}
      />

      <motion.div
        animate={{
          y: [0, -50, 30, -20, 50, 0],
          x: [0, 20, -40, 30, -30, 0],
          rotate: [0, 10, -10, 5, -5, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-1/2 top-2/3 h-[200px] w-[200px] rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(0,100,255,0.5) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        animate={{
          y: [0, 30, -20, 40, -30, 0],
          x: [0, -30, 20, -10, 30, 0],
          scale: [1, 1.05, 0.95, 1.08, 0.92, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute left-2/3 top-1/6 h-[250px] w-[250px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.45) 0%, transparent 70%)",
          filter: "blur(90px)",
        }}
      />

      <motion.div
        animate={{
          opacity: [0.15, 0.35, 0.1, 0.4, 0.2, 0.15],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0,100,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(0,200,255,0.08) 0%, transparent 50%)",
        }}
      />

      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.15, 0.45, 0.3, 0.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0,50,200,0.06) 0%, transparent 60%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none z-[5]"
        style={{
          boxShadow: "inset 0 0 150px rgba(0,0,0,0.6)",
        }}
      />
    </div>
  );
}
