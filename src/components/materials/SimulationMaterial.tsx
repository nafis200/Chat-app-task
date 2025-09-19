'use client';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

class SimulationMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0xffffff) },
      },
      vertexShader: `
        uniform float uTime;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          gl_PointSize = 3.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          if(dot(cxy, cxy) > 1.0) discard;
          gl_FragColor = vec4(vColor, 1.0);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
    });
  }
}

extend({ SimulationMaterial });
export { SimulationMaterial };
