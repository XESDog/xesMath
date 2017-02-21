/**
 * Created by work on 2017/2/21.
 */

class Point {
    constructor(x = 0, y = 0) {
        this.setValues(x, y);
    }

    setValues(x=0, y=0) {
        this.x = x;
        this.y = y;
        return this;
    }

    copy(point) {
        this.x = point.x;
        this.y = point.y;
        return this;
    }

    /**
     * 两点间的直线距离
     * @param p
     * @returns {number}
     */
    distance(p){
        let w=p.x-this.x;
        let h=p.y-this.y;
        return Math.sqrt(w * w + h * h);
    }
    /**
     * Returns a clone of the Point instance.
     * @method clone
     * @return {Point} a clone of the Point instance.
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
