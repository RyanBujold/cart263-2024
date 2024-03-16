class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: `gameover`
        });
    }

    init (data){
        this.score = data.score;
    }

    create(){
        this.cameras.main.setZoom(3);

        this.add.text(config.width / 2 - 45, config.height / 2 - 20, 'GAME OVER',{font: '"Press Start 2P"', fill: '#d10808'});
        this.add.text(config.width / 2 - 45, config.height / 2, 'FINAL SCORE: '+this.score, { font: '"Press Start 2P"' });
    }
}