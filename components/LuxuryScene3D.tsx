"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles as DreiSparkles } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  position,
  rotationSpeed,
  shape,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  rotationSpeed: number;
  shape: "octahedron" | "torus" | "icosahedron" | "ring";
  color: string;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.3;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.5;
      meshRef.current.rotation.z += delta * rotationSpeed * 0.2;
    }
  });

  const Geometry = useMemo(() => {
    switch (shape) {
      case "octahedron":
        return <octahedronGeometry args={[1.2 * scale, 0]} />;
      case "torus":
        return <torusGeometry args={[1.2 * scale, 0.35 * scale, 16, 32]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1 * scale, 0]} />;
      case "ring":
        return <ringGeometry args={[0.8 * scale, 1.4 * scale, 32]} />;
    }
  }, [shape, scale]);

  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {Geometry}
        <MeshDistortMaterial
          color={color}
          metalness={0.9}
          roughness={0.15}
          distort={0.15}
          speed={2}
          transparent
          opacity={0.85}
          envMapIntensity={1.5}
        />
      </mesh>
    </Float>
  );
}

function Sparkles() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group ref={ref}>
      <DreiSparkles
        count={100}
        scale={15}
        size={0.8}
        speed={0.3}
        opacity={0.4}
        color="#C9A962"
      />
      <DreiSparkles
        count={80}
        scale={10}
        size={0.5}
        speed={0.2}
        opacity={0.3}
        color="#D4AF37"
        position={[2, -1, -3]}
      />
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#C9A962" />
      <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#D4AF37" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#E8D9A8" />

      <FloatingShape
        position={[-3.5, 1.5, -2]}
        rotationSpeed={0.8}
        shape="octahedron"
        color="#C9A962"
        scale={1}
      />
      <FloatingShape
        position={[3.8, -1, -3]}
        rotationSpeed={0.6}
        shape="torus"
        color="#D4AF37"
        scale={0.9}
      />
      <FloatingShape
        position={[-2, -2.5, -4]}
        rotationSpeed={0.7}
        shape="icosahedron"
        color="#B8860B"
        scale={0.8}
      />
      <FloatingShape
        position={[2.5, 2.8, -5]}
        rotationSpeed={0.5}
        shape="ring"
        color="#E8D9A8"
        scale={0.7}
      />
      <FloatingShape
        position={[0, -1.8, -6]}
        rotationSpeed={0.9}
        shape="octahedron"
        color="#C9A962"
        scale={0.6}
      />
      <FloatingShape
        position={[-4, -0.5, -7]}
        rotationSpeed={0.4}
        shape="torus"
        color="#D4AF37"
        scale={0.5}
      />

      <Sparkles />

      <fog attach="fog" args={["#06080D", 8, 18]} />
    </>
  );
}

export default function LuxuryScene3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
