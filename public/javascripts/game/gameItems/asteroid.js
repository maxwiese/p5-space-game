class Asteroid {
    
    image;    
    speed;
    direction;
    counter;
    isReadyToDestroy;
        
    constructor(image, maxSize=50) {
        this.image = image;
        this.speed = 0.1;
        this.direction = createVector(int(random(-maxSize, maxSize)), int(random(-maxSize, maxSize)));
        
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
        
        push();
        translate((this.counter * 0.1 * this.direction.x), (this.counter * 0.1 * this.direction.y));
        imageMode(CENTER);
        scale(this.counter * 0.1 * this.speed);
        image(this.image, 0, 0);
        pop();
    }
}