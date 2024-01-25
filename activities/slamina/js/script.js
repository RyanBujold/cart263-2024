/**
 * Slamina!
 * Ryan Bujold
 * 
 * Guessing the names of animals spelled backwards.
 */

"use strict";

let jsonAnimals;
let animals;

let currentAnimal;

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

}


/**
 * Description of draw()
*/
function draw() {

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