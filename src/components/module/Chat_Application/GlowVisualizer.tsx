"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { FaMicrophone } from "react-icons/fa";

export function AudioMic() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("red");
  const [glowSize, setGlowSize] = useState(10);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect small screen
  useEffect(() => {
    const updateScreen = () => setIsSmallScreen(window.innerWidth < 640);
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  // Setup microphone
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

  // Animation / Glow
  useFrame(() => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;

    if (analyser && dataArray) {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a: any, b: any) => a + b, 0) / dataArray.length;

      // Scale vibration (small devices less intense)
      const targetScale = 1 + (isSmallScreen ? avg / 60 : avg / 30);
      setScale(prev => prev + (targetScale - prev) * 0.15);

      // Rainbow neon glow
      const hue = (avg * 2) % 360;
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const lightness = isDark ? 60 : 55;
      const saturation = isDark ? 100 : 90;
      setColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);

      // Glow size (small devices smaller)
      setGlowSize(isSmallScreen ? 5 + avg / 20 : 10 + avg / 15);
    }
  });

  // Small device: scaled down but with glow
  if (isSmallScreen) {
    return (
      <Html center>
        <div
          className="flex justify-center items-center relative"
          style={{ width: "fit-content", overflow: "invisible" }}
        >
          {/* Static gray shadow */}
          <div
            style={{
              position: "absolute",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(128,128,128,0.3)",
              filter: "blur(15px)",
              zIndex: -2,
            }}
          ></div>

          {/* Dynamic glow */}
          <div
            style={{
              position: "absolute",
              width: `${glowSize * 2}px`,
              height: `${glowSize * 2}px`,
              borderRadius: "50%",
              background: color,
              filter: `blur(${glowSize}px)`,
              opacity: 0.6,
              zIndex: -1,
            }}
          ></div>

          {/* Microphone */}
          <FaMicrophone
            style={{
              fontSize: "80px",
              color: color,
              textShadow: `0 0 ${glowSize}px ${color}, 0 0 ${
                glowSize * 2
              }px ${color}, 0 0 ${glowSize * 3}px ${color}`,
            }}
          />
        </div>
      </Html>
    );
  }

  // Large/medium devices
  return (
    <Html center>
      <div
        className="flex justify-center items-center relative"
        style={{
          width: "fit-content",
          transform: `scale(${scale})`,
          transition: "transform 0.05s linear, color 0.1s linear",
          overflow: "visible",
        }}
      >
        {/* Static gray shadow */}
        <div
          style={{
            position: "absolute",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(128,128,128,0.3)",
            filter: "blur(15px)",
            zIndex: -2,
          }}
        ></div>

        {/* Dynamic glow */}
        <div
          style={{
            position: "absolute",
            width: `${glowSize * 4}px`,
            height: `${glowSize * 4}px`,
            borderRadius: "50%",
            background: color,
            filter: `blur(${glowSize}px)`,
            opacity: 0.6,
            zIndex: -1,
          }}
        ></div>

        {/* Microphone */}
        <FaMicrophone
          style={{
            fontSize: "clamp(2rem, 6vw, 4rem)",
            color: color,
            textShadow: `0 0 ${glowSize}px ${color}, 0 0 ${
              glowSize * 2
            }px ${color}, 0 0 ${glowSize * 3}px ${color}`,
          }}
        />
      </div>
    </Html>
  );
}
