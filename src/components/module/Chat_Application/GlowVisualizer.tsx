/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { FaMicrophone } from "react-icons/fa";

export function AudioMic() {
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<any>(null);
  const micRef = useRef<HTMLDivElement>(null);

  // small / medium / large screen detect
  const [screenSize, setScreenSize] = useState<"small"|"medium"|"large">("large");

  useEffect(() => {
    const updateScreen = () => {
      const w = window.innerWidth;
      if (w < 640) setScreenSize("small");
      else if (w < 1024) setScreenSize("medium");
      else setScreenSize("large");
    };
    updateScreen();
    window.addEventListener("resize", updateScreen);
    return () => window.removeEventListener("resize", updateScreen);
  }, []);

  // audio setup
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

  const prevScale = useRef(1);
  const prevGlow = useRef(0);

  useFrame(() => {
    const analyser = analyserRef.current;
    const dataArray = dataArrayRef.current;
    if (!analyser || !dataArray || !micRef.current) return;

    analyser.getByteFrequencyData(dataArray);
    const avg = dataArray.reduce((a:any, b:any) => a + b, 0) / dataArray.length;

    // responsive scale & glow
    let scaleFactor = 0;
    let glow = 0;
    switch(screenSize) {
      case "small":
        scaleFactor = avg / 60;
        glow = 2 + avg / 50;
        break;
      case "medium":
        scaleFactor = avg / 40;
        glow = 4 + avg / 40;
        break;
      case "large":
        scaleFactor = avg / 25;
        glow = 8 + avg / 30;
        break;
    }

    // smooth transition
    prevScale.current += (1 + scaleFactor - prevScale.current) * 0.1;
    prevGlow.current += (glow - prevGlow.current) * 0.1;

    const hue = (avg * 2) % 360;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const lightness = isDark ? 55 : 50;
    const saturation = 90;
    const color = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

    micRef.current.style.transform = `scale(${prevScale.current})`;
    micRef.current.style.color = color;
    micRef.current.style.textShadow = `
      0 0 ${prevGlow.current}px ${color},
      0 0 ${prevGlow.current * 1.5}px ${color},
      0 0 ${prevGlow.current * 2}px ${color}
    `;
  });

  return (
    <Html center>
      <div
        className="flex justify-center items-center relative"
        style={{
          width: screenSize === "small" ? "80px" : "fit-content",
          height: screenSize === "small" ? "80px" : "fit-content",
        }}
      >
        {/* background glow */}
        <div
          style={{
            position: "absolute",
            width: screenSize === "small" ? "0px" : "150px",
            height: screenSize === "small" ? "0px" : "150px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            filter: `blur(${prevGlow.current}px)`,
            zIndex: -1,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            transition: "width 0.2s, height 0.2s",
          }}
        />

        {/* microphone */}
        <div
          ref={micRef}
          style={{
            fontSize: screenSize === "small" ? "3rem" : "clamp(2rem,6vw,4rem)",
            display: "inline-block",
            pointerEvents: "none",
          }}
        >
          <FaMicrophone />
        </div>
      </div>
    </Html>
  );
}
