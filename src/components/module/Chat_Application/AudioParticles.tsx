"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function AudioParticles() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const directionsRef = useRef<Float32Array | null>(null);

  const [isDark, setIsDark] = useState(false);

  // Theme detection
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Microphone setup
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
        console.error("Microphone error:", err);
      }
    })();
  }, []);

  const { scene } = useThree();
  useEffect(() => {
    scene.background = isDark ? new THREE.Color(0x000000) : new THREE.Color(0xffffff);
  }, [scene, isDark]);

  // Initialize particles
  if (!particlesRef.current) {
    const geometry = new THREE.BufferGeometry();
    const count = 4000; // more particles

    const positions = new Float32Array(count * 3);
    const directions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      directions[i * 3] = dir.x;
      directions[i * 3 + 1] = dir.y;
      directions[i * 3 + 2] = dir.z;

      if (isDark) color.set(0xffffff);
      else color.setHSL(Math.random(), 1.0, 0.5);

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    directionsRef.current = directions;

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    particlesRef.current = new THREE.Points(geometry, material);
  }

  // Animation loop
  useFrame(() => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!analyser || !dataArray || !particlesRef.current || !directionsRef.current) return;

    analyser.getByteFrequencyData(dataArray);
    const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

    const positions = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
    const directions = directionsRef.current;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = directions[i] * (avg / 80);
      positions[i + 1] = directions[i + 1] * (avg / 60);
      positions[i + 2] = directions[i + 2] * (avg / 60);
    }

    (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;

    particlesRef.current.rotation.y += 0.002; // smooth rotation
    particlesRef.current.rotation.x += 0.001;
  });

  return <primitive object={particlesRef.current!} />;
}
