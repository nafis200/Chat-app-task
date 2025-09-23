"use client";
import React, { useEffect, useRef } from "react";
import "./styles.css";

export default function AnimatedBorderCard() {
  const borderRef = useRef(null);

  useEffect(() => {
    let start:any = null;

    function animate(time:any) {
      if (!start) start = time;
      const progress = (time - start) / 1000; // seconds

      // X-axis (moves rainbow colors left to right)
      const x = (progress * 50) % 400;

      // Y-axis oscillates like sine wave
      const y = 50 + Math.sin(progress * 2) * 10; // 40% ↔ 60%

      if (borderRef.current) {
        borderRef.current.style.setProperty("--x", `${x}%`);
        borderRef.current.style.setProperty("--y", `${y}%`);
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div ref={borderRef} className="cardBorder">
        <div className="innerCard">
          <h2 className="text-xl font-bold text-white">🌈 Neon Rainbow Wave ✨</h2>
        </div>
      </div>
    </div>
  );
}
