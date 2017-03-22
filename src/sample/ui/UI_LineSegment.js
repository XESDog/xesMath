import {UI_Point} from "./UI_Point";
import {Vector} from "../../coniferCone/geom/Vector";
import {LineSegment} from "../../coniferCone/geom/LineSegment";
import {DragManager} from "../manager/DragManager";
import {UpdateEvent} from "../event/Event";


class UI_LineSegment extends createjs.Container {

    constructor({} = {}) {
        super();

        this._dragManager = null;

        this._dotA = new UI_Point();
        this._dotB = new UI_Point();
        this._line = new createjs.Shape();
        this._dotC = new UI_Point({radius: 4, avatar: 1});

        this.addChild(this._line);
        this.addChild(this._dotA);
        this.addChild(this._dotB);
        this.addChild(this._dotC);

        // this.on('added', this.onAdded, this);
    }

    /**
     * 更新显示，唯一入口
     * @param ls
     */
    update(ls) {
        this._ls = ls;
        this._length = ls.toVector().length;

        this.createDragManager();

        this.setPosition();
        this.drawLine();
    }

    setPosition() {
        let center = Vector.lerpVectors(this._ls.B, this._ls.p1, 0.5);
        this.x = center.x;
        this.y = center.y;
        this._dotA.update(Vector.subVectors(this._ls.p1, center));
        this._dotB.update(Vector.subVectors(this._ls.B, center));
        this._dotC.update(new Vector());
    }

    drawLine() {
        let g = this._line.graphics;
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        g.moveTo(0, 0);
        g.lineTo(this._dotA.x, this._dotA.y);
        g.moveTo(0, 0);
        g.lineTo(this._dotB.x, this._dotB.y);
    }

    dispatchUpdateEvent(startP, endP) {
        let ls = new LineSegment(startP.x, startP.y, endP.x, endP.y);
        let e = new UpdateEvent(ls);
        this.dispatchEvent(e);
    }

    createDragManager() {
        if (!!this._dragManager)return;
        if (!this.stage)return;
        if (!this._ls)return;

        this._dragManager = new DragManager(this.stage);
        this._dragManager.register(this._dotA);
        this._dragManager.register(this._dotB);
        this._dragManager.register(this._dotC);

        let self = this;

        this._dotA.onStartDrag = function () {
            self._dragManager.setData(self._dotA, self._ls.p1)
        };
        this._dotB.onStartDrag = function () {
            self._dragManager.setData(self._dotB, self._ls.B)
        }
        this._dotC.onStartDrag = function () {
            self._dragManager.setData(self._dotC, self._ls);
        }
        this._dotA.onEndDrag = this._dotB.onEndDrag = this._dotC.onEndDrag = function () {
            self.dispatchUpdateEvent(self._ls.p1, self._ls.B);
        };

        this._dotA.onDraging = this._dotB.onDraging = this._dotC.onDraging = function (originalP, offsetP) {

            if (this === self._dotA) {
                let {x, y} = Vector.addVectors(originalP, offsetP);
                self._ls.p1.setValues(x, y);
            }
            else if (this === self._dotB) {
                let {x, y} = Vector.addVectors(originalP, offsetP);
                self._ls.B.setValues(x, y);
            }
            else if (this === self._dotC) {

                console.log(originalP);
                let {x, y} = Vector.addVectors(originalP.p1, offsetP);
                self._ls.p1.setValues(x, y);

                ({x, y} = Vector.addVectors(originalP.B, offsetP));
                self._ls.B.setValues(x, y);

            }

            self.dispatchUpdateEvent(self._ls.p1, self._ls.B);
        }
    }

    onAdded() {

    }
}
export {UI_LineSegment}