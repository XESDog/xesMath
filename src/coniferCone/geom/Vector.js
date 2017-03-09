/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 * 基于threejs->Vector2，
 */

class Vector {
    set y(value) {
        this._y = value;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    get x() {
        return this._x;
    }

    constructor(x, y) {
        this._x = x || 0;
        this._y = y || 0;
    }

    get width() {
        return this._x;
    }

    set width(value) {
        this._x = value;
    }

    get height() {
        return this._y;
    }

    set height(value) {
        this._y = value;
    }

    setValues(x, y) {
        this._x = x;
        this._y = y;

        return this;
    }

    setScalar(scalar) {
        this._x = scalar;
        this._y = scalar;

        return this;
    }

    setX(x) {
        this._x = x;

        return this;
    }

    setY(y) {
        this._y = y;

        return this;
    }

    /**
     * setComponent(0,value)表示设置x值
     * setComponent(1,value)表示设置y值
     * @param index
     * @param value
     * @returns {Vector}
     */
    setComponent(index, value) {
        switch (index) {
            case 0:
                this._x = value;
                break;
            case 1:
                this._y = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);
        }
        return this;
    }

    getComponent(index) {
        switch (index) {
            case 0:
                return this._x;
            case 1:
                return this._y;
            default:
                throw new Error('index is out of range: ' + index);
        }
    }

    clone() {
        return new this.constructor(this._x, this._y);
    }

    copy(v) {
        this._x = v._x;
        this._y = v._y;

        return this;
    }

    /**
     * 参数为1个的时候表示一个vector2对象
     * 参数为2的时候，实际上执行的是addVectors方法
     * @param v
     * @param w
     * @returns {*}
     */
    add(v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
            return this.addVectors(v, w);
        }

        this._x += v._x;
        this._y += v._y;

