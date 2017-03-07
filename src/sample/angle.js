/**
 * Created by work on 2017/3/1.
 */

import {UI_LineSegment} from "./ui/UI_LineSegment";
import {Vector} from "../coniferCone/geom/Vector";
import {Angle} from "../coniferCone/geom/Angle";

let app = new Vue({
    el: "#app",
    data: {
        p1: new Vector(200, 150),
        p2: new Vector(300, 100),
        p3: new Vector(300, 200),
        degree: 0,
        angle: 0,
    }
});

let stage = new createjs.Stage(document.getElementsByTagName('canvas')[0]);
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener('tick', stage);

let edgeA = new UI_LineSegment(app.p1, app.p2);
let edgeB = new UI_LineSegment(app.p1, app.p3);

stage.addChild(edgeA);
stage.addChild(edgeB);

let nextTick = false;
function changeAngle() {
    if (!nextTick) {
        app.$nextTick(function () {
            let A = (new Vector()).subVectors(app.p2, app.p1);
            let B = (new Vector()).subVectors(app.p3, app.p1);
            let angle = new Angle(A.angleTo(B), false)
            app.degree = angle.degree;
            app.angle = angle.angle;
            nextTick = false;
        });
        nextTick = true;
    }

}

app.$watch('p2.x', changeAngle);
app.$watch('p2.y', changeAngle);
app.$watch('p3.x', changeAngle);
app.$watch('p3.y', changeAngle);







