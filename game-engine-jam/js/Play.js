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

        // Initialize the adventurer
        this.adventurer = new Adventurer(this,32,32);
        this.physics.add.collider(this.adventurer, layer);

        // Initialize the dinosaur
        this.dinosaur = new Dinosaur(this,100,32);
        this.physics.add.collider(this.dinosaur, layer);
        this.dinoTimeEvent = this.time.addEvent({
            delay: 1000, // ms
            callback: this.dinosaur.changeDinoDirection,
            callbackScope: this.dinosaur,
            loop: true
        });

        // Initialize the meat
        this.meat = this.physics.add.sprite(150,32,`meat`);

        // Setup keyboard input
        this.keyboardArrows = this.input.keyboard.createCursorKeys();
    }

    update(){
        // Handle keyboard input
        this.adventurer.update();
    }
}