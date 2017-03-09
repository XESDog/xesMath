import {Point} from "../geom/Point";
import {Vector} from "../geom/Vector";
class Intersection {
    constructor() {
        throw new Error('Instantiation is not allowed!')
    }

    /**
     * 两条直线之间的交点
     * @param l1
     * @param l2
     * @returns {*}
     */
    static lineToLine(l1, l2) {
        //平行
        if (l1.k === l2.k) {
            return null;
        }
        //两条线中有一条垂直
        else if (l1.isVertical || l2.isVertical) {
            return new Point(l1.isVertical ? l1._x : l2._x
                , l1.isVertical ? l2.k * l1._x + l2.b : l1.k * l2._x + l1.b);
        }
        else {
            const k1 = l1.k;
            const b1 = l1.b;
            const k2 = l2.k;
            const b2 = l2.b;
            const x = (b2 - b1) / (k1 - k2);
            return new Point(x, k1 * x + b1);
        }
    }

    /**
     * 两条线段的交点
     * @param ls1
     * @param ls2
     * @returns {Point}
     */
    static lineSegmentToLineSegment(ls1, ls2) {
        //AB为线段ls1的两个端点，CD为线段ls2的两个端点
        let A = ls1._p1;
        let B = ls1._p2;
        let C = ls2._p1;
        let D = ls2._p2;

        let AB = Vector.subVectors(B, A);
        let AC = Vector.subVectors(C, A);
        let AD = Vector.subVectors(D, A);
        let CD = Vector.subVectors(D, C);
        let CA = Vector.subVectors(A, C);
        let CB = Vector.subVectors(B, C);

        let ABXAC = AB.cross(AC);
        let ABXAD = AB.cross(AD);
        let CDXCA = CD.cross(CA);
        let CDXCB = CD.cross(CB);

        //有叉乘值为0的项，则表示有有一点在另外一条线段上
        if (ABXAC === 0 || ABXAD === 0 || CDXCA === 0 || CDXCB === 0) {
            //todo:暂不处理有一点在另外一条线段上的情况
            return null;
        }
        else {
            //ABXAC和ABXAD方向相反，并且CDXCA和CDXCB方向相反则必定相交
            if ((ABXAC ^ ABXAD) < 0 && (CDXCA ^ CDXCB) < 0) {
                let n = Math.abs(ABXAC / ABXAD);
                return Vector.lerpVectors(C, D, n / (1 + n));
            } else {
                return null;
            }
        }
    }
}

export {Intersection}