"use client";

import { useEffect, useRef } from "react";

export default function GoldenEmbers() {
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
        const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 200);
        camera.position.set(0, 0, 18);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.5;
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        const goldMat = new THREE.MeshPhysicalMaterial({
          color: 0xc5a55e, metalness: 1, roughness: 0.15, emissive: 0x332200, emissiveIntensity: 0.3,
        });
        const roseGoldMat = new THREE.MeshPhysicalMaterial({
          color: 0xb76e79, metalness: 1, roughness: 0.2, emissive: 0x221111, emissiveIntensity: 0.2,
        });
        const darkMetalMat = new THREE.MeshPhysicalMaterial({
          color: 0x222222, metalness: 0.9, roughness: 0.3, emissive: 0x111111, emissiveIntensity: 0.1,
        });

        const mainRing = new THREE.Mesh(new THREE.TorusGeometry(5, 0.4, 16, 80), goldMat);
        scene.add(mainRing);

        const innerRing = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.3, 16, 64), roseGoldMat);
        scene.add(innerRing);

        const outerRing = new THREE.Mesh(new THREE.TorusGeometry(6.5, 0.25, 16, 80), darkMetalMat);
        scene.add(outerRing);

        const teethGroup = new THREE.Group();
        const toothGeo = new THREE.BoxGeometry(0.3, 0.5, 0.6);
        for (let i = 0; i < 48; i++) {
          const angle = (i / 48) * Math.PI * 2;
          const tooth = new THREE.Mesh(toothGeo, goldMat);
          tooth.position.set(Math.cos(angle) * 5.2, Math.sin(angle) * 5.2, 0);
          tooth.rotation.z = angle;
          teethGroup.add(tooth);
        }
        scene.add(teethGroup);

        const hub = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.5, 0.5, 32), goldMat);
        hub.rotation.x = Math.PI / 2;
        scene.add(hub);

        const centerDetail = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.6, 32), darkMetalMat);
        centerDetail.rotation.x = Math.PI / 2;
        scene.add(centerDetail);

        const spokeGroup = new THREE.Group();
        for (let i = 0; i < 6; i++) {
          const spoke = new THREE.Mesh(new THREE.BoxGeometry(0.2, 3.2, 0.25), goldMat);
          spoke.rotation.z = (i / 6) * Math.PI * 2;
          spokeGroup.add(spoke);
        }
        scene.add(spokeGroup);

        const smallGears: { group: THREE.Group; angle: number; speed: number; radius: number }[] = [];
        for (let i = 0; i < 3; i++) {
          const gGroup = new THREE.Group();
          const gRing = new THREE.Mesh(
            new THREE.TorusGeometry(1.2, 0.15, 8, 32),
            i === 0 ? goldMat : i === 1 ? roseGoldMat : darkMetalMat
          );
          gGroup.add(gRing);

          for (let j = 0; j < 24; j++) {
            const a = (j / 24) * Math.PI * 2;
            const t = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.3, 0.3), gRing.material);
            t.position.set(Math.cos(a) * 1.3, Math.sin(a) * 1.3, 0);
            t.rotation.z = a;
            gGroup.add(t);
          }
          scene.add(gGroup);
          smallGears.push({ group: gGroup, angle: (i / 3) * Math.PI * 2, speed: 0.3 + i * 0.15, radius: 3.5 + i });
        }

        const particleCount = 3000;
        const pGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(particleCount * 3);
        const pData: { angle: number; r: number; speed: number; z: number }[] = [];

        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const r = 3 + Math.random() * 15;
          pPos[i * 3] = Math.cos(angle) * r;
          pPos[i * 3 + 1] = Math.sin(angle) * r;
          pPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
          pData.push({ angle, r, speed: 0.1 + Math.random() * 0.3, z: pPos[i * 3 + 2] });
        }
        pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));

        const pMat = new THREE.PointsMaterial({
          color: 0xc5a55e, size: 0.06, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        const strip = new THREE.Mesh(
          new THREE.TorusGeometry(7, 0.01, 8, 120),
          new THREE.MeshBasicMaterial({ color: 0xc5a55e, transparent: true, opacity: 0.2 })
        );
        scene.add(strip);

        scene.add(new THREE.AmbientLight(0x332211, 2));

        const keyLight = new THREE.DirectionalLight(0xfff5e0, 8);
        keyLight.position.set(5, 5, 5);
        scene.add(keyLight);

        const rimLight = new THREE.PointLight(0xc5a55e, 30, 50);
        rimLight.position.set(-5, -3, 5);
        scene.add(rimLight);

        const accentLight = new THREE.PointLight(0xb76e79, 20, 50);
        accentLight.position.set(5, -5, -3);
        scene.add(accentLight);

        const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
        const handleMouse = (e: MouseEvent) => {
          mouse.tx = (e.clientX / innerWidth) * 2 - 1;
          mouse.ty = -(e.clientY / innerHeight) * 2 + 1;
        };
        addEventListener("mousemove", handleMouse);

        let animId: number;

        const animate = () => {
          animId = requestAnimationFrame(animate);
          const t = performance.now() * 0.001;

          mouse.x += (mouse.tx * 3 - mouse.x) * 0.02;
          mouse.y += (mouse.ty * 2 - mouse.y) * 0.02;

          mainRing.rotation.z = t * 0.15;
          innerRing.rotation.z = -t * 0.25;
          outerRing.rotation.z = t * 0.1;
          teethGroup.rotation.z = t * 0.15;
          spokeGroup.rotation.z = t * 0.15;

          smallGears.forEach((g, i) => {
            g.angle += g.speed * 0.003;
            g.group.position.x = Math.cos(g.angle) * g.radius;
            g.group.position.y = Math.sin(g.angle) * g.radius;
            g.group.rotation.z = -t * (0.5 + i * 0.2);
          });

          const pp = pGeo.attributes.position.array as Float32Array;
          for (let i = 0; i < particleCount; i++) {
            const d = pData[i];
            d.angle += d.speed * 0.001;
            pp[i * 3] = Math.cos(d.angle) * d.r;
            pp[i * 3 + 1] = Math.sin(d.angle) * d.r;
            pp[i * 3 + 2] = d.z + Math.sin(t * d.speed + i) * 0.3;
          }
          pGeo.attributes.position.needsUpdate = true;

          strip.rotation.z = t * 0.05;
          strip.rotation.x = Math.sin(t * 0.2) * 0.15;

          camera.position.x += (mouse.tx * 3 - camera.position.x) * 0.02;
          camera.position.y += (mouse.ty * 2 - camera.position.y) * 0.02;
          camera.lookAt(0, 0, 0);

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
          removeEventListener("mousemove", handleMouse);
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
        console.error("GoldenEmbers init error:", err);
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
        zIndex: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}
