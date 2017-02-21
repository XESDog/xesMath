/**
 * Created by work on 2017/2/21.
 */

import {Point} from "../coniferCone/geom/Point";
import {Line} from "../coniferCone/geom/Line";

main();
function main() {

    let canvas = document.getElementsByTagName('canvas')[0];
    let startP = new Point(), endP = new Point(), shape, shapes = new Map();
    let intersectionShape = new createjs.Shape();


    let data = {
        drawOption: 'line'
    };

    let ui = new dat.GUI();
    ui.add(data, 'drawOption', ['line', 'lineSegment', 'ellipse', 'rectangle', 'circle']);

    let stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', stage);

    stage.addChild(intersectionShape);

    stage.addEventListener('stagemousedown', onStageMouseDown);

    function onStageMouseDown(e) {
        stage.addEventListener('stagemousemove', onStageMouseMove);
        stage.addEventListener('stagemouseup', onStageMouseUp);
        startP.setValues(e.stageX, e.stageY);
        shape = new createjs.Shape();
        stage.addChild(shape);
    }

    function onStageMouseMove(e) {
        endP.setValues(e.stageX, e.stageY);
        draw();
    }

    function onStageMouseUp(e) {
        stage.removeEventListener('stagemousemove', onStageMouseMove);
        stage.removeEventListener('stagemouseup', onStageMouseUp);

        endP.setValues(e.stageX, e.stageY);
        draw();

        if (startP.distance(endP) < 4) {
            stage.removeChild(shape);
        } else {
            shapes.set(shape, new Line(startP.x, startP.y, endP.x, endP.y));
            drawIntersection();
        }
        startP.setValues(0, 0);
        endP.setValues(0, 0);
    }

    /**
     * 绘制直线间的交点
     */
    function drawIntersection() {
        let intersections = [];
        let keys = [...shapes.keys()];
        for (let i = 0; i < keys.length; i++) {
            let l1 = shapes.get(keys[i]);
            for (let j = i + 1; j < keys.length; j++) {
                let l2 = shapes.get(keys[j]);
                let intersection = l1.getLineIntersection(l2);
                if (intersection !== null) {
                    intersections.push(l1.getLineIntersection(l2));
                }
            }
        }

        let g = intersectionShape.graphics;
        g.clear();
        g.setStrokeStyle(1);

        intersections.forEach(function (value) {
            g.beginStroke('red');
            g.drawCircle(value.x, value.y, 4);
            g.endStroke();

        })
    }

    function draw() {
        let g = shape.graphics;

        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke('black');

        switch (data.drawOption) {
            case 'line': {
                let x = startP.x;
                let y = startP.y;
                let k = (endP.y - y) / (endP.x - x);
                let b = y - x * k;
                const MAX = 9999;

                if (k === Infinity || k === -Infinity) {
                    g.moveTo(x, -MAX);
                    g.lineTo(x, MAX);
                } else {
                    g.moveTo(-MAX, -MAX * k + b);
                    g.lineTo(MAX, MAX * k + b);
                }
            }
                break;
            case 'lineSegment': {
                let x = startP.x;
                let y = startP.y;
                shape.x = x;
                shape.y = y;
                g.moveTo(0, 0);
                g.lineTo(endP.x - x, endP.y - y);
            }
                break;
            case 'ellipse': {
                let w = endP.x - startP.x;
                let h = endP.y - startP.y;
                shape.x = startP.x;
                shape.y = startP.y;
                g.drawEllipse(0, 0, w, h);
            }
                break;
            case 'circle': {
                let w = endP.x - startP.x;
                let h = endP.y - startP.y;
                let offsetX = w / 2;
                let offsetY = h / 2;
                let radius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
                shape.x = startP.x + offsetX;
                shape.y = startP.y + offsetY;
                g.drawCircle(0, 0, radius);
                break;
            }
            case 'rectangle': {
                let w = endP.x - startP.x;
                let h = endP.y - startP.y;
                shape.x = startP.x;
                shape.y = startP.y;
                g.drawRect(0, 0, w, h);
            }
                break;

        }
    }
}
