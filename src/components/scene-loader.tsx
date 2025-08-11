"use client";

import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/webgl/scene-root"), {
  ssr: false,
});

export default function SceneLoader() {
  return <Scene />;
}
