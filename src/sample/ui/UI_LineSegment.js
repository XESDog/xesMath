import {UI_Point} from "./UI_Point";
import {Vector} from "../../coniferCone/geom/Vector";
import {DragManager} from "../manager/DragManager";
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

        this._dragManager = null;

        this.dotA = new UI_Point(new Vector(0, 0));
        this.dotB = new UI_Point(new Vector(0, 0));
        this.line = new createjs.Shape();
        this.dotC = new UI_Point(new Vector(0, 0), 4);

        this.addChild(this.line);
        this.addChild(this.dotA);
        this.addChild(this.dotB);
        this.addChild(this.dotC);

        this.setPosition();
        this.drawLine();

        this.on('added', this.onAdded, this);
    }

    update(){
        this.setPosition();
        this.drawLine();
    }

    setPosition() {
        let center = Vector.lerpVectors(this.p2, this.p1, 0.5);
        this.x = center.x;
        this.y = center.y;
        this.dotA.update(Vector.subVectors(this.p1, center));
        this.dotB.update(Vector.subVectors(this.p2, center));
        this.dotC.update(new Vector());
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

    onAdded() {
        if (this._dragManager === null) {
            this._dragManager = new DragManager(this.stage);
            this._dragManager.register(this.dotA);
            this._dragManager.register(this.dotB);
            this._dragManager.register(this.dotC);

            let self = this;
            let originalA, originalB;

            this.dotA.onStartDrag = this.dotB.onStartDrag = this.dotC.onStartDrag = function () {
                originalA = self.p1.clone();
                originalB = self.p2.clone();
            };
            this.dotA.onEndDrag = this.dotB.onEndDrag = this.dotC.onEndDrag = function () {
                self.update();
            };

            this.dotA.onDraging = this.dotB.onDraging = this.dotC.onDraging = function (originalP, offsetP) {
                if (this === self.dotA) {
                    self.p1 = Vector.addVectors(originalA, offsetP);
                }
                else if (this === self.dotB) {
                    self.p2 = Vector.addVectors(originalB, offsetP);
                }
                else if (this === self.dotC) {
                    self.p1 = Vector.addVectors(originalA, offsetP);
                    self.p2 = Vector.addVectors(originalB, offsetP);
                }
                self.update();
            }
        }

    }
}
export {UI_LineSegment}