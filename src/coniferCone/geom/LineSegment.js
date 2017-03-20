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
        return new Vector().subVectors(this._p1, this._p2)._length;
    }

    clone() {
        return new LineSegment(this._p1.x, this._p1.y, this._p2.x, this._p2, y);
    }

    /**
     * 是否点在线段上
     * @param x
     * @param y
     */
    isPointInLineSegment(x, y) {
        //是否在直线上
        if (this.toLine().isPointInLine(x, y)) {
            //是否在线段形成的矩形区域
            if (((x <= this.p1.x && x >= this.p2.x) || (x <= this.p2.x && x >= this.p1.x))
                && (y <= this.p1.y && y >= this.p2.y) || (y <= this.p2.y && y >= this.p1.y)) {
                //同时满足"在直线上"和"在线段形成的矩形区域"则该点在线段上
                return true;
            }
        }
        return false;
    }


    /**
     * 是否和线段ls相交
     * @param ls
     */
    isIntersectWithLineSegment(ls) {
        let p = this.toLine().getIntersectionWithLine(ls.toLine());
        return !!(p && this.isPointInLineSegment(p.x, p.y) && ls.isPointInLineSegment(p.x, p.y));
    }

    /**
     * 线段到线段的距离
     * @param l
     */
    getDistanceWithLineSegment(l) {
        if (this.isIntersectWithLineSegment(l)) {
            return 0;
        } else {
//todo
        }
    }

    toLine() {
        return new Line(this._p1.x, this._p1.y, this._p2.x, this._p2.y);
    }

    toVector() {
        return Vector.subVectors(this._p2, this._p1);
    }

    toRectangle() {
        let x = Math.min(this.p1.x, this.p2.x);
        let y = Math.min(this.p1.y, this.p2.y);
        let w = Math.abs(this.p1.x - this.p2.x);
        let h = Math.abs(this.p1.y - this.p2.y);
        return new Rectangle(x, y, w, h);
    }

    toString() {
        return `[LineSegment (p1.x="${this._p1.x}" p1.y="${this._p1.y}" p2.x="${this._p2.x}" p2.y="${this._p2.y}")]`;
    }
}
export {LineSegment};
