/**
 * Created by work on 2017/2/23.
 */
class Distance {
    constructor() {
        throw new Error('Instantiation is not allowed!')
    }

    /**
     * 两点之间的距离
     * @param p1
     * @param p2
     * @returns {number}
     */
    static pointToPoint = function (p1, p2) {
        let w = p1.x - p2.x;
        let h = p1.y - p2.y;
        return Math.sqrt(w * w + h * h);
    };
    /**
     * 两条线段之间的距离
     * @param ls1
     * @param ls2
     * @returns {number}
     * @constructor
     */
    static LineSegmentToLineSegment = function (ls1, ls2) {

        return 0;
    };
    /**
     * 点到线段的距离
     * @param p
     * @param ls
     * @returns {number}
     */
    static pointToLineSegment = function (p, ls) {

        return 0;
    };
    /**
     * 点到圆的距离
     * @param p
     * @param c
     * @returns {number}
     */
    static pointToCircle = function (p, c) {
        return 0;
    }
}

export {Distance};
