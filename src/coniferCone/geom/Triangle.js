import {Point} from "./Point";
import {Vector} from "./Vector";
class Triangle {
    constructor(x1, y1, x2, y2, x3, y3) {
        //A
        this.p1 = new Point(x1, y1);
        //B
        this.p2 = new Point(x2, y2);
        //C
        this.p3 = new Point(x3, y3);
    }

    /**
     * 面积，矢量ABXAC再除以2
     * @returns {number}
     */
    get area() {
        let AB = Vector.subVectors(this.p2, this.p1);
        let AC = Vector.subVectors(this.p3, this.p1);
        return Math.abs(AB.cross(AC)) * 0.5;
    }
}
export {Triangle}