"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function SiriOverlay({ listening }: { listening: boolean }) {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [amplitude, setAmplitude] = useState(0);

  // 🎤 Setup microphone
  useEffect(() => {
    if (listening && !audioContext) {
      const ctx = new AudioContext();
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const source = ctx.createMediaStreamSource(stream);
        const analyserNode = ctx.createAnalyser();
        analyserNode.fftSize = 256;
        source.connect(analyserNode);
        setAudioContext(ctx);
        setAnalyser(analyserNode);
      });
    }
    if (!listening && audioContext) {
      audioContext.close();
      setAudioContext(null);
      setAnalyser(null);
    }
  }, [listening, audioContext]);

  // 🎶 Measure amplitude
  useEffect(() => {
    if (!analyser) return;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const tick = () => {
      requestAnimationFrame(tick);
      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        const v = (dataArray[i] - 128) / 128.0;
        sum += v * v;
      }
      const rms = Math.sqrt(sum / bufferLength);
      setAmplitude(rms);
    };
    tick();
  }, [analyser]);

  if (!listening) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden">
      {/* 🎨 Animated Border Glow */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{
          border: "40px solid transparent",
          borderRadius: "40px",
        }}
        animate={{
          boxShadow: [
            `-0 0 ${20 + amplitude * 200}px rgba(0,150,255,0.8) inset`,
            `-0 0 ${40 + amplitude * 250}px rgba(255,0,200,0.6) inset`,
            `0 0 ${30 + amplitude * 220}px rgba(0,255,150,0.7) inset`,
          ],
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Center Clean (No Effect) */}
      <div className="z-10 text-white text-xl font-semibold">
        Listening...
      </div>
    </div>
  );
}
