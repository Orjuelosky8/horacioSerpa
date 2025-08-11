"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";

export default function WobbleBlob() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.position.y = Math.sin(time) * 0.1;
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 32]} />
      <meshStandardMaterial
        color="hsl(var(--accent))"
        roughness={0.4}
        metalness={0.1}
        wireframe={true}
      />
    </mesh>
  );
}
