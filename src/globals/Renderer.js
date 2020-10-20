import { Color, WebGL1Renderer } from "three";

class Renderer extends WebGL1Renderer {

	constructor() {

		super( { canvas: document.getElementById( "c" ), antialias: false } );

		//this.setPixelRatio( window.devicePixelRatio );
		this.setClearColor( new Color( 0x000000 ) );

		this.setSize( window.innerWidth, window.innerHeight );

		this.context.getExtension('OES_standard_derivatives');
		

	}

}

export default new Renderer();