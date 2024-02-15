/**
 * AI Jam
 * Ryan Bujold
 * 
 * TODO
 */

"use strict";

let predictions = [];
let video;
let facemesh;

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

    video = createCapture(VIDEO);
    video.hide();

    facemesh = ml5.facemesh(video, {}, function() { console.log("model loaded!"); });
    facemesh.on(`face`, function(results) {
        predictions = results;
    });

}


/**
 * Description of draw()
*/
function draw() {
    background(10);

    if(predictions.length > 0){
        fill(200,0,0);
        ellipseMode(CENTER);
        predictions[0].mesh.forEach(point => {
            ellipse(point[0],point[1], 5);
        });

        let box = predictions[0].boundingBox.topLeft[0];
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
    
}