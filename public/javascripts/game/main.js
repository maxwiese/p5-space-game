//hold the game assets
let asteroids = [];
let s_asteroids = [];


// public variables
let WIDTH, HEIGHT, EYES;

let isFullscreen = false;
let isDebug = false;

let joiX, joiY;

let counter;

// getting socket
let socket = io();

socket.on('controller_input', (data) => {
    let jData = JSON.parse(`${data}`);
    joiX = jData.x;
    joiY = jData.y;
})


// loading game assets
function preload() {
    asteroids.push(loadImage('/assets/asteroid_01.png'))
    asteroids.push(loadImage('/assets/asteroid_02.png'))
    asteroids.push(loadImage('/assets/asteroid_03.png'))
}

function setup() {
    EYES = 75
    WIDTH = ((windowWidth / 2) - EYES)
    HEIGHT = windowHeight;

    counter = 0;

    createStereoCanvas(WEBGL, WIDTH, HEIGHT, EYES);

}

function draw() {
    counter += 1;
    background(51);

    if (isDebug) {
        push()
        stroke(color(255, 0, 0))
        strokeWeight(5)
        line((WIDTH / 2), -(HEIGHT / 2), (WIDTH / 2), (HEIGHT / 2))
        pop()

        push()
        translate(-(WIDTH /2 ), -(HEIGHT / 2))
        text(`Box X: ${chX}, Y: ${chY}`, 10, 10);
        pop()
    }

    /*push()
    translate( -counter * 0.1, -counter * 0.1)
    imageMode(CENTER);
    scale(counter * 0.001);
    image(asteroids[0], 0, 0);
    pop()*/

    spawnAsteroids();

    for(let i = 0; i < s_asteroids.length; i++) {
        let asteroid = s_asteroids[i]
        push();
        translate((counter * 0.1 * asteroid.x), (counter * 0.1 * asteroid.y));
        imageMode(CENTER);
        scale(counter * 0.1 * asteroid.s);
        image(asteroid.a, 0, 0);
        pop();

        if (asteroid) {
            
        }
    }

    push();
    fill(color(255, 0, 0, 150));
    noStroke();
    ellipse(joiX , joiY, 10, 10);
    pop();

    updateStereo(); // duplicate the left eye to the right eye
}

function spawnAsteroids() {
    if (s_asteroids.length < 4) {
        let speed = random(0.1, 0.2);
        let a = asteroids[int(random(0, asteroids.length-1))];
        s_asteroids.push({a: a, s: speed, x: random(-50, 50), y: random(-50, 50)});
    }
}