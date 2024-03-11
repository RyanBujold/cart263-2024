class Play extends Phaser.Scene {
    constructor() {
        super({
            key: `play`
        });
    }

    create(){
        // Initialize the tile map
        const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
        // Set the collision tiles for the tilemap
        map.setCollision([0,1,2,3,4,5,6,7,8,9,10,11,16,17,18,19,20,21,22,23]);
        const tileset = map.addTilesetImage('tiles');
        const layer = map.createLayer(0, tileset, 0, 0); // layer index, tileset, x, y
        layer.skipCull = true;

        // Setup the camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(3);

        // Initialize the player
        this.clown = this.physics.add.sprite(32,32,`clown`);
        this.clown.setDisplaySize(16,16);
        this.physics.add.collider(this.clown, layer);

        this.keyboardArrows = this.input.keyboard.createCursorKeys();
    }

    update(){
        this.handleInput();
    }

    handleInput() {
        let moveSpeed = 50;

        if(this.keyboardArrows.right.isDown){
            this.clown.setVelocity(moveSpeed,0);
        }
        else if(this.keyboardArrows.left.isDown){
            this.clown.setVelocity(-moveSpeed,0);
        }
        else if(this.keyboardArrows.up.isDown){
            this.clown.setVelocity(0,-moveSpeed);
        }
        else if(this.keyboardArrows.down.isDown){
            this.clown.setVelocity(0,moveSpeed);
        }
        else{
            this.clown.setVelocity(0);
        }
    }
}