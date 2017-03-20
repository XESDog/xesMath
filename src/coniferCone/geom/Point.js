/**
 * Created by work on 2017/2/21.
 */
import {Vector} from "./Vector";

class Point {
    constructor(x = 0, y = 0) {
        this.setValues(x, y);
    }

    setValues(x = 0, y = 0) {
        this._x = x;
        this._y = y;
        return this;
    }

    copy(p) {
        this._x = p._x;
        this._y = p._y;
        return this;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    /**
     * 两点间的直线距离
     * @param p
     * @returns {number}
     */
    distance(p) {
        let w = this.x - p.x;
        let h = this.y - p.y;
        return Math.sqrt(w * w + h * h);
    }

    /**
     * 返回该点的一个克隆
     * @method clone
     * @return {Point} 克隆之后的Point实例
     **/
    clone() {
        return new Point(this._x, this._y);
    }

    /**
     * Returns a string representation of this object.
     * @method toString
     * @return {String} a string representation of the instance.
     **/
    toString() {
        return "[Point (x=" + this._x + " y=" + this._y + ")]";
    }

    /**
     * 转换成Vector2
     * @returns {Vector}
     */
    toVector() {
        return new Vector(this._x, this._y);
    }
}
export {Point};
