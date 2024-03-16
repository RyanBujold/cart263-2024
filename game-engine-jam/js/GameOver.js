class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: `gameover`
        });
    }

    create(){
        this.add.text(config.width / 2, config.height / 2, "GAME OVER",{font: '"Press Start 2P"' , fill: '#d10808'});
    }
}