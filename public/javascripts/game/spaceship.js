class Spaceship {

    images;
    level;
    direction;
    position;

    constructor(images) {
        this.images = images;
        this.level = 0;
        this.position = createVector(0, 0, 0);
    }

    update() {

    }

    draw() {
        push();
        translate(this.position.x, this.position.y);
        scale(this.position.z);
        rotate(this.direction);
        imageMode(CENTER);
        image(this.image(), 0, 0);
        pop();
    }
}