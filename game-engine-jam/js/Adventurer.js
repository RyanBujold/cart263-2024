class Adventurer extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'adventurer');

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

        // Create animations
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

        // Variables
        this.scene = scene;
    }

    update(){
        this.handleInput();
    }

    handleInput() {
        const moveSpeed = 50;
        const keys = this.scene.keyboardArrows;

        let velX = 0;
        if(keys.right.isDown && !keys.left.isDown){
            velX = moveSpeed;
            this.anims.play('right', true);
        }
        else if(keys.left.isDown && !keys.right.isDown){
            velX = -moveSpeed;
            this.anims.play('left', true);
        }
        let velY = 0;
        if(keys.up.isDown && !keys.down.isDown){
            velY = -moveSpeed;
            this.anims.play('up', true);
        }
        else if(keys.down.isDown && !keys.up.isDown){
            velY = moveSpeed;
            this.anims.play('down', true);
        }
        if(!keys.right.isDown && !keys.left.isDown && !keys.up.isDown && !keys.down.isDown){
            this.body.setVelocity(0);
            this.anims.play('idle', true);
        }

        this.body.setVelocity(velX,velY);

    }
}