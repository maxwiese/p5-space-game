// public variables
let WIDTH, HEIGHT, EYES;
let isFullscreen = false;

// controller input
let joiX = 0, joiY = 0;

var gameScene = new TheGameScene();

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

    createStereoCanvas(WEBGL, WIDTH, HEIGHT, EYES);
    gameScene.init(WIDTH, HEIGHT, EYES);

}

function draw() {
    gameScene.loop(joiX, joiY);
    updateStereo(); // duplicate the left eye to the right eye
}