class Keyboard {
    x;
    y;
    space;

    constructor() {
        this.space = false;

    }

    update(x, y, speed = 1) {
        this.x = x;
        this.y = y;

        if (keyIsPressed === true) {
            //up arrow or w key
            if (keyCode == 38 || keyCode == 87) {
                this.y = y - speed;

            }
            //down arrow or s key
            if (keyCode == 40 || keyCode == 83) {
                this.y = y + speed;

            }
            //left arrow or a key
            if (keyCode == 37 || keyCode == 65) {
                this.x = x - speed;

            }
            //right arrow or  d key
            if (keyCode == 39 || keyCode == 68) {
                this.x = x + speed;

            }
            //space key
            if (keyCode == 32) {

                this.space = true;

            }
        } else {
            this.space = false
        }

        return {
            x: this.x,
            y: this.y
        }
    }
}