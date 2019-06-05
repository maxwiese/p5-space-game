//hold the game assets
let asteroids = [];
let asteroid_imgs = [];


// public variables
let WIDTH, HEIGHT, EYES;

let isFullscreen = false;
let isDebug = false;

let joiX = 0, joiY = 0;

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
    asteroid_imgs.push(loadImage('/assets/asteroid_01.png'))
    asteroid_imgs.push(loadImage('/assets/asteroid_02.png'))
    asteroid_imgs.push(loadImage('/assets/asteroid_03.png'))
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
    
    /*push()
    translate( -counter * 0.1, -counter * 0.1)
    imageMode(CENTER);
    scale(counter * 0.001);
    image(asteroids[0], 0, 0);
    pop()*/

    spawnAsteroids();

    for(let i = 0; i < asteroids.length; i++) {
        let asteroid = asteroids[i];

        asteroid.update();
        asteroid.draw();

        if(asteroid.isReadyToDestroy) {
            asteroids.splice(i, 1);
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
    if (asteroids.length < 4) {
        let asteroid = new Asteroid(asteroid_imgs[int(random(0, asteroids.length))], 25);
        asteroids.push(asteroid);
    }
}