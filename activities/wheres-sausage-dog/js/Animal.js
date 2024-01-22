class Animal {

    constructor(x,y,img){
        this.x = x;
        this.y = y;
        this.img = img;
        this.angle = 0;
    }

    update(){
        this.display();
    }

    display(){
        push();
        imageMode(CENTER);
        image(this.img, this.x, this.y)
        pop();
    }

}