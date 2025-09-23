/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";


const GlowShader = {
  uniforms: {
    uColor: { value: new THREE.Color(0x00ffff) },
    uOpacity: { value: 0.8 },
    uTime: { value: 0.0 },
    uPulse: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    uniform float uTime;
    uniform float uPulse;
    
    void main() {
      vUv = uv;
      vPosition = position;
      
      // Add subtle vertex animation
      vec3 pos = position;
      pos.z += sin(uTime * 2.0 + pos.x * 5.0) * 0.1 * uPulse;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uOpacity;
    uniform float uTime;
    uniform float uPulse;
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
      vec2 center = vec2(0.5, 0.5);
      float dist = distance(vUv, center);
      
      // Multiple glow layers for depth
      float glow1 = smoothstep(0.5, 0.0, dist);
      float glow2 = smoothstep(0.3, 0.0, dist);
      float glow3 = smoothstep(0.1, 0.0, dist);
      
      // Enhanced pulsating effect
      float pulse = 0.6 + 0.4 * sin(uTime * 3.0);
      float pulse2 = 0.8 + 0.2 * sin(uTime * 5.0 + 1.0);
      
      // Combine glows with different intensities
      float finalGlow = glow1 * 0.3 + glow2 * 0.5 + glow3 * 0.8;
      
      // Add shimmer effect
      float shimmer = sin(uTime * 10.0 + dist * 20.0) * 0.1 + 0.9;
      
      gl_FragColor = vec4(uColor, finalGlow * uOpacity * pulse * pulse2 * shimmer * (0.5 + uPulse));
    }
  `,
};


const RingWaveShader = {
  uniforms: {
    uColor: { value: new THREE.Color(0xff00ff) },
    uTime: { value: 0.0 },
    uFrequency: { value: 0.0 },
    uAmplitude: { value: 0.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    varying float vDistance;
    uniform float uTime;
    uniform float uAmplitude;
    
    void main() {
      vUv = uv;
      vec2 center = vec2(0.5, 0.5);
      vDistance = distance(uv, center);
      
      vec3 pos = position;
      float wave = sin(vDistance * 20.0 - uTime * 5.0) * uAmplitude * 0.2;
      pos.z += wave;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    uniform float uTime;
    uniform float uFrequency;
    varying vec2 vUv;
    varying float vDistance;

    void main() {
      float wave = sin(vDistance * 15.0 - uTime * 4.0) * 0.5 + 0.5;
      float ring = smoothstep(0.02, 0.0, abs(wave - 0.5));
      
      float pulse = sin(uTime * 3.0) * 0.3 + 0.7;
      float alpha = ring * pulse * uFrequency;
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `,
};

export function AudioParticle() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<any>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const centralGlowRef = useRef<THREE.Mesh | null>(null);
  const ringWaveRef = useRef<THREE.Mesh | null>(null);
  const directionsRef = useRef<Float32Array | null>(null);
  const centralMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const ringMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const pulseGroupRef = useRef<THREE.Group | null>(null);

  const [isDark, setIsDark] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);


  const frequencyBands = useRef<any>({
    bass: 0,
    mid: 0,
    treble: 0,
    overall: 0
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setIsDark(document.documentElement.classList.contains("dark"));
      const observer = new MutationObserver(() =>
        setIsDark(document.documentElement.classList.contains("dark"))
      );
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        
        
        analyser.fftSize = 1024;
        analyser.smoothingTimeConstant = 0.3;
        analyser.minDecibels = -90;
        analyser.maxDecibels = -10;

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
    scene.background = isDark
      ? new THREE.Color(0x0a0a0a)
      : new THREE.Color(0xf8f9fa);
  }, [scene, isDark]);

 
  if (!particlesRef.current) {
    const geometry = new THREE.BufferGeometry();
    const count = 6000; 

    const positions = new Float32Array(count * 3);
    const directions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      const dir = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      
      directions[i * 3] = dir.x;
      directions[i * 3 + 1] = dir.y;
      directions[i * 3 + 2] = dir.z;

      if (isDark) {
        const hue = 0.5 + Math.random() * 0.4; 
        color.setHSL(hue, 0.8 + Math.random() * 0.2, 0.6 + Math.random() * 0.3);
      } else {
        const hue = 0.15 + Math.random() * 0.3; 
        color.setHSL(hue, 0.7 + Math.random() * 0.3, 0.4 + Math.random() * 0.3);
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      
      sizes[i] = Math.random() * 4 + 1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    directionsRef.current = directions;

    const material = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    particlesRef.current = new THREE.Points(geometry, material);
  }

  if (!centralGlowRef.current) {
    const geometry = new THREE.PlaneGeometry(4, 4);
    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(GlowShader.uniforms),
      vertexShader: GlowShader.vertexShader,
      fragmentShader: GlowShader.fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    centralMaterialRef.current = material;
    centralGlowRef.current = new THREE.Mesh(geometry, material);
  }

  if (!ringWaveRef.current) {
    const geometry = new THREE.PlaneGeometry(8, 8, 64, 64);
    const material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(RingWaveShader.uniforms),
      vertexShader: RingWaveShader.vertexShader,
      fragmentShader: RingWaveShader.fragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    ringMaterialRef.current = material;
    ringWaveRef.current = new THREE.Mesh(geometry, material);
    ringWaveRef.current.position.z = -0.5;
  }


  if (!pulseGroupRef.current) {
    pulseGroupRef.current = new THREE.Group();
    
    for (let i = 0; i < 3; i++) {
      const geometry = new THREE.RingGeometry(1 + i * 0.5, 1.2 + i * 0.5, 32);
      const material = new THREE.MeshBasicMaterial({
        color: isDark ? 0x00ffaa : 0x0066ff,
        transparent: true,
        opacity: 0.3 - i * 0.1,
        blending: THREE.AdditiveBlending,
      });
      
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2;
      ring.position.z = i * 0.1;
      pulseGroupRef.current.add(ring);
    }
  }

  useFrame(({ clock }) => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    
    if (!analyser || !dataArray || !particlesRef.current || !directionsRef.current) return;

    analyser.getByteFrequencyData(dataArray);
    
    const bassEnd = Math.floor(dataArray.length * 0.1);
    const midEnd = Math.floor(dataArray.length * 0.4);
    
    const bass = dataArray.slice(0, bassEnd).reduce((a:any, b:any) => a + b) / bassEnd;
    const mid = dataArray.slice(bassEnd, midEnd).reduce((a:any, b:any) => a + b) / (midEnd - bassEnd);
    const treble = dataArray.slice(midEnd).reduce((a:any, b:any) => a + b) / (dataArray.length - midEnd);
    const overall = dataArray.reduce((a:any, b:any) => a + b) / dataArray.length;

   
    const smoothing = 0.15;
    frequencyBands.current.bass = (1 - smoothing) * frequencyBands.current.bass + smoothing * bass;
    frequencyBands.current.mid = (1 - smoothing) * frequencyBands.current.mid + smoothing * mid;
    frequencyBands.current.treble = (1 - smoothing) * frequencyBands.current.treble + smoothing * treble;
    frequencyBands.current.overall = (1 - smoothing) * frequencyBands.current.overall + smoothing * overall;

    const time = clock.getElapsedTime();
    const bands = frequencyBands.current;

 
    const positions = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
    const directions = directionsRef.current;
    const colors = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.color.array as Float32Array;

  
    let scale;
    if (windowWidth < 640) {
      scale = THREE.MathUtils.clamp(bands.overall / 25, 0.4, 1.2);
    } else if (windowWidth < 1024) {
      scale = THREE.MathUtils.clamp(bands.overall / 20, 0.6, 1.5);
    } else {
      scale = THREE.MathUtils.clamp(bands.overall / 15, 0.8, 2.0);
    }


    for (let i = 0; i < positions.length; i += 3) {
      const idx = i / 3;
      
      let particleScale = scale;
      if (idx % 3 === 0) particleScale *= (bands.bass / 100 + 0.5); 
      else if (idx % 3 === 1) particleScale *= (bands.mid / 100 + 0.5); 
      else particleScale *= (bands.treble / 100 + 0.5); 
      
      const burst = particleScale * 2;
      const wave = Math.sin(time * 3 + idx * 0.1) * 0.1 * (bands.mid / 100);
      const spiral = Math.cos(time * 2 + idx * 0.05) * 0.05 * (bands.treble / 100);

      positions[i] += (directions[i] * burst + wave - positions[i]) * 0.08;
      positions[i + 1] += (directions[i + 1] * burst + spiral - positions[i + 1]) * 0.08;
      positions[i + 2] += (directions[i + 2] * burst + wave - positions[i + 2]) * 0.08;

     
      const colorShift = (bands.overall / 255) * 0.1;
      colors[i] = Math.min(1, colors[i] + colorShift);
      colors[i + 1] = Math.min(1, colors[i + 1] + colorShift * 0.5);
      colors[i + 2] = Math.min(1, colors[i + 2] + colorShift * 1.5);
    }

    (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
    (particlesRef.current.geometry as THREE.BufferGeometry).attributes.color.needsUpdate = true;

     particlesRef.current.rotation.y += 0.002 + (bands.mid / 1000);
    particlesRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
    particlesRef.current.rotation.z = Math.cos(time * 0.2) * 0.05;

   
    (particlesRef.current.material as THREE.PointsMaterial).opacity = 
      THREE.MathUtils.clamp(bands.overall / 80, 0.5, 1.0);

    if (centralGlowRef.current && centralMaterialRef.current) {
      const bassIntensity = bands.bass / 60;
      const pulseScale = 1 + bassIntensity;
      
      centralGlowRef.current.scale.set(
        pulseScale, 
        pulseScale * (window.innerHeight / window.innerWidth), 
        1
      );
      
      centralMaterialRef.current.uniforms.uTime.value = time;
      centralMaterialRef.current.uniforms.uPulse.value = bassIntensity;
      centralMaterialRef.current.uniforms.uOpacity.value = THREE.MathUtils.clamp(bands.overall / 100, 0.4, 1.0);
      centralMaterialRef.current.uniforms.uColor.value.set(isDark ? 0x00aaff : 0x0066cc);
    }

 
    if (ringWaveRef.current && ringMaterialRef.current) {
      ringWaveRef.current.rotation.z += 0.005 + (bands.treble / 2000);
      
      ringMaterialRef.current.uniforms.uTime.value = time;
      ringMaterialRef.current.uniforms.uFrequency.value = bands.mid / 100;
      ringMaterialRef.current.uniforms.uAmplitude.value = bands.overall / 50;
      ringMaterialRef.current.uniforms.uColor.value.set(isDark ? 0xff0088 : 0x8800ff);
    }

   
    if (pulseGroupRef.current) {
      const pulseScale = 1 + (bands.bass / 100);
      pulseGroupRef.current.scale.setScalar(pulseScale);
      pulseGroupRef.current.rotation.z += 0.01;
      
      pulseGroupRef.current.children.forEach((child, i) => {
        const ring = child as THREE.Mesh;
        const material = ring.material as THREE.MeshBasicMaterial;
        const phase = time * 2 + i * Math.PI * 0.5;
        material.opacity = (Math.sin(phase) * 0.2 + 0.3) * (bands.bass / 100);
      });
    }
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.2 : 0.4} />
      <pointLight 
        position={[5, 5, 5]} 
        intensity={isDark ? 0.5 : 0.3} 
        color={isDark ? 0x00ffff : 0x0066ff} 
      />
      <pointLight 
        position={[-5, -5, 5]} 
        intensity={isDark ? 0.3 : 0.2} 
        color={isDark ? 0xff0088 : 0x8800ff} 
      />
      
      {particlesRef.current && <primitive object={particlesRef.current} />}
      {centralGlowRef.current && <primitive object={centralGlowRef.current} />}
      {ringWaveRef.current && <primitive object={ringWaveRef.current} />}
      {pulseGroupRef.current && <primitive object={pulseGroupRef.current} />}
    </>
  );
} 