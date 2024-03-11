/**
 * 
 */

"use strict";

// Configuring the game
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: `arcade`
    },
    pixelArt: true,
    scene: [Boot,Play]
};

let game = new Phaser.Game(config);