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
        this.position = createVector(0, posY, 1.7);

        this.lazors = [];
    }

    update(dirX, dirY) {
        // TODO: find right angle between ship and pointer
        this.direction = atan2(dirY - this.position.y, dirX - this.position.x);

        for (let i = 0; i < this.lazors.length; i++) {
            
            this.lazors[i].update();

            if(this.lazors[i].isReadyToDestroy) {
                this.lazors.splice(i, 1);
            }

        }
    }

    draw() {

        for (let i = 0; i < this.lazors.length; i++) {
            this.lazors[i].draw();
        }

        push();
        translate(this.position.x, this.position.y);
        scale(this.position.z);
        rotate(this.direction);
        imageMode(CENTER);
        image(this.images[this.level], 0, 0);
        pop();
    }

    shoot(destX, destY) {
        console.log("Captain: 'shoot!'");

        this.lazors.push(new Lazor(this.position.x, this.position.y, destX, destY, this.direction));
    }

    levelUp() {
        this.level += 1;
    }
}