var startButton = document.querySelector(".start-button");
var mainText = document.querySelector(".main-text");
var subText = document.querySelector(".sub-text");
var highscoreButton = document.querySelector(".highscore");
var timerText = document.querySelector(".timer");
var choiceList = document.querySelector("#choice-list");
var resultText = document.querySelector("#result-text");
var scoreText = document.querySelector("#score-text");
var inputField = document.querySelector("#input-field");
var againEl = document.querySelector("#play-again");

var score;

var timer;
var timerCount;
var timerRunning = false;

var questions = [];
var currentAnswer = "";

var hiScores = JSON.parse(localStorage.getItem("highScore") || "[]");

console.log(hiScores);

// Start Game
function gameStart(){
    console.log("Game Started");

    score = 0
    questions =
    [
        {
            question: "Commonly used data types DO NOT include:",
            choices: ["Strings", "Booleans", "Alerts", "Numbers"],
            answer: "Alerts"
        },
        {
            question: "The condition in an if / else statement is enclosed within _____.",
            choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
            answer: "Curly Brackets"
        },
        {
            question: "Arrays in JavaScript can be used to store _____.",
            choices: ["Numbers & Strings", "Other Arrays", "Booleans", "All of the Above & Below"],
            answer: "All of the Above & Below"
        },
        {
            question: "String values must be enclosed within _____ when being assigned to variables.",
            choices: ["Commas", "Curly Brackets", "Quotes", "Parentheses"],
            answer: "Quotes"
        },    
        {
            question: "A very useful tool used during development and debugging for printing content to the debugger is:",
            choices: ["Javascript", "Terminal/Bash", "For Loops", "console.log"],
            answer: "console.log"
        },
    ]

    timerCount = 30;
    timerRunning = true;
    timer = setInterval(function() {
        timerCount--;
        timerText.textContent = timerCount;
        if (timerCount <= 0) {
            clearInterval(timer);
            timerCount = 0;
            timerText.textContent = timerCount;
            timerRunning = false;
            console.log("Timer Stopped");
            endGame();
        }
    }, 1000);
    
    chooseQuestion();
}

// End Game and ask player for initials to save highscore
function endGame(){
    mainText.textContent = "Game Over"
    choiceList.innerHTML = resultText.textContent = "";
    subText.textContent = "Please enter your name or initials to save your score.";
    scoreText.textContent = "Final Score: " + score;

    var intialField = document.createElement("input");
    intialField.setAttribute("type", "text");
    intialField.setAttribute("id", "initials");

    inputField.appendChild(intialField);

    var button = document.createElement("button");
    button.setAttribute("id", "submit");
    button.textContent = "Submit";

    inputField.appendChild(button);
    
    renderRefresh();

    submitButton = document.querySelector("#submit");
    submitButton.addEventListener("click", submitScore);
}


// Use information from text field and score and execute the saveScore function depending on values
function submitScore(){
    var savedInit = initials.value;
    console.log(savedInit);
    console.log(initials.value);

    inputField.innerHTML = "";

    if(score <= 0){    
        subText.textContent = "Scores of 0 cannot be saved. Play Again?";
        scoreText.textContent = "Score: N/A";
    }if(savedInit == ""){
        savedInit = "Anonymous";
        subText.textContent = "Score Saved. Play Again?";
        scoreText.textContent = savedInit + " - " + score;
        saveScore(savedInit, score);
    }else{
        subText.textContent = "Score Saved. Play Again?";
        scoreText.textContent = savedInit + " - " + score;
        saveScore(savedInit, score);
    }

}

