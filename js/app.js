$(document).ready(function () {

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);
    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });

    //Instantiating global variables.
    var theSecret = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
    var usrGuess = "";
    var usrGuessList = "";
    var numberOfGuesses = 0;
    var guesses = [];
    var distance = null;
    var previousDistance = null;


    //Event and function for when user submits guess by clicking on guess button or hitting the enter key.
    window.addEventListener("load", function(){
        document.getElementById("guessButton").onclick = function(){
            event.preventDefault();
            usrGuess = parseInt(document.getElementById("userGuess").value.replace(/\s/g,''));
            addGuesses(usrGuess);
        }
    });

    //When user clicks "new game", newGame function gets called.
    document.getElementById('newGame').addEventListener('click', function() {
        newGame();
    });

    function newGame() {

        usrGuessList = document.getElementById("guessList");
        while (usrGuessList.hasChildNodes()) {
            usrGuessList.removeChild(usrGuessList.firstChild);
        }
        theSecret = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        numberOfGuesses = 0;
        guesses = [];
        distance = null;
        previousDistance = null;
        document.getElementById('count').innerHTML = '';
        document.getElementById('feedback').innerHTML = "Make your Guess!";

    }
    //validating user input and adding the number guess to a list.
    function addGuesses(usrGuess) {

        if (isNaN(usrGuess)) {
            alert("Try entering an actual number!")
        }
        else if (usrGuess > 100) {
            alert("Enter a number between 1 and 100!")
            document.getElementsByName('userGuess')[0].value = "";
            document.getElementsByName('userGuess')[0].placeholder = "Enter Your Guess";
        }
        else {
            numberOfGuesses += 1;
            guesses.push(usrGuess);
            usrGuessList = document.getElementById("guessList");
            var node = document.createElement("LI");
            var textnode = document.createTextNode(usrGuess);
            node.appendChild(textnode);
            document.getElementById("guessList").appendChild(node);
            document.getElementById('count').innerHTML = numberOfGuesses;
            document.getElementsByName('userGuess')[0].value = "";
            document.getElementsByName('userGuess')[0].placeholder = "Enter Your Guess";

            hotCold();
        }
    }

    //function that performs the main operation for the hot or cold game.
    function hotCold () {

        distance = Math.abs(theSecret - usrGuess);
        console.log(theSecret);
        previousDistance = Math.abs(theSecret - guesses[guesses.length - 2]);
        console.log(previousDistance);

        if (usrGuess === theSecret) {
            document.getElementById('feedback').innerHTML = 'Congrats! You got it in ' + numberOfGuesses + ' attempts! The secret number was ' + theSecret;
            // $('#hint').html('Congrats! You got it in ' + numberOfGuesses + ' attempts! The secret number was ' + theSecret);
        } else {
            // console.log(usrGuess, theSecret, previousDistance, distance);
            if (isNaN(previousDistance)) {
                if (usrGuess > theSecret) {
                    document.getElementById('feedback').innerHTML = 'Guess lower! Last guess: ' + usrGuess;
                }
                else if (usrGuess < theSecret) {
                    document.getElementById('feedback').innerHTML = 'Guess higher! Last guess: ' + usrGuess;
                }

            }
            else if (distance > previousDistance) {
                if (usrGuess > theSecret) {
                    document.getElementById('feedback').innerHTML = 'You\'re getting colder, guess lower! Last guess: ' + usrGuess;
                }
                else if (usrGuess < theSecret) {
                    document.getElementById('feedback').innerHTML = 'You\'re getting colder, guess higher! Last guess: ' + usrGuess;
                }
            }
            else if (distance < previousDistance) {
                if (usrGuess > theSecret) {
                    document.getElementById('feedback').innerHTML = 'You\'re getting hotter, guess lower! Last guess: ' + usrGuess;
                }
                else if (usrGuess < theSecret) {
                    document.getElementById('feedback').innerHTML = 'You\'re getting hotter, guess higher! Last guess: ' + usrGuess;
                }
            }
            else if (distance === previousDistance) {
                if (usrGuess > theSecret) {
                    document.getElementById('feedback').innerHTML = 'You\'re on fire, guess lower! Last guess: ' + usrGuess;
                }
                else if (usrGuess < theSecret) {
                    document.getElementById('feedback').innerHTML ='You\'re on fire, guess higher! Last guess: ' + usrGuess;
                }
            }

        }

    }

});
