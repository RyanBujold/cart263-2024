class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    create(){
        const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage('tiles');
        const layer = map.createLayer(0, tileset, 0, 0); // layer index, tileset, x, y
        layer.skipCull = true;

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


        //this.clown = this.physics.add.sprite(100,100,`clown`);

        //this.keyboardArrows = this.input.keyboard.createCursorKeys();
    }

    update(){
        //this.handleInput();
    }

    handleInput() {
        if(this.keyboardArrows.left.isDown){
            this.clown.setVelocity(10);
        }
        else{
            this.clown.setVelocity(0);
        }
    }
}