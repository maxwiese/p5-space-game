class TheGameScene extends Scene {

    width;
    height;
    eyes;

    asteroids;
    asteroid_imgs;

    lazors;

    joix;
    joiy;

    keyboard;

    constructor() {
        super()

        this.width = 0;
        this.height = 0;
        this.eyes = 0;

        this.spaceship_imgs = [];

        this.asteroids = [];
        this.asteroid_imgs = [];

        this.lazors = [];

        this.joix = 0;
        this.joiy = 0;

        this.keyboard = new Keyboard();
    }

    load() {
        for (let i = 1; i < 9; i++) {
            this.spaceship_imgs.push(loadImage(`/assets/spaceship/spaceship_gold_0${i}.png`));
        }

        for (let i = 1; i < 4; i++) {
            this.asteroid_imgs.push(loadImage(`/assets/asteroid/asteroid_0${i}.png`));
        }
    }

    init(width, height, eyes) {
        this.width = width;
        this.height = height;
        this.eyes = eyes;
    }

    loop(joix, joiy) {
        background(51);

        if (joix == 0 && joiy == 0) {
            let input = this.keyboard.update(this.joix, this.joiy, 3);

            this.joix = input.x;
            this.joiy = input.y;
        } else {
            this.joix = joix;
            this.joiy = joiy;
        }

        if (this.keyboard.space) {
            this.lazors.push(new Lazor())
        }

        for (let i = 0; i < this.lazors.length; i++) {
            let lazor = this.lazors[i];


        }

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
        ellipse(this.joix, this.joiy, 10, 10);
        pop();



    }

    spawnAsteroids() {
        if (this.asteroids.length < 4) {
            let asteroid = new Asteroid(this.asteroid_imgs[int(random(0, this.asteroids.length))], 25);
            this.asteroids.push(asteroid);
        }
    }

}