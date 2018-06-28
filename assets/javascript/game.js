//game states
var GAME_STATE_TITLE = 0;
var GAME_STATE_PLAY = 1;

var gameHeader = document.getElementById("gameHeader");
var playerAnswerEl = document.getElementById("playerAnswerEl");
var incorrectGuessesEl = document.getElementById("incorrectGuessesEl");
var guessesLeftEl = document.getElementById("guessesLeftEl");

var gameObj = {
    answers: [
        "RONALD REAGAN",
        "GEORGE HW BUSH",
        "WALTER MONDALE",
        "OLIVER NORTH",
        "ROBERT BORK",
        "JOHN MCCAIN",
        "MICHAEL DUKAKIS",
        "ALEXANDER HAIG"
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
            gameObj.answer = gameObj.answers[gameObj.answerIndex];
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

            //check to see if the guess is correct and it's not already a correct guess
            if (gameObj.answerArray.indexOf(guess) !== -1 && gameObj.playerAnswer.indexOf(guess) === -1) {
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
            else if(gameObj.incorrectGuesses.indexOf(guess) === -1){
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
            
            break;

    }
}