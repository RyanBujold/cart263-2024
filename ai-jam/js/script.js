/**
 * AI Jam
 * Ryan Bujold
 * 
 * TODO
 */

"use strict";

const canvasWidth = 1280;
const canvasHeight = 800;

let state = "loading";
let facePredictions = [];
let video;
let facemesh;
let faceShift = {
    x:0,
    y:0,
}

/**
 * Load the files
*/
function preload() {

}


/**
 * Setup before draw
*/
function setup() {
    createCanvas(canvasWidth,canvasHeight);

    video = createCapture(VIDEO);
    video.hide();

    facemesh = ml5.facemesh(video, {}, function() { 
        state = "running"; 
    });
    facemesh.on(`face`, function(results) {
        facePredictions = results;
    });
}


/**
 * Draw to canvas every frame
*/
function draw() {
    // Run the appropriate running state
    switch(state){
        case "running":
            running();
            break;
        case "loading":
            loading();
            break;
        default:
            console.log("ERROR: state variable not set correctly.");
            break;
    }
}

function running(){
    background(0);

    if(facePredictions.length > 0){
        // Draw a model of the face we are seeing
        // Make sure every point is blue except the first one
        fill(200,0,0);
        ellipseMode(CENTER);
        facePredictions[0].mesh.forEach(point => {
            ellipse(point[0],point[1], 5);
            fill(0,0,200);
        });

        // Find the center of the face
        let box = facePredictions[0].boundingBox;
        let faceCenter = {
            x:box.topLeft[0][0] + box.bottomRight[0][0]/2, 
            y:box.topLeft[0][1] + box.bottomRight[0][1]/2,
        };
        // Calibrate the center point to the center of the canvas
        if(faceShift.x == 0 || faceShift.y == 0){
            faceShift.x = canvasWidth/2 - faceCenter.x;
            faceShift.y = canvasHeight/2 - faceCenter.y;
        }
        faceCenter.x += faceShift.x;
        faceCenter.y += faceShift.y;

        // Create a rectangle for the backdrop
        let rectW = canvasWidth/3 + facePredictions[0].mesh[0][2] * 5;
        let rectH = canvasHeight/3 + facePredictions[0].mesh[0][2] * 5;
        let faceRect = {
            x:faceCenter.x - rectW/2,
            y:faceCenter.y - rectH/2,
            w:rectW,
            h:rectH,
        }

        // Draw the shapes
        push()
        // Draw the backdrop rectangle
        stroke(0,150,0);
        fill(150);
        rect(faceRect.x,faceRect.y,faceRect.w,faceRect.h);
        // Draw the walls and ceiling
        fill(100);
        quad(0,0, canvasWidth,0, faceRect.x+faceRect.w,faceRect.y, faceRect.x,faceRect.y);//Ceiling
        fill(200);
        quad(0,0, faceRect.x,faceRect.y, faceRect.x,faceRect.y+faceRect.h, 0,canvasHeight);//Left wall
        quad(canvasWidth,0, canvasWidth,canvasHeight, faceRect.x+faceRect.w,faceRect.y+faceRect.h, faceRect.x+faceRect.w,faceRect.y);//Right wall
        fill(50);
        quad(0,canvasHeight, faceRect.x,faceRect.y+faceRect.h, faceRect.x+faceRect.w,faceRect.y+faceRect.h, canvasWidth,canvasHeight);//Floor

        // Draw perspective lines to the backdrop from the corners
        line(0,0,faceRect.x,faceRect.y);
        line(canvasWidth,0,faceRect.x+faceRect.w,faceRect.y);
        line(0,canvasHeight,faceRect.x,faceRect.y+faceRect.h);
        line(canvasWidth,canvasHeight,faceRect.x+faceRect.w,faceRect.y+faceRect.h);
        // Draw the center point
        fill(0,150,0);
        ellipse(faceCenter.x,faceCenter.y,5);

        // Rows ordered from back to front
        noStroke();
        let rowShift;
        // Row 2
        fill(90,90,90,50);
        rowShift = {
            x:(faceCenter.x - canvasWidth/2) * 0.4,
            y:(faceCenter.y - canvasHeight/2) * 0.6,
        }
        rect(200+rowShift.x,550+rowShift.y,150,120);
        rect(505+rowShift.x,550+rowShift.y,270,120);
        rect(930+rowShift.x,550+rowShift.y,150,120);
        // Row 1
        fill(100,100,100,50);
        rowShift = {
            x:(faceCenter.x - canvasWidth/2) * 0.2,
            y:(faceCenter.y - canvasHeight/2) * 0.2,
        }
        rect(80+rowShift.x,600+rowShift.y,200,150);
        rect(480+rowShift.x,600+rowShift.y,320,150);
        rect(1000+rowShift.x,600+rowShift.y,200,150);

        pop();
    }
}

function loading(){
    background(0);
    // Draw the loading text
    push();
    fill(255);
    textSize(50);
    text("loading...",canvasWidth/2 - 100,canvasHeight/2);
    pop();
}