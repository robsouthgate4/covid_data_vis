import { Math as Math3, BufferAttribute, Mesh, Raycaster, Vector2, Vector3 } from "three";

console.log( Math3 )

import AssetManager from "Common/loading/AssetManager";
import Emitter 		from "Common/Emitter";
import assets		from "Globals/assets";
import State		from "Globals/State";
import GridMaterial from "./GridMaterial";
import Camera		from "Globals/Camera";

export default class GridItem extends Mesh {

	constructor() {
		
		const gltf 				= AssetManager.get( assets.gltfs.covidSphere );
		const geometry 			= gltf.scene.children[ 0 ].geometry;

		const morphPosiitons 	= geometry.morphAttributes.position[ 0 ].array;
		const morphNormals 		= geometry.morphAttributes.normal[ 0 ].array;

		const material 		= new GridMaterial();
		
		geometry.setAttribute( 'morphPosition', 	new BufferAttribute( morphPosiitons, 3 ) );
		geometry.setAttribute( 'morphNormal', 		new BufferAttribute( morphNormals, 3 ) );
		
		geometry.morphTargetsRelative = false;

		super( geometry, material );

		this.scale.setScalar( 0 );

		Emitter.on( "update", 		this.update.bind( this ) );
		Emitter.on( "mousemove", 	this.handleMouseMove.bind( this ) );
		Emitter.on( "touch",		this.handleTouch.bind( this ) );
		Emitter.on( "touchend",		this.handleTouchEnd.bind( this ) );
		Emitter.on( "wheel",		this.handleWheel.bind( this ) );

		this.raycaster  = new Raycaster();

		this.touchDown = false;
		this.touchEnd  = false;

		this.hovering = false;

		this.currentDay = 0;		

		const initalinterval = setInterval( ( ) => {

			const dataSet = State.data[ this.userData.boroughId ];		

			if ( this.currentDay < dataSet.length - 1 ) {

				this.currentDay ++;

				Emitter.emit( "globaldateupdate", this.currentDay );
	
			} else {

				Emitter.emit( "initialupdatecomplete" );

				clearInterval( initalinterval );

			}

		}, 1000 / 30 );

		this.intialScale = 0;

		setTimeout( () => { this.intialScale = 0.6; }, 1000 );
 
	}

	handleTouch() {

		this.touchDown = true;

	}

	handleTouchEnd() {

		this.touchDown = false;

	}

	handleMouseMove( mouse ) {
		 
		this.mouse = mouse.normalized;

	}

	handleWheel( { direction } ) {

		this.totalDays  = State.data[ this.userData.boroughId ].length - 1;

		this.currentDay += direction;

		if ( this.currentDay < 0 ) this.currentDay = this.totalDays;

		if ( this.currentDay > this.totalDays ) this.currentDay = 0;

		Emitter.emit( "globaldateupdate", this.currentDay );

	}

	update( { delta } ) {

		this.rotation.x += 0.1 * delta;
		this.rotation.z += 0.1 * delta;

		let newScale 		= this.intialScale;
		let newHoverValue	= 0;

		this.raycaster.setFromCamera( this.mouse || new Vector2( 0, 0 ), Camera );

		var intersection = this.raycaster.intersectObject( this );

		if ( intersection.length > 0 ) {

			const hoveredObject = intersection[ 0 ].object;

			newScale 		= 0.7;
			newHoverValue 	= 1;

			if ( !this.hovering ) {

				Emitter.emit( "griditemhover", hoveredObject );

			}			

			this.hovering = true;

		} else {

			this.hovering = false;

		}

		const scaleValue = new Vector3().lerpVectors( this.scale, new Vector3().setScalar( newScale ), 0.04 );
		this.scale.set( scaleValue.x, scaleValue.y, scaleValue.z );

		const hoverValue = Math3.lerp( this.material.uniforms.hoverValue.value, newHoverValue, 0.04 );

		const dataSet = State.data[ this.userData.boroughId ];		
		
		this.material.uniforms.covidValue.value = dataSet[ this.currentDay ].total_cases / State.totalCasesHigh;
		this.material.uniforms.hoverValue.value = hoverValue;


	}

}