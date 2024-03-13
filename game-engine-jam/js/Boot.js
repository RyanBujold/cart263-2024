class Boot extends Phaser.Scene {
    constructor() {
        super({
          key: `boot`
        });
    }
    
    preload() {
        // Load tilemap files
        this.load.tilemapCSV('map', 'assets/tilemap.csv');
        this.load.image('tiles', 'assets/images/tilemap.png');
        // Load character spritesheets
        this.load.spritesheet(`adventurer`,`assets/images/adventurer.png`, { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet(`dinosaur`,`assets/images/dinosaur.png`, { frameWidth: 16, frameHeight: 16 });
        // Load images
        this.load.image('meat','assets/images/meat.png');
    }

    create() {
        // NOTE: Adding a loading message to the scene on creation
        let loadingTextStyle = {
            fontFamily: "sans-serif",
            fontSize: "40px",
            fill: "#ffffff",
            align: "center"
        };
        let loadingString = `Loading...`;
        this.loadingText = this.add.text(100, 100, loadingString, loadingTextStyle);

        this.scene.start(`play`);
    }
    
    update() {
    
    }
}