// Show highscores
function renderScores(){
    mainText.textContent = "Highscores";
    choiceList.innerHTML = againEl.innerHTML = subText.textContent = resultText.textContent = scoreText.textContent = "";

    clearInterval(timer);
    timerCount = "-";
    timerText.textContent = timerCount;

    startButton.remove();

    hiScores = JSON.parse(localStorage.getItem("highScore") || "[]");
    hiScores.sort((b,a)=>a.num-b.num);
    console.log(hiScores)

    for (var i = 0; i < hiScores.length; i++) {

        var li = document.createElement("li");
        li.textContent = hiScores[i].name + " - " + hiScores[i].num;
        li.setAttribute("data-index", i);
    
        subText.appendChild(li);
        console.log("Working");
    }

    // Render the Refresh and Clear Score buttons
    renderRefresh();
    var button = document.createElement("button");
    button.setAttribute("id", "clear-score");
    button.textContent = "Clear Scores";

    resultText.appendChild(button)

    var clearScore = document.querySelector("#clear-score");
    clearScore.addEventListener("click", clearScores);
}

// Clear local storage and empty current scoreboard

function clearScores(){
    subText.innerHTML = "";
    localStorage.clear()
}

// Store localStorage submitScore values into highScore localStorage variable as an array of objects
function saveScore(userName, userScore) {
    var hiScore = {
        name: userName,
        num: userScore
    };

    hiScores.push(hiScore);
    
    localStorage.setItem("highScore", JSON.stringify(hiScores));
    console.log(hiScores)
}

// Refreshes Page/Restarts Game
function renderRefresh(){
    var button = document.createElement("button");
    button.setAttribute("id", "refresh");
    button.textContent = "Restart Game";
    
    againEl.appendChild(button);
    
    refreshButton = document.querySelector("#refresh");
    refreshButton.addEventListener("click", refreshPage);
    function refreshPage(){
        location.reload();
    }
}


// Array Shuffler
function shuffle(array){
    array.sort(() => Math.random() - 0.5);
}

// Create Button List for Answer Choices from questions array, and store the answer in current answer
function fillButtons(fbArray, fbAnswer){
    shuffle(fbArray);
    currentAnswer = fbAnswer;
    choiceList.innerHTML = "";
    // console.log(currentAnswer, fbAnswer)
    for (var i = 0; i < fbArray.length; i++) {

        // var li = document.createElement("li");
        // li.setAttribute("data-index", i);
    
        var button = document.createElement("button");
        button.setAttribute("id", fbArray[i]);
        button.setAttribute("onClick","choiceClick(this.id)");
        button.textContent = fbArray[i];
    
        // li.appendChild(button);
        choiceList.appendChild(button);
    }
}


// Choose Question
function chooseQuestion(){
    subText.textContent = "";
    startButton.remove();
    
    if(timerRunning){
        questChoice = [Math.floor(Math.random() * questions.length)];
    
        scoreText.textContent = "Score: " + score;
        
        if(questChoice == 0){
            mainText.textContent = questions[0].question;
            fillButtons(questions[0].choices, questions[0].answer);
        } else if(questChoice == 1){
            mainText.textContent = questions[1].question;
            fillButtons(questions[1].choices, questions[1].answer);
        } else if(questChoice == 2){
            mainText.textContent = questions[2].question;
            fillButtons(questions[2].choices, questions[2].answer);
        } else if(questChoice == 3){
            mainText.textContent = questions[3].question;
            fillButtons(questions[3].choices, questions[3].answer);
        } else if(questChoice == 4){
            mainText.textContent = questions[4].question;
            fillButtons(questions[4].choices, questions[4].answer);
        }
    }

}

// Get id of the clicked button and compare it to variable currentAnswer
function choiceClick(clicked_id){
    if(clicked_id == currentAnswer){
        score++;
        resultText.style.color = 'yellowgreen';
        resultText.textContent = "Correct";
        chooseQuestion();
    }else{
        //For some reason timerCount-3 doesn't work?
        timerCount--;
        timerCount--;
        timerCount--;
        resultText.style.color = 'orangered';
        resultText.textContent = "Incorrect";
        chooseQuestion();
    }
}

highscoreButton.addEventListener("click", renderScores);
startButton.addEventListener("click", gameStart);