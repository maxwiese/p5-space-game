//hold the game assets
let asteroids = [];
let asteroid_imgs = [];


// public variables
let WIDTH, HEIGHT, EYES;

let isFullscreen = false;
let isDebug = false;

let joiX = 0, joiY = 0;

let counter;

let gameScene = new GameScene1();

// getting socket
let socket = io();

socket.on('controller_input', (data) => {
    let jData = JSON.parse(`${data}`);
    joiX = jData.x;
    joiY = jData.y;
})


// loading game assets
function preload() {
    gameScene.load()
}

function setup() {
    EYES = 75
    WIDTH = ((windowWidth / 2) - EYES)
    HEIGHT = windowHeight;

    counter = 0;

    createStereoCanvas(WEBGL, WIDTH, HEIGHT, EYES);
    gameScene.init()

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


    gameScene.loop()

    push();
    fill(color(255, 0, 0, 150));
    noStroke();
    ellipse(joiX , joiY, 10, 10);
    pop();

    updateStereo(); // duplicate the left eye to the right eye
}