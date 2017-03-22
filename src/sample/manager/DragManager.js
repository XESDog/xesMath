import {Vector} from "../../coniferCone/geom/Vector";

function throwError() {
    throw new Error('Missing parameter!');
}

class DragManager {
    constructor(stage = throwError()) {
        this.stage = stage;
        this.currentObject = null;

        this.objs = new Map();

    }

    register(displayObject = throwError()) {

        let mouseDownID = displayObject.on('mousedown', this.onMouseDown, this);
        this.objs.set(displayObject, {mouseDownID});
    }

    setData(displayObject = throwError(), data) {
        let obj;
        if (this.objs.has(displayObject)) {
            obj = this.objs.get(displayObject);
            Object.assign(obj, {data});
        }
    }

    unregister(displayObject = throwError()) {
        let {mouseDownID} = this.objs.get(displayObject);
        displayObject.off('mousedown', mouseDownID);
        this.objs.delete(displayObject);
    }

    onMouseDown(e) {
        this.currentObject = e.target;

        let mouseDownP = new Vector(e.stageX, e.stageY);
        let originalP = new Vector(this.currentObject.x, this.currentObject.y);
        let moveEventID = this.stage.on('stagemousemove', this.onMouseMove, this);

        this.objs.set(this.currentObject, {moveEventID, mouseDownP, originalP});

        this.stage.on('stagemouseup', this.onMouseUp, this, true);

        if (Reflect.get(this.currentObject, 'onStartDrag')) {
            this.currentObject.onStartDrag();
        } else {
            this.defaultDownHandle();
        }
    }

    onMouseMove(e) {
        let moveP = new Vector(e.stageX, e.stageY);
        let {mouseDownP, originalP, data} = this.objs.get(this.currentObject);
        let offsetP = Vector.subVectors(moveP, mouseDownP);

        if (Reflect.get(this.currentObject, 'onDraging')) {
            this.currentObject.onDraging(data, offsetP);
        } else {
            this.defaultMoveHandle(originalP, offsetP);
        }
    }

    onMouseUp(e) {
        let {mouseDownP, originalP, data, moveEventID} = this.objs.get(this.currentObject);
        this.stage.off('stagemousemove', moveEventID);
        let moveP = new Vector(e.stageX, e.stageY);
        let offsetP = Vector.subVectors(moveP, mouseDownP);

        if (Reflect.get(this.currentObject, 'onEndDrag')) {
            this.currentObject.onEndDrag(data, offsetP);
        } else {
            this.defaultUpHandle(originalP, offsetP);
        }
    }

    defaultMoveHandle(originalP, offsetP) {
        let p = Vector.addVectors(originalP, offsetP);
        this.currentObject.x = p.x;
        this.currentObject.y = p.y;
    }

    defaultUpHandle(originalP, offsetP) {
        let p = Vector.addVectors(originalP, offsetP);
        this.currentObject.x = p.x;
        this.currentObject.y = p.y;
    }

    defaultDownHandle() {

    }
}
export {DragManager}