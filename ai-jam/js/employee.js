const spriteSize = 1080;

class Employee {

    constructor(spritesheet){
        this.x = 0;
        this.y = 0;
        this.size = 10;
        this.state = 0;
        this.spritesheet = spritesheet;
    }

    update(x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.draw();
    }

    draw(){
        image(this.spritesheet,this.x,this.y,this.size,this.size,0,0,spriteSize,spriteSize);
    }

}