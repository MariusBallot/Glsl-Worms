#pragma glslify: noise = require('./vornoi.glsl') 
      
uniform vec3 colorA; 
uniform vec3 colorB; 
uniform float u_time;
varying vec3 vUv;
varying vec3 n;


void main() {

  vec3 col = mix(colorA, colorB, n.y);

 
  gl_FragColor = vec4(col, 1.);
}