class TheGameScene extends Scene {

    width;
    height;
    eyes;

    crosshair;
    crosshair_imgs;

    spaceship;
    spaceship_imgs;

    lazor_imgs;

    asteroids;
    asteroid_imgs;
    lastAsteroidSpawn;

    score;
    scoreTxt;

    aim;

    background_img;
    sounds;

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

        this.lazor_imgs = [];

        this.asteroids = [];
        this.asteroid_imgs = [];

        this.sounds = [];

        this.joix = 0;
        this.joiy = 0;

        this.lastAsteroidSpawn = Date.now();
    }

    load() {
        this.background_img = loadImage(`/assets/background/starfield_02.png`)

        for (let i = 1; i < 5; i++) {
            this.crosshair_imgs.push(loadImage(`/assets/crosshair/crosshair_0${i}.png`));
        }

        for (let i = 1; i < 9; i++) {
            this.spaceship_imgs.push(loadImage(`/assets/spaceship/spaceship_gold_0${i}.png`));
        }

        for (let i = 1; i < 3; i++) {
            this.lazor_imgs.push(loadImage(`/assets/lazorbeam/lazor_0${i}.png`));
        }

        for (let i = 1; i < 4; i++) {
            this.asteroid_imgs.push(loadImage(`/assets/asteroid/asteroid_0${i}.png`));
        }

        this.sounds.push(loadSound('/assets/sounds/damage.mp3'));
        this.sounds.push(loadSound('/assets/sounds/explosion.mp3'));
        this.sounds.push(loadSound('/assets/sounds/shot.mp3'));
        this.sounds.push(loadSound('/assets/sounds/levelup.mp3'));
    }

    init(width, height, eyes) {
        this.width = width;
        this.height = height;
        this.eyes = eyes;

        this.aim = createVector();

        this.spaceship = new Spaceship(this.spaceship_imgs, this.width, this.height, this.sounds);

        this.score = 0;
        this.scoreTxt = createGraphics(this.width, 30);
        this.scoreTxt.textFont('Source Code Pro');
        this.scoreTxt.textSize(24);
        this.scoreTxt.fill(0);
    }

    loop() {
        background(51);

        this.scoreTxt.background(255);
        this.scoreTxt.text(`Score: ${this.score}  Level: ${this.spaceship.level}  Shield: ${this.spaceship.shield}%`, 0, 25)

        push()
        imageMode(CENTER);
        scale(0.3);
        //rotate(90);
        image(this.background_img, 0, 0);
        pop()

        this.aim.x = -1 * (map(mouseX, -WIDTH / 2, WIDTH / 2, WIDTH, 0));
        this.aim.y = -1 * (map(mouseY, -HEIGHT / 2, HEIGHT / 2, HEIGHT, 0));

        if (mouseIsPressed) {
            if (mouseButton == LEFT && Date.now() > this.spaceship.lastShot + this.spaceship.shotSpeed) {
                this.spaceship.shoot(this.aim.x, this.aim.y, this.lazor_imgs[0]);
                this.spaceship.lastShot = Date.now();
            }
        }

        if (keyIsPressed === true) {

            console.log(keyCode)
            //left arrow or  a key
            if (keyCode == 37 || keyCode == 97 && !(this.spaceship.position.x < -155)) {
                this.spaceship.move(-1)
            }
            //right arrow or  d key
            if (keyCode == 39 || keyCode == 100 && !(this.spaceship.position.x > 155)) {
                this.spaceship.move(1)
            }
            if (keyCode == 27) {
                CURR_SCENE = 3
            }
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

            if (asteroid.hitSpaceship(this.spaceship)) {
                this.spaceship.hitByAsteroid(asteroid);
                asteroid.isReadyToDestroy = true;
                if (this.spaceship.isDestroyed) {
                    CURR_SCENE = 2;
                }
            }

            asteroid.draw();

            if (asteroid.isReadyToDestroy) {
                this.asteroids.splice(i, 1);
            }
        }
        this.spaceship.update(this.aim);
        this.spaceship.draw();

        push();
        translate(this.aim.x, this.aim.y);
        imageMode(CENTER);
        scale(0.1)
        image(this.crosshair_imgs[this.crosshair], 0, 0);
        pop();

        image(this.scoreTxt, -this.width / 2, -this.height / 2)
    }

    spawnAsteroids() {
        if (Date.now() > this.lastAsteroidSpawn + (600 - ((Date.now() - TIMER) / 1000))) {
            let numOfAsteroids = int(random(1, 5));
            for (let i = 0; i < numOfAsteroids; i++) {
                let a_image = random(this.asteroid_imgs);
                console.log(a_image);
                let asteroid = new Asteroid(a_image, this.sounds, 25);
                this.asteroids.push(asteroid);
            }
            this.lastAsteroidSpawn = Date.now();
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

    reset() {
        this.score = 0;
        this.spaceship.level = 0;
        this.spaceship.shield = 100;
        this.spaceship.isDestroied = false;

        this.spaceship.lazors = [];
        this.asteroids = [];

        TIMER = Date.now();
    }

}