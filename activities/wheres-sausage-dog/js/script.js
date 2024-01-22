/**
 * Where is the sausage dog?
 * Ryan Bujold
 * 
 * TODO description
 */

"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS_TO_DISPLAY = 100;

let animalImages = [];
let animals = [];

let sausageDogImage;
let sausageDog;

/**
 * Load the files
*/
function preload() {
    for(let i = 0; i < NUM_ANIMAL_IMAGES; i++){
        animalImages.push(loadImage(`assets/images/animal${i}.png`));
    }
    sausageDogImage = loadImage("assets/images/sausage-dog.png");
}


/**
 * Setup the files
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    for(let i = 0; i < NUM_ANIMALS_TO_DISPLAY; i++){
        animals.push(new Animal(random(windowWidth),random(windowHeight),random(animalImages)));
    }
    sausageDog = new SausageDog(random(windowWidth),random(windowHeight),sausageDogImage);
}


/**
 * Display the program on the canvas
*/
function draw() {
    background(255);

    for(let i = 0; i < NUM_ANIMALS_TO_DISPLAY; i++){
        animals[i].update();
    }
    sausageDog.update();
}

function mousePressed(){
    sausageDog.mousePressed();
}