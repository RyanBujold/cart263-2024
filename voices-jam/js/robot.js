class Robot {

    /**
     * A robot.
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     * @param {*} images 
     */
    constructor(x,y,w,h,images){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.faces = images;

        this.currentFace = this.faces.neutral;
        this.speech = "lets play rock, paper, scissors. You go first";
    }

    draw(){
        push();
        imageMode(CENTER);
        image(this.currentFace, this.x, this.y, this.width, this.height);
        pop();
    }

    decideSpeech(wordArray){
        // Keep track of the number of times each type of key word is uttered
        let tracker = {
            rock:0,
            paper:0,
            scissors:0,
            greetings:0,
            profanity:0,
        }
        for(let i = 0; i < wordArray.length; i++){
            switch(wordArray[i]){
                case "rock":
                    tracker.rock++;
                    break;
                case "paper":
                    tracker.paper++;
                    break;
                case "scissors":
                    tracker.scissors++;
                    break;
                case "hello":
                    tracker.greetings++;
                    break;
                case "stupid":
                    tracker.profanity++;
            }
        }

        // Robot decides what to say
        let speech = "";
        // Check for greetings
        if(tracker.greetings > 0){
            speech += "hello. "
            this.currentFace = faceImages.happy;
        }
        // Check for profanity
        if(tracker.profanity > 0){
            speech += "its only a game. why do you have to be mad? ";
            this.currentFace = faceImages.angry;
        }
        // Check the rock paper scissors
        if(tracker.rock > 0 && tracker.paper == 0 && tracker.scissors == 0){
            speech += "paper. ";
            this.currentFace = faceImages.smiling;
        }
        else if(tracker.paper > 0 && tracker.rock == 0 && tracker.scissors == 0){
            speech += "scissors. ";
            this.currentFace = faceImages.smiling;
        }
        else if(tracker.scissors > 0 && tracker.rock == 0 && tracker.paper == 0){
            speech += "rock. ";
            this.currentFace = faceImages.smiling;
        }
        else if(tracker.rock > 0 || tracker.paper > 0 || tracker.scissors > 0){
            speech += "please choose either rock, paper or scissors."
            this.currentFace = faceImages.neutral;
        }
        // If the robot cannot decide what to say, the say this
        if(speech.length == 0){
            speech = "I didn't understand that."
            this.currentFace = faceImages.neutral;
        }

        // Save the completed speech
        this.speech = speech;      
    }

}