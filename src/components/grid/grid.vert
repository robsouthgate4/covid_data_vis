varying vec2 vUv;

attribute vec3 morphPosition;
attribute vec3 morphNormal;

uniform float time;
uniform float covidValue;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vLight;

varying vec3 vEye;

void main() {


	vec3 transformed 	= vec3( position );

	transformed += ( morphPosition * covidValue );

	vec4 mvPosition 	= vec4( transformed, 1.0 );

	vec4 modelViewPosition = modelViewMatrix * mvPosition;

	vUv = uv;

	gl_Position = projectionMatrix * modelViewPosition;

	vEye	 	= normalize( vec3( modelViewMatrix * vec4( position, 1.0 ) ) );
	
  	vNormal 	= normalize( normalMatrix * normal );

	vNormal 	+= ( morphNormal * 0.5 + 0.5 ) * covidValue; 

}