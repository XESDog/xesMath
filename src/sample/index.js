/**
 * Created by work on 2017/3/7.
 */

import {DrawManager} from "./manager/DrawManager";
import {World} from "./ui/World";

// import createjs from '../../lib/createjs-2015.11.26.min';
// import dat from '../../lib/dat.gui.min';

function main() {
    let data = {
        option: 'point'
    };
    let ui = new dat.GUI();

    let stage = new createjs.Stage(document.getElementsByTagName('canvas')[0]);

    let drawManager = new DrawManager(stage);

    World.init(stage);

    ui.add(data, 'option', ['point', 'line', 'lineSegment', 'circle']).onChange(function (value) {
        drawManager.option = value;
    });

    createjs.Ticker.on('tick', stage);
    createjs.Ticker.setFPS(60);
}
main();
