class Boot extends Phaser.Scene {
    constructor() {
        super({
          key: `boot`
        });
    }
    
    preload() {
        this.load.image(`clown`,`assets/images/clown.png`);
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

        this.scene.start(`test`);
    }
    
    update() {
    
    }
}