/// <reference path="../p5/p5.global-mode.d.ts" />

// public variables
let WIDTH, HEIGHT, EYES;
let CURR_SCENE = 0;
let isFullscreen = false;

let FRAMERATE = 60;

// controller input
let joiX = 0,
    joiY = 0;

let scenes = [new TheStartScene(), new TheGameScene()];

// getting socket
let socket = io();

socket.on('controller_input', (data) => {
    let jData = JSON.parse(`${data}`);
    joiX = jData.x;
    joiY = jData.y;
})


// loading game assets
function preload() {
    scenes[0].load();
    scenes[1].load();
}

function setup() {
    EYES = 75
    WIDTH = ((windowWidth / 2) - EYES)
    HEIGHT = windowHeight - 10;

    createStereoCanvas(WEBGL, WIDTH, HEIGHT, EYES);
    scenes[0].init(WIDTH, HEIGHT, EYES);
    scenes[1].init(WIDTH, HEIGHT, EYES);
    frameRate(FRAMERATE);

    collideDebug(true);
}

function draw() {
    angleMode(DEGREES);

    switch (CURR_SCENE) {
        case 0:
            scenes[0].loop();
            break;
        case 1:
            scenes[1].loop(joiX, joiY);
            break;
        default:
            break;
    }

    updateStereo(); // duplicate the left eye to the right eye
}