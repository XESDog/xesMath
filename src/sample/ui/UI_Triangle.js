import {Vector} from "../../coniferCone/geom/Vector";
import {Triangle} from "../../coniferCone/geom/Triangle";
import {UI_Shape} from "./UI_Shape";
import {UI_Point} from "./UI_Point";
import {UpdateEvent} from "../event/Event";
import {DragManager} from "../manager/DragManager.js";

class UI_Triangle extends UI_Shape {
    constructor() {
        super();

        this._dotA = new UI_Point();
        this._dotB = new UI_Point();
        this._dotC = new UI_Point();

        this._line = new createjs.Shape();

        this.addChild(this._dotA);
        this.addChild(this._dotB);
        this.addChild(this._dotC);

        this.addChild(this._line);
    }

    createDragManager() {
        if (!!this._dragManager)return;
        if (!this.stage)return;
        if (!this._t)return;

        this._dragManager = new DragManager(this.stage);
        this._dragManager.register(this._dotA);
        this._dragManager.register(this._dotB);
        this._dragManager.register(this._dotC);

        this._dotA.onStartDrag = () => {
            this._dragManager.setData(this._dotA, this._t.A);
        }
        this._dotB.onStartDrag = () => {
            this._dragManager.setData(this._dotB, this._t.B);
        }
        this._dotC.onStartDrag = () => {
            this._dragManager.setData(this._dotC, this._t.C);
        }

    }

    update(t) {
        this._t = t;

        this.createDragManager();

        let center = t.barycenter;
        let A = t.A.clone().sub(center);
        let B = t.B.clone().sub(center);
        let C = t.C.clone().sub(center);

        this.x = center.x;
        this.y = center.y;

        this._dotA.x = A.x;
        this._dotA.y = A.y;

        this._dotB.x = B.x;
        this._dotB.y = B.y;

        this._dotC.x = C.x;
        this._dotC.y = C.y;


        let g = this._line.graphics;
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        g.moveTo(this._dotA.x, this._dotA.y);
        g.lineTo(this._dotB.x, this._dotB.y);
        g.lineTo(this._dotC.x, this._dotC.y);
        g.lineTo(this._dotA.x, this._dotA.y);

    }

    dispatchUpdateEvent(startP, endP) {

        let center = Vector.lerpVectors(endP, startP, 0.5);
        let radius = Vector.subVectors(endP, startP).length / 2;
        let angle = Vector.subVectors(endP, startP).angle;

        let p1 = new Vector(radius + center.x, center.y).rotateAround(center, angle);
        let p2 = p1.clone().rotateAround(center, Math.PI * 2 / 3);
        let p3 = p1.clone().rotateAround(center, Math.PI * 4 / 3);

        let e = new UpdateEvent(new Triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y));
        this.dispatchEvent(e);
    }

}
export {UI_Triangle}