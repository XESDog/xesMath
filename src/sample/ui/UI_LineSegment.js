import {UI_Point} from "./UI_Point";
import {Vector} from "../../coniferCone/geom/Vector";
import {ChangePositionEvent} from "../event/Event";
class UI_LineSegment extends createjs.Container {

    /**
     *
     * @param p1   边的一个顶点
     * @param p2   边的另外一个顶点
     */
    constructor(p1, p2) {
        super();

        this.p1 = p1;
        this.p2 = p2;
        this.length = Vector.subVectors(p2, p1).length;
        this.originalP1 = this.p1.clone();
        this.originalP2 = this.p2.clone();

        this.dotA = new UI_Point(new Vector(0, 0));
        this.dotB = new UI_Point(new Vector(0, 0));
        this.line = new createjs.Shape();
        this.dotC = new UI_Point(new Vector(0, 0), 4);

        this.addChild(this.line);
        this.addChild(this.dotA);
        this.addChild(this.dotB);
        this.addChild(this.dotC);

        this.addEvent();

        this.setPosition();
        this.drawLine();
    }

    addEvent() {
        this.dotA.on(ChangePositionEvent.BEGIN, this.onBeginMove, this);
        this.dotA.on(ChangePositionEvent.ING, this.onMovingVertex, this);
        this.dotA.on(ChangePositionEvent.END, this.onMoveEndVertex, this);

        this.dotB.on(ChangePositionEvent.BEGIN, this.onBeginMove, this);
        this.dotB.on(ChangePositionEvent.ING, this.onMovingVertex, this);
        this.dotB.on(ChangePositionEvent.END, this.onMoveEndVertex, this);

        this.dotC.on(ChangePositionEvent.BEGIN, this.onBeginMove, this);
        this.dotC.on(ChangePositionEvent.ING, this.onMovingEdge, this);
        this.dotC.on(ChangePositionEvent.END, this.onMoveEndEdge, this);
    }

    setPosition() {
        let center = Vector.lerpVectors(this.p2, this.p1, 0.5);

        this.x = center.x;
        this.y = center.y;
        this.dotA.setPosition(Vector.subVectors(this.p1, center));
        this.dotB.setPosition(Vector.subVectors(this.p2, center));
        this.dotC.setPosition(new Vector());
    }

    drawLine() {
        let g = this.line.graphics;
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0));
        g.moveTo(0, 0);
        g.lineTo(this.dotA.x, this.dotA.y);
        g.moveTo(0, 0);
        g.lineTo(this.dotB.x, this.dotB.y);
    }


    onMovingVertex(e) {
        this.moveVertex(e.target, e.v);
    }

    onMoveEndVertex(e) {
        this.moveVertex(e.target, e.v);
    }

    moveVertex(target, v) {

        if (target === this.dotA) {
            let p1 = Vector.addVectors(this.originalP1, v);
            this.p1.x = p1.x;
            this.p1.y = p1.y;
        }
        else if (target === this.dotB) {
            let p2 = Vector.addVectors(this.originalP2, v);
            this.p2.x = p2.x;
            this.p2.y = p2.y;
        }

        this.setPosition();
        this.drawLine();
    }

    onBeginMove() {
        this.originalP1 = this.p1.clone();
        this.originalP2 = this.p2.clone();
    }

    onMovingEdge(e) {
        this.moveEdge(e.v);
    }

    onMoveEndEdge(e) {
        this.moveEdge(e.v);
    }

    moveEdge(v) {
        let p1 = Vector.addVectors(this.originalP1, v);
        let p2 = Vector.addVectors(this.originalP2, v);
        this.p1.x = p1.x;
        this.p1.y = p1.y;
        this.p2.x = p2.x;
        this.p2.y = p2.y;
        this.setPosition();
        this.drawLine();
    }
}
export {UI_LineSegment}