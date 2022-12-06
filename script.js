// These variables tie in the HTML file as well as set up some of the variables used throughout the functions below.
var highscoreEL = document.querySelector('#highScore');
var timerEl = document.querySelector('#timer');
var questions = document.querySelector('#questions');
var possibleOptions = document.querySelector('#multipleChoice');
var startButton = document.querySelector('#startButton');
var currentQuestion = 0;
var score = 0;
var time;
var timeLeft;
var winnerInitials = [];
var winnerScore = [];

// This variable has several objects in it that hold all of the questions, options, and answers within them. 
var listOfQuestions = [{
    quizText: 'Question 1: In Javascript an array is a special type of variable that does what?',
    answers: [
        'A: Simple math equations',
        'B: Stores a list of values',
        'C: Determines true or false',
        'D: Stores a single value that cannot chage',
    ],
    correctAnswer: 'B: Stores a list of values'
},
{
    quizText: 'Question 2: What are the different types of data you can store in a variable?',
    answers: [
        'A: Numbers, Boolean, Array',
        'B: Functions, Array, Numbers',
        'C: Numbers, Boolean, Strings',
        'D: Array, Functions, Boolean'
    ],
    correctAnswer: 'C: Numbers, Boolean, Strings'
},
{
    quizText: 'Question 3: What does it mean when you \'call\' a function?',
    answers: [
        'A: You activate the function',
        'B: It will only work on mobile',
        'C: You create the function by delcaring it the name \'call\'',
        'D: You delete the function',
    ],
    correctAnswer: 'A: You activate the function'
},
{
    quizText: 'Question 4: Which of the following would be the correct way to connect to an h1 with the id of heading from your HTML file to your javascript?',
    answers: [
        'A: var title = document.querySelector(\'#heading\')',
        'B: var title = document.querySelector(\'.heading\')',
        'C: var h1 = document.querySelector(\'h1\')',
        'D: var title = document.querySelector(\'#h1\')',
    ],
    correctAnswer: 'A: var title = document.querySelector(\'#heading\')'
},
{
    quizText: 'Question 5: What does it mean when you \'declare\' a function??',
    answers: [
        'A: Have it take over the website',
        'B: Yelling the word function out loud',
        'C: You activate the function',
        'D: You create a function',
    ],
    correctAnswer: 'D: You create a function'
}
];

document.addEventListener("DOMContentLoaded", startPage);
startButton.addEventListener('click', timerClock);
startButton.addEventListener('click', startQuiz);
highscoreEL.addEventListener('click', displayScores);


function startPage() {
    questions.innerHTML = 'Coding 101 Quiz'
    possibleOptions.innerHTML = 'Welcome to the coding quiz! You will be given 60 seconds to answer some questions on coding! Try your best to beat the high score!';
    highscoreEL.innerHTML = 'View High Scores';
    displayBox.classList.remove("leaderboard");
    displayBox.innerHTML = '';
    timerEl.style.display = 'none';

    currentQuestion = 0;
    score = 0;

    startButton.style.display = 'inline';
};

//This function starts the quiz. It is activated with an event listener further down the code.
function startQuiz() {
    timeLeft = 60;
    timerEl.style.display = 'inline';
    startButton.style.display = 'none';
    highscoreEL.style.display = 'none';

    questionDisplay();
    answersDisplay();
};

//This function creates the buttons for all of the multiple choice options throughout the quiz.
function answersDisplay() {
    possibleOptions.innerHTML = '';

    for (var i = 0; i < listOfQuestions[currentQuestion].answers.length; i++) {
        var options = document.createElement('button');
        options.className = 'currentOptions';
        options.textContent = listOfQuestions[currentQuestion].answers[i];
        options.addEventListener('click', nextQuestion);
        possibleOptions.appendChild(options);
    }
};

//The following function displays the text of the different questions
function questionDisplay() {
    questions.innerHTML = '';
    var questionText = document.createElement('p');
    questionText.textContent = listOfQuestions[currentQuestion].quizText;
    questions.appendChild(questionText);
};

//This function not only moves on to the next question once you choose an answer it starts determining your score and finishes the game. It will also subtract ten seconds each time someone answers incorrectly.
function nextQuestion() {
    var chosenAnswer = this.textContent;
    console.log('chosen answer: ' + chosenAnswer)
    if (chosenAnswer === listOfQuestions[currentQuestion].correctAnswer) {
        score++;
    } else {
        timeLeft -= 10;
    }
    console.log(score);

    currentQuestion++;
    if (currentQuestion >= 5) {
        gameOver();
    } else {
        questionDisplay();
        answersDisplay();
    }
};

// This is the timer for the quiz. The first else if statement just changes the word 'second(s)' to 'second'.
function timerClock() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = 'You have ' + timeLeft + ' seconds to go!';
            timeLeft--;

        } else if (timeLeft === 1) {
            timerEl.textContent = 'You have ' + timeLeft + ' second to go!';
            timeLeft--;

        } else {
            timerEl.textContent = 'Times Up!';
            clearInterval(timeInterval)
        }
    }, 1000)
};

//This is what runs once the quiz finishes.
function gameOver() {
    timeLeft = 0;
    var submitBtn = document.createElement('button');
    var hsInitialForm = document.createElement('input');

    hsInitialForm.setAttribute('type', 'text');
    hsInitialForm.setAttribute('placeholder', 'Type your initials here!');
    hsInitialForm.style.margin = '2%';

    highscoreEL.textContent = 'Back Home';
    highscoreEL.style.display = 'inline';
    highscoreEL.addEventListener('click', startPage);

    submitBtn.classList.add('submitBtn');
    submitBtn.innerHTML = 'Finish';

    questions.textContent = 'You did it! You scored: ' + ((score / 5) * 100) + '%';
    possibleOptions.innerHTML = 'Type your initials below to see how well you did compared to others!';

    possibleOptions.appendChild(hsInitialForm);
    possibleOptions.appendChild(submitBtn);

    winnerScore.push(score);
    localStorage.setItem('score', JSON.stringify(winnerScore));

    submitBtn.addEventListener('click', function () {
        var initials = hsInitialForm.value.trim();

        if (hsInitialForm === '') {
            alert('must fill in initials')
        }

        winnerInitials.push(initials);
        localStorage.setItem('initials', JSON.stringify(winnerInitials));

        startPage();
    });

};


var initialsDisplay = JSON.parse(localStorage.getItem('initials'));
var scoreDisplay = JSON.parse(localStorage.getItem('score'));
var displayBox = document.getElementById('hsDisplayBox');

function displayScores() {
    questions.innerHTML = "";
    possibleOptions.innerText = "";
    startButton.style.display = 'none';

    displayBox.classList.add("leaderboard");

    displayBox.innerHTML = `<h2>High Scores</h2><button id="clearScores" class="btn" onclick="clearScores()">Clear Scores</button><button class ="btn" onclick="startPage()">Back Home</button>`;
    var winnersList = document.createElement('ul');
    displayBox.appendChild(winnersList);


    var winners = document.createElement('li');

    winners.textContent = 'Player: ' + winnerInitials + ' Score: ' + ((winnerScore / 5) * 100) + '%';
    winnersList.appendChild(winners);
};

function clearScores() {
    localStorage.clear();
    displayBox.innerHTML = `<h3>Scores have been Cleared</h3><button class ="btn" onclick="startPage()">Back Home</button>"`
};





