import {Point} from "./Point";
import {Vector} from "./Vector";
class Triangle {
    constructor(x1, y1, x2, y2, x3, y3) {
        //A
        this._p1 = new Point(x1, y1);
        //B
        this._p2 = new Point(x2, y2);
        //C
        this._p3 = new Point(x3, y3);
    }

    get p3() {
        return this._p3;
    }

    get p2() {
        return this._p2;
    }

    get p1() {
        return this._p1;
    }

    /**
     * 面积，矢量ABXAC再除以2
     * @returns {number}
     */
    get area() {
        let AB = Vector.subVectors(this._p2, this._p1);
        let AC = Vector.subVectors(this._p3, this._p1);
        return Math.abs(AB.cross(AC)) * 0.5;
    }
}
export {Triangle}