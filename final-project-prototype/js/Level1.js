const CONTAINER = new Box(50,50,1200,800,100,100,100,0,200,0);

class Level1 {
    constructor(){
        this.box1 = new Box(CONTAINER.x + 50,CONTAINER.y + CONTAINER.h - 100, 200, 100, 200, 200, 200, 0, 0, 0);
        this.box2 = new Box(CONTAINER.x + 300,CONTAINER.y + CONTAINER.h - 100, 200, 100, 200, 200, 200, 0, 0, 0);
        this.box3 = new Box(CONTAINER.x + 550,CONTAINER.y + CONTAINER.h - 100, 200, 100, 200, 200, 200, 0, 0, 0);

        this.crane = {
            baseX: CONTAINER.x + CONTAINER.w/2,
            baseY: CONTAINER.y,
            x:CONTAINER.x + CONTAINER.w/2,
            y:CONTAINER.x + CONTAINER.h/2,
            isOpen: true,
        }
    }

    draw(){
        // Draw the container
        CONTAINER.draw();
        // Display the hand
        if(predictions.length > 0){
            fill(200,0,0);
            ellipseMode(CENTER);
            predictions[0].landmarks.forEach(point => {
                ellipse(point[0],point[1],10);
            });
        }
        // Draw the boxes
        this.box1.draw();
        this.box2.draw();
        this.box3.draw();
        // Draw the crane
        stroke(0);
        line(this.crane.baseX,this.crane.baseY,this.crane.x,this.crane.y);
        line(this.crane.x, this.crane.y, this.crane.x - 50, this.crane.y + 50);
        line(this.crane.x, this.crane.y, this.crane.x + 50, this.crane.y + 50);
    }
}