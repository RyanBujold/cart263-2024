/**
 * AI Jam
 * Ryan Bujold
 * 
 * TODO
 * 
 * Sources:
 * - employee spritesheet draw by me
 * - used for calculations https://www.omnicalculator.com/math/line-equation-from-two-points 
 * - office ambience https://pixabay.com/sound-effects/search/office/
 * - bell chime https://freesound.org/people/KeyKrusher/sounds/173000/
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

        // Rows ordered from back to front
        noStroke();
        fill(80);
        drawRow(faceCenter,500,100,220,90,0.7,0.9);
        fill(90);
        drawRow(faceCenter,550,150,270,120,0.4,0.7);
        fill(100);
        drawRow(faceCenter,600,200,320,150,0.2,0.2);

        pop();
    }
}

function drawRow(faceCenter,y,wside,wmiddle,h,xshift,yshift){
    let rowShift = {
        x:(faceCenter.x - canvasWidth/2) * xshift,
        y:(faceCenter.y - canvasHeight/2) * yshift,
    }
    let x1 = (-120*y+76000)/50;
    let x2 = (-25*y+39000)/50;
    let x3 = (70*y+8000)/50;

    rect(x1+rowShift.x,y+rowShift.y,wside,h);
    rect(x2+rowShift.x,y+rowShift.y,wmiddle,h);
    rect(x3+rowShift.x,y+rowShift.y,wside,h);
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