class Angle {
    static ANGLE_TO_RADIAN = Math.PI / 180;
    static RADIAN_TO_ANGLE = 180 / Math.PI;

    /**
     * 限定角度范围在 0<=angle<360
     * @param angle
     * @returns {*}
     */
    static normal(angle) {
        while (angle >= 360) {
            angle -= 360;
        }
        while (angle < 0) {
            angle += 360;
        }
        return angle;
    }

    /**
     *
     * @param angle
     * @param isRadian  第一个参数表示弧度
     *
     */
    constructor(angle = 0, isRadian = false) {
        if (isRadian) {
            this.radian = angle;
        } else {
            this.angle = angle;
        }
    }

    set angle(value) {
        this._angle = Angle.normal(value);
        this._radian = this._angle * Angle.ANGLE_TO_RADIAN;
    }

    get angle() {
        return this._angle;
    }

    set radian(value) {
        this._angle = Angle.normal(value * Angle.RADIAN_TO_ANGLE);
        this._radian = this._angle * Angle.ANGLE_TO_RADIAN;
    }

    get radian() {
        return this._radian;
    }

    /**
     * 是否锐角
     * @returns {boolean}
     */
    get isAcute() {
        return this._angle < 90 || this._angle > 270;
    }

    /**
     * 是否直角
     * @returns {boolean}
     */
    get isRight() {
        return this._angle === 90 || this._angle === 270;
    }

    /**
     * 是否钝角
     * @returns {boolean}
     */
    get isObtuse() {
        return this._angle > 90 && this._angle < 270;
    }

    /**
     * 求锐角
     * @returns {number}
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

    /**
     * 求钝角
     * @returns {number}
     */
    get obtuse() {
        return 180 - this.acute;
    }

}

export {Angle}