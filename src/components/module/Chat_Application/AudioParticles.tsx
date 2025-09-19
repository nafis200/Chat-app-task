"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function AudioParticles() {
  const analyserRef = useRef<AnalyserNode | null>(null); // microphone analyser
  const dataArrayRef = useRef<Uint8Array | null>(null); // frequency data
  const particlesRef = useRef<THREE.Points | null>(null); // THREE.Points object
  const directionsRef = useRef<Float32Array | null>(null);
  const { scene } = useThree();

  useEffect(() => {
    // microphone setup
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        source.connect(analyser);
        analyserRef.current = analyser;
        dataArrayRef.current = dataArray;
      } catch (err) {
        console.error("Microphone access denied:", err);
      }
    })();
  }, [scene]);

  // Initialize particles
  if (!particlesRef.current) {
    const count = 3000; // particle সংখ্যা
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const directions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions.set([0, 0, 0], i * 3);

      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      directions.set([dir.x, dir.y, dir.z], i * 3);

      // 🔹 Particle color → change here if you want different color
      color.setHSL(Math.random(), 1.0, 0.5); 
      colors.set([color.r, color.g, color.b], i * 3);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    directionsRef.current = directions;

    const material = new THREE.PointsMaterial({
      // 🔹 Particle size → increase/decrease for bigger/smaller particles
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    particlesRef.current = new THREE.Points(geometry, material);
  }

  // Animation loop
  useFrame(() => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    const points = particlesRef.current;
    const directions = directionsRef.current;
    if (!analyser || !dataArray || !points || !directions) return;

    analyser.getByteFrequencyData(dataArray);
    const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

    const positions = (points.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;

    for (let i = 0; i < positions.length; i += 3) {
      // 🔹 Circle size → multiply by avg/number, adjust these numbers
      positions[i] = directions[i] * (avg / 50);      // X axis
      positions[i + 1] = directions[i + 1] * (avg / 30); // Y axis
      positions[i + 2] = directions[i + 2] * (avg / 30); // Z axis

      // 🔹 Smooth vibration → smaller number = smoother, larger = faster
      // এখানে 50/30 মান পরিবর্তন করে vibration amplitude পরিবর্তন করা যাবে
    }

    (points.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
  });

  return <primitive object={particlesRef.current!} />;
}

/*
💡 Future modifications guide:

1. **Circle size**
   - X/Y/Z axis scale: line 73-75 `avg / 50` বা `avg / 30` → increase for bigger circle

2. **Circle position**
   - Add offsets: positions[i] += offsetX, positions[i+1] += offsetY, positions[i+2] += offsetZ

3. **Particle color**
   - line 46: color.setHSL(H, S, L) → change H/S/L for different color

4. **Vibration smoothness**
   - Change the divisor `avg / 50` or `avg / 30` → smaller divisor = smoother vibration
   - Or apply lerp for smoother motion if needed
*/
