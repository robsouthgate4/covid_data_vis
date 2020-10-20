import { 

	PerspectiveCamera, 
	Vector2, 
	Vector3
} 
from "three";

import { TweenLite } 	from "gsap/gsap-core";
import Renderer 		from "Globals/Renderer";
import Manager			from "Globals/Manager";
import Emitter			from "Common/Emitter";

class Camera extends PerspectiveCamera {

	constructor( ) {

		super( 75, window.innerWidth / window.innerHeight, 0.001, 2000 );

		this.position.set( 0, 1, 12 );

		this.startPos 	= this.position;
		this.mouse 		= {};
		this.canvas 	= Renderer.domElement;		

		this.addEventListeners();

		this.newPos = this.position;

	}

	addEventListeners() {

		Emitter.on( "mousemove", 			 this.onMouseMove.bind( this ) );
		Emitter.on( "update", 	 			 this.update.bind( this ) );
		Emitter.on( "stateloaded", 			 this.handleDataLoaded.bind( this ) );
		Emitter.on( "griditemclick",		 this.handleGridItemClicked.bind( this ) );
		Emitter.on( "initialupdatecomplete", this.handleInitialUpdateComplete.bind( this ) );

	}

	handleDataLoaded( data ) {

		this.lookAt( 0, 0, 0 );

	}

	handleGridItemClicked( object ) {

	}

	handleInitialUpdateComplete( object ) {

		const newPos = new Vector3( 0., 0., 0.);
		newPos.z += 12;
		newPos.y += 1;

	}

	onMouseMove( evt ) {

	}

	update ( data ) {	

		if ( !this.mouse.normalized ) return;

		const positionValue = new Vector3().lerpVectors( this.position, this.newPos, 0.02 );

		this.position.set( this.targetPositionX , positionValue.y, positionValue.z );

	}

}

export default new Camera();