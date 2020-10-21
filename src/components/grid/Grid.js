import {Math as Math3, Raycaster, Vector2, Object3D } from "three";

import Emitter 		from "Common/Emitter";
import State 		from "Globals/State";
import Scene 		from "Globals/Scene";
import Camera 		from "Globals/Camera";
import GridItem		from "./GridItem";

export default class Grid extends Object3D {

	constructor() {

		const { data } = State;

		const count = Object.keys( data ).length;		

		super(  );		

		//this.rotateX( Math3.degToRad( -60 ) );

		Emitter.on( "update", 		 this.update.bind( this ) );
		Emitter.on( "mousemove", 	 this.handleGlobalMouseMove.bind( this ) );

		window.addEventListener( "mousedown", this.handleTouch.bind( this ) );

		this.data = data;

		this.count = count;
		this.radius = 8;
		this.raycaster  = new Raycaster();
		this.mouse 		= new Vector2();
		this.gridItems	= [];	

		this.clickedItemId;
		this.clicked = false;

		this.createGrid( );

		this.mouseDown = false;

		this.mouseDeltaX = 0;
		this.mouseDeltaY = 0;

		this.mouseX = 0;
		this.mouseY = 0;

		this.targetRotation = 0;

		this.mouseXOnMouseDown = 0;

		this.targetRotationOnMouseDown = 0;

		this.mouseHasBeenDown = false;
		this.hovering 		= false;

		this.intersected;
		this.pickerPosition = { x: 0, y: 0 };

		setInterval( () => { this.runRaycast() }, 1000 / 5 );

		this.lastPickedObject;

	}

	handleTouch( evt ) {

		this.mouseDown = true;

		window.addEventListener( "mousemove", 	this.handleMouseMove.bind( this ), false );
		window.addEventListener( "mouseup", 	this.handleTouchEnd.bind( this ), false );

		this.mouseXOnMouseDown = evt.clientX - window.innerWidth / 2;

		this.targetRotationOnMouseDown = this.targetRotation;

		this.mouseHasBeenDown = true;	
		

	}

	handleTouchEnd() {

		window.removeEventListener( "mousemove", this.handleMouseMove.bind( this ), false );
		window.removeEventListener( "mouseup", this.handleTouchEnd.bind( this ), false );

		this.mouseDown = false;

	}

	handleMouseMove( evt ) {

		if ( !this.mouseDown ) {

			return;

		}

		this.mouseX = evt.clientX - window.innerWidth / 2;
		this.targetRotation = this.targetRotationOnMouseDown + ( this.mouseX - this.mouseXOnMouseDown ) * 0.002;

		
	}

	handleGlobalMouseMove( mouse ) {

		this.pickerPosition = mouse.normalized;

	}

	createGrid(  ) {

		let i = 0;

		const arr = Object.entries( this.data );
		for (const [ key, value ] of arr ) {

			i ++;
 
			const gridItem = new GridItem();

			gridItem.userData.boroughId = key;
			gridItem.userData.covidDays	= value;
			gridItem.userData.areaName 	= value[ 0 ].area_name;
			gridItem.userData.info      = value;

			const theta = ( i / ( this.count - 1 ) ) * ( 2 * Math.PI );
			
			gridItem.position.set(  Math.cos( theta ) * this.radius, 0, Math.sin( theta ) * this.radius );

			this.gridItems.push( gridItem );
			
			this.add( gridItem );

		}

	}

	runRaycast() {

		this.raycaster.setFromCamera( this.pickerPosition, Camera );
		
		const intersectedObjects = this.raycaster.intersectObjects( this.gridItems );

		

		if ( intersectedObjects.length ) {			
			
			this.pickedObject = intersectedObjects[0].object;

			if ( this.pickedObject ) {

				Emitter.emit( "griditemhover", this.pickedObject );

				this.pickedObject = null;

			} else {
	
				this.pickedObject = null;
	
			}

		}

	}

	update( { elapsed, delta } ) {		

		if ( this.mouseHasBeenDown ) {

			this.rotation.y += ( this.targetRotation - this.rotation.y ) * 0.03;

		}
		
	}

}

