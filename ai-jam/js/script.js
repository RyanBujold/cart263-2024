/**
 * AI Jam
 * Ryan Bujold
 * 
 * TODO
 */

"use strict";

let facePredictions = [];
let handPredictions = [];
let video1;
let video2;
let facemesh;
let handpose;

/**
 * Description of preload
*/
function preload() {

}


/**
 * Description of setup
*/
function setup() {
    createCanvas(800,800);

    video1 = createCapture(VIDEO);
    video1.hide();

    video2 = createCapture(VIDEO);
    video2.hide();

    facemesh = ml5.facemesh(video1, {}, function() { console.log("face model loaded!"); });
    facemesh.on(`face`, function(results) {
        facePredictions = results;
    });

    handpose = ml5.handpose(video2, {}, function() { console.log("hand model loaded!"); })
    handpose.on(`hand`, function(results) {
        handPredictions = results;
    });
}


/**
 * Description of draw()
*/
function draw() {
    background(10);

    if(facePredictions.length > 0){
        fill(200,0,0);
        ellipseMode(CENTER);
        facePredictions[0].mesh.forEach(point => {
            ellipse(point[0],point[1], 5);
        });

        let box = facePredictions[0].boundingBox.topLeft[0];
        let centerP = [400 + box[0],400 + box[1]];
        push()
        fill(0,150,0);
        ellipse(centerP[0],centerP[1],5);
        stroke(0,150,0);
        line(10,10,centerP[0],centerP[1]);
        line(800,0,centerP[0],centerP[1]);
        line(0,800,centerP[0],centerP[1]);
        line(800,800,centerP[0],centerP[1]);
        pop();
    }

    if(handPredictions.length > 0){
        fill(0,0,200);
        ellipseMode(CENTER);
        handPredictions[0].landmarks.forEach(point => {
            ellipse(point[0],point[1], 5);
        });
    }
    
}