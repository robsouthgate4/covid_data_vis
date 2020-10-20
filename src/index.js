import * as THREE from "three";

import "./style.css";

import AssetManager from "Common/loading/AssetManager.js";
import Renderer     from "Globals/Renderer";
import State        from "Globals/State";
import World        from "./World";
import Emitter      from "Common/Emitter"

import rawCovidData from "Assets/data/phe_cases_london_boroughs.json";
import Utils        from "Common/Utils";

var lowest = Number.POSITIVE_INFINITY;
var highest = Number.NEGATIVE_INFINITY;

var tmp;

for  (var i=rawCovidData.length-1; i>=0; i--) {

    tmp = rawCovidData[ i ].total_cases;

    if (tmp < lowest) lowest = tmp;
    
    if (tmp > highest) highest = tmp;

}


const covidData = Utils.GroupBy( rawCovidData, "area_code" );

State.data              = covidData;
State.totalCasesHigh    = highest;
State.totalCasesLow     = lowest;
State.total             = Object.entries( covidData ).length;

AssetManager.load( { renderer: Renderer } ).then( () => {

    const world = new World();
    world.start();

    Emitter.emit( "stateloaded" );

    window.addEventListener( "resize", () => {

        world.resize( window.innerWidth, window.innerHeight );
    
    } );

});

