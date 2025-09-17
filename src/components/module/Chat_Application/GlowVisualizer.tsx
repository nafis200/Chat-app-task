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

  useEffect(() => {
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
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
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      const avg =
        dataArray.reduce((a: any, b: any) => a + b, 0) / dataArray.length;

      // Vibrate / Scale
      const targetScale = 1 + avg / 30;
      setScale((prev) => prev + (targetScale - prev) * 0.15);

      // Rainbow neon glow for both dark & light mode
      const hue = (avg * 2) % 360;
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const lightness = isDark ? 60 : 55;
      const saturation = isDark ? 100 : 90;
      setColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);

      // Glow radius
      setGlowSize(10 + avg / 15);
    }
  });

  return (
    <Html center>
      <div className="w-full h-full flex justify-center items-center relative overflow-hidden">
        {/* Static gray shadow */}
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "60%",
            maxWidth: "150px",
            maxHeight: "150px",
            borderRadius: "50%",
            background: "rgba(128,128,128,0.3)",
            filter: "blur(15px)",
            zIndex: -2,
          }}
        ></div>

        {/* Dynamic Circle Glow */}
        <div
          style={{
            position: "absolute",
            width: `${Math.min(glowSize * 4, 150)}px`,
            height: `${Math.min(glowSize * 4, 150)}px`,
            borderRadius: "50%",
            background: color,
            filter: `blur(${glowSize}px)`,
            opacity: 0.6,
            zIndex: -1,
          }}
        ></div>

        {/* Microphone Icon */}
        <FaMicrophone
          style={{
            fontSize: "clamp(2rem, 10vw, 4rem)",
            color: color,
            transform: `scale(${scale})`,
            transition: "transform 0.05s linear, color 0.1s linear",
            textShadow: `0 0 ${glowSize}px ${color}, 0 0 ${
              glowSize * 2
            }px ${color}, 0 0 ${glowSize * 3}px ${color}`,
          }}
        />
      </div>
    </Html>
  );
}
