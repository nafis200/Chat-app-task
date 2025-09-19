import * as THREE from 'three';
import { extend } from '@react-three/fiber';

class DofPointsMaterial extends THREE.ShaderMaterial {
  constructor() {
    super({
      vertexShader: `
        attribute vec3 color;
        varying vec3 vColor;
        uniform float uTime;
        void main() {
          vColor = color;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = 3.0 + sin(uTime*2.0)*2.0; // dynamic point size
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 cxy = 2.0 * gl_PointCoord - 1.0;
          if(dot(cxy,cxy) > 1.0) discard;
          gl_FragColor = vec4(vColor, 1.0);
        }
      `,
      uniforms: {
        uTime: { value: 0 }
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
  }
}

extend({ DofPointsMaterial });
export { DofPointsMaterial };
