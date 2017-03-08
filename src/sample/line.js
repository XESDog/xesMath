/**
 * Created by work on 2017/2/21.
 */

import {Point} from "../coniferCone/geom/Point";
import {Line} from "../coniferCone/geom/Line";

/**
 * 交点和角度
 */
class IntersectionAndAngle {
    constructor(intersection, angle) {
        this.intersection = intersection;
        this.angle = angle;
    }
}

main();
function main() {

    let canvas = document.getElementsByTagName('canvas')[0];
    let startP = new Point(), endP = new Point(), shape, shapes = new Map();
    //绘制交点
    let intersectionShape = new createjs.Shape();
    //角度文本集合
    let angleContainer = new createjs.Container();

    let data = {
        drawOption: 'line'
    };

    let ui = new dat.GUI();
    ui.add(data, 'drawOption', ['line', /*'lineSegment', 'ellipse', 'rectangle', 'circle'*/]);

    let stage = new createjs.Stage(canvas);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener('tick', stage);

    stage.addChild(intersectionShape);
    stage.addChild(angleContainer);

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
            shapes.set(shape, new Line(startP._x, startP._y, endP._x, endP._y));
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
                    let data = new IntersectionAndAngle(intersection, l1.getIntersectionAngle(l2));
                    intersections.push(data);
                }
            }
        }

        let g = intersectionShape.graphics;
        g.clear();
        g.setStrokeStyle(1);

        intersections.forEach(function (value) {
            let intersection = value.intersection;
            let angle = value.angle.toFixed(2);
            let txt = new createjs.Text(angle, '12px Arial', 'blue');
            g.beginStroke('red');
            g.drawCircle(intersection._x, intersection._y, 4);
            angleContainer.addChild(txt);
            txt._x = intersection._x;
            txt._y = intersection._y;

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
                let x = startP._x;
                let y = startP._y;
                let k = (endP._y - y) / (endP._x - x);
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
                let x = startP._x;
                let y = startP._y;
                shape._x = x;
                shape._y = y;
                g.moveTo(0, 0);
                g.lineTo(endP._x - x, endP._y - y);
            }
                break;
            case 'ellipse': {
                let w = endP._x - startP._x;
                let h = endP._y - startP._y;
                shape._x = startP._x;
                shape._y = startP._y;
                g.drawEllipse(0, 0, w, h);
            }
                break;
            case 'circle': {
                let w = endP._x - startP._x;
                let h = endP._y - startP._y;
                let offsetX = w / 2;
                let offsetY = h / 2;
                let radius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2)) / 2;
                shape._x = startP._x + offsetX;
                shape._y = startP._y + offsetY;
                g.drawCircle(0, 0, radius);
                break;
            }
            case 'rectangle': {
                let w = endP._x - startP._x;
                let h = endP._y - startP._y;
                shape._x = startP._x;
                shape._y = startP._y;
                g.drawRect(0, 0, w, h);
            }
                break;

        }
    }
}
