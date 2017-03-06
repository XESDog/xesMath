/**
 * Created by work on 2017/2/17.
 */

import {Line} from "./Line";
import {Vector2} from "./Vector2";
class LineSegment extends Line {
    constructor(x1, y1, x2, y2) {
        let k = Math.tan((y2 - y1) / (x2 - x1));
        let b = y1 - k * x1;
        super(k, b);

        this.p1 = new Vector2(x1, y1);
        this.p2 = new Vector2(x2, y2);
        this.range = [Math.min(x1, x2), Math.max(x1, x2)];
    }

    get length() {
        return new Vector2().subVectors(this.p1, this.p2).length;
    }

    /**
     * 点到线段的距离
     * @param x
     * @param y
     */
    getDistanceFromPoint(x, y) {


    }

    /**
     * 是否点在线段上
     * @param x
     * @param y
     */
    isPointInLineSegment(x, y) {
        let p = new Vector2(x, y);
        let p_p1 = Vector2.subVectors(this.p1, p);
        let p_p2 = Vector2.subVectors(this.p2, p);

        return p_p1.angleTo(p_p2) === Math.PI;
    }

    /**
     * 线段到线段的距离
     * @param l
     */
    getDistanceFromLineSegment(l) {

    }

    toVector2() {
        return Vector2.subVectors(this.p2, this.p1);
    }
}
export {LineSegment};
