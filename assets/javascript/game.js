//game states
var GAME_STATE_TITLE = 0;
var GAME_STATE_PLAY = 1;

//get elements
var message = document.getElementById("message");
var gameEl = document.getElementById("gameEl");
var gameHeader = document.getElementById("gameHeader");
var playerAnswerEl = document.getElementById("playerAnswerEl");
var incorrectGuessesEl = document.getElementById("incorrectGuessesEl");
var guessesLeftEl = document.getElementById("guessesLeftEl");
var score = document.getElementById("score");
var wins = document.getElementById("wins");
var loses = document.getElementById("loses");

//hide score display
score.style.display = "none";

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
    wins: 0,
    loses: 0
};

document.onkeyup = function (event) {
    switch (gameObj.state) {

        case GAME_STATE_TITLE:
            //only proceed if user hit 1
            if (event.key !== "1") break;

            //get a random index
            gameObj.answerIndex = Math.floor(Math.random() * gameObj.answers.length);

            //get answer based on generated index and stick her in the gameHeader element
            gameObj.answer = gameObj.answers[gameObj.answerIndex].politician;
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

            //set bg to none in case it was Commie pink
            gameEl.style.backgroundColor = "#000000";

            //hide score display
            score.style.display = "none";

            //Ronnie's new message
            message.innerHTML = "I'm thinking of a politician, can you guess who? There will be no hand-outs, so pull yourself up by your bootstraps and get to work!";

            //change game state
            gameObj.state = GAME_STATE_PLAY;
            break;

        case GAME_STATE_PLAY:
            //convert player guess to upper case
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

            //lose condition
            if (gameObj.guessesLeft === 0) {
                //clear elements
                playerAnswerEl.innerHTML = "";
                incorrectGuessesEl.innerHTML = "";
                guessesLeftEl.innerHTML = "";

                //declare the player a Commie
                gameEl.style.backgroundColor = "#ff61b2";
                gameHeader.innerHTML = "<div>GAME OVER!</div><div id='headerPic'><img src = 'assets/images/marx.jpg' width='400'></div><div>YOU ARE A COMMUNIST SPY!</div>";
                message.innerHTML = "Ooh, I spy a Communist spy!  Well, here in America, we don't tolerate villainy from you pinkos!  You'll be ground red meat by the time my CIA is through with the likes of you!  Or, you can push '1' to try again...";

                //calc loses
                gameObj.loses++;

                //display score
                score.style.display = "table";
                wins.innerHTML = "TIMES A PATRIOT: " + gameObj.wins;
                loses.innerHTML = "TIMES A COMMIE: " + gameObj.loses;

                //change state back to title
                gameObj.state = GAME_STATE_TITLE;
            }
            //win condition
            else if (gameObj.playerAnswer.indexOf("_") === -1) {
                //clear elements
                playerAnswerEl.innerHTML = "";
                incorrectGuessesEl.innerHTML = "";
                guessesLeftEl.innerHTML = "";

                //find out if politician is a patriot or Commie
                if (gameObj.answers[gameObj.answerIndex].fameOrShame === "fame") {
                    var bgColor = "#b21030";
                    var wallMsg = "WALL OF FAME";
                }
                else {
                    var bgColor = "#2800ba";
                    var wallMsg = "WALL OF SHAME";
                }

                //educate player about politician
                gameHeader.innerHTML = "<div id='wallMsgEl'>" + wallMsg + "</div><div>" + gameObj.answer + "</div><div id='headerPic'><img src = 'assets/images/" + gameObj.answers[gameObj.answerIndex].pic + "' width='400'></div><div id='bio'>" + gameObj.answers[gameObj.answerIndex].bio + "</div>";
                document.getElementById('wallMsgEl').style.backgroundColor = bgColor;

                //calc wins
                gameObj.wins++;

                //display score
                score.style.display = "table";
                wins.innerHTML = "TIMES A PATRIOT: " + gameObj.wins;
                loses.innerHTML = "TIMES A COMMIE: " + gameObj.loses;

                //remove politician from array
                gameObj.answers.splice(gameObj.answerIndex, 1);

                //if there's any politicians left, challenge the player to another round
                if (gameObj.answers.length > 0) {
                    message.innerHTML = "Ooh, that was a lucky guess! " + gameObj.answers.length + " remaining politicians await your challenge! Press '1' for the next round!";
                    gameObj.state = GAME_STATE_TITLE;
                }

                //otherwise, Ronnie takes a nap
                else {
                    message.innerHTML = "Well, that's all the politicians I can think of, and it's now nap time!  If you ever want to guess from the same list of politicians again, refresh the page!  I'll be waiting...";

                    //we're done with the game, so set the state to null
                    gameObj.state = null;
                }
            }
            break;

    }
}