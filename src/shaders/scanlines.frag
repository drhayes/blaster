precision lowp float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;
const int magnitude = 4;
const float intensity = 0.025;

void main() {
  vec4 color = texture2D(uSampler, vTextureCoord);
  if (mod(gl_FragCoord.y, 2.0) <= 0.5) {
    color.r = color.r * 0.8;
    color.g = color.g * 0.8;
    color.b = color.b * 0.8;
  }
  gl_FragColor = color;
}
