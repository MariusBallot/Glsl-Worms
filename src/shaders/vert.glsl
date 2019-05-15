#pragma glslify: noise = require('./vornoi.glsl') 


varying vec3 vUv; 
varying vec3 n; 
uniform float u_time;


void main() {
  vUv = position;
  n = noise(vec3(vUv.xy, u_time/10.));
  
  
 vec3 pos = vec3(position.y, position.xz*n.y*2.);
 pos.z += sin(vUv.y+u_time/10.);

  vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * modelViewPosition;
}