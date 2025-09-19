"use client";
import { AudioParticles } from "@/components/module/Chat_Application/AudioParticles";
import { Canvas } from "@react-three/fiber";

export default function Home() {
  return (
     <Canvas orthographic camera={{ position: [4, -2, 1], zoom: 100 }}>
      <ambientLight intensity={1} />
      <AudioParticles />
    </Canvas>
  );
}
