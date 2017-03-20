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

        this.on('added', this.onAdded, this);
    }

    /**
     * 更新显示，唯一入口
     * @param ls
     */
    update(ls) {
        this._p1 = ls.p1;
        this._p2 = ls.p2;
        this._length = Vector.subVectors(this._p2, this._p1)._length;
        this.setPosition();
        this.drawLine();
    }

    setPosition() {
        let center = Vector.lerpVectors(this._p2, this._p1, 0.5);
        this.x = center.x;
        this.y = center.y;
        this._dotA.update(Vector.subVectors(this._p1, center));
        this._dotB.update(Vector.subVectors(this._p2, center));
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

    dispatchUpdateEvent(x1, y1, x2, y2) {
        let ls = new LineSegment(x1, y1, x2, y2)
        let e = new UpdateEvent(ls);
        this.dispatchEvent(e);
    }

    onAdded() {
        if (this._dragManager === null) {
            this._dragManager = new DragManager(this.stage);
            this._dragManager.register(this._dotA);
            this._dragManager.register(this._dotB);
            this._dragManager.register(this._dotC);

            let self = this;
            let originalA, originalB;

            this._dotA.onStartDrag = this._dotB.onStartDrag = this._dotC.onStartDrag = function () {
                originalA = self._p1.clone();
                originalB = self._p2.clone();

            };
            this._dotA.onEndDrag = this._dotB.onEndDrag = this._dotC.onEndDrag = function () {
                self.dispatchUpdateEvent(self._p1.x, self._p1.y, self._p2.x, self._p2.y)

            };

            this._dotA.onDraging = this._dotB.onDraging = this._dotC.onDraging = function (originalP, offsetP) {

                if (this === self._dotA) {
                    self._p1 = Vector.addVectors(originalA, offsetP);
                }
                else if (this === self._dotB) {
                    self._p2 = Vector.addVectors(originalB, offsetP);
                }
                else if (this === self._dotC) {
                    self._p1 = Vector.addVectors(originalA, offsetP);
                    self._p2 = Vector.addVectors(originalB, offsetP);
                }

                self.dispatchUpdateEvent(self._p1.x, self._p1.y, self._p2.x, self._p2.y)
            }
        }

    }
}
export {UI_LineSegment}