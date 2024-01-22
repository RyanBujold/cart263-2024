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

    overlap(x,y){
        return x > this.x - this.img.width/2 && x < this.x + this.img.width/2 && y > this.y - this.img.height/2 && y < this.y + this.img.height/2;
    }

}