import MSDFMesh from "../../common/mesh/MSDFMesh";

import AssetManager from "Common/loading/AssetManager";
import Utils		from "Common/Utils";
import Emitter		from "Common/Emitter";
import assets		from "Globals/assets"

export default class BoroughText extends MSDFMesh {

	constructor() {

		const width = 500;

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
		this.position.y = -220 * scale;

		this.scale.set( scale, scale, scale );

        this.rotation.x = Math.PI;
		
		Emitter.on( "griditemhover", 	this.handleGridItemHover.bind( this ) );

	}

	handleGridItemHover( object ) {

		this.geometry.update( object.userData.areaName );

	}

}