/**
 * Created by work on 2017/2/16.
 */

import {Point} from "./Point";
import {Angle} from "./Angle";
import {Intersection} from "../util/Intersection";
class Line {
    constructor() {
        this._k;
        this._b;
        this._x;
        this._range;

        //垂直于x轴
        if (arguments.length === 1) {
            this._x = arguments[0];
            this._k = Infinity;
        }
        //k,b
        else if (arguments.length === 2) {
            this._k = arguments[0];
            this._b = arguments[1];

        }
        //x1,y1,x2,y2
        else if (arguments.length === 4) {
            let x1 = arguments[0];
            let y1 = arguments[1];
            let x2 = arguments[2];
            let y2 = arguments[3];
            this._k = (y2 - y1) / (x2 - x1);

            if (this.isVertical) {
                this._x = x1;
            } else {
                this._b = y1 - this._k * x1;
            }

        } else {
            throw new Error('arguments number invalid');
        }
        this._range = [-999999999, 999999999];
    }

    get k() {
        return this._k;
    }

    get b() {
        return this._b;
    }

    get x() {
        return this._x;
    }

    get range() {
        return this._range;
    }

    /**
     * 获取用于绘图的点
     * @returns {*}
     */
    get points() {
        let p;
        if (this.isVertical) {
            p = [new Point(this._x, this._range[0])
                , new Point(this._x, this._range[1])];
        }
        else if (this.isHorizontal) {
            p = [new Point(this._range[0], this._b)
                , new Point(this._range[1], this._b)];
        }
        else {
            p = [new Point(this._range[0], this._k * this._range[0] + this._b)
                , new Point(this._range[1], this._k * this._range[1] + this._b)];
        }
        return p;
    }

    /**
     * 垂直
     * @returns {boolean}
     */
    get isVertical() {
        return this._k === Infinity || this._k === -Infinity || this._b === Infinity || this._b === -Infinity;
    }

    /**
     * 水平
     * @returns {boolean}
     */
    get isHorizontal() {
        return this._k === 0;
    }

    /**
     * 是否点在直线上，支持传入Point作为参数以及x、y轴坐标作为参数
     *
     *  let p=new Point(1,2);
     *  isPointInLine(p)
     *  isPointInLine(1,2);
     *
     * @param x
     * @param y
     * @returns {boolean}
     */
    isPointInLine(x, y) {
        if (arguments.length === 1 && x instanceof Point) {
            y = x._y;
            x = x._x;
        }
        if (this.isVertical) {
            return x === this._x;
        }
        return this._k * x + this._b === y;
    }

    /**
     * 获取和另外一条直线的交点
     * @param l
     */
    getLineIntersection(l) {
        return Intersection.lineToLine(this, l);
    }

    /**
     * 获取经过指定点的垂线
     * @param x
     * @param y
     * @returns {Line}
     */
    getVerticalLine(x, y) {
        if (this.isVertical) {
            return new Line(0, y);
        }
        if (this.isHorizontal) {
            return new Line(x);
        }
        return new Line(-1 / this._k, y + x / this._k);
    }

    /**
     * 获取经过指定点的垂线交点
     * @param x
     * @param y
     * @returns {*}
     */
    getVerticalIntersection(x, y) {
        if (this.isPointInLine(x, y))return new Point(x, y);
        let verticalLine = this.getVerticalLine(x, y);
        return this.getLineIntersection(verticalLine);
    }

    /**
     * 获取对称点
     * @param x
     * @param y
     * @returns {Point}
     */
    getSymmetryPoint(x, y) {

        if (this.isPointInLine(x, y))return new Point(x, y);

        //换算成一般式
        const A = this._k;
        const B = -1;
        const C = this._b;
        const temp = 2 * (A * x + B * y + C) / (A * A + B * B);

        return new Point(x - A * temp, y - B * temp);

    }

    /**
     * 获取两线夹角（0<=angle<=90）
     * @param l
     * @returns {number}
     */
    getIntersectionAngle(l) {
        let angle = new Angle();
        //平行
        if (this._k === l._k) {
            return 0;
        }
        //如果有一条直线垂直于x轴，计算出另外一条直线和x轴之间的夹角，然后用90度减去这个夹角
        if (this.isVertical || l.isVertical) {
            angle.angle = Math.atan(Math.abs(this.isVertical ? l._k : this._k))
            return 90 - angle.acute;
        }
        angle.angle = Math.atan(this._k) - Math.atan(l._k);
        return angle.acute;
    }

}
export {Line};
