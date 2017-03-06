/**
 * @author mrdoob / http://mrdoob.com/
 * @author philogb / http://blog.thejit.org/
 * @author egraether / http://egraether.com/
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 * 基于threejs->Vector2，
 */

class Vector2 {

    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    get width() {
        return this.x;
    }

    set width(value) {
        this.x = value;
    }

    get height() {
        return this.y;
    }

    set height(value) {
        this.y = value;
    }

    //为配合代码命名的规范，修改set为setValues
    setValues(x, y) {
        this.x = x;
        this.y = y;

        return this;
    }

    setScalar(scalar) {
        this.x = scalar;
        this.y = scalar;

        return this;
    }

    setX(x) {
        this.x = x;

        return this;
    }

    setY(y) {
        this.y = y;

        return this;
    }

    /**
     * setComponent(0,value)表示设置x值
     * setComponent(1,value)表示设置y值
     * @param index
     * @param value
     * @returns {Vector2}
     */
    setComponent(index, value) {
        switch (index) {

            case 0:
                this.x = value;
                break;
            case 1:
                this.y = value;
                break;
            default:
                throw new Error('index is out of range: ' + index);

        }
        return this;
    }

    getComponent(index) {
        switch (index) {

            case 0:
                return this.x;
            case 1:
                return this.y;
            default:
                throw new Error('index is out of range: ' + index);

        }
    }

    clone() {
        return new this.constructor(this.x, this.y);
    }

    copy(v) {
        this.x = v.x;
        this.y = v.y;

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

        this.x += v.x;
        this.y += v.y;

        return this;
    }

    addScalar(s) {

        this.x += s;
        this.y += s;

        return this;
    }

    /**
     * 两个矢量之和
     * @param a
     * @param b
     * @returns {Vector2}
     */
    addVectors(a, b) {

        this.x = a.x + b.x;
        this.y = a.y + b.y;

        return this;

    }

    static addVectors(a, b) {
        return new Vector2().addVectors(a, b);
    }

    addScaledVector(v, s) {

        this.x += v.x * s;
        this.y += v.y * s;

        return this;

    }

    sub(v, w) {

        if (w !== undefined) {
            console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
            return this.subVectors(v, w);

        }

        this.x -= v.x;
        this.y -= v.y;

        return this;

    }

    subScalar(s) {

        this.x -= s;
        this.y -= s;

        return this;

    }

    subVectors(a, b) {

        this.x = a.x - b.x;
        this.y = a.y - b.y;

        return this;

    }

    static subVectors(a, b) {
        return new Vector2().subVectors(a, b);
    }

    multiply(v) {

        this.x *= v.x;
        this.y *= v.y;

        return this;

    }

    multiplyScalar(scalar) {

        if (isFinite(scalar)) {

            this.x *= scalar;
            this.y *= scalar;

        } else {

            this.x = 0;
            this.y = 0;

        }

        return this;

    }

    /**
     * 做除法，点乘的变种
     * @param v
     * @returns {Vector2}
     */
    divide(v) {

        this.x /= v.x;
        this.y /= v.y;

        return this;

    }

    divideScalar(scalar) {

        return this.multiplyScalar(1 / scalar);

    }

    min(v) {

        this.x = Math.min(this.x, v.x);
        this.y = Math.min(this.y, v.y);

        return this;

    }

    max(v) {

        this.x = Math.max(this.x, v.x);
        this.y = Math.max(this.y, v.y);

        return this;

    }

    clamp(min, max) {

        // This function assumes min < max, if this assumption isn't true it will not operate correctly

        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));

        return this;

    }

    /*clampScalar () {

     var min, max;

     return function clampScalar( minVal, maxVal ) {

     if ( min === undefined ) {

     min = new Vector2();
     max = new Vector2();

     }

     min.set( minVal, minVal );
     max.set( maxVal, maxVal );

     return this.clamp( min, max );

     };

     }();*/

    clampLength(min, max) {

        var length = this.length();

        return this.multiplyScalar(Math.max(min, Math.min(max, length)) / length);

    }

    floor() {

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        return this;

    }

    ceil() {

        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);

        return this;

    }

    round() {

        this.x = Math.round(this.x);
        this.y = Math.round(this.y);

        return this;

    }

    roundToZero() {

        this.x = ( this.x < 0 ) ? Math.ceil(this.x) : Math.floor(this.x);
        this.y = ( this.y < 0 ) ? Math.ceil(this.y) : Math.floor(this.y);

        return this;

    }

    negate() {

        this.x = -this.x;
        this.y = -this.y;

        return this;

    }

    /**
     * 点乘
     * @param v
     * @returns {number}
     */
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    /**
     * 叉乘方向，在为二维矢量中用来描述方向
     * 大于0，小于0，等于0（共线）
     * @param v
     * @returns {number}
     */
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    lengthSq() {

        return this.x * this.x + this.y * this.y;

    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    set length(length) {

        return this.multiplyScalar(length / this.length);

    }

    lengthManhattan() {

        return Math.abs(this.x) + Math.abs(this.y);

    }

    normalize() {
        return this.divideScalar(this.length);
    }

    /**
     * 和另一个向量的夹角弧度值
     * @param v
     * @returns {number}
     */
    angleTo(v) {
        let cos = this.dot(v) / (this.length * v.length);
        return Math.acos(cos);//0~π
    }

    get angle() {

        // computes the angle in radians with respect to the positive x-axis

        var angle = Math.atan2(this.y, this.x);//-π~π

        if (angle < 0) angle += 2 * Math.PI;//0~2π

        return angle;

    }

    distanceTo(v) {

        return Math.sqrt(this.distanceToSquared(v));

    }

    distanceToSquared(v) {

        var dx = this.x - v.x, dy = this.y - v.y;
        return dx * dx + dy * dy;

    }

    distanceToManhattan(v) {

        return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);

    }


    /**
     * 定比分点
     *
     * @param v
     * @param alpha
     * @returns {Vector2}
     */
    lerp(v, alpha) {

        this.x += ( v.x - this.x ) * alpha;
        this.y += ( v.y - this.y ) * alpha;

        return this;

    }

    lerpVectors(v1, v2, alpha) {

        return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);

    }

    equals(v) {

        return ( ( v.x === this.x ) && ( v.y === this.y ) );

    }

    fromArray(array, offset) {

        if (offset === undefined) offset = 0;

        this.x = array[offset];
        this.y = array[offset + 1];

        return this;

    }

    toArray(array, offset) {

        if (array === undefined) array = [];
        if (offset === undefined) offset = 0;

        array[offset] = this.x;
        array[offset + 1] = this.y;

        return array;

    }

    fromAttribute(attribute, index, offset) {

        if (offset === undefined) offset = 0;

        index = index * attribute.itemSize + offset;

        this.x = attribute.array[index];
        this.y = attribute.array[index + 1];

        return this;

    }

    /**
     * 旋转
     * @param center
     * @param angle
     * @returns {Vector2}
     */
    rotateAround(center, angle) {

        var c = Math.cos(angle), s = Math.sin(angle);

        var x = this.x - center.x;
        var y = this.y - center.y;

        this.x = x * c - y * s + center.x;
        this.y = x * s + y * c + center.y;

        return this;

    }

    static lerpVectors(v1, v2, alpha) {
        return new Vector2().lerpVectors(v1, v2, alpha)

    }
}


export {Vector2};
