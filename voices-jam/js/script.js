/**
 * Voices Jam
 * Ryan Bujold
 * 
 * A project using p5.speech
 */

"use strict";

const speechSynthesizer = new p5.Speech();
const speechRecognizer = new p5.SpeechRec();

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
    speechRecognizer.onResult = handleSpeechInput();
    speechRecognizer.start();

    createCanvas(windowWidth, windowHeight)
}


/**
 * Display to the canvas every frame
*/
function draw() {

}