        return this;
    }

    addScalar(s) {
        this._x += s;
        this._y += s;

        return this;
    }

    /**
     * 两个矢量之和
     * @param a
     * @param b
     * @returns {Vector}
     */
    addVectors(a, b) {
        this._x = a._x + b._x;
        this._y = a._y + b._y;

        return this;

    }

    static addVectors(a, b) {
        return new Vector().addVectors(a, b);
    }

    addScaledVector(v, s) {
        this._x += v._x * s;
        this._y += v._y * s;

        return this;

    }

    sub(v, w) {
        if (w !== undefined) {
            console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
            return this.subVectors(v, w);

        }

        this._x -= v._x;
        this._y -= v._y;

        return this;
    }

    subScalar(s) {
        this._x -= s;
        this._y -= s;

        return this;
    }

    subVectors(a, b) {
        this._x = a._x - b._x;
        this._y = a._y - b._y;

        return this;
    }

    static subVectors(a, b) {
        return new Vector().subVectors(a, b);
    }

    multiply(v) {
        this._x *= v._x;
        this._y *= v._y;

        return this;
    }

    multiplyScalar(scalar) {
        if (isFinite(scalar)) {

            this._x *= scalar;
            this._y *= scalar;

        } else {

            this._x = 0;
            this._y = 0;

        }

        return this;
    }

    /**
     * 做除法，点乘的变种
     * @param v
     * @returns {Vector}
     */
    divide(v) {
        this._x /= v._x;
        this._y /= v._y;

        return this;
    }

    divideScalar(scalar) {
        return this.multiplyScalar(1 / scalar);
    }

    min(v) {
        this._x = Math.min(this._x, v._x);
        this._y = Math.min(this._y, v._y);

        return this;
    }

    max(v) {
        this._x = Math.max(this._x, v._x);
        this._y = Math.max(this._y, v._y);

        return this;
    }

    clamp(min, max) {
        // This function assumes min < max, if this assumption isn't true it will not operate correctly
        this._x = Math.max(min._x, Math.min(max._x, this._x));
        this._y = Math.max(min._y, Math.min(max._y, this._y));

        return this;
    }

    clampLength(min, max) {
        let length = this._length();

        return this.multiplyScalar(Math.max(min, Math.min(max, length)) / length);
    }

    floor() {
        this._x = Math.floor(this._x);
        this._y = Math.floor(this._y);

        return this;
    }

    ceil() {
        this._x = Math.ceil(this._x);
        this._y = Math.ceil(this._y);

        return this;
    }

    round() {
        this._x = Math.round(this._x);
        this._y = Math.round(this._y);

        return this;
    }

    roundToZero() {
        this._x = ( this._x < 0 ) ? Math.ceil(this._x) : Math.floor(this._x);
        this._y = ( this._y < 0 ) ? Math.ceil(this._y) : Math.floor(this._y);

        return this;
    }

    negate() {
        this._x = -this._x;
        this._y = -this._y;

        return this;
    }

    /**
     * 点乘
     * @param v
     * @returns {number}
     */
    dot(v) {
        return this._x * v._x + this._y * v._y;
    }

    /**
     * 叉乘方向，在为二维矢量中用来描述方向
     * 大于0，小于0，等于0（共线）
     * @param v
     * @returns {number}
     */
    cross(v) {
        return this._x * v._y - this._y * v._x;
    }

    lengthSq() {
        return this._x * this._x + this._y * this._y;
    }

    get length() {
        return Math.sqrt(this._x * this._x + this._y * this._y);
    }

    set length(length) {
        return this.multiplyScalar(length / this._length);
    }

    lengthManhattan() {
        return Math.abs(this._x) + Math.abs(this._y);
    }

    normalize() {
        return this.divideScalar(this._length);
    }

    /**
     * 和另一个向量的夹角弧度值
     * @param v
     * @returns {number}
     */
    angleTo(v) {
        let cos = this.dot(v) / (this._length * v._length);
        return Math.acos(cos);//0~π
    }

    get angle() {
        // computes the angle in radians with respect to the positive x-axis

        var angle = Math.atan2(this._y, this._x);//-π~π

        if (angle < 0) angle += 2 * Math.PI;//0~2π

        return angle;
    }

    distanceTo(v) {
        return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v) {
        var dx = this._x - v._x, dy = this._y - v._y;
        return dx * dx + dy * dy;
    }

    distanceToManhattan(v) {
        return Math.abs(this._x - v._x) + Math.abs(this._y - v._y);
    }


    /**
     * 定比分点
     *
     * @param v
     * @param alpha
     * @returns {Vector}
     */
    lerp(v, alpha) {
        this._x += ( v._x - this._x ) * alpha;
        this._y += ( v._y - this._y ) * alpha;

        return this;
    }

    lerpVectors(v1, v2, alpha) {
        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
    }

    equals(v) {
        return ( ( v._x === this._x ) && ( v._y === this._y ) );
    }

    fromArray(array, offset) {
        if (offset === undefined) offset = 0;

        this._x = array[offset];
        this._y = array[offset + 1];

        return this;
    }

    toArray(array, offset) {
        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;

        array[offset] = this._x;
        array[offset + 1] = this._y;

        return array;
    }

    fromAttribute(attribute, index, offset) {
        if (offset === undefined) offset = 0;

        index = index * attribute.itemSize + offset;

        this._x = attribute.array[index];
        this._y = attribute.array[index + 1];

        return this;
    }

    /**
     * 旋转
     * @param center
     * @param angle
     * @returns {Vector}
     */
    rotateAround(center, angle) {
        let c = Math.cos(angle), s = Math.sin(angle);

        let x = this._x - center._x;
        let y = this._y - center._y;

        this._x = x * c - y * s + center._x;
        this._y = x * s + y * c + center._y;

        return this;
    }

    static lerpVectors(v1, v2, alpha) {
        return new Vector().lerpVectors(v1, v2, alpha)
    }

    toString() {
        return "[Vector2 (x=" + this._x + " y=" + this._y + ")]";
    }
}

export {Vector};
