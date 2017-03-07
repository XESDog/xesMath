import {Vector} from "../../coniferCone/geom/Vector";
import {ChangePositionEvent} from "../event/Event";
class UI_Point extends createjs.Shape {
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


        this.stagemousemoveId = 0;
        this.startP;
        this.originalP;

        this.setPosition(p);

        this.addEvent()
    }

    addEvent() {
        this.on('mousedown', this.onMouseDown, this);
    }

    setPosition(p) {
        this.p = p;
        this.x = p.x;
        this.y = p.y;
    }

    onMouseDown(e) {
        this.stagemousemoveId = this.stage.on('stagemousemove', this.onMouseMove, this);
        this.stage.on('stagemouseup', this.onMouseUp, this, true);
        this.startP = new Vector(e.stageX, e.stageY);
        this.originalP = this.p.clone();

        this.dispatchPositionEvent(ChangePositionEvent.BEGIN);
    }

    onMouseMove(e) {
        let moveP = new Vector(e.stageX, e.stageY);
        let offsetP = Vector.subVectors(moveP, this.startP);
        let p = Vector.addVectors(this.originalP, offsetP);
        this.setPosition(p);

        this.dispatchPositionEvent(ChangePositionEvent.ING, offsetP)
    }

    onMouseUp(e) {
        this.stage.off('stagemousemove', this.stagemousemoveId);

        let moveP = new Vector(e.stageX, e.stageY);
        let offsetP = Vector.subVectors(moveP, this.startP);
        let p = Vector.addVectors(this.originalP, offsetP);
        this.setPosition(p);

        this.dispatchPositionEvent(ChangePositionEvent.END, offsetP);
    }

    /**
     *
     * @param type
     * @param p
     */
    dispatchPositionEvent(type, p) {
        let e = new ChangePositionEvent(type, p);
        this.dispatchEvent(e);
    }
}
export {UI_Point}