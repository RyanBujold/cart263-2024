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
const CANVAS_WIDTH = 1280;
const CANVAS_HEIGHT = 800;
const TOTAL_EMPLOYEES = 12;
const EMPLOYEES_PER_ROW = 4;
const MAX_FACE_SHIFT_HEIGHT = 400;
const MIN_FACE_SHIFT_HEIGHT = 600;
const STATES = {
    LOADING: "loading",
    READY: "ready",
    RUNNING: "running",
    GAMEOVER: "gameover",
}
const PROFIT_LOSS = 80;
const STARTING_MONEY = 100;
const PROFIT_GAIN_PER_WORK = 10;
const GRAPH_POINT_LENGTH = 20;

// Files
let officeMusic;
let bellSFX;
let employeeSpritesheet;

// Globals
let state = STATES.LOADING;
let facePredictions = [];
let video;
let facemesh;
let faceShift = {
    x:0,
    y:0,
}
let employees = [];
let graphValues = [];
let profitTimer = {
    count:0,
    limit:30,
}
let money = STARTING_MONEY;

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
    createCanvas(CANVAS_WIDTH,CANVAS_HEIGHT);

    // Setup the face tracking
    video = createCapture(VIDEO);
    video.hide();

    facemesh = ml5.facemesh(video, {}, function() { 
        state = STATES.READY;
    });
    facemesh.on(`face`, function(results) {
        facePredictions = results;
    });

    // Setup the employees
    for(let i = 0; i < TOTAL_EMPLOYEES; i++){
        employees[i] = new Employee(employeeSpritesheet);
    }

    // Initialize the graph points
    for(let j = 0; j < GRAPH_POINT_LENGTH; j++){
        graphValues[j] = STARTING_MONEY;
    }
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
        case STATES.READY:
            title();
            break;
        case STATES.GAMEOVER:
            gameover();
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


    let faceFound = true;
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
            faceShift.x = CANVAS_WIDTH/2 - faceCenter.x;
            faceShift.y = CANVAS_HEIGHT/2 - faceCenter.y;
        }
        faceCenter.x += faceShift.x;
        faceCenter.y += faceShift.y;

        // Make sure we can't look over the limit
        if(faceCenter.y < MAX_FACE_SHIFT_HEIGHT){
            faceCenter.y = MAX_FACE_SHIFT_HEIGHT;
        }
        // Create a rectangle for the backdrop
        let rectW = CANVAS_WIDTH/3;
        let rectH = CANVAS_HEIGHT/3;
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
        quad(0,0, CANVAS_WIDTH,0, faceRect.x+faceRect.w,faceRect.y, faceRect.x,faceRect.y);//Ceiling
        fill(200);
        quad(0,0, faceRect.x,faceRect.y, faceRect.x,faceRect.y+faceRect.h, 0,CANVAS_HEIGHT);//Left wall
        quad(CANVAS_WIDTH,0, CANVAS_WIDTH,CANVAS_HEIGHT, faceRect.x+faceRect.w,faceRect.y+faceRect.h, faceRect.x+faceRect.w,faceRect.y);//Right wall
        fill(50);
        quad(0,CANVAS_HEIGHT, faceRect.x,faceRect.y+faceRect.h, faceRect.x+faceRect.w,faceRect.y+faceRect.h, CANVAS_WIDTH,CANVAS_HEIGHT);//Floor

        // Rows ordered from back to front
        fill(80);
        drawRow(2,faceCenter,500,100,220,90,0.7,0.9);
        fill(90);
        drawRow(1,faceCenter,550,150,270,120,0.4,0.7);
        fill(100);
        drawRow(0,faceCenter,600,200,320,150,0.2,0.2);
        pop();
    }
    else{
        // If there are no predictions, notify the user something is wrong
        push();
        fill(255);
        textSize(50);
        text("Wake up! Get back to work!",CANVAS_WIDTH/2 - 300,CANVAS_HEIGHT/2);
        fill(200);
        textSize(30);
        text("Camera could not detect face",CANVAS_WIDTH/2 - 200,CANVAS_HEIGHT/2+50);
        pop();

        faceFound = false;
    }

    // Calculate profit
    if(profitTimer.count == profitTimer.limit){
        let profit = 0;
        let numWorking = 0;
        employees.forEach(emp => {
            if(emp.isAwake()){
                numWorking ++;
            }
        });
        profit += numWorking * PROFIT_GAIN_PER_WORK;
        profit -= PROFIT_LOSS;
        // Make sure the playe is penalized for slacking off (face not in camera)
        if(!faceFound){
            profit = -10;
        }
        // Log the profit
        for(let i = 0; i < graphValues.length-1; i++){
            graphValues[i] = graphValues[i+1];
        }
        money += profit;
        graphValues[graphValues.length-1] = money;

        // Check for game over
        if(money <= 0){
            state = STATES.GAMEOVER;
        }
    }

    // Draw a graph
    drawGraph();

    // Update our profit timer
    profitTimer.count++;
    if(profitTimer.count > profitTimer.limit){
        profitTimer.count = 0;
    }
}

