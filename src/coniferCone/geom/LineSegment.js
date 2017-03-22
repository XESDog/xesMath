/**
 * Created by work on 2017/2/17.
 */

import {Line} from "./Line";
import {Vector} from "./Vector";
import {Rectangle} from "../geom/Rectangle";

import {throwMissingParameterError} from "../error/Error";

class LineSegment extends Line {
    constructor(a = throwMissingParameterError(), b = throwMissingParameterError(), c, d) {

        let x1, x2, y1, y2;
        //两个点
        if (arguments.length === 2) {
            x1 = a.x;
            y1 = a.y;
            x2 = b.x;
            y2 = b.y;
        }
        //4个坐标定义两个点
        else if (arguments.length === 4) {
            x1 = a;
            y1 = b;
            x2 = c;
            y2 = d;
        } else {
            throw new Error('the number of parameters in the wrong!')
        }

        super(x1, y1, x2, y2);
        this._A = new Vector(x1, y1);
        this._B = new Vector(x2, y2);
        this._range = [Math.min(x1, x2), Math.max(x1, x2)];

    }

    get p1() {
        return this._A;
    }

    get p2() {
        return this._B;
    }

    get length() {
        return new Vector().subVectors(this._A, this._B)._length;
    }

    clone() {
        return new LineSegment(this._A.x, this._A.y, this._B.x, this._B, y);
    }

    /**
     * 中垂线
     */
    get perpendicularBisector() {

        let center = Vector.lerpVectors(this._A, this._B, 0.5);
        return this.toLine().getVerticalLine(center.x, center.y);
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
            // if (((x <= this.p1.x && x >= this.p2.x) || (x <= this.p2.x && x >= this.p1.x))
            //     && (y <= this.p1.y && y >= this.p2.y) || (y <= this.p2.y && y >= this.p1.y)) {
            //同时满足"在直线上"和"在线段形成的矩形区域"则该点在线段上
            if (this.toRectangle().contains(x, y)) {
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
        return new Line(this._A.x, this._A.y, this._B.x, this._B.y);
    }

    toVector() {
        return Vector.subVectors(this._B, this._A);
    }

    toRectangle() {
        let x = Math.min(this.p1.x, this.p2.x);
        let y = Math.min(this.p1.y, this.p2.y);
        let w = Math.abs(this.p1.x - this.p2.x);
        let h = Math.abs(this.p1.y - this.p2.y);
        return new Rectangle(x, y, w, h);
    }

    toString() {
        return `[LineSegment (p1.x="${this._A.x}" p1.y="${this._A.y}" p2.x="${this._B.x}" p2.y="${this._B.y}")]`;
    }
}
export {LineSegment};
