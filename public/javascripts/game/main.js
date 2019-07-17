/// <reference path="../p5/p5.global-mode.d.ts" />

// public variables
let WIDTH, HEIGHT, EYES;
let CURR_SCENE = 0;

let FRAMERATE = 60;
let TIMER;

let loadingJson;
let scoreboard;

let background_music;

let scenes = [new TheStartScene(), new TheGameScene(), new TheEndScene()];

// loading game assets
function preload() {
    loadingJson = loadJSON("/scoreboard");

    background_music = loadSound("/assets/background/Light-Years.mp3")

    scenes[0].load();
    scenes[1].load();
    scenes[2].load();

}

function setup() {
    EYES = 75
    WIDTH = 400 //((windowWidth / 2) - EYES)
    HEIGHT = 650 //windowHeight - 10;

    //parse the JSON response from database
    scoreboard = loadingJson.data.sort((a, b) => b.score - a.score);

    createCanvas(WIDTH, HEIGHT, 'webgl');

    scenes[0].init(WIDTH, HEIGHT, EYES);
    scenes[1].init(WIDTH, HEIGHT, EYES);
    scenes[2].init(WIDTH, HEIGHT, EYES);

    frameRate(FRAMERATE);
    background_music.setLoop(true);
    background_music.setVolume(0.5);
    background_music.play();

    collideDebug(false);
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