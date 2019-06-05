class GameScene1 {
    
    asteroids;
    asteroid_imgs;

    constructor() {
        this.asteroids = [];
        this.asteroid_imgs = [];
    }

    load() {
        this.asteroid_imgs.push(loadImage('/assets/asteroid_01.png'))
        this.asteroid_imgs.push(loadImage('/assets/asteroid_02.png'))
        this.asteroid_imgs.push(loadImage('/assets/asteroid_03.png'))
    }

    init() {

    }

    loop() {
        this.spawnAsteroids();

        for(let i = 0; i < this.asteroids.length; i++) {
            let asteroid = this.asteroids[i];
    
            asteroid.update();
            asteroid.draw();
    
            if(asteroid.isReadyToDestroy) {
                this.asteroids.splice(i, 1);
            }        
        }

    }

    spawnAsteroids() {
        if (this.asteroids.length < 4) {
            let asteroid = new Asteroid(this.asteroid_imgs[int(random(0, this.asteroids.length))], 25);
            this.asteroids.push(asteroid);
        }
    }

}