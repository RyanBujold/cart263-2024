const SPRITE_SIZE = 1080;
const SUPRISE_TOTAL_TIME = 30;

class Employee {

    constructor(spritesheet){
        this.x = 0;
        this.y = 0;
        this.size = 10;
        this.state = 0;
        this.spritesheet = spritesheet;
        this.supriseCounter = 0;
    }

    update(x,y,size){
        // Update our position
        this.x = x;
        this.y = y;
        this.size = size;

        // Be in the suprised state until the counter runs out
        if(this.supriseCounter > 0){
            this.supriseCounter--;
        }
        else if(this.state == 2){
            this.state = 0;
        }

        // Randomly, go to sleep if we are awake
        let rng = Math.round(random(0,400));
        if(rng==0 && this.state==0){
            this.state = 1;
        }

        // Draw the employee
        this.draw();
    }

    wakeUp(){
        this.supriseCounter = SUPRISE_TOTAL_TIME;
        this.state = 2;
    }

    draw(){
        // Draw the current frame
        image(this.spritesheet,this.x,this.y,this.size,this.size,this.state*SPRITE_SIZE,0,SPRITE_SIZE,SPRITE_SIZE);
    }

}