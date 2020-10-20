
varying vec3 		vPosition;
varying vec3 		vLight;

uniform sampler2D 	tMatCap;
uniform sampler2D	tMapCapNeutral;
uniform vec3 		lowCaseColour;
uniform vec3 		highCaseColour;
uniform float 		covidValue;
uniform float 		hoverValue;
uniform float 		opacity;

varying vec3 		vEye;
varying vec3 		vNormal;

void main() {

	vec3 r 	= reflect( vEye, vNormal );

  	float m = 2. * sqrt( pow( r.x, 2. ) + pow( r.y, 2. ) + pow( r.z + 1., 2. ) );

  	vec2 vN = r.xy / m + .5;

	vec3 color 			= texture2D( tMatCap, vN ).rgb;
	vec3 colorNeutral 	= texture2D( tMapCapNeutral, vN ).rgb;

	colorNeutral.r += 0.2;

	color += hoverValue * 0.2;

	color = mix( colorNeutral, color, covidValue );

	gl_FragColor = vec4( color, opacity );

}