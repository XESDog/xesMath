class Dot extends createjs.Shape {
    /**
     *
     * @param p
     * @param radius
     * @param color
     */
    constructor(p, radius = 6, color = '#09f') {
        super();

        let g = this.graphics;
        g.setStrokeStyle(1);
        g.beginStroke('#000');
        g.beginFill(color);
        g.drawCircle(0, 0, radius);

        this.setPosition(p);
    }

    setPosition(p) {
        this.p = p;
        this.x = p.x;
        this.y = p.y;
    }
}
export {Dot}