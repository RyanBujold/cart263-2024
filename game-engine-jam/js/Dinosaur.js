class Dinosaur extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'dinosaur');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);
    }

    changeDinoDirection(){
        // Randomize dinosaur movement
        let x = Phaser.Math.Between(-10, 10);
        let y = Phaser.Math.Between(-10, 10);
        this.body.setVelocity(x,y);
    }
}