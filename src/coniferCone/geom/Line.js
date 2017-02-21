/**
 * Created by work on 2017/2/16.
 */

import {Point} from "./Point";
class Line {
    constructor() {
        //垂直于x轴
        if (arguments.length === 1) {
            this.x = arguments[0];
        }
        //k,b
        else if (arguments.length === 2) {
            this.k = arguments[0];
            this.b = arguments[1];

        }
        //x1,y1,x2,y2
        else if (arguments.length === 4) {
            let x1 = arguments[0];
            let y1 = arguments[1];
            let x2 = arguments[2];
            let y2 = arguments[3];
            this.k = (y2 - y1) / (x2 - x1);

            if (this.isVertical) {
                this.x = x1;
            } else {
                this.b = y1 - this.k * x1;
            }

        } else {
            throw new Error('arguments number invalid');
        }
        this.range = [-999999999, 999999999];
    }

    get points() {
        let p;
        if (this.isVertical&&this.x!==undefined&&this.x!==null) {
            p = [new Point(this.x, this.range[0])
                , new Point(this.x, this.range[1])];
        } else {
            p = [new Point(this.range[0], this.k * this.range[0] + this.b)
                , new Point(this.range[1], this.k * this.range[1] + this.b)];
        }
        return p;
    }

    /**
     * 垂直于x轴
     * @returns {boolean}
     */
    get isVertical() {
        return this.k === Infinity || this.k === -Infinity || this.b === Infinity || this.b === -Infinity;
    }

    /**
     * 是否点在直线上
     * @param x
     * @param y
     * @returns {boolean}
     */
    isPointInLine(x, y) {
        return this.k * x + this.b === y;
    }

    /**
     * 获取和另外一条直线的交点
     * @param l
     */
    getLineIntersection(l) {
        //平行
        if (this.k === l.k) {
            return null;
        } else {
            const k1 = this.k;
            const b1 = this.b;
            const k2 = l.k;
            const b2 = l.b;
            const x = (b2 - b1) / (k1 - k2);
            return new Point(x, k1 * x + b1);
        }

    }

    /**
     * 获取经过指定点的垂线
     * @param x
     * @param y
     * @returns {Line}
     */
    getVerticalLine(x, y) {
        return new Line(-1 / this.k, y + x / this.k);
    }

    /**
     * 获取经过指定点的垂线交点
     * @param x
     * @param y
     * @returns {*}
     */
    getVerticalIntersection(x, y) {

        if (this.isPointInLine(x, y))return [x, y];

        var verticalLine = this.getVerticalLine(x, y);
        return this.getLineIntersection(verticalLine);
    }

    /**
     * 获取对称点
     * @param x
     * @param y
     * @returns {[*,*]}
     */
    getSymmetryPoint(x, y) {

        if (this.isPointInLine(x, y))return [x, y];

        //换算成一般式
        const A = this.k;
        const B = -1;
        const C = this.b;
        const temp = 2 * (A * x + B * y + C) / (A * A + B * B);

        return [x - A * temp, y - B * temp];

    }

    /**
     * 获取两线夹角（0<=angle<90）
     * @param l
     * @returns {number}
     */
    getIntersectionAngle(l) {
        const A1 = this.k;
        const B1 = -1;
        const A2 = l.k;
        const B2 = -1;
        return Math.atan(Math.abs(A2 * B1 - A1 * B2) / A1 * A2 + B1 * B2);
    }

}
export {Line};
