/**
 * Created by work on 2017/3/1.
 */

import {UI_LineSegment} from "./ui/UI_LineSegment";
import {UI_Point} from "./ui/UI_Point";
import {Vector} from "../coniferCone/geom/Vector";
import {LineSegment} from "../coniferCone/geom/LineSegment";
import {Intersection} from "../coniferCone/util/Intersection";

let app = new Vue({
    el: "#app",
    data: {
        p: new Vector(100, 100),
        p1: new Vector(200, 150),
        p2: new Vector(300, 100),
        p3: new Vector(300, 100),
        p4: new Vector(300, 200),

    }
});

let stage = new createjs.Stage(document.getElementsByTagName('canvas')[0]);
createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener('tick', stage);

let edgeA = new UI_LineSegment(app.p1, app.p2);
let edgeB = new UI_LineSegment(app.p3, app.p4);
let dot = new UI_Point(app.p);

let intersectionShape = new createjs.Shape();

stage.addChild(edgeA);
stage.addChild(edgeB);
stage.addChild(dot);
stage.addChild(intersectionShape);

let nextTick = false;
function changeAngle() {
    if (!nextTick) {
        app.$nextTick(function () {

            let lsA = new LineSegment(app.p1.x, app.p1.y, app.p2.x, app.p2.y);
            let lsB = new LineSegment(app.p3.x, app.p3.y, app.p4.x, app.p4.y);
            let intersection = Intersection.lineSegmentToLineSegment(lsA, lsB);
            let g = intersectionShape.graphics;
            g.clear();
            if (intersection) {
                g.setStrokeStyle(1);
                g.beginStroke('black');
                g.drawCircle(intersection.x, intersection.y, 4);
            } else {

            }
            nextTick = false;
        });
        nextTick = true;
    }

}

app.$watch('p1.x', changeAngle);
app.$watch('p1.y', changeAngle);
app.$watch('p2.x', changeAngle);
app.$watch('p2.y', changeAngle);
app.$watch('p3.x', changeAngle);
app.$watch('p3.y', changeAngle);
app.$watch('p4.x', changeAngle);
app.$watch('p4.y', changeAngle);







