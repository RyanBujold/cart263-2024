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
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('adventurer', { start: 4, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('adventurer', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('adventurer', { start: 7, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('adventurer', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('adventurer', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.adventurer = this.physics.add.sprite(32,32,`adventurer`,0);
        this.physics.add.collider(this.adventurer, layer);

        // Setup keyboard input
        this.keyboardArrows = this.input.keyboard.createCursorKeys();
    }

    update(){
        this.handleInput();
    }

    handleInput() {
        const moveSpeed = 50;
        const keys = this.keyboardArrows;

        if(keys.right.isDown && !keys.left.isDown && !keys.up.isDown && !keys.down.isDown){
            this.adventurer.setVelocity(moveSpeed,0);
            this.adventurer.anims.play('right', true);
        }
        else if(keys.left.isDown && !keys.right.isDown && !keys.up.isDown && !keys.down.isDown){
            this.adventurer.setVelocity(-moveSpeed,0);
            this.adventurer.anims.play('left', true);
        }
        if(keys.up.isDown && !keys.down.isDown && !keys.right.isDown && !keys.left.isDown){
            this.adventurer.setVelocity(0,-moveSpeed);
            this.adventurer.anims.play('up', true);
        }
        else if(keys.down.isDown && !keys.up.isDown && !keys.right.isDown && !keys.left.isDown){
            this.adventurer.setVelocity(0,moveSpeed);
            this.adventurer.anims.play('down', true);
        }
        if(!keys.right.isDown && !keys.left.isDown && !keys.up.isDown && !keys.down.isDown){
            this.adventurer.setVelocity(0);
            this.adventurer.anims.play('idle', true);
        }
    }
}