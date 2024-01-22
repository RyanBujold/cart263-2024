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
        translate(this.x, this.y);
        rotate(this.angle);
        image(this.img, 0, 0)
        pop();
    }

}