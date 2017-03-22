/**
 * Created by work on 2017/3/7.
 */

import {DrawManager} from "./manager/DrawManager";
import {World} from "./ui/World";
import optionJson from "./option.json";

function main() {
    let data = {
        option: 'point'
    };
    let ui = new dat.GUI();

    let stage = new createjs.Stage(document.getElementsByTagName('canvas')[0]);

    let drawManager = new DrawManager(stage);

    World.init(stage);

    ui.add(data, 'option', optionJson).onChange(function (value) {
        drawManager.option = value;
    });

    createjs.Ticker.on('tick', stage);
    createjs.Ticker.setFPS(60);
}
main();
