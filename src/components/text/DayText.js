import MSDFMesh from "../../common/mesh/MSDFMesh";

import AssetManager from "Common/loading/AssetManager";
import Utils		from "Common/Utils";
import Emitter		from "Common/Emitter";
import assets		from "Globals/assets"

export default class DayText extends MSDFMesh {

	constructor() {

		super( { 
			texture: AssetManager.get( assets.atlas.roboto ),
			font: 	 AssetManager.get( assets.fonts.roboto ),
			text: 	 "DAY : 000",
			width: 500,
			align: 'center',
			letterSpacing: -2
		} )

		this.position.x = -250 * 0.12
		this.position.y = 20 * 0.12

		this.scale.set( 0.12, 0.12, 0.12 );

        this.rotation.x = Math.PI;
		
		Emitter.on( "globaldateupdate", this.handleDayUpdate.bind( this ) );

	}

	handleDayUpdate( day ) {

		this.geometry.update( `DAY : ${  Utils.pad( day + 1, 3 ) }` )

	}

}