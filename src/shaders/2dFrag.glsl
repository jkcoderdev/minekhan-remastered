#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

uniform sampler2D uSampler;
varying vec2 vTexture;
varying float vShadow;

void main() {
	vec4 color = texture2D(uSampler, vTexture);
	if (color.a > 0.0 && color.a < 0.7) color.a = 0.7;
	gl_FragColor = vec4(color.rgb * vShadow, color.a);
}