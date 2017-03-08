class Angle {
    /**
     * 限定角度范围在 0~360，弧度范围限定在0~2π
     * @param degree
     * @param isDegree
     * @returns {*}
     */
    static normal(degree = 0, isDegree = true) {
        //弧度
        if (isDegree) {
            while (degree >= 360) {
                degree -= 360;
            }
            while (degree < 0) {
                degree += 360;
            }
            return degree;
        }
        //角度
        else {
            let angle = degree;
            while (angle >= Angle.PI2) {
                angle -= Angle.PI2;
            }
            while (angle < 0) {
                angle += Angle.PI2;
            }
            return angle;
        }

    }

    /**
     * 初始化Angle，可以传入弧度或者角度
     * @param degree
     * @param isDegree  默认为true，表示第一个参数是弧度，设置为false，则表示第一个参数是角度
     *
     */
    constructor(degree = 0, isDegree = true) {
        this._degree=0;
        this._angle=0;


        if (isDegree) {
            this.degree = degree;
        } else {
            this.angle = degree;
        }
    }
    clone(){
        return new Angle(this._degree);
    }

    set degree(value) {
        this._degree = Angle.normal(value);
        this._angle = this._degree * Angle.DEGREE_TO_ANGLE;
    }

    get degree() {
        return this._degree;
    }

    set angle(value) {
        this._degree = Angle.normal(value * Angle.ANGLE_TO_DEGREE);
        this._angle = this._degree * Angle.DEGREE_TO_ANGLE;
    }

    get angle() {
        return this._angle;
    }

    /**
     * 是否锐角
     * @returns {boolean}
     */
    get isAcute() {
        return this._degree < 90 || this._degree > 270;
    }

    /**
     * 是否直角
     * @returns {boolean}
     */
    get isRight() {
        return this._degree === 90 || this._degree === 270;
    }

    /**
     * 是否钝角
     * @returns {boolean}
     */
    get isObtuse() {
        return this._degree > 90 && this._degree < 270;
    }

    /**
     * 求锐角
     * @returns {number}
     */
    get acute() {
        let a = this._degree;
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
Angle.DEGREE_TO_ANGLE = Math.PI / 180;
Angle.ANGLE_TO_DEGREE = 180 / Math.PI;
Angle.PI2 = Math.PI * 2;

export {Angle}