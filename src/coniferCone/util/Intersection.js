class Intersection {
    constructor() {
        throw new Error('Instantiation is not allowed!')
    }

    /**
     * 两条直线之间的交点
     * @param l1
     * @param l2
     * @returns {*}
     */
    static lineToLine = function (l1, l2) {
        //平行
        if (l1.k === l2.k) {
            return null;
        }
        //两条线中有一条垂直
        else if (l1.isVertical || l2.isVertical) {
            return new Point(l1.isVertical ? l1.x : l2.x
                , l1.isVertical ? l2.k * l1.x + l2.b : l1.k * l2.x + l1.b);
        }
        else {
            const k1 = l1.k;
            const b1 = l1.b;
            const k2 = l2.k;
            const b2 = l2.b;
            const x = (b2 - b1) / (k1 - k2);
            return new Point(x, k1 * x + b1);
        }
    };
}

export {Intersection}