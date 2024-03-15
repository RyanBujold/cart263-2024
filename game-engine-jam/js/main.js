/**
 * A phaser 3 game
 * 
 * Sources:
 * - tilemap https://github.com/phaserjs/examples/blob/master/public/src/tilemap/collision/csv%20map%20arcade%20physics.js
 * - timer https://github.com/phaserjs/examples/blob/master/public/src/time/looped%20event.js
 * - gameobject class https://blog.ourcade.co/posts/2020/organize-phaser-3-code-game-object-factory-methods/
 * - collision events https://www.thepolyglotdeveloper.com/2020/08/handle-collisions-between-sprites-phaser-arcade-physics/
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