/**
 * Created by work on 2017/2/16.
 */


import {Point} from "./Point";
import {Angle} from "./Angle";
class Circle {
    constructor(x, y, radius, step = 0.1) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._step = Angle.PI2 / parseInt(Angle.PI2 / step);

    }

    setValues(x, y, radius) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        return this;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get radius() {
        return this._radius;
    }

    get center() {
        return new Point(this._x, this._y);
    }

    get points() {
        let i = 0, ps = [];
        while (i <= Angle.PI2) {
            ps.push(this.getPoint(i));
            i += this._step;
        }
        ps.push(this.getPoint(0));//形成封闭环
        return ps;
    }

    getPoint(angle=0) {
        let x = Math.cos(angle) * this._radius + this._x;
        let y = Math.sin(angle) * this._radius + this._y;
        return new Point(x, y);
    }

    contains(x, y) {
        let p = new Point(x, y);
        let d = p.distance(this.center);
        return d <= this._radius;
    }

    /**
     * 面积
     * @returns {number}
     */
    get area() {
        return Math.PI * this._radius * this._radius;
    }

    /**
     * 周长
     * @returns {number}
     */
    get circumference() {
        return 2 * Math.PI * this._radius;
    }

    /**
     * 直径
     * @returns {number}
     */
    get diameter() {
        return 2 * this._radius;
    }

    clone() {
        return new Circle(this._x, this._y, this._radius);
    }

    toString() {
        return "[Circle (radius=" + this._radius + " circumference=" + this.circumference + " area=" + this.area + ")]";
    }

}
export {Circle};