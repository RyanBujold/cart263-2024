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
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);

    video = createCapture(VIDEO);
    video.hide();

    handpose = ml5.handpose(video, {}, function() { 
        state = STATES.RUNNING;
    });
    handpose.on(`hand`, function(results) {
        predictions = results;
    });
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
    if(predictions.length > 0){
        fill(0,0,200);
        ellipseMode(CENTER);
        predictions[0].landmarks.forEach(point => {
            ellipse(point[0],point[1],10);
        });
    }
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