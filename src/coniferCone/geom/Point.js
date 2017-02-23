/**
 * Created by work on 2017/2/21.
 */
import {Distance} from "../util/Distance";

class Point {
    constructor(x = 0, y = 0) {
        this.setValues(x, y);
    }

    setValues(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        return this;
    }

    copy(p) {
        this.x = p.x;
        this.y = p.y;
        return this;
    }

    /**
     * 两点间的直线距离
     * @param p
     * @returns {number}
     */
    distance(p) {
        return Distance.pointToPoint(this, p);
    }

    /**
     * 返回该点的一个克隆
     * @method clone
     * @return {Point} 克隆之后的Point实例
     **/
    clone() {
        return new Point(this.x, this.y);
    }

    /**
     * Returns a string representation of this object.
     * @method toString
     * @return {String} a string representation of the instance.
     **/
    toString() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]";
    }
}
export {Point};
