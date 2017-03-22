import {UI_Shape} from "./UI_Shape";
import {UI_Point} from "./UI_Point";
import {Vector} from "../../coniferCone/geom/Vector";
import {Circle} from "../../coniferCone/geom/Circle";
import {UpdateEvent} from "../event/Event";
import {DragManager} from "../manager/DragManager";

class UI_Circle extends UI_Shape {
    constructor({
                    step = 0.1,

                } = {}) {
        super();

        this._step = step;
        this._center = new UI_Point();
        this._pointInEdge = new UI_Point();
        this._edge = new createjs.Shape();
        this._c = null;

        this.addChild(this._edge);
        this.addChild(this._center);
        this.addChild(this._pointInEdge);


        // this.on('added', this.onAdded, this);
    }

    onAdded(e) {
        // this.createDragManager();

    }

    createDragManager() {

        if (!!this._dragManager) return;
        if (!this.stage)return;
        if (!this._c)return;

        this._dragManager = new DragManager(this.stage);
        this._dragManager.register(this._center);
        this._dragManager.register(this._pointInEdge);

        let self = this;

        this._center.onStartDrag = function () {
            self._dragManager.setData(self._center, self._c.center.clone());
        };
        this._pointInEdge.onStartDrag = function () {
            self._dragManager.setData(self._pointInEdge, self._c.getPoint(0));
        };
        this._center.onEndDrag = this._center.onDraging = function (originalP, offsetP) {
            let center = Vector.addVectors(originalP, offsetP);
            let c = new Circle(center.x, center.y, self._c.radius);
            self.dispatchUpdateEvent(c);
        };

        this._pointInEdge.onDraging = this._pointInEdge.onEndDrag = function (originalP, offsetP) {
            let centerToEdge = Vector.subVectors(originalP, self._c.center);
            let r = centerToEdge.add(offsetP).length;
            let c = new Circle(self._c.x, self._c.y, r);
            self.dispatchUpdateEvent(c);
        }
    }

    update(c) {
        this.x = c.center.x;
        this.y = c.center.y;
        this._c = c;

        this.createDragManager();

        let edgePoint = c.getPoint(0);
        this._pointInEdge.x = edgePoint.x - c.center.x;
        this._pointInEdge.y = edgePoint.y - c.center.y;

        let g = this._edge.graphics;
        let ps = c.points;
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        for (let i = 0; i < ps.length; i++) {
            if (i === 0) {
                g.moveTo(ps[i].x - c.center.x, ps[i].y - c.center.y)
            } else {
                g.lineTo(ps[i].x - c.center.x, ps[i].y - c.center.y);
            }
        }
        g.lineTo(0, 0);

    }

    /**
     * 如果传入1个参数，那么该参数是一个Circle对象
     * @param startP
     * @param endP
     */
    dispatchUpdateEvent(startP, endP) {
        let p1, p2, center, radius, c;

        if (arguments.length === 1) {
            c = startP;
        }
        if (arguments.length === 2) {
            p1 = startP.clone();
            p2 = endP.clone();
            center = Vector.lerpVectors(p1, p2, 0.5);
            radius = Vector.subVectors(p1, p2).length / 2;
            c = new Circle(center.x, center.y, radius);
        }


        let e = new UpdateEvent(c);
        this.dispatchEvent(e);

    }

    destroy() {
//todo
    }
}
export {UI_Circle}