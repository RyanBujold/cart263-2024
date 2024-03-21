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

// Files

// Globals
let state = STATES.LOADING;
let facePredictions = [];
let video;
let facemesh;

/**
 * Load the files
*/
function preload() {
    // Load sounds

    // Load images
    
}


/**
 * Setup before draw
*/
function setup() {
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);

    // Setup the face tracking
    video = createCapture(VIDEO);
    video.hide();

    // facemesh = ml5.facemesh(video, {}, function() { 
    //     state = STATES.READY;
    // });
    // facemesh.on(`face`, function(results) {
    //     facePredictions = results;
    // });
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
    background(0);

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