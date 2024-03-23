/**
 * Final Project Prototype
 * Ryan Bujold
 * 
 */

"use strict";

// Global Constants
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 800;
const STATES = {
    LOADING: "loading",
    RUNNING: "running",
}
const LEVEL_1 = new Level1();

// Files

// Globals
let currentLevel;
let state = STATES.LOADING;
let predictions = [];
let video;
let handpose;

/**
 * Load the files
*/
function preload() {
    
}


/**
 * Setup before draw
*/
function setup() {
    createCanvas(windowWidth,windowHeight);

    // Start the handpose tracking
    video = createCapture(VIDEO);
    video.hide();

    handpose = ml5.handpose(video, {}, function() { 
        state = STATES.RUNNING;
    });
    handpose.on(`hand`, function(results) {
        predictions = results;
    });

    // Start on the first level
    currentLevel = LEVEL_1;
}


/**
 * Draw to canvas every frame
*/
function draw() {
    // Run the appropriate running state
    switch(state){
        case STATES.RUNNING:
            running();
            break;
        case STATES.LOADING:
            loading();
            break;
        default:
            console.log("ERROR: state variable not set correctly.");
            break;
    }
}

function running(){
    background(50);

    currentLevel.update();
}

function loading(){
    background(0);
    // Draw the loading text
    push();
    fill(255);
    textSize(50);
    text("loading...",CANVAS_WIDTH/2 - 100,CANVAS_HEIGHT/2);
    pop();
}

function mouseMoved(){
    currentLevel.mouseMoved();
}