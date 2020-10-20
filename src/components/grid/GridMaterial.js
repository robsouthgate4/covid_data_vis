import { ShaderMaterial, Uniform, Vector3 } from "three";

import Emitter 			from "Common/Emitter";
import AssetManager		from "Common/loading/AssetManager";

import vertexShader 	from "./grid.vert";
import fragmentShader 	from "./grid.frag";
import assets from 		"Globals/assets";

export default class GridMaterial extends ShaderMaterial{

	constructor() {

		const uniforms = {

			time: 			{ value: 0 },
			covidValue: 	{ value: 0 },
			tMatCap:		{ value: AssetManager.get( assets.textures.matcap ) },
			tMapCapNeutral:	{ value: AssetManager.get( assets.textures.matcapNeutral ) },
			lowCaseColour: 	{ value: new Vector3( 0.2, 1.0, 0.5 ) },
			highCaseColour: { value: new Vector3( 1.0, 0.3, 0.3 ) },
			hoverValue: 	{ value: 0 },
			opacity: 		{ value: 1 }

		};

		super( { vertexShader, fragmentShader, uniforms, morphTargets: true, transparent: true } );

		Emitter.on( "update", this.update.bind( this ) );

	}

	update( { elapsed, delta } ) {

		this.uniforms.time.value = elapsed;

	}

}