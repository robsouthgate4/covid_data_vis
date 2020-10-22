import * as THREE from "three";

import "./style.css";

import AssetManager from "Common/loading/AssetManager.js";
import Renderer     from "Globals/Renderer";
import State        from "Globals/State";
import World        from "./World";
import Emitter      from "Common/Emitter"

import _            from "lodash"

import rawCovidData from "Assets/data/phe_cases_london_boroughs.json";
import Utils        from "Common/Utils";

var lowest = Number.POSITIVE_INFINITY;
var highest = Number.NEGATIVE_INFINITY;


const max = _.maxBy( rawCovidData, 'total_cases');

console.log( max.total_cases )

const covidData = Utils.GroupBy( rawCovidData, "area_code" );


State.data              = covidData;
State.totalCasesHigh    = 1482;
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

