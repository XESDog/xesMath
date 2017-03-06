/**
 * Created by work on 2017/2/16.
 */
class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius
    }

    setValues(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        return this;
    }

    /**
     * 面积
     * @returns {number}
     */
    get area() {
        return Math.PI * this.radius * this.radius;
    }

    /**
     * 周长
     * @returns {number}
     */
    get circumference() {
        return 2 * Math.PI * this.radius;
    }

    /**
     * 直径
     * @returns {number}
     */
    get diameter() {
        return 2 * this.radius;
    }

    toString() {
        return "[Circle (radius=" + this.radius + " circumference=" + this.circumference + " area=" + this.area + ")]";
    }

}
export {Circle};