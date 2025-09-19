"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap"; // ✅ GSAP import

export function AudioParticles() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const directionsRef = useRef<Float32Array | null>(null);
  const { scene } = useThree();

  useEffect(() => {
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
        console.error("মাইক্রোফোন এক্সেস বাতিল হয়েছে:", err);
      }
    })();
  }, [scene]);

  // Initialize particles
  if (!particlesRef.current) {
    const count = 3000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const directions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions.set([0, 0, 0], i * 3);
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      directions.set([dir.x, dir.y, dir.z], i * 3);
      color.setHSL(Math.random(), 1.0, 0.5);
      colors.set([color.r, color.g, color.b], i * 3);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    directionsRef.current = directions;

    const material = new THREE.PointsMaterial({
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
      const targetX = directions[i] * (avg / 50);
      const targetY = directions[i + 1] * (avg / 30);
      const targetZ = directions[i + 2] * (avg / 30);

      // 🔹 GSAP ব্যবহার করে smooth transition
      gsap.to(positions, {
        [i]: targetX,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(positions, {
        [i + 1]: targetY,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(positions, {
        [i + 2]: targetZ,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    (points.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
  });

  return <primitive object={particlesRef.current!} />;
}
