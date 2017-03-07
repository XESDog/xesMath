class ChangePositionEvent extends createjs.Event {
    constructor(type, v) {
        super();

        this.type = type;
        this.v = v;
    }
}
ChangePositionEvent.BEGIN = Symbol('begin');
ChangePositionEvent.ING = Symbol('ing');
ChangePositionEvent.END = Symbol('end');

export {ChangePositionEvent}