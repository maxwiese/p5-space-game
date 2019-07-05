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
    scale;

    isReadyToDestroy;
    
    constructor(startX, startY, destX, destY, angleBetween, image, length=25, stroke=3) {
        this.counter = 0;

        this.image = image;

        this.startPos = createVector(startX, (startY + this.image.height));
        this.destPos = createVector(destX, destY);
        this.currPos = this.startPos;
        this.angleBetween = angleBetween;

        this.color = color(255, 0, 150);
        this.length = length;
        this.stroke = stroke;
        this.scale = 0.2;

        this.isReadyToDestroy = false;
        
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
        scale(this.scale);
        rotate(this.angleBetween + 90)
       image(this.image, 0, 0)

        pop()
    }
}