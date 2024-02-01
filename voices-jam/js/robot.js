class Robot {

    /**
     * A robot.
     * @param {*} x 
     * @param {*} y 
     * @param {*} w 
     * @param {*} h 
     * @param {*} images 
     * @param {*} words
     */
    constructor(x,y,w,h,images,words){
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.faces = images;
        this.words = words;

        this.currentFace = this.faces.neutral;
        this.speech = "say something...";//"lets play rock, paper, scissors. You go first";
        this.mood = 0;
    }

    update(){
        this.decideFace();
        this.draw();
    }

    draw(){
        push();
        imageMode(CENTER);
        image(this.currentFace, this.x, this.y, this.width, this.height);
        pop();
    }

    decideFace(){
        // Check our mood and change to the appropriate face
        if(this.mood > 0){
            this.currentFace = this.faces.smiling;
            if(this.mood >= 3){
                this.currentFace = this.faces.happy;
            }
        }
        else if(this.mood == 0){
            this.currentFace = this.faces.neutral;
        }
        else if(this.mood < 0){
            this.currentFace = this.faces.angry;
        }
    }

    decideSpeech(wordArray){
        // Keep track of the number of times each type of key word is uttered
        let tracker = {
            rock:0,
            paper:0,
            scissors:0,
            greetings:0,
            profanity:0,
            question:0,
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
            }
            this.words.greetings.words.forEach(word => { if(word == wordArray[i]){ tracker.greetings++; } });
            this.words.profanity.words.forEach(word => { if(word == wordArray[i]){ tracker.profanity++; } });
            this.words.question.words.forEach(word => { if(word == wordArray[i]){ tracker.question++; } });
            
        }

        // Robot decides what to say
        let speech = "";
        // Check for greetings
        if(tracker.greetings > 0){
            speech += random(this.words.greetings.answers);
            this.mood++;
        }
        // Play rock paper scissors
        else if(tracker.rock > 0 || tracker.paper > 0 || tracker.scissors > 0) {
            // Check the rock paper scissors
            if(tracker.rock > 0 && tracker.paper == 0 && tracker.scissors == 0){
                speech += "paper.";
                this.mood++;
            }
            else if(tracker.paper > 0 && tracker.rock == 0 && tracker.scissors == 0){
                speech += "scissors.";
                this.mood++;
            }
            else if(tracker.scissors > 0 && tracker.rock == 0 && tracker.paper == 0){
                speech += "rock.";
                this.mood++;
            }
            else if(tracker.rock > 0 || tracker.paper > 0 || tracker.scissors > 0){
                speech += "please choose either rock, paper or scissors."
            }
        }
        // Check for profanity
        if(tracker.profanity > 0){
            speech += random(this.words.profanity.answers);
            this.mood--;
        }
        // Check for questions
        if(tracker.question > 0){
            if(wordArray.includes("who")){
                if(wordArray.includes("you")){
                    speech += this.words.question.answers.who.you;
                }
            }
            if(wordArray.includes("what")){
                if(wordArray.includes("game")){
                    speech += this.words.question.answers.what.game;
                }
                else if(wordArray.includes("name")){
                    speech += this.words.question.answers.what.name;
                    this.mood++;
                }   
            }
            else if(wordArray.includes("what's")){
                if(wordArray.includes("game")){
                    speech += this.words.question.answers.what.game;
                }
                else if(wordArray.includes("name")){
                    speech += this.words.question.answers.what.name;
                    this.mood++;
                }   
            }
            if(wordArray.includes("how")){
                if(wordArray.includes("play")){
                    speech += this.words.question.answers.how.play;
                }
                else if(wordArray.includes("you")){
                    speech += this.words.question.answers.how.you;
                    this.mood++;
                }
            }
        }
        
        // If the robot cannot decide what to say, the say this
        if(speech.length == 0){
            speech = "I didn't understand that."
        }

        // Save the completed speech
        this.speech = speech;      
    }

}