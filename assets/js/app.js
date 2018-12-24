var countdownNum;
var timerCounter;
var numCorrect;
var numIncorrect;
var question; // variable to determine which question is being displayed
var questionsArray = ["Q1. What is the name of Sid's dog in Toy Story?",
    "Q2. What kind of whale takes Dory and Marlin to Sidney in Finding Nemo?",
    "Q3. Which member of the Incredibles family can turn invisible?",
    "Q4. What year does Walle bring humans back to Earth?",
    "Q5. What clan does Merida from Brave belong to?"
];
var answersArray = [
    ["Bruiser", "Scud", "Spike", "Max"],
    ["Killer", "Blue", "Beluga", "Humpback"],
    ["Bob", "Helen", "Violet", "Dash"],
    ["5523", "4218", "3381", "2805"],
    ["Dunbroch", "Anstruther", "Galbraith", "Rutherford"]
];
var correctAnswers = ["Scud", "Blue", "Violet", "2805", "Dunbroch"];







// on click function that generates the timer and game content
$(".startButton").on("click", setUpGame);



//*****************************//
// function to set up the game //
//*****************************//

function setUpGame() {

    // clear the welcomeDiv
    // $(".welcomeDiv").css("box-shadow", "0px 0px 0px 0px rgba(0, 0, 0, 0)");
    // $(".welcomeDiv").empty();

    // remove classes and content from welcome card
    $(".gradient-border").empty();
    $(".gradient-border").attr("id", "empty");
    $(".gradient-border").removeClass("gradient-border");

    

    $(".gameTitle").empty();
    $(".questionDiv").empty();
    $(".answerDiv").empty();


    // set initial variables
    numCorrect = 0;
    numIncorrect = 0;
    question = 0;

    // call a function to display the timer
    setUpTimer();

    // call a function to display gameDiv
    setUpGameDiv();

    // call a function to begin decreasing the countdownNum
    clearInterval(timerCounter);
    timerCounter = setInterval(updateTimer, 1000);

}; // end setUpGame





//*************************************//
// function to set up timerDiv content //
//*************************************//

function setUpTimer() {

    // clear the timerDiv
    $(".timerDiv").empty();
    var timerDiv = $("<div>");
    timerDiv.addClass("timer");
    $(".timerDiv").append(timerDiv);

    countdownNum = 10;

    // generate the timer content
    var timerTitle = $("<h1>");
    timerTitle.text("Remaining Time");
    $(".timerDiv").prepend(timerTitle);
    $(".timerDiv").css("box-shadow", "0px 0px 10px 2px rgb(255, 255, 255)");
    
    // generate the counter
    var counter = $("<p>");
    counter.text("10");
    counter.addClass("counter")
    $(".timer").append(counter);
    $(".timer").css("background-color", "rgba(255, 255, 255, 0.147)");
    $(".timer").css("border", "1px solid white");
};



//**********************************************//
// function to decrease timer and update in DOM //
//**********************************************//

function updateTimer() {
    if (countdownNum == 0) {
        clearInterval(timerCounter);

        // call a function to show the correct answer and set a timeout 
        var answer = "null";
        checkAnswer(answer);


    }
    else {
        countdownNum--;
        $(".counter").text(countdownNum);
    }
};




//****************************************//
// function to set up the gameDiv content //
//****************************************//

function setUpGameDiv() {

    // $(".gameDiv").css("background-color", "rgba(255, 255, 255, 0.247)");
    $(".gameDiv").css("box-shadow", "0px 0px 10px 2px rgb(255, 255, 255");

    var gameH = $("<h1>");
    gameH.text("⤛ Pixar Trivia ⤜");
    $(".gameTitle").append(gameH);

    // call a function to display the questions depending on the question variable
    displayQuestion(question);


}




//***********************************//
// function to display the questions //
//***********************************//

function displayQuestion(questionNum) {

    if (questionNum == 5) {

        clearInterval(timerCounter);

        $(".questionDiv").empty();
        $(".answerDiv").empty();

        var end = $("<p>");
        end.text("GameOver!");

        var scoreCor = $("<p>");
        scoreCor.text("# Correct: " + numCorrect);

        var scoreInc = $("<p>");
        scoreInc.text("# Incorrect: " + numIncorrect);

        var playAgain = $("<button>");
        playAgain.text("Play Again");
        playAgain.addClass("button startButton");

        $(".questionDiv").append( end, scoreCor, scoreInc, playAgain);

        $(document).on("click", ".startButton", function(){
            $(".questionDiv").empty();
            setUpGame();
        });

    }

    else {

        $(".questionDiv").empty();

        var question = $("<p>");
        question.text(questionsArray[questionNum]);
        $(".questionDiv").append(question);

        // call a function to display the answers
        displayAnswers(questionNum);

    }

};


//*********************************//
// function to display the answers //
//*********************************//

function displayAnswers(questionNum) {

    $(".answerDiv").empty();
    var hr = $("<p>");
    hr.addClass("hr");
    hr.text("_____________________________________________________________");
    $(".answerDiv").append(hr);

    for (var i = 0; i < 4; i++) {
        var p = $("<h3>");
        p.text(answersArray[questionNum][i]);
        p.addClass("answerP");
        p.attr("data-answer", answersArray[questionNum][i]);
        $(".answerDiv").append(p);
    }
}




// on click function
$(document).on("click", ".answerP", getAnswer);


function getAnswer() {
    var answer = ($(this).attr("data-answer"));
    console.log(answer);

    // check if answer was correct
    checkAnswer(answer);

}


function checkAnswer(answer) {

    $(".questionDiv").empty();
    $(".answerDiv").empty();
    

    if (correctAnswers.includes(answer)) {
        var p = $("<p>");
        p.text("Correct!");
        $(".questionDiv").append(p);

        question++;
        numCorrect++;
        console.log(numCorrect);

        clearInterval(timerCounter);

        // display next question after 3 seconds
        var nextQuestion = setTimeout(function () {
            countdownNum = 10;
            $(".counter").text(countdownNum);
            timerCounter = setInterval(updateTimer, 1000);
            displayQuestion(question);

        }, 3000);

    }
    else if (answer == "null") {
        var p = $("<p>");
        p.text("Time's Up!");
        $(".questionDiv").append(p);

        var correct = $("<p>");
        correct.text("The correct answer was " + correctAnswers[question]);
        $(".questionDiv").append(correct);
        
        question++;
        numIncorrect++;
        console.log(numIncorrect);

        clearInterval(timerCounter);

        // display next question after 3 seconds
        var nextQuestion = setTimeout(function () {
            countdownNum = 10;
            $(".counter").text(countdownNum);
            timerCounter = setInterval(updateTimer, 1000);
            displayQuestion(question);
        }, 3000);
    }

    else {
        var p = $("<p>");
        p.text("Incorrect!");
        $(".questionDiv").append(p);

        var correct = $("<p>");
        correct.text("The correct answer was " + correctAnswers[question]);
        $(".questionDiv").append(correct);
        
        question++;
        numIncorrect++;
        console.log(numIncorrect);

        clearInterval(timerCounter);

        // display next question after 3 seconds
        var nextQuestion = setTimeout(function () {
            countdownNum = 10;
            $(".counter").text(countdownNum);
            timerCounter = setInterval(updateTimer, 1000);
            displayQuestion(question);
        }, 3000);

    }
}


