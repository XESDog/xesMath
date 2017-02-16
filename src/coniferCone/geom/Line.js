/**
 * Created by work on 2017/2/16.
 */

class Line {
    constructor(k, b) {
        this.k = k;
        this.b = b;
        this.range = [-999999999, 999999999];
    }

    get points() {
        return [this.range[0], this.k * this.range[0] + this.b
            , this.range[1], this.k * this.range[1] + this.b];
    }

    getVerticalLine(x, y) {
        return new Line(-1 / this.k, y + x / this.k);
    }

    getVerticalPoint(x, y) {

    }

}
export {Line};
