"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

function Character() {
  return (
    <mesh>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshStandardMaterial color="hsl(var(--primary))" roughness={0.3} metalness={0.2} />
    </mesh>
  );
}

export default function AiCharacter() {
  return (
    <Canvas>
      <ambientLight intensity={1.5} />
      <directionalLight position={[1, 1, 1]} intensity={2} />
      <Character />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2}/>
    </Canvas>
  );
}
