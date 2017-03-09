class UpdateEvent extends createjs.Event {
    constructor(data) {
        super();
        this.type = 'update';
        this.data = data;
    }
}

export {UpdateEvent}