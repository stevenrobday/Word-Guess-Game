//game states
var GAME_STATE_TITLE = 0;
var GAME_STATE_PLAY = 1;

var message = document.getElementById("message");
var gameEl = document.getElementById("gameEl");
var gameHeader = document.getElementById("gameHeader");
var playerAnswerEl = document.getElementById("playerAnswerEl");
var incorrectGuessesEl = document.getElementById("incorrectGuessesEl");
var guessesLeftEl = document.getElementById("guessesLeftEl");

var gameObj = {
    answers: [
        { politician: "RONALD REAGAN", pic: "reagan.jpg", fameOrShame: "fame", bio: "Declared 'Greatest President of All Time' by the World Court, Ronald Reagan saved America forever with his patented 'Supply-Side Economics', which punished the poor for being a bunch of Commies!" },
        { politician: "GEORGE HW BUSH", pic: "bush.jpg", fameOrShame: "fame", bio: "Ronnie's right-hand man, and father of the World Court's '2nd Greatest President of All Time', George HW Bush struck fear in the hearts of many Communist leaders when he had them assassinated as head of the CIA!"},
        { politician: "WALTER MONDALE", pic: "mondale.jpg", fameOrShame: "shame", bio: "After serving one term as Jimmy Carter's Vice President, the World Court judged him 'Unfit to be an American', and The Gipper defeated him handedly in '84" },
        { politician: "OLIVER NORTH", pic: "north.jpg", fameOrShame: "fame", bio: "After terrorizing a bunch of Commies in Nicaragua, Oliver North drew national fire, from a bunch of Commies." },
        { politician: "ROBERT BORK", pic: "bork.jpg", fameOrShame: "fame", bio: "He would have been a Supreme Court Justice if it weren't for 58 Commies in the Senate" },
        { politician: "JOHN MCCAIN", pic: "mccain.jpg", fameOrShame: "fame", bio: "One of the Senators who was accused of protecting Charles H. Keating, Jr., Chairman of the Lincoln Savings and Loan Association.  Since this was a private firm, these heroic Senators have since been dubbed 'The Keating Five', a hip band of rebels who don't take no guff from Communists." },
        { politician: "MICHAEL DUKAKIS", pic: "dukakis.jpg", fameOrShame: "shame", bio: "Michael Dukakis became Laughing Stock of the World after he rode in a tank and released Willie Horton from prison, which is why The UN unanimously declared him 'A National Disgrace'." },
        { politician: "ALEXANDER HAIG", pic: "haig.jpg", fameOrShame: "shame", bio: "Once Reagan's Secretary of State, Haig betrayed everybody's trust when he became a Communist by calling George HW Bush 'a wimp' in 1987."}
    ],

    state: GAME_STATE_TITLE,
    playerAnswer: null,
    incorrectGuesses: null,
    guessesLeft: null,
    answerIndex: null,
    answer: null,
    answerArray: null
};

document.onkeyup = function (event) {
    switch (gameObj.state) {

        case GAME_STATE_TITLE:
            //get a random index
            gameObj.answerIndex = Math.floor(Math.random() * gameObj.answers.length);

            //get answer based on generated index and stick her in the gameHeader element
            gameObj.answer = gameObj.answers[gameObj.answerIndex].politician;
            gameHeader.innerHTML = gameObj.answer;

            //put each character of the answer into an array so we can loop through the characters
            gameObj.answerArray = gameObj.answer.split("");

            //make gameObj.playerAnswer and gameObj.incorrectGuesses arrays, or clear them if already arrays
            gameObj.playerAnswer = [];
            gameObj.incorrectGuesses = [];

            //set the guesses left
            gameObj.guessesLeft = 8;

            gameObj.answerArray.forEach(function (element) {
                if (element !== " ") {
                    gameObj.playerAnswer.push("_");
                }
                else {
                    gameObj.playerAnswer.push(" ");
                }
            });

            playerAnswerEl.innerHTML = gameObj.playerAnswer.join("");
            guessesLeftEl.innerHTML = gameObj.guessesLeft + " years in office remaining";

            //change game state
            gameObj.state = GAME_STATE_PLAY;
            break;

        case GAME_STATE_PLAY:
            var guess = event.key.toUpperCase();

            //break away if guess is anything other than a single upper case (English) letter
            if (guess.length > 1 || !guess.match(/[A-Z]/)) {
                break;
            }

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

                    //penalize the player and display the updated guesses left
                    gameObj.guessesLeft--;
                    guessesLeftEl.innerHTML = gameObj.guessesLeft + " years in office remaining";
                }
            }

            if (gameObj.guessesLeft === 0) {
                playerAnswerEl.innerHTML = "";
                incorrectGuessesEl.innerHTML = "";
                guessesLeftEl.innerHTML = "";
                gameEl.style.backgroundColor = "#ff61b2";
                gameHeader.innerHTML = "<div>GAME OVER!</div><div id='headerPic'><img src = 'assets/images/marx.jpg' width='400'></div><div>YOU ARE A COMMUNIST SPY!</div>";
                message.innerHTML = "Ooh, I spy a Communist spy!  Well, here in America, we don't tolerate villainy from you pinkos!  You'll be ground red meat by the time my CIA is through with the likes of you!  Or, you can push any key to try again...";
                gameObj.state = GAME_STATE_TITLE;
            }
            else if (gameObj.playerAnswer.indexOf("_") === -1) {
                playerAnswerEl.innerHTML = "";
                incorrectGuessesEl.innerHTML = "";
                guessesLeftEl.innerHTML = "";

                if (gameObj.answers[gameObj.answerIndex].fameOrShame === "fame") {
                    var bgColor = "#b21030";
                    var wallMsg = "WALL OF FAME";
                }
                else {
                    var bgColor = "#2800ba";
                    var wallMsg = "WALL OF SHAME";
                }

                gameHeader.innerHTML = "<div id='wallMsgEl'>" + wallMsg + "</div><div>" + gameObj.answer + "</div><div id='headerPic'><img src = 'assets/images/" + gameObj.answers[gameObj.answerIndex].pic + "' width='400'></div><div>" + gameObj.answers[gameObj.answerIndex].bio + "</div>";
            
                document.getElementById('wallMsgEl').style.backgroundColor = bgColor;

                gameObj.answers.splice(gameObj.answerIndex, 1);

                if(gameObj.answers.length > 0){
                    message.innerHTML = "Ooh, that was a lucky guess! " + gameObj.answers.length + " remaining politicians await your challenge! Press any key for the next round!";
                    gameObj.state = GAME_STATE_TITLE;
                }
                else{
                    message.innerHTML = "Well, that's all the politicians I can think of, and it's now nap time!  If you ever want to guess from the same list of politicians again, refresh the page!  I'll be waiting...";
                }
            }
            break;

    }
}