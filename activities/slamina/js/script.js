/**
 * Slamina!
 * Ryan Bujold
 * 
 * Guessing the names of animals spelled backwards.
 */

"use strict";

const speechSynthesizer = p5.Speech();
const speechRecognizer = p5.SpeechRec();

let jsonAnimals;
let animals;

let currentAnimal;
let currentAnswer;

let voiceValid = true;

/**
 * Description of preload
*/
function preload() {
    jsonAnimals = loadJSON("assets/data/common.json");
}


/**
 * Description of setup
*/
function setup() {
    animals = jsonAnimals.animals;

    if(speechRecognizer != null && speechSynthesizer != null) {
        speechRecognizer.continuous = true;
        speechRecognizer.onResult = handleSpeechInput();
        speechRecognizer.start();
    }
    else {
        voiceValid = false;
    }

    createCanvas(500,500);
}


/**
 * Description of draw()
*/
function draw() {
    if(currentAnimal == currentAnswer){
        background(0,200,0);
    }
    else {
        background(200,0,0);
    }

    text(currentAnswer,200,250);
}

function mousePressed() {
    currentAnimal = random(animals);
    let reverseAnimal = reverseString(currentAnimal);
    if(voiceValid){
        speechSynthesizer.speak(reverseAnimal);
    }
    else{
        currentAnswer = "ERROR: p5.speech not supported in this browser";
    }
    
}

function handleSpeechInput() {
    let guessedAnimal = "what??";
    if(speechRecognizer.resultValue) {
        let lowerCaseResult = speechRecognizer.resultString.toLowerCase();
        let parts = lowerCaseResult.split(`i think it is `);
        if(parts.length) {
            guessedAnimal = parts[1];
        }
    }
    currentAnswer = guessedAnimal;
    console.log(currentAnswer);
}

/**
Reverses the provided string
*/
function reverseString(string) {
    // Split the string into an array of characters
    let characters = string.split(``);
    // Reverse the array of characters
    let reverseCharacters = characters.reverse();
    // Join the array of characters back into a string
    let result = reverseCharacters.join(``);
    // Return the result
    return result;
}