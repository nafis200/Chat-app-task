"use client";
import { useEffect, useRef } from "react";
import styles from "./GradientRipple.module.css";

export default function GradientRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    type Ripple = {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
    };

    const ripples: Ripple[] = [];

    // Initialize multiple ripples
    for (let i = 0; i < 8; i++) {
      ripples.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 50 + 30,
        alpha: Math.random() * 0.5 + 0.3,
        speed: Math.random() * 0.02 + 0.01,
      });
    }

    let angle = 0;

    function animate() {
      ctx.clearRect(0, 0, width, height);
      angle += 0.02;

      ripples.forEach((ripple, i) => {
        ripple.radius += 0.5;

        // Oscillate ripple like a sine wave
        const yOffset = Math.sin(angle + i) * 30;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y + yOffset, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${Math.max(0, ripple.alpha - ripple.radius / 200)})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Reset ripple after it grows too large
        if (ripple.radius > 200) {
          ripple.radius = Math.random() * 50 + 30;
          ripple.x = Math.random() * width;
          ripple.y = Math.random() * height;
          ripple.alpha = Math.random() * 0.5 + 0.3;
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div className={styles.gradientBackground}><canvas ref={canvasRef} /></div>;
}
