/**
 * Voices Jam
 * Ryan Bujold
 * 
 * A project using p5.speech
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
    speechRecognizer.continuous = true;
    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();

    robot = new Robot(windowWidth/2,windowHeight/5,200,200,faceImages,wordsJson);

    createCanvas(windowWidth, windowHeight);

    //console.log(speechSynthesizer.listVoices());
    //speechSynthesizer.setVoice(``);
}


/**
 * Display to the canvas every frame
*/
function draw() {
    background(0);

    // Player and robot text display
    fill(255);
    text("Robot: "+robot.speech, width / 3, height / 3);
    text("You: "+playerAnswer, width / 3, height - height / 3);
    // Robot image
    robot.update();
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