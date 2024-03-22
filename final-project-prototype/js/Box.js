class Box {
    constructor(x,y,w,h,r,g,b,sr,sg,sb){
        //coordinates
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        //box color
        this.r = r;
        this.g = g;
        this.b = b;
        //stroke color
        this.sr = sr;
        this.sg = sg;
        this.sb = sb;
    }

    draw(){
        push();
        stroke(this.sr,this.sg,this.sb);
        fill(this.r,this.g,this.b);
        rect(this.x,this.y,this.w,this.h);
        pop();
    }

    checkCollision(box){
        return this.x > box.x && this.x < box.x + box.w && this.y > box.y && this.y < box.y + box.h;
    }
}