class DeviceMotion {

    history;
    x;
    y;
    z;

    constructor(x = 0, y = 0, z = 0) {
        this.history = [];
        this.x = x;
        this.y = y;
        this.z = z;
    }

    update(x, y, z) {
        x !== null ? this.x = 0 : this.x = x;
        y !== null ? this.y = 0 : this.y = y;
        z !== null ? this.z = 0 : this.z = z;
        this.history.push({ x: this.x, y: this.y, z: this.z });
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    getZ() {
        return this.z;
    }

    getHistory() {
        return this.history;
    }

    getLastDistance() {
        if (this.history.length === 0) {
            return { x: 0, y: 0, z: 0 }
        } else {
            let historyItem = this.history[this.history.length - 1];

            let lastX = historyItem.x;
            let lastY = historyItem.y;
            let lastZ = historyItem.z;

            return {
                x: lastX - this.x,
                y: lastY - this.y,
                z: lastZ - this.z
            }
        }
    }
}