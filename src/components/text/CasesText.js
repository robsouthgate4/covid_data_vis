import MSDFMesh 	from "Common/mesh/MSDFMesh";

import AssetManager from "Common/loading/AssetManager";
import Emitter		from "Common/Emitter";
import assets		from "Globals/assets";
import State		from "Globals/State";

export default class CasesText extends MSDFMesh {

	constructor() {

		const width = 400;

		super( { 
			texture: AssetManager.get( assets.atlas.roboto ),
			font: 	 AssetManager.get( assets.fonts.roboto ),
			text: 	 "",
			width,
			align: 'center',
			letterSpacing: 1
		} )

		const scale = 0.03;

		this.position.x = - width / 2 * scale;
		this.position.y = -270 * scale;

		this.scale.set( scale, scale, scale );

		this.rotation.x = Math.PI;
		
		this.day 	= 0;
		this.object = {};
		
		Emitter.on( "globaldateupdate", this.handleDayUpdate.bind( this ) );
		Emitter.on( "griditemhover", 	this.handleGridItemHover.bind( this ) );

	}

	handleDayUpdate( day ) {

		this.day = day;

		if ( Object.keys( this.object ).length !== 0 ) {

			this.geometry.update( `total cases: ${ this.object.userData.info[ this.day ].total_cases }` );

		}		

	}

	handleGridItemHover( object ) {

		this.object = object;

		this.geometry.update( `total cases: ${ this.object.userData.info[ this.day ].total_cases }` );

	}



}