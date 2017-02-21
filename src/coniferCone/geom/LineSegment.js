/**
 * Created by work on 2017/2/17.
 */

import {Line} from "./Line";
class LineSegment extends Line {
    constructor(x1, y1, x2, y2) {
        let k = Math.tan((y2 - y1) / (x2 - x1));
        let b = y1 - k * x1;
        super(k, b);

        this.range = [Math.min(x1, x2), Math.max(x1, x2)];
    }

    /**
     * 点到线段的距离
     * @param x
     * @param y
     */
    getDistanceFromPoint(x, y) {

    }

    /**
     * 线段到线段的距离
     * @param l
     */
    getDistanceFromLineSegment(l) {

    }
}
export {LineSegment};
