/**
 * Voices Jam
 * Ryan Bujold
 * 
 * A project using p5.speech
 */

"use strict";

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

let playerAnswer = "waiting...";
let robotSpeech = "lets play rock, paper, scissors. You go first";

/**
 * Preload the files
*/
function preload() {
    
}


/**
 * Setup the canvas before looping draw
*/
function setup() {
    speechRecognizer.continuous = true;
    speechRecognizer.onResult = handleSpeechInput;
    speechRecognizer.start();

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
    text("Robot: "+robotSpeech, width / 3, height / 3);
    text("You: "+playerAnswer, width / 3, height - height / 3);
}

function handleSpeechInput() {
    // Save the string of what the recognizer heard
    playerAnswer = speechRecognizer.resultString;

    // Seperate the speach into an array of lower case words
    let lowerCaseText = speechRecognizer.resultString.toLowerCase();
    let wordArray = lowerCaseText.split(` `);

    // Get the robot to talk
    robotSpeech = decideRobotSpeach(wordArray);
    speechSynthesizer.speak(robotSpeech);
}

function decideRobotSpeach(wordArray) {
     // Keep track of the number of times each type of key word is uttered
     let tracker = {
        rock:0,
        paper:0,
        scissors:0,
        greetings:0,
        profanity:0,
    }
    for(let i = 0; i < wordArray.length; i++){
        switch(wordArray[i]){
            case "rock":
                tracker.rock++;
                break;
            case "paper":
                tracker.paper++;
                break;
            case "scissors":
                tracker.scissors++;
                break;
            case "hello":
                tracker.greetings++;
                break;
            case "stupid":
                tracker.profanity++;
        }
    }

    // Robot decides what to say
    let speech = "";
    // Check for greetings
    if(tracker.greetings > 0){
        speech += "hello. "
    }
    // Check for profanity
    if(tracker.profanity > 0){
        speech += "its only a game. why do you have to be mad? ";
    }
    // Check the rock paper scissors
    if(tracker.rock > 0 && tracker.paper == 0 && tracker.scissors == 0){
        speech += "paper. ";
    }
    else if(tracker.paper > 0 && tracker.rock == 0 && tracker.scissors == 0){
        speech += "scissors. ";
    }
    else if(tracker.scissors > 0 && tracker.rock == 0 && tracker.paper == 0){
        speech += "rock. ";
    }
    else if(tracker.rock > 0 || tracker.paper > 0 || tracker.scissors > 0){
        speech += "please choose either rock, paper or scissors."
    }
    // If the robot cannot decide what to say, the say this
    if(speech.length == 0){
        speech = "I didn't understand that."
    }

    // Return the completed speech
    return speech;
}