"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { FaMicrophone } from "react-icons/fa";

export function AudioMic() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<any>(null);

  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("red");
  const [glowSize, setGlowSize] = useState(10);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

 
  useEffect(() => {
    const updateScreen = () => setIsSmallScreen(window.innerWidth < 640);
    updateScreen(); 
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  
  useEffect(() => {
    setScale(1);
    setGlowSize(isSmallScreen ? 0 : 10);
    setColor("red");
  }, [isSmallScreen]);


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

 
  useFrame(() => {
    if (isSmallScreen) return;

    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!analyser || !dataArray) return;

    analyser.getByteFrequencyData(dataArray as any);
    const avg = dataArray.reduce((a:any, b:any) => a + b, 0) / dataArray.length;

    setScale(prev => prev + ((1 + avg / 30) - prev) * 0.15);

    const hue = (avg * 2) % 360;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const lightness = isDark ? 60 : 55;
    const saturation = isDark ? 100 : 90;
    setColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);

    setGlowSize(10 + avg / 15);
  });

  return (
    <Html center>
      <div
        className="flex justify-center items-center relative"
        style={{
          width: isSmallScreen ? "80px" : "fit-content",
          height: isSmallScreen ? "80px" : "fit-content",
          transform: isSmallScreen ? "scale(1)" : `scale(${scale})`,
          transition: "transform 0.05s linear, color 0.1s linear",
          overflow: "visible",
        }}
      >
        {/* Static shadow */}
        <div
          style={{
            position: "absolute",
            width: isSmallScreen ? "60px" : "150px",
            height: isSmallScreen ? "60px" : "150px",
            borderRadius: "50%",
            background: "rgba(128,128,128,0.3)",
            filter: "blur(15px)",
            zIndex: -2,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Dynamic glow */}
        <div
          style={{
            position: "absolute",
            width: isSmallScreen ? "0px" : `${glowSize * 4}px`,
            height: isSmallScreen ? "0px" : `${glowSize * 4}px`,
            borderRadius: isSmallScreen ? "0%" : "50%",
            background: color,
            filter: isSmallScreen ? "none" : `blur(${glowSize}px)`,
            opacity: 0.6,
            zIndex: -1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Microphone */}
        <FaMicrophone
          style={{
            fontSize: isSmallScreen ? "5rem" : "clamp(2rem, 6vw, 4rem)",
            color: color,
            textShadow: isSmallScreen
              ? "none"
              : `0 0 ${glowSize}px ${color}, 0 0 ${glowSize * 2}px ${color}, 0 0 ${glowSize * 3}px ${color}`,
            display: "block",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>
    </Html>
  );
}