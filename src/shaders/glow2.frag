// From https://www.shadertoy.com/view/lsXGWn
precision lowp float;
const float blurSize = 1.0/512.0;
const float intensity = 0.35;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;

void main() {
   vec4 sum = vec4(0);
   vec2 texcoord = vTextureCoord;
   int j;
   int i;

   //thank you! http://www.gamerendering.com/2008/10/11/gaussian-blur-filter-shader/ for the
   //blur tutorial
   // blur in y (vertical)
   // take nine samples, with the distance blurSize between them
   sum += texture2D(uSampler, vec2(texcoord.x - 4.0*blurSize, texcoord.y)) * 0.05;
   sum += texture2D(uSampler, vec2(texcoord.x - 3.0*blurSize, texcoord.y)) * 0.09;
   sum += texture2D(uSampler, vec2(texcoord.x - 2.0*blurSize, texcoord.y)) * 0.12;
   sum += texture2D(uSampler, vec2(texcoord.x - blurSize, texcoord.y)) * 0.15;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y)) * 0.16;
   sum += texture2D(uSampler, vec2(texcoord.x + blurSize, texcoord.y)) * 0.15;
   sum += texture2D(uSampler, vec2(texcoord.x + 2.0*blurSize, texcoord.y)) * 0.12;
   sum += texture2D(uSampler, vec2(texcoord.x + 3.0*blurSize, texcoord.y)) * 0.09;
   sum += texture2D(uSampler, vec2(texcoord.x + 4.0*blurSize, texcoord.y)) * 0.05;

	// blur in y (vertical)
   // take nine samples, with the distance blurSize between them
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y - 4.0*blurSize)) * 0.05;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y - 3.0*blurSize)) * 0.09;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y - 2.0*blurSize)) * 0.12;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y - blurSize)) * 0.15;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y)) * 0.16;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y + blurSize)) * 0.15;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y + 2.0*blurSize)) * 0.12;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y + 3.0*blurSize)) * 0.09;
   sum += texture2D(uSampler, vec2(texcoord.x, texcoord.y + 4.0*blurSize)) * 0.05;

  gl_FragColor = sum * 1.0 + texture2D(uSampler, texcoord);
}
