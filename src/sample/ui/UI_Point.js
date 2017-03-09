import {DragManager} from "../manager/DragManager";
import {Vector} from "../../coniferCone/geom/Vector";

import {UpdateEvent} from "../event/Event";
class UI_Point extends createjs.Shape {

    /**
     *
     * @param color
     * @param radius
     * @param hasDragManager
     * @param avatar //0:圆,1:方
     */
    constructor({
                    color = '#ABC',
                    radius = 6,
                    hasDragManager = false,
                    avatar = 0
                } = {}) {

        super();

        this._avatar = avatar;
        this._radius = radius;
        this._color = color;
        this._hasDragManager = hasDragManager;

        this._dragManager = null;
        this._originalP;//p点的原始位置，每次执行拖拽之前修改


        let g = this.graphics;
        g.setStrokeStyle(1);
        g.beginStroke('#000');
        g.beginFill(this._color);
        if (this._avatar === 0) {
            g.drawCircle(0, 0, this._radius);
        } else if (this._avatar === 1) {
            let w = this._radius * 2;
            g.drawRect(-this._radius, -this._radius, w, w);
        }

        this.on('added', this.onAdded, this);
    }

    onAdded() {
        if (this._hasDragManager && this._dragManager === null) {
            this._dragManager = new DragManager(this.stage);
            this._dragManager.register(this);
        }
    }

    /**
     * 以下的3个方法，是针对拖动的
     */
    /**
     *
     */
    onStartDrag() {
        this._originalP = new Vector(this.x, this.y);
    }

    onDraging(originalP, offsetP) {
        this.dispatchUpdateEvent(Vector.addVectors(this._originalP, offsetP));
    }

    onEndDrag(originalP, offsetP) {
        this.dispatchUpdateEvent(Vector.addVectors(this._originalP, offsetP));
    }

    dispatchUpdateEvent(data) {
        let e = new UpdateEvent(data);
        this.dispatchEvent(e);
    }


    /**
     * 更新显示，唯一入口
     * @param p
     */
    update(p) {
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