import {Vector} from "../geom/Vector";
import {Circle} from "../geom/Circle";
class Intersection {
    constructor() {
        throw new Error('Instantiation is not allowed!')
    }

    /**
     * 两条直线之间的交点
     * @param l1
     * @param l2
     * @returns {Vector|null}
     */
    static lineToLine(l1, l2) {
        return l1.getIntersectionWithLine(l2);
    }

    static circleToCircle(c1, c2) {
        return c1.getIntersectionWithCircle(c2);
    }

    /**
     * 圆和x坐标轴的交点
     * @param c
     */
    static circleToAxisX(c) {
        if (Math.abs(c.center.y) > c.radius)return null;

        if (c.radius === Math.abs(c.center.y))return new Vector(c.center.x, 0);//1个交点

        let d = Math.sqrt(c.radius * c.radius - c.center.y * c.center.y);
        let x1 = c.center.x - d;
        let x2 = c.center.x + d;


        let p1 = new Vector(x1, 0);
        let p2 = new Vector(x2, 0);
        return [p1, p2];
    }

    /**
     *
     * @param l
     * @param c
     */
    static lineToCircle(l, c) {
        //旋转坐标
        let angle = Math.atan(l.k);//l.k===Infinity也能正常取值，atan函数很强大
        let [offsetX, offsetY] = (l.k === Infinity||l.k===-Infinity) ? [l.x, 0] : [0, l.b];

        let circleP = c.center.clone();
        //以[offsetX,offsetY]为中心旋转-angle
        circleP.setValues(circleP.x - offsetX, circleP.y - offsetY);
        circleP.rotateAround(Vector.ZERO, -angle);

        let p = Intersection.circleToAxisX(new Circle(circleP.x, circleP.y, c.radius));

        if (!p)return null;

        if (p instanceof Array) {
            p = p.map((value) => {
                value.rotateAround(Vector.ZERO, angle);
                return value.setValues(value.x + offsetX, value.y + offsetY);
            })
        } else {
            p.rotateAround(Vector.ZERO, angle);
            p.setValues(p.x + offsetX, p.y + offsetY);
        }
        return p;
    }

    /**
     * 两条线段的交点
     * @param ls1
     * @param ls2
     * @returns {Vector}
     */
    static lineSegmentToLineSegment(ls1, ls2) {
        //AB为线段ls1的两个端点，CD为线段ls2的两个端点
        let A = ls1._A;
        let B = ls1._B;
        let C = ls2._A;
        let D = ls2._B;

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

    /**
     * @param l
     * @param ls
     * @returns {Vector}
     */
    static lineToLineSegment(l, ls) {
        let l2 = ls.toLine(),
            p = Intersection.lineToLine(l, l2);
        if (p && ls.toRectangle().contains(p.x, p.y)) {
            return p;
        } else {
            return null;
        }
    }
}

export {Intersection}