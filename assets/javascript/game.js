//game states
var GAME_STATE_TITLE = 0;
var GAME_STATE_PLAY = 1;

var content = document.getElementById("content");
var message = document.getElementById("message");
var gameEl = document.getElementById("gameEl");
var gameHeader = document.getElementById("gameHeader");
var playerAnswerEl = document.getElementById("playerAnswerEl");
var incorrectGuessesEl = document.getElementById("incorrectGuessesEl");
var guessesLeftEl = document.getElementById("guessesLeftEl");

var gameObj = {
    answers: [
        {politician: "RONALD REAGAN", pic: "reagan.jpg", fameOrShame: "fame"},
        {politician: "GEORGE HW BUSH", pic: "bush.jpg", fameOrShame: "fame"},
        {politician: "WALTER MONDALE", pic: "mondale.jpg", fameOrShame: "shame"},
        {politician: "OLIVER NORTH", pic: "north.jpg", fameOrShame: "fame"},
        {politician: "ROBERT BORK", pic: "bork.jpg", fameOrShame: "fame"},
        {politician: "JOHN MCCAIN", pic: "mccain.jpg", fameOrShame: "fame"},
        {politician: "MICHAEL DUKAKIS", pic: "dukakis.jpg", fameOrShame: "shame"},
        {politician: "ALEXANDER HAIG", pic: "haig.jpg", fameOrShame: "shame"}
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

            if (gameObj.guessesLeft === 0) {
                playerAnswerEl.innerHTML = "";
                incorrectGuessesEl.innerHTML = "";
                guessesLeftEl.innerHTML = "";
                gameEl.style.height = content.clientHeight + "px";
                gameEl.style.backgroundColor = "#ff61b2";
                gameHeader.innerHTML = "<div>GAME OVER!</div><div id='headerPic'><img src = 'assets/images/marx.jpg' width='400'></div><div>YOU ARE A COMMUNIST SPY!</div>";
                message.innerHTML = "Ooh, I spy a Communist spy!  Well, here in America, we don't tolerate villainy from you pinkos!  You'll be ground red meat by the time my CIA is through with the likes of you!  Or, you can push any key to try again...";
            }
            break;

    }
}