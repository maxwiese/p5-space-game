class TheGameScene extends Scene {

    width;
    height;
    eyes;

    spaceship;

    asteroids;
    asteroid_imgs;

    score;
    scoreTxt;

    joix;
    joiy;

    keyboard;

    background_img;

    constructor() {
        super()

        this.width = 0;
        this.height = 0;
        this.eyes = 0;

        this.background_img = 0;

        this.spaceship_imgs = [];
        this.spaceship = 0;

        this.asteroids = [];
        this.asteroid_imgs = [];

        this.joix = 0;
        this.joiy = 0;

        this.keyboard = new Keyboard();
    }

    load() {
        this.background_img = loadImage(`/assets/background/starfield_02.png`)

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

        this.spaceship = new Spaceship(this.spaceship_imgs, this.width, this.height);

        this.score = 0;
        this.scoreTxt = createGraphics(this.width, 30);
        this.scoreTxt.textFont('Source Code Pro');
        this.scoreTxt.textSize(24);
        this.scoreTxt.fill(0);
    }

    loop(joix, joiy) {
        background(51);

        this.scoreTxt.background(255);
        this.scoreTxt.text(`Score: ${this.score}    Level: ${this.spaceship.level}`, 0, 25)

        push()
        imageMode(CENTER);
        scale(0.3);
        //rotate(90);
        image(this.background_img, 0, 0);
        pop()

        if (joix == 0 && joiy == 0) {
            let input = this.keyboard.update(this.joix, this.joiy, 3);

            this.joix = input.x;
            this.joiy = input.y;
        } else {
            this.joix = joix;
            this.joiy = joiy;
        }

        if (this.keyboard.space) {
            this.spaceship.shoot(this.joix, this.joiy)
        }

        this.spawnAsteroids();

        this.spaceship.update((this.joiy + (height / 2)), (this.joix + (width / 2)));
        this.spaceship.draw();

        for (let i = 0; i < this.asteroids.length; i++) {
            let asteroid = this.asteroids[i];

            asteroid.update();

            if (asteroid.isHitByLazor(this.spaceship.lazors)) {
                this.score++;
                this.testLevelUp();
            }

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

        image(this.scoreTxt, -this.width / 2, -this.height / 2)

    }

    spawnAsteroids() {
        if (this.asteroids.length < 4) {
            let asteroid = new Asteroid(this.asteroid_imgs[int(random(0, this.asteroids.length))], 25);
            this.asteroids.push(asteroid);
        }
    }

    testLevelUp() {
        switch (this.score / 10) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                this.spaceship.levelUp();
                break;

            default:
                break;
        }

    }

}