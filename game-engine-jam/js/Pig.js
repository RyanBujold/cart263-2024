class Pig extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'pig');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        this.anims.create({
            key: 'moving',
            frames: this.anims.generateFrameNumbers('pig', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNumbers('pig', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // Start animating
        this.anims.play('moving',true);

        // Variables
        this.scene = scene;
        this.movespeed = 20;
        this.isAlive = true;
    }

    defeat(){
        this.isAlive = false;
        this.body.setVelocity(0,0);
        this.anims.play('dead',true);
        this.body.enable = false;
    }

    changeDirection(){
        // If the pig is dead, don't move
        if(!this.isAlive){
            return;
        }
        // Move towards the target
        let velX = Phaser.Math.Between(-this.movespeed, this.movespeed);
        let velY = Phaser.Math.Between(-this.movespeed, this.movespeed);
        this.body.setVelocity(velX,velY);
    }
}