function mousePressed(){
    // Return if we are not in the running state
    if(state != STATES.RUNNING){
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

function keyPressed(){
    // Return if we are not in the title state
    if(state != STATES.READY){
        return;
    }

    // If we press enter, change state
    if(keyCode === ENTER){
        state = STATES.RUNNING;
    }
}

function drawRow(rownum,faceCenter,y,wside,wmiddle,h,xshift,yshift){
    let rowShift = {
        x:(faceCenter.x - CANVAS_WIDTH/2) * xshift,
        y:(faceCenter.y - CANVAS_HEIGHT/2) * yshift,
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
    let index = rownum * EMPLOYEES_PER_ROW;
    let size = 200 - (rownum*50);
    let mspacing = 125 + (rownum*5);
    let empy = rowy-size;
    employees[index].update(x1,empy,size);
    employees[index+1].update(x2,empy,size);
    employees[index+2].update(x2+mspacing,empy,size);
    employees[index+3].update(x3,empy,size);
}

function drawGraph(){
    const GRAPH_SIZE = 250;
    const PADDING = 20;
    const GRAPH = {
        X: CANVAS_WIDTH-GRAPH_SIZE-PADDING,
        Y: PADDING,
        W: GRAPH_SIZE,
        H: GRAPH_SIZE,
    }
    const GAIN_LOSS = graphValues[graphValues.length-1]-graphValues[graphValues.length-2];

    push();
    // Draw background
    fill(0);
    rect(GRAPH.X,GRAPH.Y,GRAPH.W,GRAPH.H);
    // Decide the graph color
    if(GAIN_LOSS >= 0){
        stroke(0,200,0);
        fill(0,200,0);
    }
    else{
        stroke(200,0,0);
        fill(200,0,0);
    }
    // Draw graph lines
    let points = [graphValues.length];
    for(let i = 0; i < graphValues.length-1; i++){
        points[i] = GRAPH.Y+GRAPH_SIZE-graphValues[i]/5;
        if(points[i] < GRAPH.Y+PADDING){
            points[i] = GRAPH.Y+PADDING;
        }
        if(points[i] > GRAPH.Y+GRAPH_SIZE-PADDING){
            points[i] = GRAPH.Y+GRAPH_SIZE-PADDING;
        }
    }
    for(let j = 0; j < graphValues.length-1; j++){
        if(j != 0){
            line(GRAPH.X+GRAPH_SIZE*(j/(graphValues.length+1)),points[j], GRAPH.X+GRAPH_SIZE*((j+1)/(graphValues.length+1)),points[j+1]);
        }
        else{
            line(GRAPH.X,points[j], GRAPH.X+GRAPH_SIZE*((j+1)/(graphValues.length+1)),points[j+1]);
        }
    }
    // Draw current money value
    textSize(20);
    text("Money:"+graphValues[graphValues.length-1]+"$ | Gain/Loss:"+GAIN_LOSS+"$",GRAPH.X-PADDING,GRAPH.Y+GRAPH_SIZE+PADDING);
    pop();
}

function loading(){
    background(0);
    // Draw the loading text
    push();
    fill(255);
    textSize(50);
    text("loading...",CANVAS_WIDTH/2 - 100,CANVAS_HEIGHT/2);
    fill(200);
    textSize(30);
    text("*start with your face in the center of your camera to ease calibration*",CANVAS_WIDTH/2 - 450, CANVAS_HEIGHT/2 + 100)
    pop();
}

function gameover(){
    background(255);

    // If the ambiance is playing, stop it
    if(officeMusic.isPlaying()){
        officeMusic.stop();
    }

    // Draw the game over text
    push();
    fill(225,0,0);
    textSize(50);
    text("MASS LAYOFF\nYOU ARE FIRED\nGAME OVER",CANVAS_WIDTH/2 - 200,CANVAS_HEIGHT/2);
    pop();
}

function title(){
    background(100);
    // Draw the user's face 
    if(facePredictions.length > 0){
        const faceScale = 5;
        push();
        fill(0,200,0);
        noStroke();
        ellipseMode(CENTER);
        facePredictions[0].mesh.forEach(point => {
            ellipse((point[0]*faceScale)+200,(point[1]*faceScale)-100, 5);
        });
        pop();
    }
    // Draw the title screen
    push();
    stroke(10);
    fill(255);
    textSize(50);
    text("The Crunch",CANVAS_WIDTH/2 - 200,CANVAS_HEIGHT/2);
    textSize(40);
    text("press enter to continue",CANVAS_WIDTH/2 - 100,CANVAS_HEIGHT/2 + 30);
    pop();
}