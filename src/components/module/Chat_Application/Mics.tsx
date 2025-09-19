"use client";

import { Canvas } from "@react-three/fiber";
import { AudioParticles } from "./AudioParticles";
import { OrbitControls } from "@react-three/drei";
export default function Mics() {
  return (
    <main className="p-4 md:p-6 grid grid-cols-1 gap-6">
      <div
        className="w-full"
        style={{
          height: "clamp(300px, 40vw, 600px)", // responsive height
        }}
      >
        <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.2} />
          <AudioParticles />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </main>
  );
}
