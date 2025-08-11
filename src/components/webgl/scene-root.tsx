"use client";
// import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { Suspense } from "react";
import WobbleBlob from "@/components/webgl/wobble-blob";

export default function SceneRoot() {
  // return (
  //   <Canvas
  //     dpr={[1, 1.5]}
  //     gl={{ antialias: false, alpha: true }} // Set alpha to true for transparent background
  //     camera={{ position: [0, 0, 5], fov: 60 }}
  //   >
  //     <ambientLight intensity={0.5} />
  //     <directionalLight position={[2, 3, 5]} intensity={1.5} />

  //     <Suspense fallback={null}>
  //       {/* The WobbleBlob is a placeholder for more complex scroll-driven scenes */}
  //       <WobbleBlob />
  //     </Suspense>

  //     <EffectComposer>
  //       <Bloom intensity={0.5} luminanceThreshold={0.4} mipmapBlur />
  //       <ChromaticAberration offset={[0.0005, 0.0005]} />
  //       <Noise opacity={0.03} />
  //       <Vignette eskil offset={0.1} darkness={0.6} />
  //     </EffectComposer>
  //   </Canvas>
  // );
}
