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

        // Initialize the pigs
        this.pigGroup = this.add.group();
        this.time.addEvent({
            delay: 5000, // ms
            callback: this.generateNewPig,
            callbackScope: this,
            loop: true
        });

        // Initialize the fruits
        this.fruitGroup = this.add.group();
        this.time.addEvent({
            delay: 3000, // ms
            callback: this.generateNewFruit,
            callbackScope: this,
            loop: true
        });

        // Initialize the adventurer
        this.adventurer = new Adventurer(this,32,32);
        this.physics.add.collider(this.adventurer, this.layer);
        this.physics.add.collider(this.adventurer, this.pigGroup, this.onAdventurerCollidePig, null, this);
        this.physics.add.collider(this.adventurer, this.fruitGroup, this.onAdventurerCollideFruit, null, this);

        // Initialize the dinosaur
        this.dinosaur = new Dinosaur(this,210,32);
        this.physics.add.collider(this.dinosaur, this.layer);
        this.physics.add.collider(this.dinosaur, this.pigGroup, this.onDinosaurCollidePig, null, this);
        this.physics.add.collider(this.dinosaur, this.adventurer, this.onDinosaurCollideAdventurer, null, this);

        // Setup keyboard input
        this.keyboardArrows = this.input.keyboard.createCursorKeys();

        // Setup the score tracking variabes
        this.score = 0;
        this.scoreText = this.add.text(18, 198, "SCORE: "+this.score, { font: '"Press Start 2P"' });
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
        pig.timer = this.time.addEvent({
            delay: 1000, // ms
            callback: pig.changeDirection,
            callbackScope: pig,
            loop: true
        });
        // Add the pig to the group
        this.pigGroup.add(pig);
    }

    generateNewFruit(){
        // Randomize position on the tilemap
        let x = (16 * Phaser.Math.Between(1, 15)) - 8;
        let y = (16 * Phaser.Math.Between(1, 12)) - 8;
        // Create a new fruit
        let fruit = this.physics.add.sprite(x,y,`fruit`);
        // Add the fruit to the group
        this.fruitGroup.add(fruit);
    }

    onAdventurerCollidePig(adventurer,pig){
        // If the pig is alive, game over
        if(pig.isAlive){
            this.scene.start('gameover');
        }
        // If the pig is dead, collect it
        else{
            // update the score
            this.score+=100;
            this.scoreText.setText("SCORE: "+this.score);
            // delete the pig and its time event
            this.pigGroup.remove(pig);
            pig.timer.destroy();
            pig.destroy();
        }

    }

    onDinosaurCollidePig(dinosaur,pig){
        // if the dinosaur collides with a pig, kill the pig
        pig.defeat();
    }

    onDinosaurCollideAdventurer(dinosaur,adventurer){
        console.log("hitings")
        // trigger a game over
        this.scene.start('gameover');
    }

    onAdventurerCollideFruit(adventurer,fruit){
        // Update the score
        this.score+=25;
        this.scoreText.setText("SCORE: "+this.score);
        // delete the fruit
        this.fruitGroup.remove(fruit);
        fruit.destroy();
    }

    update(){
        // Update entities
        this.adventurer.update(this);
        this.dinosaur.update();
    }
}