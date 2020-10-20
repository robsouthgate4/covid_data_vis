import AssetManager from "Common/loading/AssetManager";
import { ClampToEdgeWrapping, RepeatWrapping } from "three";

const assets = {

	textures: {
		
		matcapNeutral: AssetManager.queue({
			url: require( "Assets/images/matcap2.jpg" ).default,
			type: 'texture',

		}),

		matcap: AssetManager.queue({
			url: require( "Assets/images/matcap4.jpg" ).default,
			type: 'texture',

		})

	},
	gltfs: {

		covidSphere: AssetManager.queue({
			url: require( "Assets/models/covid_sphere.glb" ).default,
			type: 'gltf'
		})

	},
	atlas: {
		roboto: AssetManager.queue({
			url: require( "Assets/images/roboto-thin-atlas.png" ).default,
			type: 'texture',
			wrapS: ClampToEdgeWrapping,
			wrapT: ClampToEdgeWrapping
		}),
		lato: AssetManager.queue({
			url: require( "Assets/images/lato-atlas.png" ).default,
			type: 'texture',
			wrapS: ClampToEdgeWrapping,
			wrapT: ClampToEdgeWrapping
		}),
	},
	fonts: {
		roboto: AssetManager.queue({
			url: require( "Assets/fonts/roboto/Roboto-Black.fnt" ).default,
			type: 'font'
		}),
		lato: AssetManager.queue({
			url: require( "Assets/fonts/lato/Lato-Font.fnt" ).default,
			type: 'font'
		})
	}
   
    
    
}

export default assets;