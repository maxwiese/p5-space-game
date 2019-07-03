/// <reference path="../p5/p5.global-mode.d.ts" />

// public variables
let WIDTH, HEIGHT, EYES;
let CURR_SCENE = 0;
let isFullscreen = false;

let FRAMERATE = 60;

let scenes = [new TheStartScene(), new TheGameScene(), new TheEndScene()];

// loading game assets
function preload() {
    scenes[0].load();
    scenes[1].load();
    scenes[2].load();
}

function setup() {
    EYES = 75
    WIDTH = ((windowWidth / 2) - EYES)
    HEIGHT = windowHeight - 10;

    createCanvas(WIDTH, HEIGHT, 'webgl');

    scenes[0].init(WIDTH, HEIGHT, EYES);
    scenes[1].init(WIDTH, HEIGHT, EYES);
    scenes[2].init(WIDTH, HEIGHT, EYES);

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
            scenes[1].loop();
            break;
        case 2:
            scenes[2].loop();
            break;
        default:
            break;
    }


}