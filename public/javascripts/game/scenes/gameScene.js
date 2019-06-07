class TheGameScene extends Scene {

    width;
    height;
    eyes;

    crosshair;
    crosshair_imgs;

    spaceship;
    spaceship_imgs;

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

        this.crosshair = 2;
        this.crosshair_imgs = [];

        this.spaceship = 0;
        this.spaceship_imgs = [];

        this.asteroids = [];
        this.asteroid_imgs = [];

        this.joix = 0;
        this.joiy = 0;

        this.keyboard = new Keyboard();
    }

    load() {
        this.background_img = loadImage(`/assets/background/starfield_02.png`)

        for (let i = 1; i < 5; i++) {
            this.crosshair_imgs.push(loadImage(`/assets/crosshair/crosshair_0${i}.png`));
        }

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
        
        for (let i = 0; i < this.asteroids.length; i++) {
            let asteroid = this.asteroids[i];

            asteroid.update();

            if (asteroid.isHitByLazor(this.spaceship.lazors)) {
                this.score++;
                //this.normalLevelUp();
                this.randomOneLevelUp()
            }

            asteroid.draw();

            if (asteroid.isReadyToDestroy) {
                this.asteroids.splice(i, 1);
            }
        }
        this.spaceship.update((this.joiy + (height / 2)), (this.joix + (width / 2)));
        this.spaceship.draw();

        

        push();
        translate(this.joix, this.joiy);
        imageMode(CENTER);
        scale(0.1)
        image(this.crosshair_imgs[this.crosshair], 0, 0);
        pop();

        image(this.scoreTxt, -this.width / 2, -this.height / 2)

    }

    spawnAsteroids() {
        if (this.asteroids.length < 4) {
            let asteroid = new Asteroid(this.asteroid_imgs[int(random(0, this.asteroids.length))], 25);
            this.asteroids.push(asteroid);
        }
    }

    normalLevelUp() {
        switch (this.score) {
            case 10:
            case 30:
            case 60:
            case 160:
            case 350:
            case 700:
            case 1337:
                this.spaceship.levelUp();
                break;

            default:
                break;
        }
    }

    randomOneLevelUp() {
        if (this.spaceship.level < 8) {
            switch (this.score) {
                case int(random(10, 20)):
                case int(random(20, 40)):
                case int(random(40, 80)):
                case int(random(80, 160)):
                case int(random(160, 320)):
                case int(random(320, 640)):
                case int(random(1280, 2560)):
                    this.spaceship.levelUp();
                    break;

                default:
                    break;
            }
        }
    }

}