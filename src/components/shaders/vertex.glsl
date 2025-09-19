uniform float time;
uniform float amplitude;
uniform float frequency;
uniform float timeX;
uniform float timeY;
uniform float timeZ;

attribute vec3 position;
attribute vec3 color;
varying vec3 vColor;

void main() {
    vec3 pos = position;
    pos.x += sin(time * timeX + position.x) * amplitude * frequency;
    pos.y += sin(time * timeY + position.y) * amplitude * frequency;
    pos.z += sin(time * timeZ + position.z) * amplitude * frequency;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = 2.0 + 4.0 * frequency;
    vColor = color;
}
