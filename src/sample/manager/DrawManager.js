import {Vector} from "../../coniferCone/geom/Vector";
import {Line} from "../../coniferCone/geom/Line";
import {LineSegment} from "../../coniferCone/geom/LineSegment";
import {UI_Point} from "../ui/UI_Point";
import {UI_LineSegment} from "../ui/UI_LineSegment";
import {UI_Line} from "../ui/UI_Line";
import {World} from "../ui/World";
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
        this.optionMap.set('line', [this.drawingLine, this.drawLine]);
        this.optionMap.set('lineSegment', [this.drawingLineSegment, this.drawLineSegment]);

        this.stage.on('stagemousedown', this.onMouseDown, this);

    }

    get currentDrawingOption() {
        return this.optionMap.get(this.option)[0];
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

        this.currentObject = null;
    }

    drawingPoint() {

    }

    drawPoint() {
        let point = new UI_Point({hasDragManager: true});
        World.add(point, this.endP);
    }

    drawingLine() {
        if (this.currentObject === null) {
            let l = new Line(this.startP.x, this.startP.y, this.endP.x, this.endP.y);
            let line = new UI_Line(l);
            World.add(line, l);
            this.currentObject=line;
        } else {
            this.currentObject.dispatchUpdateEvent(this.startP.x, this.startP.y, this.endP.x, this.endP.y);
        }
    }

    drawLine() {
        if (this.currentObject !== null) {
            this.currentObject.dispatchUpdateEvent(this.startP.x, this.startP.y, this.endP.x, this.endP.y);
        }
    }

    drawingLineSegment() {
        if (this.currentObject === null) {
            this.currentObject = new UI_LineSegment();
            World.add(this.currentObject,new LineSegment(this.startP.x, this.startP.y, this.endP.x, this.endP.y))
        } else {
            this.currentObject.dispatchUpdateEvent(this.startP.x, this.startP.y, this.endP.x, this.endP.y);
        }
    }

    drawLineSegment() {
        if (this.currentObject !== null) {
            this.currentObject.dispatchUpdateEvent(this.startP.x, this.startP.y, this.endP.x, this.endP.y);
        }
    }

}
export {DrawManager}