class Spaceship {

    images;
    screenWidth;
    screenHeight;
    level;
    shield;
    isDestroied;
    direction;
    position;

    lazors;
    lastShot;

    sounds;

    constructor(images, width, height, sounds) {
        this.images = images;
        this.sounds = sounds;
        this.level = 0;
        this.shield = 100;
        this.isDestroied = false;

        this.direction = 0;

        this.screenWidth = width;
        this.screenHeight = height;

        let posY = ((this.screenHeight / 2) - this.images[this.level].height);
        this.position = createVector(0, posY, 1.7);

        this.lazors = [];
        this.lastShot = Date.now();
        this.shotSpeed = map(this.level, 0, 7, 300, 50)
    }

    move(posX) {
        this.position.x += posX;
    }
    update(crosshair) {
        this.shotSpeed = map(this.level, 0, 7, 300, 50)
        this.direction = atan2(crosshair.y - this.position.y, crosshair.x - this.position.x);
        this.direction = (this.direction < 0) ? TWO_PI + this.direction +90 : this.direction + 90;

        for (let i = 0; i < this.lazors.length; i++) {

            this.lazors[i].update();

            if (this.lazors[i].isReadyToDestroy) {
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

    getSpaceshipImg() {
        return this.images[this.level];
    }

    shoot(destX, destY, lazor_image) {
        this.sounds[2].play();
        this.lazors.push(new Lazor(this.position.x, this.position.y, destX, destY, this.direction, lazor_image));
    }

    levelUp() {
        if (this.level + 1 < this.images.length) {
            this.level += 1;
            this.sounds[3].play();
            //this.shield += 20;
        }
    }

    hitByAsteroid(asteroid) {
        this.shield -= asteroid.damage;
        this.sounds[0].play();
        if (this.shield <= 0) {
            this.isDestroyed = true;
        }
    }
}