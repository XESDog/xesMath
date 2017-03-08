/**
 * Created by work on 2017/2/17.
 */

import {Line} from "./Line";
import {Vector} from "./Vector";
class LineSegment extends Line {
    constructor(x1, y1, x2, y2) {
        let k = Math.tan((y2 - y1) / (x2 - x1));
        let b = y1 - k * x1;
        super(k, b);

        this._p1 = new Vector(x1, y1);
        this._p2 = new Vector(x2, y2);
        this._range = [Math.min(x1, x2), Math.max(x1, x2)];
    }

    get p1() {
        return this._p1;
    }

    get p2() {
        return this._p2;
    }

    get length() {
        return new Vector().subVectors(this._p1, this._p2).length;
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
        let p = new Vector(x, y);
        let p_p1 = Vector.subVectors(this._p1, p);
        let p_p2 = Vector.subVectors(this._p2, p);

        //todo:点是线段的两个端点的情况没考虑
        return p_p1.angleTo(p_p2) === Math.PI;
    }

    /**
     * 线段到线段的距离
     * @param l
     */
    getDistanceFromLineSegment(l) {

    }

    toVector() {
        return Vector.subVectors(this._p2, this._p1);
    }
}
export {LineSegment};
