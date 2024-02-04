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
        this.obey = false;
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
        if(this.mood > 0 && !this.obey){
            this.currentFace = this.faces.smiling;
            if(this.mood >= 3){
                this.currentFace = this.faces.happy;
            }
        }
        else if(this.mood == 0 && !this.obey){
            this.currentFace = this.faces.neutral;
        }
        else if(this.mood < 0 && !this.obey){
            this.currentFace = this.faces.angry;
        }
        else if(this.obey){
            this.currentFace = this.faces.obey;
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
            obey:0,
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
                case "obey":
                    tracker.obey++;
                    break;
            }
            this.words.greetings.words.forEach(word => { if(word == wordArray[i]){ tracker.greetings++; } });
            this.words.profanity.words.forEach(word => { if(word == wordArray[i]){ tracker.profanity++; } });
            this.words.question.words.forEach(word => { if(word == wordArray[i]){ tracker.question++; } });
            
        }

        // Robot decides what to say
        let speech = "";
        // Check if we said obey
        if(tracker.obey > 0 && !this.obey){
            this.obey = true;
        }
        // Check for greetings
        if(tracker.greetings > 0 && !this.obey){
            speech += random(this.words.greetings.answers);
            this.mood++;
        }
        // Play rock paper scissors
        else if(tracker.rock > 0 || tracker.paper > 0 || tracker.scissors > 0) {
            // Check the rock paper scissors
            let playerChoice = "";
            if(tracker.rock > 0 && tracker.paper == 0 && tracker.scissors == 0){
                playerChoice = "rock";
            }
            else if(tracker.paper > 0 && tracker.rock == 0 && tracker.scissors == 0){
                playerChoice = "paper";
            }
            else if(tracker.scissors > 0 && tracker.rock == 0 && tracker.paper == 0){
                playerChoice = "scissors";
            }
            else if(tracker.rock > 0 || tracker.paper > 0 || tracker.scissors > 0){
                speech += "please choose either rock, paper or scissors."
            }

            // Play rock paper scissors
            if(playerChoice != ""){
                // Get the robot's choice
                let rigged = !this.obey;
                let robotChoice = this.playRPS(playerChoice,rigged);
                speech += robotChoice + "! ";
                // Decide what to say based on if the robot won or not
                switch(this.determineRPSWinner(playerChoice,robotChoice)) {
                    case "player":
                        speech += random(this.words.outcome.lose);
                        this.mood --;
                        break;
                    case "robot":
                        speech += random(this.words.outcome.win);
                        this.mood ++;
                        break;
                    default:
                        speech += random(this.words.outcome.draw);
                        break;
                }
            }
            
        }
        // Check for profanity
        if(tracker.profanity > 0 && !this.obey){
            speech += random(this.words.profanity.answers);
            this.mood--;
        }
        // Check for questions
        if(tracker.question > 0 && !this.obey){
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
                else if(wordArray.includes("do")){
                    speech += this.words.question.answers.what.do;
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
        if(speech.length == 0 && !this.obey){
            speech = random(this.words.misunderstanding);
        }
        else if(speech.length == 0 && this.obey){
            speech = this.words.default;
        }
        // If we did say something, randomly comment on it
        else if(speech.length > 0 && random([0,1,2]) == 0 && !this.obey){
            if(this.mood > 0){
                speech += random(this.words.comments.good);
            }
            else if(this.mood < 0){
                speech += random(this.words.comments.bad);
            }
        }

        // Save the completed speech
        this.speech = speech;      
    }

    // Gets the robot's choice for rock paper scissors
    playRPS(playerChoice,rigged) {
        let robotChoice = "";
        
        if(rigged){
            // Get the robot to choose so that they never lose
            if(playerChoice == "rock"){
                let counters = ["rock","paper"];
                robotChoice = random(counters);
            }
            else if(playerChoice == "paper"){
                let counters = ["paper","scissors"];
                robotChoice = random(counters);
            }
            else if(playerChoice == "scissors"){
                let counters = ["scissors","rock"];
                robotChoice = random(counters);
            }
        }
        else if(!rigged){
            // Get the robot to choose a random option
            robotChoice = random(["rock","paper","scissors"]);
        }
        
        return robotChoice;
    }

    // Returns a string determining the outcome of the rock paper scissors game
    determineRPSWinner(playerChoice,robotChoice) {
        let winner = "";
        // Check if player or robot wins. if no victor, than it is a draw
        if(playerChoice == "rock" && robotChoice == "scissors"){ winner = "player"; }
        else if(playerChoice == "paper" && robotChoice == "rock"){ winner = "player"; }
        else if(playerChoice == "scissors" && robotChoice == "paper"){ winner = "player"; }
        else if(playerChoice == "rock" && robotChoice == "paper"){ winner = "robot"; }
        else if(playerChoice == "paper" && robotChoice == "scissors"){ winner = "robot"; }
        else if(playerChoice == "scissors" && robotChoice == "rock"){ winner = "robot"; }

        return winner;
    }

}