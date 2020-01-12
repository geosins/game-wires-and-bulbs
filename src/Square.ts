class Square {
    constructor(rotation, shape) {
        this.rotation = rotation;
        this.shape = shape;
    }

    rotate() {
        this.rotation = this.rotation == 270 ? 0 : this.rotation + 90;
    }

    reset() {
        this.isActive = false;
    }

    receiveSignal(direction) {
        if (this.isActive) {
            return [];
        }

        const contacts = this.getContacts();
        if (contacts.includes(direction)) {
            this.isActive = true;
            return contacts.filter(item => item != direction);
        } else {
            return [];
        }
    }

    getContacts() {
        switch(this.shape) {
            case Shape.Line:
                return this.getLineContacts();
            case Shape.Angle:
                return this.getAngleContacts();
            case Shape.Tack:
                return this.getTackContacts();
            case Shape.Cross:
                return this.getCrossContacts();
        }
    }

    getLineContacts() {
        switch(this.rotation) {
            case 0:
            case 180:
                return [Direction.Up, Direction.Down];
            case 90:
            case 270:
                return [Direction.Left, Direction.Right];
        }
    }

    getAngleContacts() {
        switch(this.rotation) {
            case 0:
                return [Direction.Up, Direction.Right];
            case 90:
                return [Direction.Down, Direction.Right];
            case 180:
                return [Direction.Left, Direction.Down];
            case 270:
                return [Direction.Left, Direction.Up];
        }
    }

    getTackContacts() {
        switch(this.rotation) {
            case 0:
                return [Direction.Left, Direction.Right, Direction.Down];
            case 90:
                return [Direction.Down, Direction.Up, Direction.Left];
            case 180:
                return [Direction.Left, Direction.Right, Direction.Up];
            case 270:
                return [Direction.Down, Direction.Up, Direction.Right];
        }
    }

    getCrossContacts() {
        return [Direction.Up, Direction.Down, Direction.Left, Direction.Right];
    }
}