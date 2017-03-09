import {Vector} from "../../coniferCone/geom/Vector";
import {Line} from "../../coniferCone/geom/Line";
import {UI_Point} from "./UI_Point";
import {DragManager} from "../manager/DragManager";
import {UpdateEvent} from "../event/Event";
class UI_Line extends createjs.Container {
    constructor(l, {} = {}) {

        super();

        //根据_l来得到两个控制点的坐标，通过两个控制点来调整_l的数据
        this._p1 = null;
        this._p2 = null;
        this._dragManager = null;

        this._dotA = new UI_Point();
        this._dotB = new UI_Point();
        this._line = new createjs.Shape()


        // this.addChild(this._dotA);
        // this.addChild(this._dotB);
        this.addChild(this._line);

        this.on('added', this.onAdded, this);
    }

    update(l) {
        this._l = l;
        let points = this._l.points;
        let center = Vector.lerpVectors(points[0].toVector(), points[1].toVector(), 0.5);
        let p1 = Vector.subVectors(points[0].toVector(), center);
        let p2 = Vector.subVectors(points[1].toVector(), center);
        this.x = center.x;
        this.y = center.y;


        let g = this._line.graphics;
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        g.moveTo(0, 0);
        g.lineTo(p1.x, p1.y);
        g.moveTo(0, 0);
        g.lineTo(p2.x, p2.y);

    }

    dispatchUpdateEvent(x1, y1, x2, y2) {
        let ls = new Line(x1, y1, x2, y2);
        let e = new UpdateEvent(ls);
        this.dispatchEvent(e);
    }

    onAdded(e) {
        if (this._dragManager === null) {
            this._dragManager = new DragManager(this.stage);
            this._dragManager.register(this._dotA);
            this._dragManager.register(this._dotB);
        }
    }

    destroy() {

    }
}
export {UI_Line}