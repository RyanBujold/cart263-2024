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
        this.layer = map.createLayer(0, tileset, 0, 0); // layer index, tileset, x, y
        this.layer.skipCull = true;

        // Setup the camera
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setZoom(3);

        // Initialize the adventurer
        this.adventurer = new Adventurer(this,32,32);
        this.physics.add.collider(this.adventurer, this.layer);

        // Initialize the dinosaur
        this.dinosaur = new Dinosaur(this,210,32);
        this.physics.add.collider(this.dinosaur, this.layer);

        // Initialize the pigs
        this.time.addEvent({
            delay: 5000, // ms
            callback: this.generateNewPig,
            callbackScope: this,
            loop: true
        });

        // Initialize the fruits
        this.time.addEvent({
            delay: 3000, // ms
            callback: this.generateNewFruit,
            callbackScope: this,
            loop: true
        });

        // Setup keyboard input
        this.keyboardArrows = this.input.keyboard.createCursorKeys();

        // Setup the score tracking variabes
        this.score = 0;
        this.scoreText = this.add.text(20, 200, "SCORE: "+this.score, { font: '"Press Start 2P"' });
    }

    generateNewPig(){
        // Create a new pig
        const random = Phaser.Math.Between(0,2);
        let x;
        let y;
        if(random == 1){
            x = 120;
            y = 88;
        }
        else if(random == 2){
            x = 50;
            y = 150;
        }
        else{
            x = 190;
            y = 150;
        }
        let pig = new Pig(this,x,y);
        this.physics.add.collider(pig, this.layer);
        // Add a timer to change the pigs direction
        this.time.addEvent({
            delay: 1000, // ms
            callback: pig.changeDirection,
            callbackScope: pig,
            loop: true
        });
        // A a collision event with the dinosaur
        this.physics.add.collider(pig, this.dinosaur, pig.defeat, null, pig);
    }

    generateNewFruit(){
        // Create a new fruit
        let x = (16 * Phaser.Math.Between(1, 15)) - 8;
        let y = (16 * Phaser.Math.Between(1, 12)) - 8;
        let fruit = this.physics.add.sprite(x,y,`fruit`);
        this.physics.add.collider(fruit, this.adventurer, this.collectFruit, null, fruit);
        fruit.on('destroy', this.updateScore, this);
    }

    collectFruit(){
        // Destroy the fruit
        this.destroy();
    }

    updateScore(){
        // Update after fruit is collected
        this.score+=10;
        this.scoreText.setText("SCORE: "+this.score);
    }

    update(){
        // Update entities
        this.adventurer.update();
        this.dinosaur.update();
    }
}