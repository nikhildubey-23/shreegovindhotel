"use client";

import { useEffect, useRef } from "react";

export default function CosmoBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let cleanup: (() => void) | null = null;

    const init = async () => {
      try {
        const THREE = await import("three");

        const w = innerWidth;
        const h = innerHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
        camera.position.set(0, 0, 30);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const colors = [
          new THREE.Color(0xffffff),
          new THREE.Color(0xaaccff),
          new THREE.Color(0xccddff),
          new THREE.Color(0xffccdd),
          new THREE.Color(0xccaaff),
        ];

        const starCount = 4000;
        const starGeo = new THREE.BufferGeometry();
        const starPos = new Float32Array(starCount * 3);
        const starSizes = new Float32Array(starCount);
        const starColorArr = new Float32Array(starCount * 3);
        const starData: { baseSize: number; twinkleSpeed: number; twinkleOffset: number }[] = [];

        for (let i = 0; i < starCount; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 20 + Math.random() * 80;

          starPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
          starPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
          starPos[i * 3 + 2] = Math.cos(phi) * r;

          const size = 0.02 + Math.random() * 0.08;
          starSizes[i] = size;

          const col = colors[Math.floor(Math.random() * colors.length)];
          starColorArr[i * 3] = col.r;
          starColorArr[i * 3 + 1] = col.g;
          starColorArr[i * 3 + 2] = col.b;

          starData.push({
            baseSize: size,
            twinkleSpeed: 0.5 + Math.random() * 2,
            twinkleOffset: Math.random() * Math.PI * 2,
          });
        }

        starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
        starGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));
        starGeo.setAttribute("color", new THREE.BufferAttribute(starColorArr, 3));

        const starMat = new THREE.PointsMaterial({
          size: 0.08,
          vertexColors: true,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        });
        const starField = new THREE.Points(starGeo, starMat);
        scene.add(starField);

        const glowStarCount = 200;
        const glowGeo = new THREE.BufferGeometry();
        const glowPos = new Float32Array(glowStarCount * 3);
        const glowSizes = new Float32Array(glowStarCount);
        const glowColors = new Float32Array(glowStarCount * 3);

        for (let i = 0; i < glowStarCount; i++) {
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 15 + Math.random() * 60;

          glowPos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
          glowPos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
          glowPos[i * 3 + 2] = Math.cos(phi) * r;

          glowSizes[i] = 0.15 + Math.random() * 0.35;

          const hue = 0.65 + Math.random() * 0.25;
          const col = new THREE.Color().setHSL(hue, 0.8, 0.6 + Math.random() * 0.3);
          glowColors[i * 3] = col.r;
          glowColors[i * 3 + 1] = col.g;
          glowColors[i * 3 + 2] = col.b;
        }

        glowGeo.setAttribute("position", new THREE.BufferAttribute(glowPos, 3));
        glowGeo.setAttribute("size", new THREE.BufferAttribute(glowSizes, 1));
        glowGeo.setAttribute("color", new THREE.BufferAttribute(glowColors, 3));

        const glowMat = new THREE.PointsMaterial({
          size: 0.3,
          vertexColors: true,
          transparent: true,
          opacity: 0.6,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        });
        const glowStars = new THREE.Points(glowGeo, glowMat);
        scene.add(glowStars);

        const nebulaGroup = new THREE.Group();
        const nebulaColors = [
          new THREE.Color(0x442266),
          new THREE.Color(0x224488),
          new THREE.Color(0x662244),
          new THREE.Color(0x335577),
        ];

        for (let i = 0; i < 8; i++) {
          const size = 8 + Math.random() * 14;
          const geo = new THREE.SphereGeometry(size, 16, 16);
          const col = nebulaColors[i % nebulaColors.length].clone();
          col.multiplyScalar(0.08 + Math.random() * 0.06);
          const mat = new THREE.MeshBasicMaterial({
            color: col,
            transparent: true,
            opacity: 0.15 + Math.random() * 0.15,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
          });
          const mesh = new THREE.Mesh(geo, mat);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          const r = 20 + Math.random() * 30;
          mesh.position.set(
            Math.sin(phi) * Math.cos(theta) * r,
            Math.sin(phi) * Math.sin(theta) * r * 0.5,
            Math.cos(phi) * r * 0.6
          );
          mesh.scale.set(1, 0.4 + Math.random() * 0.4, 1);
          nebulaGroup.add(mesh);
        }
        scene.add(nebulaGroup);

        const glowRing = new THREE.Mesh(
          new THREE.RingGeometry(12, 14, 64),
          new THREE.MeshBasicMaterial({
            color: 0x6644aa,
            transparent: true,
            opacity: 0.06,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
          })
        );
        glowRing.rotation.x = -Math.PI / 3;
        scene.add(glowRing);

        const glowRing2 = new THREE.Mesh(
          new THREE.RingGeometry(18, 20, 64),
          new THREE.MeshBasicMaterial({
            color: 0x4488cc,
            transparent: true,
            opacity: 0.04,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
          })
        );
        glowRing2.rotation.x = Math.PI / 4;
        glowRing2.rotation.y = Math.PI / 6;
        scene.add(glowRing2);

        let animId: number;

        const animate = () => {
          animId = requestAnimationFrame(animate);
          const t = performance.now() * 0.001;

          starField.rotation.y = t * 0.008;
          starField.rotation.x = Math.sin(t * 0.003) * 0.05;
          glowStars.rotation.y = t * 0.008;
          glowStars.rotation.x = Math.sin(t * 0.003) * 0.05;

          nebulaGroup.rotation.y = t * 0.005;
          nebulaGroup.rotation.x = Math.sin(t * 0.002) * 0.03;

          glowRing.rotation.z = t * 0.01;
          glowRing2.rotation.z = -t * 0.008;

          const sizes = starGeo.attributes.size.array as Float32Array;
          for (let i = 0; i < starCount; i++) {
            const d = starData[i];
            sizes[i] = d.baseSize * (0.5 + 0.5 * Math.sin(t * d.twinkleSpeed + d.twinkleOffset));
          }
          starGeo.attributes.size.needsUpdate = true;

          const glowSizesArr = glowGeo.attributes.size.array as Float32Array;
          for (let i = 0; i < glowStarCount; i++) {
            glowSizesArr[i] = (0.15 + Math.random() * 0.35) * (0.6 + 0.4 * Math.sin(t * (0.3 + Math.random() * 0.3) + i));
          }
          glowGeo.attributes.size.needsUpdate = true;

          renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
          camera.aspect = innerWidth / innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(innerWidth, innerHeight);
        };
        addEventListener("resize", handleResize);

        cleanup = () => {
          cancelAnimationFrame(animId);
          removeEventListener("resize", handleResize);
          if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
          scene.traverse((obj) => {
            const o = obj as any;
            if (o.geometry) o.geometry.dispose();
            if (o.material) {
              if (Array.isArray(o.material)) o.material.forEach((m: any) => m.dispose());
              else o.material.dispose();
            }
          });
          renderer.dispose();
        };
      } catch (err) {
        console.error("CosmoBackground init error:", err);
      }
    };

    init();
    return () => { if (cleanup) cleanup(); };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -2,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
