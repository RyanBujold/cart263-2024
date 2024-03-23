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
            w:100,
            h:50,
            moveSpeed:10,
            isOpen: true,
            collider: null,
        }
        this.crane.collider = new Box(this.crane.x - 25, this.crane.y + 25, this.crane.w/2, this.crane.h/2, 0, 200, 0, 0, 0, 0, false),

        this.textBox = new Box(CONTAINER.x + CONTAINER.w + 20, CONTAINER.y + 50, 420, 300, 200, 200, 0, 0, 0, 0);

        this.isPasscodeEntered = false;
        this.isFingerPinched = false;

        this.oldMousePosition = {x:0,y:0}

    }

    update(){
        this.draw();
    }

    draw(){
        push();
        // Draw the container
        CONTAINER.draw();
        // Display the hand
        if(predictions.length > 0){
            fill(200,0,0);
            ellipseMode(CENTER);
            predictions[0].landmarks.forEach(point => {
                ellipse(point[0],point[1],10);
            });
            let index = predictions[0].annotations['indexFinger'][3];
            let thumb = predictions[0].annotations['thumb'][3];
            fill(200,200,0);
            ellipse(index[0],index[1],20);
            ellipse(thumb[0],thumb[1],20);
            this.checkFingerPinch(index[0],index[1],thumb[0],thumb[1]);
        }
        // Draw the boxes
        this.box1.draw();
        this.box2.draw();
        this.box3.draw();
        // Draw the crane
        stroke(0);
        this.crane.collider.draw();
        line(this.crane.baseX,this.crane.baseY,this.crane.x,this.crane.y);
        line(this.crane.x, this.crane.y, this.crane.x - this.crane.w/2, this.crane.y + this.crane.h);
        line(this.crane.x, this.crane.y, this.crane.x + this.crane.w/2, this.crane.y + this.crane.h);
        // Draw the text input display
        this.textBox.draw();
        stroke(0);
        line(this.textBox.x + 20, this.textBox.y + 200, this.textBox.x + 100, this.textBox.y + 200);
        line(this.textBox.x + 120, this.textBox.y + 200, this.textBox.x + 200, this.textBox.y + 200);
        line(this.textBox.x + 220, this.textBox.y + 200, this.textBox.x + 300, this.textBox.y + 200);
        line(this.textBox.x + 320, this.textBox.y + 200, this.textBox.x + 400, this.textBox.y + 200);
        this.passcodeModule();
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
        if(mPressed && oPressed && vPressed && ePressed){
            this.isPasscodeEntered = true;
        }
        else{
            this.isPasscodeEntered = false;
        }

        pop();
    }

    checkFingerPinch(x1,y1,x2,y2){
        // If the index and thumb are within range, trigger a finger pinch
        const RANGE = 50;
        let indexBox = new Box(x1-RANGE/2,y1-RANGE/2,RANGE,RANGE);
        let thumbBox = new Box(x2-RANGE/2,y2-RANGE/2,RANGE,RANGE);

        if(indexBox.checkCollision(thumbBox)){
            console.log("fingers touched");
            this.isFingerPinched = true;
        }
        else{
            this.isFingerPinched = false;
        }
    }

    mouseMoved(){
        if(this.isPasscodeEntered){
            if(mouseX > this.oldMousePosition.x){
                this.crane.x += 10;
            }
            else if(mouseX < this.oldMousePosition.x){
                this.crane.x -= 10;
            }

            if(mouseY > this.oldMousePosition.y){
                this.crane.y += 10;
            }
            else if(mouseY < this.oldMousePosition.y){
                this.crane.y -= 10;
            }
            this.crane.collider = new Box(this.crane.x - 25, this.crane.y + 25, this.crane.w/2, this.crane.h/2, 0, 200, 0, 0, 0, 0);
        }
        this.oldMousePosition = {x:mouseX, y:mouseY}
    }
}