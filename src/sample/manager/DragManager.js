import {Vector} from "../../coniferCone/geom/Vector";
class DragManager {
    constructor(stage) {
        this.stage = stage;
        this.currentObject = null;
        this.moveEventID = new Map();
        this.mouseDownP = new Map();
        this.originalP = new Map();
        this.objs = new Set();

        this.mouseDownID;

    }

    register(displayObject) {
        this.objs.add(displayObject);
        this.mouseDownID = displayObject.on('mousedown', this.onMouseDown, this);
    }

    unregister(displayObject) {
        displayObject.off('mousedown', this.mouseDownID);
        this.objs.delete(displayObject);
    }

    onMouseDown(e) {
        this.currentObjet = e.target;

        let p = new Vector(e.stageX, e.stageY);
        this.mouseDownP.set(this.currentObjet, new Vector(p.x, p.y));
        this.originalP.set(this.currentObjet, new Vector(this.currentObjet.x, this.currentObjet.y));

        let moveEventID = this.stage.on('stagemousemove', this.onMouseMove, this);
        this.moveEventID.set(this.currentObjet, moveEventID);

        this.stage.on('stagemouseup', this.onMouseUp, this, true);

        if (Reflect.get(this.currentObjet, 'onStartDrag')) {
            this.currentObjet.onStartDrag();
        } else {
            this.defaultDownHandle();
        }
    }

    onMouseMove(e) {
        let mouseDownP = this.mouseDownP.get(this.currentObjet);
        let moveP = new Vector(e.stageX, e.stageY);
        let offsetP = Vector.subVectors(moveP, mouseDownP);
        let originalP = this.originalP.get(this.currentObjet);

        if (Reflect.get(this.currentObjet, 'onDraging')) {
            this.currentObjet.onDraging(originalP, offsetP);
        } else {
            this.defaultMoveHandle(originalP, offsetP);
        }
    }

    onMouseUp(e) {
        this.stage.off('stagemousemove', this.moveEventID.get(this.currentObjet));
        this.moveEventID.delete(this.currentObjet);

        let mouseDownP = this.mouseDownP.get(this.currentObjet);
        let moveP = new Vector(e.stageX, e.stageY);
        let offsetP = Vector.subVectors(moveP, mouseDownP);
        let originalP = this.originalP.get(this.currentObjet);

        if (Reflect.get(this.currentObjet, 'onEndDrag')) {
            this.currentObjet.onEndDrag(originalP, offsetP);
        } else {
            this.defaultUpHandle(originalP, offsetP);
        }
    }

    defaultMoveHandle(originalP, offsetP) {
        let p = Vector.addVectors(originalP, offsetP);
        this.currentObjet.x = p.x;
        this.currentObjet.y = p.y;
    }

    defaultUpHandle(originalP, offsetP) {
        let p = Vector.addVectors(originalP, offsetP);
        this.currentObjet.x = p.x;
        this.currentObjet.y = p.y;
    }

    defaultDownHandle() {

    }
}
export {DragManager}