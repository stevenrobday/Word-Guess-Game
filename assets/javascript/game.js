document.addEventListener("DOMContentLoaded", function(event) {

    //game states
    var GAME_STATE_TITLE = 0;
    var GAME_STATE_END_ROUND = 1;
    var GAME_STATE_PLAY = 2;

    //get elements
    var message = document.getElementById("message");
    var gameEl = document.getElementById("gameEl");
    var gameHeader = document.getElementById("gameHeader");
    var playerAnswerEl = document.getElementById("playerAnswerEl");
    var incorrectGuessesEl = document.getElementById("incorrectGuessesEl");
    var guessesLeftEl = document.getElementById("guessesLeftEl");
    var score = document.getElementById("score");
    var wins = document.getElementById("wins");
    var losses = document.getElementById("losses");
    var virtualKeys = document.getElementById("virtualKeys");

    //hide score display and virtual keyboard
    score.style.display = "none";
    virtualKeys.style.display = "none";

    //create game object
    var gameObj = {
        answers: [
            { politician: "RONALD REAGAN", pic: "reagan.jpg", fameOrShame: "fame", bio: "Declared 'Greatest President of All Time' by the World Court, Ronald Reagan saved America forever with his patented 'Supply-Side Economics', which punished the poor for being a bunch of Commies!" },
            { politician: "GEORGE HW BUSH", pic: "bush.jpg", fameOrShame: "fame", bio: "Ronnie's right-hand man, and father of the World Court's '2nd Greatest President of All Time', George HW Bush struck fear in the hearts of many Communist leaders when he had them assassinated as head of the CIA!" },
            { politician: "WALTER MONDALE", pic: "mondale.jpg", fameOrShame: "shame", bio: "After serving one term as Jimmy Carter's Vice President, the World Court judged him 'Unfit to be an American', and The Gipper defeated him handedly in '84" },
            { politician: "OLIVER NORTH", pic: "north.jpg", fameOrShame: "fame", bio: "After terrorizing a bunch of Commies in Nicaragua, Oliver North drew national fire--from a bunch of Commies!" },
            { politician: "ROBERT BORK", pic: "bork.jpg", fameOrShame: "fame", bio: "He would have been a Supreme Court Justice if it weren't for 58 Commies in the Senate" },
            { politician: "JOHN MCCAIN", pic: "mccain.jpg", fameOrShame: "fame", bio: "One of the Senators who was accused of protecting Charles H. Keating, Jr., Chairman of the Lincoln Savings and Loan Association.  Since this was a private firm, these heroic Senators have since been dubbed 'The Keating Five', a hip band of rebels who don't take no guff from Communists." },
            { politician: "MICHAEL DUKAKIS", pic: "dukakis.jpg", fameOrShame: "shame", bio: "Michael Dukakis became Laughing Stock of the World after he rode in a tank and busted Willie Horton out of prison, which is why The UN unanimously declared him 'A National Disgrace'." },
            { politician: "ALEXANDER HAIG", pic: "haig.jpg", fameOrShame: "shame", bio: "Once Reagan's Secretary of State, Haig betrayed everybody's trust when he became a Communist by calling George HW Bush 'a wimp' in 1987." }
        ],

        state: GAME_STATE_TITLE,
        playerAnswer: null,
        incorrectGuesses: null,
        guessesLeft: null,
        answerIndex: null,
        answer: null,
        answerArray: null,
        wins: null,
        losses: null
    };

    //gameObj answers will be copied here
    var answersArray;

    function startGame() {
        answersArray = gameObj.answers.slice();
        gameObj.wins = 0;
        gameObj.losses = 0;
        startRound();
    }

    function startRound() {
        //get a random index
        gameObj.answerIndex = Math.floor(Math.random() * answersArray.length);

        //get answer based on generated index and stick her in the gameHeader element
        gameObj.answer = answersArray[gameObj.answerIndex].politician;
        gameHeader.innerHTML = "WHO IS RONNIE THINKING OF?";

        //put each character of the answer into an array so we can loop through the characters
        gameObj.answerArray = gameObj.answer.split("");

        //make gameObj.playerAnswer and gameObj.incorrectGuesses arrays, or clear them if already arrays
        gameObj.playerAnswer = [];
        gameObj.incorrectGuesses = [];

        //set the guesses left
        gameObj.guessesLeft = 8;

        //make letters an underscore and spaces a space in the answer array
        gameObj.answerArray.forEach(function (element) {
            if (element !== " ") {
                gameObj.playerAnswer.push("_");
            }
            else {
                gameObj.playerAnswer.push(" ");
            }
        });

        //join the answer array together to be displayed on screen
        playerAnswerEl.innerHTML = gameObj.playerAnswer.join("");

        //display number of guesses left
        guessesLeftEl.innerHTML = gameObj.guessesLeft + " years in office remaining";

        //set bg to black in case it was Commie pink
        gameEl.style.backgroundColor = "#000000";

        //hide score display
        score.style.display = "none";

        //Ronnie's new message
        message.innerHTML = "I'm thinking of a politician, can you guess who? There will be no hand-outs, so pull yourself up by your bootstraps and get to work!";

        //change game state
        gameObj.state = GAME_STATE_PLAY;
    }

    function playRound(guess){
        //proceed only if letter isn't already in the player's answer (needed for incorrect guesses as well)
        if (gameObj.playerAnswer.indexOf(guess) === -1) {
            //check to see if the guess is correct
            if (gameObj.answerArray.indexOf(guess) !== -1) {
                //loop through answerArray, putting the correct letter in its corresponding index(es) in gameObj.playerAnswer
                gameObj.answerArray.forEach(function (element, index) {
                    if (element === guess) {
                        gameObj.playerAnswer[index] = guess;
                    }
                });

                //display current playerAnswer
                playerAnswerEl.innerHTML = gameObj.playerAnswer.join("");
            }

            //proceed if the player didn't already guess incorrectly
            else if (gameObj.incorrectGuesses.indexOf(guess) === -1) {
                //put the incorrect guess in the corresponding array
                gameObj.incorrectGuesses.push(guess);

                //alphabetize the array
                gameObj.incorrectGuesses.sort();

                //display incorrect letters
                incorrectGuessesEl.innerHTML = "Communist letters:<br>" + gameObj.incorrectGuesses.join(", ");

                //penalize the player and display the updated guesses lefts
                gameObj.guessesLeft--;

                //grammar!
                var yearsLeft = gameObj.guessesLeft === 1 ? " year " : " years ";

                guessesLeftEl.innerHTML = gameObj.guessesLeft + yearsLeft + "in office remaining";
            }
        }

        //lose condition
        if (gameObj.guessesLeft === 0) {
            //hide keyboard
            virtualKeys.style.display = "none";

            //clear elements
            playerAnswerEl.innerHTML = "";
            incorrectGuessesEl.innerHTML = "";
            guessesLeftEl.innerHTML = "";

            //declare the player a Commie
            gameEl.style.backgroundColor = "#ff61b2";
            gameHeader.innerHTML = "<div>GAME OVER!</div><div id='headerPic'><img src = 'assets/images/marx.jpg' width='400'></div><div>YOU ARE A COMMUNIST SPY!</div>";
            message.innerHTML = "Ooh, I spy a Communist spy!  Well, here in America, we don't tolerate villainy from you pinkos!  You'll be ground red meat by the time my CIA is through with the likes of you!  Or, you can push '1' or <span id='startRound'>1</span> to try again...";

            //calc losses
            gameObj.losses++;

            //display score
            score.style.display = "table";
            wins.innerHTML = "TIMES A PATRIOT: " + gameObj.wins;
            losses.innerHTML = "TIMES A COMMIE: " + gameObj.losses;

            //change state to end round
            gameObj.state = GAME_STATE_END_ROUND;
        }
        //win condition
        else if (gameObj.playerAnswer.indexOf("_") === -1) {
            //hide keyboard
            virtualKeys.style.display = "none";

            //clear elements
            playerAnswerEl.innerHTML = "";
            incorrectGuessesEl.innerHTML = "";
            guessesLeftEl.innerHTML = "";

            //find out if politician is a patriot or commie
            if (answersArray[gameObj.answerIndex].fameOrShame === "fame") {
                var bgColor = "#b21030";
                var wallMsg = "WALL OF FAME";
            }
            else {
                var bgColor = "#2800ba";
                var wallMsg = "WALL OF SHAME";
            }

            //educate player about politician
            gameHeader.innerHTML = "<div id='wallMsgEl'>" + wallMsg + "</div><div>" + gameObj.answer 
            + "</div><div id='headerPic'><img src = 'assets/images/" + answersArray[gameObj.answerIndex].pic 
            + "' width='400'></div><div id='bio'>" + answersArray[gameObj.answerIndex].bio + "</div>";
            document.getElementById('wallMsgEl').style.backgroundColor = bgColor;

            //calc wins
            gameObj.wins++;

            //display score
            score.style.display = "table";
            wins.innerHTML = "TIMES A PATRIOT: " + gameObj.wins;
            losses.innerHTML = "TIMES A COMMIE: " + gameObj.losses;

            //remove politician from array
            answersArray.splice(gameObj.answerIndex, 1);

            //if there's any politicians left, challenge the player to another round
            if (answersArray.length > 0) {
                //proper grammar
                var politiciansLeft = answersArray.length === 1 ? "politician awaits" : "politicians await";

                message.innerHTML = "Ooh, that was a lucky guess! " + answersArray.length + " remaining " 
                + politiciansLeft + " your challenge! Press '1' or <span id='startRound'>1</span> for the next round!";

                gameObj.state = GAME_STATE_END_ROUND;
            }

            //otherwise, Ronnie takes a nap
            else {
                message.innerHTML = "Well, that's all the politicians I can think of, and it's now nap time!  If you ever want to guess from the same list of politicians again, wake me up by pushing '1' or <span id='startGame'>1</span>!  I'll be waiting...";

                //set game state back to title so vars will be reset if user wants to play again
                gameObj.state = GAME_STATE_TITLE;
            }
        }
    }

    //physical keyboard
    document.onkeyup = function (event) {
        switch (gameObj.state) {

            case GAME_STATE_TITLE:
                //only proceed if user hit 1
                if (event.key !== "1") return;

                startGame();
                break;

            case GAME_STATE_END_ROUND:
                if (event.key !== "1") return;

                startRound();
                break;

            case GAME_STATE_PLAY:
                //convert player guess to upper case
                var guess = event.key.toUpperCase();

                //return if guess is anything other than a single upper case (English) letter
                if (guess.length > 1 || !guess.match(/[A-Z]/)) return;

                playRound(guess);
                break;
        }
    }

    //virtual keys
    var keys = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
        ["Z", "X", "C", "V", "B", "N", "M"]
    ];

    //create keys
    for (var i = 0; i < 3; i++) {
        var outerDiv = document.createElement("div");
        outerDiv.id = "outerDiv" + i;
        virtualKeys.appendChild(outerDiv);
        var outerElement = document.getElementById("outerDiv" + i);

        for (var j = 0; j < keys[i].length; j++){
            var div = document.createElement("div");
            div.innerHTML = keys[i][j];
            div.setAttribute("class", "key");
            div.value =  keys[i][j];
            outerElement.appendChild(div);
        }
    }

    var key = document.getElementsByClassName("key");

    //add event listeners to keys
    for (var i = 0; i < key.length; i++){
        key[i].addEventListener("click", function(){
            playRound(this.value);
        });
    }

    //push 1 key
    document.addEventListener("click", function(e){
        if(e.target.id === "startGame"){
            virtualKeys.style.display = "block";
            startGame();
        }
    });

    document.addEventListener("click", function(e){
        if(e.target.id === "startRound"){
            virtualKeys.style.display = "block";
            startRound();
        }
    });
});