class Asteroid {
    
    image;    
    speed;
    direction;
    position;
    scale;
    damage;
    isReadyToDestroy;
    sounds;
        
    constructor(image, sounds, maxSize=50) {
        this.image = image;
        this.sounds = sounds;
        
        this.position = createVector(int(random(-WIDTH /2, WIDTH/2)), -HEIGHT/2);
        
        this.scale = random(0.1, 1);
        this.speed = 0.5 * (this.scale *10);
        this.direction = createVector(0, this.speed);
        
        this.damage = int(this.scale * 20);
        this.isReadyToDestroy = false;
    }

    update() {
        this.position.x += this.direction.x;
        this.position.y += this.direction.y;

        if (this.position.y > HEIGHT /2 + 10) {
            this.isReadyToDestroy = true;
        }
    }
    
    draw() {
        push();
        translate(this.position.x, this.position.y);
        imageMode(CENTER);
        scale(this.scale);
        image(this.image, 0, 0);
        
        pop();
    }

    hitSpaceship(spaceship) {
        let r = this.image.width * this.scale;
        let hit = collideRectCircle(spaceship.position.x, spaceship.position.y, spaceship.getSpaceshipImg().width, spaceship.getSpaceshipImg().height, this.position.x, this.position.y, r)
        return hit;
    }

    isHitByLazor(lazors){

        let r = this.image.width*this.scale;

        //DEBUG:ellipse(this.position.x, this.position.y, r, r);

        for (let lazor of lazors) {

            let isHit = collideLineCircle(lazor.currPos.x, lazor.currPos.y, lazor.image.width*lazor.scale, lazor.image.height*lazor.scale, this.position.x, this.position.y, r)

            if( isHit ) {
                lazor.isReadyToDestroy = true;
                this.isReadyToDestroy = true;
                this.sounds[1].play();
                return true;
            }
        }
    }
}