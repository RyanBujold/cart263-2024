/**
 * A phaser 3 game
 * 
 * Sources:
 * - tilemap https://github.com/phaserjs/examples/blob/master/public/src/tilemap/collision/csv%20map%20arcade%20physics.js
 * - timer https://github.com/phaserjs/examples/blob/master/public/src/time/looped%20event.js
 * - gameobject class https://blog.ourcade.co/posts/2020/organize-phaser-3-code-game-object-factory-methods/
 * - collision events https://www.thepolyglotdeveloper.com/2020/08/handle-collisions-between-sprites-phaser-arcade-physics/
 * - center game canvas https://stackoverflow.com/questions/51309375/how-do-i-move-phaser-game-to-the-center-of-a-browser
 * - text https://newdocs.phaser.io/docs/3.80.0/Phaser.GameObjects.Text
 */

"use strict";

// Configuring the game
let config = {
    type: Phaser.AUTO,
    width: 720,
    height: 650,
    physics: {
        default: `arcade`
    },
    pixelArt: true,
    scene: [Boot,Play]
};

let game = new Phaser.Game(config);