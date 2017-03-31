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
     * return {Array}
     */
    static circleToAxisX(c) {
        if (Math.abs(c.center.y) > c.radius)return null;

        if (c.radius === Math.abs(c.center.y))return new Vector(c.center.x, 0);//1个交点

        let d = Math.sqrt(c.radius * c.radius - c.center.y * c.center.y);

        if (d === 0) {
            return [new Vector(c.center.x, 0)];
        }

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
     * @return {null|Array}
     */
    static lineToCircle(l, c) {
        //旋转坐标
        let angle = Math.atan(l.k);//l.k===Infinity也能正常取值，atan函数很强大
        let [offsetX, offsetY] = (l.k === Infinity || l.k === -Infinity) ? [l.x, 0] : [0, l.b];

        let circleP = c.center.clone();
        //以[offsetX,offsetY]为中心旋转-angle
        circleP.setValues(circleP.x - offsetX, circleP.y - offsetY);
        circleP.rotateAround(Vector.ZERO, -angle);

        let p = Intersection.circleToAxisX(new Circle(circleP.x, circleP.y, c.radius));

        if (!p || p.length <= 0)return null;

        if (p.length > 0) {
            p = p.map((value) => {
                value.rotateAround(Vector.ZERO, angle);
                return value.setValues(value.x + offsetX, value.y + offsetY);
            })
        }
        return p;
    }

    /**
     *
     * @param ls
     * @param c
     * @return {null|Array}
     */
    static lineSegmentToCircle(ls, c) {
        let p = Intersection.lineToCircle(ls.toLine(), c);
        let result;
        if (!!p && p.length > 0) {
            result = p.filter((value) => {
                return ls._isClamp(value.x, value.y);
            })
        }
        return result;
    }

    static lineSegmentToRectangle(ls, rect) {
        if (ls.toRectangle().intersection(rect)) {
            let ps = [];
            rect.edges.forEach((value) => {
                let p = ls.getIntersectionWithLineSegment(value);
                if (p) {
                    ps = ps.concat(p);
                }
            });
            return ps.length > 0 ? ps : null;
        } else {
            return null;
        }
    }

    /**
     * 两条线段的交点
     * @param ls1
     * @param ls2
     * @returns {Vector}
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

    /**
     * @param l
     * @param ls
     * @returns {Vector}
     */
    static lineToLineSegment(l, ls) {
        let l2 = ls.toLine(),
            p = Intersection.lineToLine(l, l2);
        if (p && ls._isClamp(p.x, p.y)) {
            return p;
        } else {
            return null;
        }
    }

    static getIntersectionsFormAB(a, b) {

        function detection(a, b, final = false) {
            if (a.constructor.name === 'Line') {
                if (b.constructor.name === 'Line') {
                    return a.getIntersectionWithLine(b);
                }
                else if (b.constructor.name === 'LineSegment') {
                    return Intersection.lineToLineSegment(a, b);
                } else if (b.constructor.name === 'Rectangle') {
//todo
                    return null;
                } else if (b.constructor.name === 'Circle') {
                    return Intersection.lineToCircle(a, b);

                } else if (b.constructor.name === 'Triangle') {
//todo
                    return null;
                } else {
                    if (final)return null;
                    return detection(b, a, true);
                }
            } else if (a.constructor.name === 'LineSegment') {
                if (b.constructor.name === 'LineSegment') {

                    return a.getIntersectionWithLineSegment(b);

                } else if (b.constructor.name === 'Rectangle') {
                    debugger;
                    return Intersection.lineSegmentToRectangle(a, b);
                } else if (b.constructor.name === 'Circle') {
                    return Intersection.lineSegmentToCircle(a, b);

                } else if (b.constructor.name === 'Triangle') {

                } else {
                    if (final)return null;
                    return detection(b, a, true);
                }
            } else if (a.constructor.name === 'Rectangle') {
                if (b.constructor.name === 'Rectangle') {
//todo
                    return null;
                } else if (b.constructor.name === 'Circle') {
//todo
                    return null;
                } else if (b.constructor.name === 'Triangle') {
//todo
                    return null;
                } else {
                    if (final)return null;
                    return detection(b, a, true);
                }
            } else if (a.constructor.name === 'Circle') {
                if (b.constructor.name === 'Circle') {

                    return a.getIntersectionWithCircle(b);
                } else if (b.constructor.name === 'Triangle') {
//todo
                    return null;
                } else {
                    if (final)return null;
                    return detection(b, a, true);
                }
            } else if (a.constructor.name === 'Triangle') {
                if (b.constructor.name === 'Triangle') {
//todo
                    return null;
                }
                else {
                    if (final)return null;
                    return detection(b, a, true);
                }
            } else {
                //如果a,b没有找到对应的组合，则调过来再找一遍
                if (final)return null;
                return detection(b, a, true);
            }
        }

        return detection(a, b);

    }

    /**
     * 检测arr数组中的对象相互之间的交点
     * @param arr
     * @return {Array}
     */
    static detectIntersections(arr) {

        if (!arr && arr.length <= 0)return null;

        let ps = [];
        let len = arr.length;
        let a, b, p;
        for (let i = 0; i < len - 1; i++) {
            for (let j = i + 1; j < len; j++) {
                a = arr[i];
                b = arr[j];
                p = Intersection.getIntersectionsFormAB(a, b);
                if (!!p && p.length > 0) {
                    ps = ps.concat(p);
                }
            }
        }
        return ps
    }
}

export {Intersection}