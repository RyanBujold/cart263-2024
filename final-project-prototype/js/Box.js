class Box {
    constructor(x,y,w,h,r=0,g=0,b=0,sr=0,sg=0,sb=0){
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
        return this.x <= box.x + box.w && this.x + this.w >= box.x && this.y <= box.y + box.h && this.y + this.h >= box.y;
    }
}