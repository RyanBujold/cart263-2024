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

        // Variables
        this.scene = scene;
        this.movespeed = 10;
        this.range = 60;
        this.target = {};
    }

    update(){
        // Check if a target is nearby
        if(this.scene.adventurer.x < this.body.x + this.range && this.scene.adventurer.x > this.body.x - this.range &&
            this.scene.adventurer.y < this.body.y + this.range && this.scene.adventurer.y > this.body.y - this.range){
            // Chase the nearby target
            this.target = {
                x: this.scene.adventurer.x - 8, 
                y: this.scene.adventurer.y - 8
            }
            this.chaseTarget();
        }
        else{
            this.body.setVelocity(0,0);
            this.anims.play('idle',true);
        }
        
    }

    chaseTarget(){
        // Move towards the target
        let velX = 0;
        let velY = 0;
        if(this.body.x < this.target.x){
            velX = this.movespeed;
        }
        else if(this.body.x > this.target.x){
            velX = -this.movespeed;
        }
        if(this.body.y < this.target.y){
            velY = this.movespeed;
        }
        else if(this.body.y > this.target.y){
            velY = -this.movespeed;
        }

        this.body.setVelocity(velX,velY);
        this.anims.play('moving',true);
    }

    
}