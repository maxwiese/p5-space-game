class Spaceship {

    images;
    screenWidth;
    screenHeight;
    level;
    direction;
    position;

    lazors;

    constructor(images, width, height) {
        this.images = images;
        this.level = 0;

        this.direction = 0;

        this.screenWidth = width;
        this.screenHeight = height;

        let posY = ((this.screenHeight / 2) - this.images[this.level].height);
        this.position = createVector(0, posY, 1.5);

        this.lazors = [];
    }

    update(dirX, dirY) {
        this.direction = atan2(dirY - this.position.y, dirX - this.position.x);

        for (let i = 0; i < this.lazors.lenght; i++) {
            this.lazors.update();
        }
    }

    draw() {

        push();

        translate(this.position.x, this.position.y);
        scale(this.position.z);
        rotate(this.direction);
        imageMode(CENTER);
        image(this.images[this.level], 0, 0);
        pop();

        for (let i = 0; i < this.lazors.lenght; i++) {
            this.lazors.draw();
        }
    }

    shoot() {
        console.log("Captain: 'shoot!'")

    }

    levelUp() {
        this.level += 1;
    }
}