class Dinosaur extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'dinosaur');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('dinosaur', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('dinosaur', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }

    changeDinoDirection(){
        // Randomize dinosaur movement
        let x = Phaser.Math.Between(-10, 10);
        let y = Phaser.Math.Between(-10, 10);
        this.body.setVelocity(x,y);
        this.anims.play('moving',true);
    }
}