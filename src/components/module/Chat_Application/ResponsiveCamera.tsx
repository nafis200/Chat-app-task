"use client";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";

interface ResponsiveCameraProps {
  zoom?: number; // optional, default value use করা যাবে
}

export default function ResponsiveCamera({ zoom = 300 }: ResponsiveCameraProps) {
  const { camera, size } = useThree();

  useEffect(() => {
    const orthoCam = camera as THREE.OrthographicCamera; // ✅ type assertion

    const aspect = size.width / size.height;

    orthoCam.left = -aspect * 5;
    orthoCam.right = aspect * 5;
    orthoCam.top = 5;
    orthoCam.bottom = -5;

    orthoCam.zoom = zoom;
    orthoCam.updateProjectionMatrix();
  }, [camera, size, zoom]);

  return null;
}
