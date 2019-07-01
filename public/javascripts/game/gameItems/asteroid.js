class Asteroid {
    
    image;    
    speed;
    direction;
    position;
    scale;
    counter;
    isReadyToDestroy;
        
    constructor(image, maxSize=50) {
        this.image = image;
        this.speed = 0.1;
        this.position = createVector(0, 0);
        this.direction = createVector(int(random(-maxSize, maxSize)), int(random(-maxSize, maxSize)));
        this.scale = 1;
        
        this.counter = 0;
        this.isReadyToDestroy = false;
    }

    update() {
        this.counter += 1;
        
        if (this.counter > 300) {
            this.isReadyToDestroy = true;
        }
    }
    
    draw() {
        let xspeed = map(this.counter, 0, 300, 300, 0)
        this.position = createVector((this.counter * 0.1 * this.direction.x), (this.counter * 0.1 * this.direction.y))
        this.scale = this.counter * 0.1 * this.speed

        push();
        translate(this.position.x, this.position.y);
        imageMode(CENTER);
        scale(this.scale);
        image(this.image, 0, 0);
        pop();
    }

    isHitByLazor(lazors){

        let r = this.image.width * this.scale;

        //DEBUG: ellipse(this.position.x, this.position.y, r, r);

        for (let lazor of lazors) {

            let isHit = collideLineCircle(lazor.currPos.x, lazor.currPos.y, 0, lazor.length, this.position.x, this.position.y, r)

            if( isHit ) {
                lazor.isReadyToDestroy = true;
                this.isReadyToDestroy = true;
                return true;
            }
        }
    }
}