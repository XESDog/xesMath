import {Vector} from "../../coniferCone/geom/Vector";
import {UI_Point} from "../ui/UI_Point";
import {UI_LineSegment} from "../ui/UI_LineSegment";
class DrawManager {
    constructor(stage) {
        this.stage = stage;
        this.mouseMoveID = null;
        this.startP = null;
        this.endP = null;
        this.currentObject = null;

        this.option = 'point';
        this.optionMap = new Map();
        this.optionMap.set('point', [this.drawingPoint, this.drawPoint]);
        this.optionMap.set('lineSegment', [this.drawingLineSegment, this.drawLineSegment]);

        this.stage.on('stagemousedown', this.onMouseDown, this);

    }

    get currentDrawingOption() {
        return this.optionMap.get(this.option)[0]
    }

    get currentDrawOption() {
        return this.optionMap.get(this.option)[1];
    }

    onMouseDown(e) {

        if (this.stage.getObjectUnderPoint(e.stageX, e.stageY, 0) !== null)return;

        this.startP = new Vector(e.stageX, e.stageY);
        this.mouseMoveID = this.stage.on('stagemousemove', this.onMouseMove, this);
        this.stage.on('stagemouseup', this.onMouseUp, this, true);
    }

    onMouseMove(e) {
        this.endP = new Vector(e.stageX, e.stageY);
        this.currentDrawingOption();
    }

    onMouseUp(e) {
        this.stage.off('stagemousemove', this.mouseMoveID);

        this.endP = new Vector(e.stageX, e.stageY);

        this.currentDrawOption();
    }

    drawingPoint() {

    }

    drawPoint() {
        let point = new UI_Point(this.endP,{hasDragManager:true});
        this.stage.addChild(point);
    }

    drawingLineSegment() {
        if (this.currentObject === null) {
            this.currentObject = new UI_LineSegment(this.startP, this.endP);
            this.stage.addChild(this.currentObject);
        } else {
            this.currentObject.p1 = this.startP;
            this.currentObject.p2 = this.endP;
            this.currentObject.update();
        }
    }

    drawLineSegment() {
        if (this.currentObject !== null) {
            this.currentObject.p1 = this.startP;
            this.currentObject.p2 = this.endP;
            this.currentObject.update();
        }
        this.currentObject = null;
    }

}
export {DrawManager}