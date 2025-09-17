"use client"; // ⚠️ Add this at the top

import { Card, CardContent } from "@/components/ui/card";
import { Canvas } from "@react-three/fiber";
import { AudioMic } from "./GlowVisualizer";

export default function Mics() {
  return (
    <main className="p-6 grid md:grid-cols-1 gap-6">
          <div className="w-full h-[200px] md:h-[300px]">
            <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
              <ambientLight intensity={1} />
              <AudioMic />
            </Canvas>
          </div>
    </main>
  );
}
