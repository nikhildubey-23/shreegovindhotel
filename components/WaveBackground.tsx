"use client";

import { useEffect, useRef } from "react";

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function drawWave(
      offsetX: number,
      amplitude: number,
      frequency: number,
      speed: number,
      color: string,
      lineWidth: number,
      alpha: number
    ) {
      if (!ctx || !canvas) return;
      ctx.beginPath();
      const step = canvas.width / 100;
      for (let x = 0; x <= canvas.width; x += step) {
        const y =
          canvas.height / 2 +
          Math.sin((x + offsetX) * frequency + t * speed) * amplitude +
          Math.sin((x * 0.5 + offsetX * 0.3) * frequency * 0.7 + t * speed * 0.5) *
            amplitude *
            0.4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = color.replace("A", String(alpha));
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.stroke();
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const W = canvas.width;
      const H = canvas.height;
      const centerY = H * 0.5;
      const amp = Math.min(W, H) * 0.08;

      ctx.save();
      ctx.translate(0, centerY - H * 0.15);

      const waves = [
        { offset: 0, amp: amp * 0.35, freq: 0.008, speed: 0.3, color: "rgba(201, 169, 98, A)", width: 80, alpha: 0.04 },
        { offset: 200, amp: amp * 0.5, freq: 0.006, speed: 0.25, color: "rgba(212, 175, 55, A)", width: 50, alpha: 0.06 },
        { offset: 400, amp: amp * 0.4, freq: 0.01, speed: 0.35, color: "rgba(201, 169, 98, A)", width: 30, alpha: 0.08 },
        { offset: 600, amp: amp * 0.3, freq: 0.007, speed: 0.2, color: "rgba(232, 217, 168, A)", width: 15, alpha: 0.12 },
        { offset: 800, amp: amp * 0.25, freq: 0.012, speed: 0.4, color: "rgba(212, 175, 55, A)", width: 4, alpha: 0.25 },
      ];

      for (const w of waves) {
        drawWave(w.offset, w.amp, w.freq, w.speed, w.color, w.width, w.alpha);
      }

      ctx.restore();

      t += 0.008;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
}
