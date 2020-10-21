
import { 
    DirectionalLight} 
from "three";

import Emitter              from "Common/Emitter";

import Camera               from "Globals/Camera";
import Scene                from "Globals/Scene";
import Renderer             from "Globals/Renderer";

import Base                 from "./Base";
import PostProcess          from "./postprocessing";
import Grid                 from "./components/grid/Grid";
import Background           from "./components/background/Background"
import DayText              from "./components/text/DayText";
import BoroughText          from "./components/text/BoroughText";
import CasesText            from "./components/text/CasesText";

export default class World extends Base {

    constructor() {

        super();

        this.renderer   =   Renderer;
        this.scene      =   Scene;
        this.grid;       

        this.currentDay = 0;

        Emitter.on( "stateloaded",          this.handleDataLoaded.bind( this ) );
        Emitter.on( "globaldateupdate",     this.handleDataUpdate.bind( this ) );
        

    }

    handleDataUpdate( day ) {

        this.currentDay = day;

    }

    handleDataLoaded( ) {

        this.createScene( );

    }

    createScene( ) {

        this.grid       = new Grid();
        this.background = new Background();

        this.scene.add( this.grid, this.background );

        this.dayText   = new DayText();
        this.infoText  = new BoroughText();
        this.casesText = new CasesText();

        this.scene.add( this.dayText, this.infoText, this.casesText );

    }
    

    resize() {

        let w = window.innerWidth;
        let h = window.innerHeight;
    
        Camera.aspect = w / h;
        Camera.updateProjectionMatrix();
    
        Renderer.setSize(w, h);

    }

    onMouseMove( ev ) {

        super.onMouseMove( ev );

    }

    onTouchEnd( ev ) {

        super.onTouchEnd( ev );

    }

    earlyUpdate( elapsedTime, delta ) {

        super.earlyUpdate( elapsedTime, delta );
    }

    update( elapsedTime, delta ) {

        super.update( elapsedTime, delta );

        PostProcess.render( Scene, Camera );

    }

    lateUpdate( elapsedTime, delta ) {        

        super.lateUpdate( elapsedTime, delta );

    }

}