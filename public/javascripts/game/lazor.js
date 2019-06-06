class Lazor {
    position;
    color;
    lenght;
    stroke;
    
    constructor(color=color(255, 0, 100, 150), lenght=25, stroke=5) {
        this.position = createVector(0, 0, 0);
        this.color = color;
        this.lenght = lenght;
        this.stroke = stroke;
    }

    update(x, y, z) {
        this.position.x = x;
        this.position.y = y;
        this.position.z = z;
    }

    draw() {
        push()

        var cpointX = this.position.x - this.lenght;
        var cpointY = this.position.y - this.lenght;
        
        strokeWeight(this.stroke);
        stroke(this.color);
        line(this.position.x, this.position.y, cpointX, cpointY);

        pop()
    }
}