/**
 * AI Jam - The Crunch
 * Ryan Bujold
 * 
 * A simulation using the face tracker to create a 3d environment.
 * 
 * Sources:
 * - employee spritesheet draw by me
 * - used for calculations https://www.omnicalculator.com/math/line-equation-from-two-points 
 * - office ambience https://pixabay.com/sound-effects/search/office/
 * - bell chime https://freesound.org/people/KeyKrusher/sounds/173000/
 */

"use strict";

// Global Constants
const canvasWidth = 1280;
const canvasHeight = 800;
const totalEmployees = 12;
const employeesPerRow = 4;
const maxFaceShiftHeight = 400;

// Files
let officeMusic;
let bellSFX;
let employeeSpritesheet;

// Globals
let state = "loading";
let facePredictions = [];
let video;
let facemesh;
let faceShift = {
    x:0,
    y:0,
}
let employees = [totalEmployees];

/**
 * Load the files
*/
function preload() {
    // Load sounds
    officeMusic = loadSound("assets/sounds/officeAmbiance.mp3");
    bellSFX = loadSound("assets/sounds/bell.wav");

    // Load images
    employeeSpritesheet = loadImage("assets/images/employeeSpritesheet.png");
}


/**
 * Setup before draw
*/
function setup() {
    createCanvas(canvasWidth,canvasHeight);

    // Setup the face tracking
    video = createCapture(VIDEO);
    video.hide();

    facemesh = ml5.facemesh(video, {}, function() { 
        state = "running"; 
    });
    facemesh.on(`face`, function(results) {
        facePredictions = results;
    });

    // Setup the employees
    for(let i = 0; i < totalEmployees; i++){
        employees[i] = new Employee(employeeSpritesheet);
    }
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

    // Play the background music
    if(!officeMusic.isPlaying()){
        officeMusic.play();
        officeMusic.loop();
    }

    // Perform logic if we can detect a face
    if(facePredictions.length > 0){
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

        // Make sure we can't look over the limit
        if(faceCenter.y < maxFaceShiftHeight){
            faceCenter.y = maxFaceShiftHeight;
        }
        // Create a rectangle for the backdrop
        let rectW = canvasWidth/3;// + facePredictions[0].mesh[0][2] * 5;
        let rectH = canvasHeight/3;// + facePredictions[0].mesh[0][2] * 5;
        let faceRect = {
            x:faceCenter.x - rectW/2,
            y:faceCenter.y - rectH/2,
            w:rectW,
            h:rectH,
        }

        // Draw the shapes
        push()
        // Draw the backdrop rectangle
        noStroke();
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
        fill(80);
        drawRow(2,faceCenter,500,100,220,90,0.7,0.9);
        fill(90);
        drawRow(1,faceCenter,550,150,270,120,0.4,0.7);
        fill(100);
        drawRow(0,faceCenter,600,200,320,150,0.2,0.2);
        pop();
    }

    
}

function mousePressed(){
    // Return if we are still loading
    if(state == "loading"){
        return;
    }

    // If the mouse is pressed on the employee, enter the suprised state
    for(let i = 0; i < employees.length; i++){
        // Break so we only choose one employee to wake up at a time
        if(mouseX > employees[i].x && mouseX < employees[i].x + employees[i].size && mouseY > employees[i].y && mouseY < employees[i].y + employees[i].size){
            employees[i].wakeUp();
            bellSFX.play();
            break;
        }
    }
}

function drawRow(rownum,faceCenter,y,wside,wmiddle,h,xshift,yshift){
    let rowShift = {
        x:(faceCenter.x - canvasWidth/2) * xshift,
        y:(faceCenter.y - canvasHeight/2) * yshift,
    }
    let x1 = (-120*y+76000)/50;
    let x2 = (-25*y+39000)/50;
    let x3 = (70*y+8000)/50;

    x1 = x1+rowShift.x;
    x2 = x2+rowShift.x;
    x3 = x3+rowShift.x;
    let rowy = y+rowShift.y;

    // Draw the rows
    rect(x1,rowy,wside,h);
    rect(x2,rowy,wmiddle,h);
    rect(x3,rowy,wside,h);

    // Update each of the employees positions in the row
    let index = rownum * employeesPerRow;
    let size = 200 - (rownum*50);
    let mspacing = 125 + (rownum*5);
    let empy = rowy-size;
    employees[index].update(x1,empy,size);
    employees[index+1].update(x2,empy,size);
    employees[index+2].update(x2+mspacing,empy,size);
    employees[index+3].update(x3,empy,size);
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