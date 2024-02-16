/**
 * AI Jam
 * Ryan Bujold
 * 
 * TODO
 */

"use strict";

let facePredictions = [];
//let handPredictions = [];
let video1;
//let video2;
let facemesh;
//let handpose;
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
    createCanvas(windowWidth,windowHeight);

    video1 = createCapture(VIDEO);
    video1.hide();

    //video2 = createCapture(VIDEO);
    //video2.hide();

    facemesh = ml5.facemesh(video1, {}, function() { console.log("face model loaded!"); });
    facemesh.on(`face`, function(results) {
        facePredictions = results;
    });

    // handpose = ml5.handpose(video2, {}, function() { console.log("hand model loaded!"); })
    // handpose.on(`hand`, function(results) {
    //     handPredictions = results;
    // });
}


/**
 * Draw to canvas every frame
*/
function draw() {
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
            faceShift.x = windowWidth/2 - faceCenter.x;
            faceShift.y = windowHeight/2 - faceCenter.y;
        }
        faceCenter.x += faceShift.x;
        faceCenter.y += faceShift.y;

        // Create a rectangle for the backdrop
        let rectW = windowWidth/3 + facePredictions[0].mesh[0][2] * 5;
        let rectH = windowHeight/3 + facePredictions[0].mesh[0][2] * 5;
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
        fill(0);
        rect(faceRect.x,faceRect.y,faceRect.w,faceRect.h);
        // Draw perspective lines to the backdrop from the corners
        line(0,0,faceRect.x,faceRect.y);
        line(windowWidth,0,faceRect.x+faceRect.w,faceRect.y);
        line(0,windowHeight,faceRect.x,faceRect.y+faceRect.h);
        line(windowWidth,windowHeight,faceRect.x+faceRect.w,faceRect.y+faceRect.h);
        // Draw the center point
        fill(0,150,0);
        ellipse(faceCenter.x,faceCenter.y,5);
        pop();
    }

    // if(handPredictions.length > 0){
    //     fill(0,0,200);
    //     ellipseMode(CENTER);
    //     handPredictions[0].landmarks.forEach(point => {
    //         ellipse(point[0],point[1], 5);
    //     });
    // }
    
}