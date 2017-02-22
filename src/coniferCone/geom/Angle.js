class Angle {
    constructor(angle = 0) {
        this._angle = angle;
        this._radian = angle * Angle.ANGLE_TO_RADIAN;
    }

    set angle(value) {
        this._angle = value;
        this._radian = value * Angle.ANGLE_TO_RADIAN;
    }

    get angle() {
        return this._angle
    }

    set radian(value) {
        this._radian = value;
        this._angle = value * Angle.RADIAN_TO_ANGLE;
    }

    get radian() {
        return this._radian;
    }

    /**
     * 求锐角
     */
    get acute() {
        let a = this._angle;
        while (a > 90) {
            a -= 180;
        }

        while (a < -90) {
            a += 180;
        }
        return a >= 0 ? a : -a;
    }
}
Angle.ANGLE_TO_RADIAN = Math.PI / 180;
Angle.RADIAN_TO_ANGLE = 180 / Math.PI;
export {Angle}