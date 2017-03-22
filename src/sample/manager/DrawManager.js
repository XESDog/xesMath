import {Vector} from "../../coniferCone/geom/Vector";
import {Line} from "../../coniferCone/geom/Line";
import {LineSegment} from "../../coniferCone/geom/LineSegment";
import {UI_LineSegment} from "../ui/UI_LineSegment";
import {UI_Point} from "../ui/UI_Point";
import {UI_Line} from "../ui/UI_Line";
import {World} from "../ui/World";
import {UI_Circle} from "../ui/UI_Circle";
import {Circle} from "../../coniferCone/geom/Circle";
import {UI_Triangle} from "../ui/UI_Triangle";
import {Triangle} from "../../coniferCone/geom/Triangle";

import optionJson from "../option.json";

function throwError() {
    throw new Error('Missing parameter!');
}
class DrawManager {
    constructor(stage = throwError()) {
        this.stage = stage;
        this.mouseMoveID = null;
        this.startP = null;
        this.endP = null;
        this.currentObject = null;

        this.option = optionJson[0];
        this.optionMap = new Map();

        optionJson.forEach((value) => {
            let newValue = value.replace(/^\S/, s => s.toUpperCase());
            let drawingFun = `drawing${newValue}`, drawFun = `draw${newValue}`;

            //point的绘制方法和其他图形稍微有些区别
            if (value !== 'point') {
                this[drawFun] = () => {
                    if (this.currentObject !== null) {
                        this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
                    }
                };
            }

            this.optionMap.set(value, [this[drawingFun], this[drawFun]]);
        });


        this.stage.on('stagemousedown', this.onMouseDown, this);

    }

    get currentDrawingOption() {
        return this.optionMap.get(this.option)[0];
    }

    get currentDrawOption() {
        return this.optionMap.get(this.option)[1];
    }

    onMouseDown(e) {

        if (this.stage.getObjectUnderPoint(e.stageX, e.stageY, 0) !== null)return;

        this.startP = new Vector(e.stageX, e.stageY);
        this.mouseMoveID = this.stage.on('stagemousemove', this.onMouseMove, this);
        this.stage.on('stagemouseup', this.onMouseUp, this, true);
    }

    onMouseMove(e) {
        this.endP = new Vector(e.stageX, e.stageY);
        this.currentDrawingOption();
    }

    onMouseUp(e) {
        this.stage.off('stagemousemove', this.mouseMoveID);

        this.endP = new Vector(e.stageX, e.stageY);

        this.currentDrawOption();

        this.currentObject = null;
    }

    drawingPoint() {

    }

    drawPoint() {
        let point = new UI_Point({hasDragManager: true});
        World.add(point, this.endP);
    }

    drawingLine() {
        if (this.currentObject === null) {
            let l = new Line(this.startP.x, this.startP.y, this.endP.x, this.endP.y);
            let line = new UI_Line(l);
            World.add(line, l);
            this.currentObject = line;
        } else {
            this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
        }
    }

    /*drawLine() {
     if (this.currentObject !== null) {
     this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
     }
     }*/

    drawingLineSegment() {
        if (this.currentObject === null) {
            this.currentObject = new UI_LineSegment();
            World.add(this.currentObject, new LineSegment(this.startP.x, this.startP.y, this.endP.x, this.endP.y))
        } else {
            this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
        }
    }

    /*drawLineSegment() {
     if (this.currentObject !== null) {
     this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
     }
     }*/

    drawingCircle() {
        if (this.currentObject === null) {
            this.currentObject = new UI_Circle();

            let center = Vector.lerpVectors(this.startP, this.endP, 0.5);
            let radius = Vector.subVectors(this.startP, this.endP).length / 5;
            World.add(this.currentObject, new Circle(center.x, center.y, radius));

        } else {
            this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
        }
    }

    /*drawCircle() {
     if (this.currentObject !== null) {
     this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
     }
     }*/

    drawingTriangle() {
        if (this.currentObject === null) {
            this.currentObject = new UI_Triangle();

            let center = Vector.lerpVectors(this.startP, this.endP, 0.5);
            let radius = Vector.subVectors(this.startP, this.endP).length / 5;

            let p1 = new Vector(radius + center.x, center.y);
            let p2 = p1.clone().rotateAround(center, Math.PI * 2 / 3);
            let p3 = p1.clone().rotateAround(center, Math.PI * 4 / 3);


            World.add(this.currentObject, new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));


        } else {
            this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
        }
    }

    /*drawTriangle() {
     if (this.currentObject !== null) {
     this.currentObject.dispatchUpdateEvent(this.startP, this.endP);
     }
     }*/


}

export {DrawManager}