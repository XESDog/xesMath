/**
 * Created by work on 2017/2/16.
 */
class Circle {
    constructor(x, y, radius) {
        this._x = x;
        this._y = y;
        this._radius = radius
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

    toString() {
        return "[Circle (radius=" + this._radius + " circumference=" + this.circumference + " area=" + this.area + ")]";
    }

}
export {Circle};