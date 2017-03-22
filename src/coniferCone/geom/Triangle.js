import {Vector} from "./Vector";
import {Angle} from "./Angle";
import {LineSegment} from "./LineSegment";

import {throwMissingParameterError, throwWrongNumberOfParameterError} from "../error/Error";


class Triangle {
    constructor(a = throwMissingParameterError(),
                b = throwMissingParameterError(),
                c = throwMissingParameterError(),
                d, e, f) {

        let x1, y1, x2, y2, x3, y3;

        if (arguments.length === 3) {
            ([{x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}] = arguments)
        }
        else if (arguments.length === 6) {
            ([x1, y1, x2, y2, x3, y3] = arguments)
        } else {
            throwWrongNumberOfParameterError();
        }

        //点
        this._A = new Vector(x1, y1);
        this._B = new Vector(x2, y2);
        this._C = new Vector(x3, y3);

        //边
        this._a = new LineSegment(this._B, this._C);
        this._b = new LineSegment(this._A, this._C);
        this._c = new LineSegment(this._A, this._B);

        //角
        this._BAC = new Angle(Vector.subVectors(this._B, this._A).angleTo(Vector.subVectors(this._C, this._A)));
        this._CBA = new Angle(Vector.subVectors(this._C, this._B).angleTo(Vector.subVectors(this._A, this._B)));
        this._ACB = new Angle(Vector.subVectors(this._A, this._C).angleTo(Vector.subVectors(this._B, this._C)));

    }

    get C() {
        return this._C;
    }

    get B() {
        return this._B;
    }

    get A() {
        return this._A;
    }


    /**
     * 垂心
     */
    get orthocenter() {

    }

    /**
     * 重心
     */
    get barycenter() {
        //中垂线交点
        return this._a.perpendicularBisector.getIntersectionWithLine(this._b.perpendicularBisector);

    }

    /**
     * 外心
     */
    get circumcenter() {

    }

    /**
     * 内心
     */
    get innercenter() {

    }

    /**
     * 面积，矢量ABXAC再除以2
     * @returns {number}
     */
    get area() {
        let AB = Vector.subVectors(this._B, this._A);
        let AC = Vector.subVectors(this._C, this._A);
        return Math.abs(AB.cross(AC)) * 0.5;
    }

    clone() {
        return new Triangle(this._A.x, this._A.y, this._B.x, this._B.y, this._C.x, this._C.y);
    }

    toString() {
        return `[Triangle (A.x="${this._A.x}" A.y="${this._B.y}" B.x="${this._B.x}" B.y="${this._B.y}" C.x="${this._C.x}" C.y="${this._C.y}")]`;
    }
}
export {Triangle}