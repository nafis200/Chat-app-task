"use client";
import { Canvas } from "@react-three/fiber";
import { AudioMic } from "./GlowVisualizer";

export default function Mics() {
  return (
    <main className="p-4 md:p-6 grid grid-cols-1 gap-6">
      <div
        className="w-full"
        style={{
          height: "clamp(200px, 30vw, 500px)", // responsive height
        }}
      >
        <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
          <ambientLight intensity={1} />
          <AudioMic />
        </Canvas>
      </div>
    </main>
  );
}