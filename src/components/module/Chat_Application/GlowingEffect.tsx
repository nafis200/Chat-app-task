"use client";

import React from "react";
import "./styles.css";

export default function AnimatedBorderCard() {
  return (
    <div className="flex items-center justify-center ">
      <div
        className="rounded-2xl p-[3px] bg-gradient-to-r from-red-500 via-blue-500 to-yellow-400 cardBorder"
      >
        
        <div className="rounded-2xl bg-black p-8 shadow-lg w-[400px] h-[200px] flex items-center justify-center">
          <h2 className="text-xl font-bold text-white">
            Neon Glow Border ✨
          </h2>
        </div>

{/*  */}

      </div>
    </div>
  );
}
