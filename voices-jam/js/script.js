/**
 * Voices Jam
 * Ryan Bujold
 * 
 * A project using p5.speech. The player converses with a robot and 
 * plays games of rock paper scissors.
 */

"use strict";

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();
const imagePath = "assets/images/";
const jsonPath = "assets/data/";

let playerAnswer = "waiting...";

let robot;
let faceImages;
let wordsJson;

let currentState = "title";

/**
 * Preload the files
*/
function preload() {
    faceImages = {
        neutral:loadImage(imagePath+"neutralFace.jpg"),
        happy:loadImage(imagePath+"happyFace.jpg"),
        angry:loadImage(imagePath+"angryFace.jpg"),
        smiling:loadImage(imagePath+"smilingFace.jpg"),
        obey:loadImage(imagePath+"obeyFace.jpg"),
    }
    wordsJson = loadJSON(jsonPath+"robotWords.JSON");
}


/**
 * Setup the canvas before looping draw
*/
function setup() {
    speechSynthesizer.setPitch(1.2);

    speechRecognizer.continuous = true;
    speechRecognizer.onResult = handleSpeechInput;

    robot = new Robot(windowWidth/2,windowHeight/5,200,200,faceImages,wordsJson);

    createCanvas(windowWidth, windowHeight);

}


/**
 * Display to the canvas every frame
*/
function draw() {
    background(0);

    switch(currentState){
        case "title":
            titleState();
            break;
        case "game":
            gameState();
            break;
        default:
            console.log("ERROR: something went wrong!");
            break;
    }
}

function titleState(){
    // Display the title
    fill(150,0,0);
    textSize(100);
    text("OBEY", width / 3, 400);
    fill(255);
    textSize(50);
    text("press enter to start", width / 3, 500);
}

function gameState(){
    // Player and robot text display
    fill(255);
    textSize(30);
    text("Robot: "+robot.speech, width / 3 - robot.speech.length*2, height / 3);
    text("You: "+playerAnswer, width / 3 - playerAnswer.length*2, height - height / 3);
    // Show some instructions for the player
    fill(200);
    textSize(20);
    text("Help:\n- say hello\n- ask 'how to play'\n- try stuff out!\n- obey", 10, 50);
    // Robot image
    robot.update();
    // Change the robot's voice if we are in obey mode
    if(robot.obey){
        speechSynthesizer.setVoice(`Google italiano`);
        speechSynthesizer.setPitch(0.2);
    }
}

function changeState(newState){
    // Start the speech recognizer when we change to the game state
    if(newState == "game"){
        speechRecognizer.start();
    }
    currentState = newState;
}

function keyPressed() {
    // If we press enter on the title state, change state
    if(keyCode == ENTER && currentState == "title"){
        changeState("game");
    }
}

function handleSpeechInput() {
    // Save the string of what the recognizer heard
    playerAnswer = speechRecognizer.resultString;

    // Seperate the speach into an array of lower case words
    let lowerCaseText = speechRecognizer.resultString.toLowerCase();
    let wordArray = lowerCaseText.split(` `);

    // Get the robot to talk
    robot.decideSpeech(wordArray);
    speechSynthesizer.speak(robot.speech);
}