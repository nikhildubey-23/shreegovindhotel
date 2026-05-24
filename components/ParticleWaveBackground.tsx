"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleWaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scene: THREE.Scene,
      camera: THREE.PerspectiveCamera,
      renderer: THREE.WebGLRenderer;
    let particles: THREE.Points,
      geometry: THREE.BufferGeometry,
      material: THREE.ShaderMaterial;
    let positions: Float32Array, originalPos: Float32Array;
    let animId: number;
    const mouse = { x: 0, y: 0 };
    const particleCount = 12000;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
      camera.position.set(0, 5, 20);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(innerWidth, innerHeight);
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setClearColor(0x050510);
      container.appendChild(renderer.domElement);

      geometry = new THREE.BufferGeometry();
      positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 120;
        const z = (Math.random() - 0.5) * 120;
        positions.set([x, 0, z], i * 3);

        const hue = 0.55 + Math.random() * 0.15;
        const col = new THREE.Color().setHSL(hue, 0.8, 0.6);
        colors.set([col.r, col.g, col.b], i * 3);
      }

      originalPos = positions.slice();

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const vertexShader = `
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 2.5 * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      const fragmentShader = `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - 0.5);
          if (dist > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0 - smoothstep(0.0, 0.5, dist) * 0.8);
        }
      `;

      material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        vertexColors: true,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const clock = new THREE.Clock();

      function animate() {
        animId = requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        for (let i = 0; i < particleCount; i++) {
          const x = originalPos[i * 3];
          const z = originalPos[i * 3 + 2];
          const dist = Math.sqrt(x * x + z * z);

          const wave =
            Math.sin(x * 0.15 + time * 1.5) * 2 +
            Math.cos(z * 0.1 + time * 1.2) * 1.5 +
            Math.sin((x + z) * 0.08 + time * 0.8) +
            (Math.sin(dist * 0.2 - time * 2) * 2) / (1 + dist * 0.05);

          positions[i * 3 + 1] = wave;

          const mx = mouse.x * 30;
          const mz = mouse.y * 30;
          const dx = x - mx;
          const dz = z - mz;
          const mouseDist = Math.sqrt(dx * dx + dz * dz);
          if (mouseDist < 10) {
            positions[i * 3 + 1] +=
              Math.cos(mouseDist * 0.5 - time * 3) * 3 * Math.exp(-mouseDist / 5);
          }
        }
        geometry.attributes.position.needsUpdate = true;

        camera.position.x += (mouse.x * 5 - camera.position.x) * 0.02;
        camera.position.y += (8 + mouse.y * 3 - camera.position.y) * 0.02;
        camera.lookAt(0, 0, 0);

        particles.rotation.y = time * 0.03;
        renderer.render(scene, camera);
      }

      animate();
    } catch (err) {
      console.error("ParticleWaveBackground error:", err);
    }

    const handleMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    };

    addEventListener("mousemove", handleMouse);
    addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      removeEventListener("mousemove", handleMouse);
      removeEventListener("resize", handleResize);
      if (renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
