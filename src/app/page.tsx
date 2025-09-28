"use client";

import AnimatedBorderCard from "@/components/module/Chat_Application/GlowingEffect";
import GradientRipple from "@/components/module/Chat_Application/GradientRipple";
import SiriOverlay from "@/components/module/Chat_Application/SiriOverlay";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
   const [listening, setListening] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      {!listening ? (
        <Button
          onClick={() => setListening(true)}
          className="px-6 py-3 text-lg"
        >
          🎤 Start Siri
        </Button>
      ) : (
        <Button
          variant="destructive"
          onClick={() => setListening(false)}
          className="px-6 py-3 text-lg"
        >
          ❌ Stop Siri
        </Button>
      )}

      <SiriOverlay listening={listening} />
      {/* <GradientRipple/> */}
    </div>
  );
}
