class TheGameScene extends Scene {

    width;
    height;
    eyes;

    asteroids;
    asteroid_imgs;

    joix;
    joiy;

    constructor() {
        super()

        this.width = 0;
        this.height = 0;
        this.eyes = 0;

        this.asteroids = [];
        this.asteroid_imgs = [];

        this.joix = 0;
        this.joiy = 0;
    }

    load() {
        this.asteroid_imgs.push(loadImage('/assets/asteroid_01.png'))
        this.asteroid_imgs.push(loadImage('/assets/asteroid_02.png'))
        this.asteroid_imgs.push(loadImage('/assets/asteroid_03.png'))
    }

    init(width, height, eyes) {
        this.width = width;
        this.height = height;
        this.eyes = eyes;
    }

    loop(joix, joiy) {
        background(51);

        this.spawnAsteroids();

        for (let i = 0; i < this.asteroids.length; i++) {
            let asteroid = this.asteroids[i];

            asteroid.update();
            asteroid.draw();

            if (asteroid.isReadyToDestroy) {
                this.asteroids.splice(i, 1);
            }
        }

        push();
        fill(color(255, 0, 0, 150));
        noStroke();
        ellipse(joix, joiy, 10, 10);
        pop();

    }

    spawnAsteroids() {
        if (this.asteroids.length < 4) {
            let asteroid = new Asteroid(this.asteroid_imgs[int(random(0, this.asteroids.length))], 25);
            this.asteroids.push(asteroid);
        }
    }

}