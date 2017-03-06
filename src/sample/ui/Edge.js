import {Dot} from "./Dot";
import {Vector2} from "../../coniferCone/geom/Vector2";
class Edge extends createjs.Container {

    /**
     *
     * @param p1   边的一个顶点
     * @param p2   边的另外一个顶点
     */
    constructor(p1, p2) {
        super();

        this.p1 = p1;
        this.p2 = p2;
        this.length = Vector2.subVectors(p2, p1).length;

        this.dotA = new Dot(p1);
        this.dotB = new Dot(p2);
        this.line = new createjs.Shape();
        this.dotC = new Dot(new Vector2(0, 0), 4);

        this.addChild(this.dotA);
        this.addChild(this.dotB);
        this.addChild(this.dotC);
        this.addChild(this.line);

        this.addEvent();

        this.setPosition();
        this.drawLine();
    }

    addEvent() {
        this.dotA.on('mousedown', this.onDotDown, this, false, this.p1);
        this.dotB.on('mousedown', this.onDotDown, this, false, this.p2);
        this.dotC.on('mousedown', this.onEdgeDown, this, false);//移动整个edge
    }

    onEdgeDown(e) {
        let onEdgeMoveId = this.stage.on('stagemousemove', onEdgeMove, this);
        let startP = new Vector2(e.stageX, e.stageY);
        let originalP1 = this.p1.clone();
        let originalP2 = this.p2.clone();

        this.stage.on('stagemouseup', onEdgeUp, this, true);

        function onEdgeMove(e) {
            let moveP = new Vector2(e.stageX, e.stageY);
            let offsetP = Vector2.subVectors(moveP, startP);
            let newP1 = Vector2.addVectors(originalP1, offsetP);
            let newP2 = Vector2.addVectors(originalP2, offsetP);
            this.p1.copy(newP1);
            this.p2.copy(newP2);


            this.setPosition();
            this.drawLine();
        }

        function onEdgeUp() {
            this.stage.off('stagemousemove', onEdgeMoveId);
        }
    }

    onDotDown(e, target) {
        let onDotMoveId;
        let onDotup = function () {
            this.stage.off('stagemousemove', onDotMoveId);
        };
        let onDotMove = function (e, data) {
            let moveP = Vector2.subVectors(new Vector2(e.stageX, e.stageY), data.fixedP);
            moveP.length = this.length;
            moveP.add(data.fixedP);

            data.changeP.copy(moveP);

            this.setPosition();
            this.drawLine();
        };

        let [fixedP, changeP] = (target === this.p1) ? [this.p2, this.p1] : [this.p1, this.p2];

        onDotMoveId = this.stage.on('stagemousemove', onDotMove, this, false, {fixedP: fixedP, changeP: changeP});
        this.stage.on('stagemouseup', onDotup, this, true);

    }

    setPosition() {
        let center = Vector2.lerpVectors(this.p2, this.p1, 0.5);

        this.x = center.x;
        this.y = center.y;
        this.dotA.setPosition(Vector2.subVectors(this.p1, center));
        this.dotB.setPosition(Vector2.subVectors(this.p2, center));
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
}
export {Edge}