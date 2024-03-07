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
    scene: [Boot,Test]
};

let game = new Phaser.Game(config);