
#pragma glslify: vignette = require(glsl-vignette) 
#pragma glslify: aces = require(glsl-tone-map/aces)
#pragma glslify: uncharted2 = require(glsl-tone-map/uncharted2)
#pragma glslify: lottes = require(glsl-tone-map/lottes)
#pragma glslify: reinhard = require(glsl-tone-map/reinhard)
#pragma glslify: reinhard2 = require(glsl-tone-map/reinhard2)
#pragma glslify: uchimura = require(glsl-tone-map/uchimura)
#pragma glslify: filmic = require(glsl-tone-map/filmic)
#pragma glslify: unreal = require(glsl-tone-map/unreal)


varying vec2 vUv;
uniform sampler2D tDiffuse;

void main() {

    
    float vignetteValue = vignette( vUv, 0.5, 0.5 );

    vec3 diffuse = texture2D( tDiffuse, vUv ).rgb;

    vec3 color = diffuse * vignetteValue;

    gl_FragColor.rgb = color;
    
    gl_FragColor.a = 1.0;

}