const mat2 matrice = mat2(0.8,-0.6,0.6,0.8);


float cNoise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}



float fbm( in vec2 p ){
    float f = 0.0;
    f += 0.5000*cNoise( p ); p = matrice*p*2.02;
    f += 0.2500*cNoise( p ); p = matrice*p*2.03;
    f += 0.1250*cNoise( p ); p = matrice*p*2.01;
    f += 0.0625*cNoise( p );

    return f/0.9375;
}

#pragma glslify: export(fbm);