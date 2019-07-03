class Lazor {
    counter;
    startPos
    destPos;
    currPos;
    color;
    length;
    stroke;
    angleBetween;
    image;

    isReadyToDestroy;
    
    constructor(startX, startY, destX, destY, angleBetween, image, length=25, stroke=3) {
        this.counter = 0;

        this.startPos = createVector(startX, startY);
        this.destPos = createVector(destX, destY);
        this.currPos = this.startPos;
        this.angleBetween = angleBetween;

        this.color = color(255, 0, 150);
        this.length = length;
        this.stroke = stroke;

        this.isReadyToDestroy = false;
        this.image = image;
    }

    update() {
        this.counter += 2;

        this.currPos = p5.Vector.lerp(this.startPos, this.destPos, this.counter / 100);

        if(this.currPos.equals(this.destPos)) {
            this.isReadyToDestroy = true;
        }
    }

    draw() {
        push()
        
        translate(this.currPos.x, this.currPos.y)
        scale(0.2);
        rotate(this.angleBetween + 90)
        /*
        strokeWeight(this.stroke);
        stroke(this.color);
        line(0, 0, 0, this.length);
        */
       //imageMode(CENTER);
       image(this.image, 0, 0)

        pop()
    }
}