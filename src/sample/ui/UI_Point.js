import {DragManager} from "../manager/DragManager";
import {Vector} from "../../coniferCone/geom/Vector";
import {Point} from "../../coniferCone/geom/Point";
class UI_Point extends createjs.Shape {

    /**
     *
     * @param p
     * @param prop
     */
    constructor(p, prop) {
        super();
        this._p = p;
        this._prop = prop;
        this._originalP;
        this._dragManager = null;
        if (!!prop) {
            this._radius = prop._radius || 6;
            this._color = prop.color || "#ABC";
            this._hasDragManager = prop.hasDragManager || false;//是否用DragManager来管理拖拽
        } else {
            this._radius = 6;
            this._color = '#ABC';
            this._hasDragManager = false;
        }

        this.on('added', this.onAdded, this);
    }

    onAdded() {
        if (this._hasDragManager && this._dragManager === null) {
            this._dragManager = new DragManager(this.stage);
            this._dragManager.register(this);
        }
        let g = this.graphics;
        g.setStrokeStyle(1);
        g.beginStroke('#000');
        g.beginFill(this._color);
        g.drawCircle(0, 0, this._radius);

        this.update(this._p);
    }

    onStartDrag() {
        this._originalP = this._p.clone();
        if (this._originalP instanceof Point) {
            this._originalP = this._originalP.toVector();
        }
        console.log('DOWN');
    }

    onDraging(originalP, offsetP) {
        this.update(Vector.addVectors(this._originalP, offsetP));
    }

    onEndDrag(originalP, offsetP) {
        this.update(Vector.addVectors(this._originalP, offsetP));
    }

    update(p) {
        this._p.x = p.x;
        this._p.y = p.y;
        this.x = p.x;
        this.y = p.y;
    }

    destroy() {
        if (this._hasDragManager && this._dragManager) {
            this._dragManager.unregister(this);
            this._dragManager = null;
        }
        this.removeAllEventListener();
    }


}
export {UI_Point}