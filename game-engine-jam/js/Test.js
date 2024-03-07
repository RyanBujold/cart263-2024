class Test extends Phaser.Scene {
    constructor() {
        super({
            key: `test`
        });
    }

    create(){
        this.clown = this.physics.add.sprite(100,100,`clown`);

        this.keyboardArrows = this.input.keyboard.createCursorKeys();
    }

    update(){
        this.handleInput();
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