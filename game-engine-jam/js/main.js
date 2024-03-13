/**
 * A phaser 3 game
 * 
 * Sources:
 * - https://github.com/phaserjs/examples/blob/master/public/src/tilemap/collision/csv%20map%20arcade%20physics.js
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