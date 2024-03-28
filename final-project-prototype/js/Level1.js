const CONTAINER = new Box(50,50,1200,800,100,100,100,0,200,0);

class Level1 {
    constructor(){
        this.box1 = new Box(CONTAINER.x + 50,CONTAINER.y + CONTAINER.h - 100, 200, 100, 200, 200, 200, 0, 0, 0);
        this.box2 = new Box(CONTAINER.x + 300,CONTAINER.y + CONTAINER.h - 100, 200, 100, 200, 200, 200, 0, 0, 0);
        this.box3 = new Box(CONTAINER.x + 550,CONTAINER.y + CONTAINER.h - 100, 200, 100, 200, 200, 200, 0, 0, 0);
        this.boxes = [this.box1,this.box2,this.box3];
        this.goal = new Box(CONTAINER.x + CONTAINER.w - 300, CONTAINER.y, 250, CONTAINER.h, 0, 100, 0);

        this.crane = {
            baseX: CONTAINER.x + CONTAINER.w/2,
            baseY: CONTAINER.y,
            x:CONTAINER.x + CONTAINER.w/2,
            y:CONTAINER.x + CONTAINER.h/2,
            w:100,
            h:50,
            isOpen: true,
            collider: null,
        }
        this.crane.collider = new Box(this.crane.x - 25, this.crane.y + 25, this.crane.w/2, this.crane.h/2, 0, 200, 0, 0, 0, 0, false),
        this.textBox = new Box(CONTAINER.x + CONTAINER.w + 20, CONTAINER.y + 50, 420, 300, 200, 200, 0, 0, 0, 0);
        this.pinchRange = 100;
        this.isFingerPinched = false;
    }

    update(){
        this.draw();
    }

    draw(){
        push();
        // Draw the container
        CONTAINER.draw();
        this.goal.draw();
        // Display the hand
        if(predictions.length > 0){
            fill(0);
            ellipseMode(CENTER);
            predictions[0].landmarks.forEach(point => {
                ellipse(point[0],point[1],10);
            });
            let index = predictions[0].annotations['indexFinger'][3];
            let thumb = predictions[0].annotations['thumb'][3];
            fill(200,0,0);
            ellipse(index[0],index[1],this.pinchRange);
            fill(0,0,200);
            ellipse(thumb[0],thumb[1],this.pinchRange);
            this.checkFingerPinch(index[0],index[1],thumb[0],thumb[1]);
        }
        // Check if the fingers are pinched
        if(this.isFingerPinched){
            this.boxes.forEach(box => {
                if(this.crane.collider.checkCollision(box)){
                    box.x = this.crane.collider.x+this.crane.collider.w/2-box.w/2;
                    box.y = this.crane.collider.y+this.crane.collider.h/2-box.h/2;
                }
            });
        }
        // Update the boxes
        this.boxes.forEach(box => {
            // Add gravity to the boxes if we arent' colliding with another box
            this.boxes.forEach(collider => {
                if(!box.checkCollision(collider)){
                    box.y+= 5;
                }
            });
            // If the box is out of bounds, move it back in
            if(box.x < CONTAINER.x){box.x = CONTAINER.x; }
            if(box.x + box.w > CONTAINER.x + CONTAINER.w){box.x = CONTAINER.x + CONTAINER.w - box.w; }
            if(box.y < CONTAINER.y){box.y = CONTAINER.y; }
            if(box.y + box.h > CONTAINER.y + CONTAINER.h){box.y = CONTAINER.y + CONTAINER.h - box.h; }
            box.draw();
        });
        // Draw the crane
        stroke(0);
        strokeWeight(4);
        line(this.crane.baseX,this.crane.baseY,this.crane.x,this.crane.y);
        if(this.isFingerPinched){
            stroke(200,0,0);
            line(this.crane.x, this.crane.y, this.crane.x - this.crane.w/4, this.crane.y + this.crane.h + 10);
            stroke(0,0,200);
            line(this.crane.x, this.crane.y, this.crane.x + this.crane.w/4, this.crane.y + this.crane.h + 10);
        }
        else {
            stroke(200,0,0);
            line(this.crane.x, this.crane.y, this.crane.x - this.crane.w/2, this.crane.y + this.crane.h);
            stroke(0,0,200);
            line(this.crane.x, this.crane.y, this.crane.x + this.crane.w/2, this.crane.y + this.crane.h);
        }
        // Draw the text input display
        this.textBox.draw();
        stroke(0);
        strokeWeight(1);
        line(this.textBox.x + 20, this.textBox.y + 200, this.textBox.x + 100, this.textBox.y + 200);
        line(this.textBox.x + 120, this.textBox.y + 200, this.textBox.x + 200, this.textBox.y + 200);
        line(this.textBox.x + 220, this.textBox.y + 200, this.textBox.x + 300, this.textBox.y + 200);
        line(this.textBox.x + 320, this.textBox.y + 200, this.textBox.x + 400, this.textBox.y + 200);
        this.passcodeModule();

        // Check win condition
        let win = true;
        this.boxes.forEach(box => {
            if(!box.checkCollision(this.goal)){
                win = false;
            }
        });
        if(win){
            text("WIN",CONTAINER.x + CONTAINER.w/2, CONTAINER.y + CONTAINER.h/2);
        }

        pop();
    }

    passcodeModule(){
        push();
        textSize(32);
        fill(0);
        let mPressed = false;
        let oPressed = false;
        let vPressed = false;
        let ePressed = false;

        if (keyIsDown(77)) {
            text("M",this.textBox.x + 30,this.textBox.y + 190);
            mPressed = true;
        } 
        if (keyIsDown(79)) {
            text("O",this.textBox.x + 130,this.textBox.y + 190);
            oPressed = true;
        }
        if (keyIsDown(86)) {
            text("V",this.textBox.x + 230,this.textBox.y + 190);
            vPressed = true;
        }
        if (keyIsDown(69)) {
            text("E",this.textBox.x + 330,this.textBox.y + 190);
            ePressed = true;
        }

        // If all the keys are pressed, passcode is complete
        // Make sure the mouse is within the bounds of the screen
        if(mPressed && oPressed){
            this.crane.x = mouseX;
            if(this.crane.x < CONTAINER.x){this.crane.x = CONTAINER.x; }
            if(this.crane.x > CONTAINER.x + CONTAINER.w){this.crane.x = CONTAINER.x + CONTAINER.w; }
            this.crane.collider = new Box(this.crane.x - 25, this.crane.y + 25, this.crane.w/2, this.crane.h/2, 0, 200, 0, 0, 0, 0);
        }
        if(vPressed && ePressed){
            this.crane.y = mouseY;
            if(this.crane.y < CONTAINER.y){this.crane.y = CONTAINER.y; }
            if(this.crane.y > CONTAINER.y + CONTAINER.h){this.crane.y = CONTAINER.y + CONTAINER.h; }
            this.crane.collider = new Box(this.crane.x - 25, this.crane.y + 25, this.crane.w/2, this.crane.h/2, 0, 200, 0, 0, 0, 0);
        }
        pop();
    }

    checkFingerPinch(x1,y1,x2,y2){
        // If the index and thumb are within pinchRange, trigger a finger pinch
        let indexBox = new Box(x1-this.pinchRange/2,y1-this.pinchRange/2,this.pinchRange,this.pinchRange);
        let thumbBox = new Box(x2-this.pinchRange/2,y2-this.pinchRange/2,this.pinchRange,this.pinchRange);

        if(indexBox.checkCollision(thumbBox)){
            this.isFingerPinched = true;
        }
        else{
            this.isFingerPinched = false;
        }
    }

}