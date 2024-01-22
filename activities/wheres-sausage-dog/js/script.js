/**
 * Where is the sausage dog?
 * Ryan Bujold
 * 
 * TODO description
 */

"use strict";

const NUM_ANIMAL_IMAGES = 10;
const NUM_ANIMALS_TO_DISPLAY = 100;
const ANIMAL_IMAGE_PREFIX = "assets/images/animal";
const SAUSAGE_DOG_IMAGE_PREFIX = "assets/images/sausage-dog.png";

let animalImages = [];
let animals = [];

let sausageDogImage;
let sausageDog;

/**
 * Load the files
*/
function preload() {
    for(let i = 0; i < NUM_ANIMAL_IMAGES; i++){
        animalImages.push(loadImage(`${ANIMAL_IMAGE_PREFIX}${i}.png`));
    }
    sausageDogImage = loadImage(SAUSAGE_DOG_IMAGE_PREFIX);
}


/**
 * Setup the files
*/
function setup() {
    createCanvas(windowWidth, windowHeight);

    createAnimals();    
    createSausageDog();
}


/**
 * Display the program on the canvas
*/
function draw() {
    background(255);

    updateAnimals();
    updateSausageDog();
}

function updateAnimals(){
    for(let i = 0; i < NUM_ANIMALS_TO_DISPLAY; i++){
        animals[i].update();
    }
}

function updateSausageDog(){
    sausageDog.update();
}

function mousePressed(){
    sausageDog.mousePressed();
}

function createAnimals(){
    for(let i = 0; i < NUM_ANIMALS_TO_DISPLAY; i++){
        animals.push(createRandomAnimal());
    }
}

function createSausageDog(){
    sausageDog = new SausageDog(random(windowWidth),random(windowHeight),sausageDogImage);
}

function createRandomAnimal(){
    return new Animal(random(windowWidth),random(windowHeight),random(animalImages))
}