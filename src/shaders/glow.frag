precision lowp float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;
const int magnitude = 4;
const float intensity = 0.025;

void main() {
  vec4 sum = vec4(0);
  vec2 texcoord = vTextureCoord;
  for(int xx = -magnitude; xx <= magnitude; xx++) {
    for(int yy = -magnitude; yy <= magnitude; yy++) {
      float dist = sqrt(float(xx*xx) + float(yy*yy));
      float factor = 0.0;
      if (dist == 0.0) {
        factor = 3.0;
      } else {
        factor = 3.0/abs(float(dist));
      }
      sum += texture2D(uSampler, texcoord + vec2(xx, yy) * 0.001) * factor;
    }
  }
  gl_FragColor = sum * intensity + texture2D(uSampler, texcoord);
}
