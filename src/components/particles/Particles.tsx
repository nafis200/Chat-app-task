'use client';
import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function Particles() {
  const particlesRef = useRef<THREE.Points | null>(null);
  const directionsRef = useRef<Float32Array | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

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
      } catch(e) {
        console.error('Mic error:', e);
      }
    })();
  }, []);

  if (!particlesRef.current) {
    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count*3);
    const directions = new Float32Array(count*3);
    const colors = new Float32Array(count*3);
    const color = new THREE.Color();

    for(let i=0;i<count;i++){
      positions[i*3]=0;
      positions[i*3+1]=0;
      positions[i*3+2]=0;
      const dir = new THREE.Vector3(Math.random()-0.5,Math.random()-0.5,Math.random()-0.5).normalize();
      directions[i*3]=dir.x; directions[i*3+1]=dir.y; directions[i*3+2]=dir.z;
      color.setHSL(Math.random()*0.2+0.55,1.0,0.5);
      colors[i*3]=color.r; colors[i*3+1]=color.g; colors[i*3+2]=color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions,3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors,3));
    directionsRef.current = directions;

    const material = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
    });

    particlesRef.current = new THREE.Points(geometry, material);
  }

  useFrame(() => {
    if(!particlesRef.current || !directionsRef.current || !analyserRef.current || !dataArrayRef.current) return;
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const avg = dataArrayRef.current.reduce((a,b)=>a+b,0)/dataArrayRef.current.length;
    const positions = (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.array as Float32Array;
    const directions = directionsRef.current;

    for(let i=0;i<positions.length;i+=3){
      positions[i] = directions[i]*(avg/50);
      positions[i+1] = directions[i+1]*(avg/30);
      positions[i+2] = directions[i+2]*(avg/30);
    }

    (particlesRef.current.geometry as THREE.BufferGeometry).attributes.position.needsUpdate = true;
    particlesRef.current.rotation.y += 0.002;
  });

  useEffect(()=>{
    scene.background = new THREE.Color(0x181820);
  },[scene]);

  return <primitive object={particlesRef.current!} />;
}
