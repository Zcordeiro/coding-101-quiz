// var highscoreEL = document.querySelector('#highScore');
// var timerEl = document.querySelector('#timer');
// var questions = document.querySelector('#questions');
// var startButton = document.querySelector('#startButton');


// function timerClock() {
//     var timeLeft = 60;

//     var timeInterval = setInterval(function () {

//         if (timeLeft > 1) {
//             timerEl.textContent = 'You have ' + timeLeft + ' seconds to go!';
//             timeLeft--;
//         } else if (timeLeft === 1) {
//             timerEl.textContent = 'You have ' + timeLeft + ' second to go!';
//             timeLeft--;
//         } else 
//             timerEl.textContent = 'Times Up!';
//             clearInterval(timeInterval);
//     }, 1000)
// }

// startButton.addEventListener('click', timerClock());





var highscoreEL = document.querySelector('#highScore');
var timerEl = document.querySelector('#timer');
var questions = document.querySelector('#questions');
var possibleOptions = document.querySelector('#multipleChoice');
var startButton = document.querySelector('#startButton');
var currentQuestion = 0;
var score = 0;
var time;
var timeLeft;



//all of the questions, choices and correct answers below.
var listOfQuestions = [{
    textQuestion: 'Question 1: In Javascript an array is a special type of variable that does what?',
    answers: [
        'A: Simple math equations',
        'B: Stores a list of values',
        'C: Determines true or false',
        'D: Stores a single value that cannot chage',
    ],
    correctAnswer: 'B: Stores a list of values'
},
{
    textQuestion: 'Question 2: What are the different types of data you can store in a variable?',
    answers: [
        'A: Numbers, Boolean, Array',
        'B: Functions, Array, Numbers',
        'C: Numbers, Boolean, Strings',
        'D: Array, Functions, Boolean'
    ],
    correctAnswer: 'C: Numbers, Boolean, Strings'
},
{
    textQuestion: 'Question 3: What does it mean when you \'call\' a function?',
    answers: [
        'A: You activate the function',
        'B: It will only work on mobile',
        'C: You create the function by delcaring it the name \'call\'',
        'D: You delete the function',
    ],
    correctAnswer: 'A: You activate the function'
},
{
    textQuestion: 'Question 4: Which of the following would be the correct way to connect to an h1 with the id of heading from your HTML file to your javascript?',
    answers: [
        'A: var title = document.querySelector(\'#heading\')',
        'B: var title = document.querySelector(\'.heading\')',
        'C: var h1 = document.querySelector(\'h1\')',
        'D: var title = document.querySelector(\'#h1\')',
    ],
    correctAnswer: 'A: var title = document.querySelector(\'#heading\')'
},
{
    textQuestion: 'Question 5: What does it mean when you \'declare\' a function??',
    answers: [
        'A: Have it take over the website',
        'B: Yelling the word function out loud',
        'C: You activate the function',
        'D: You create a function',
    ],
    correctAnswer: 'D: You create a function'
},
];
console.log(listOfQuestions[currentQuestion].correctAnswer)

//This starts the quiz when you press the start button
startButton.addEventListener('click', startQuiz);

function startQuiz() {
    timeLeft = 60;
    startButton.style.display = 'none';
    
    timerClock();
    questionDisplay();
    answersDisplay();
}


//The following functions show the questions and the choices one by one.
function answersDisplay() {
    possibleOptions.innerHTML = '';

    for (var i = 0; i < listOfQuestions[currentQuestion].answers.length; i++) {
        var options = document.createElement('button');
        options.className = 'currentOptions';
        options.textContent = listOfQuestions[currentQuestion].answers[i];
        options.setAttribute('onclick', 'nextQuestion(event)')
        possibleOptions.appendChild(options);
    }

    console.log(possibleOptions)
};

function questionDisplay() {
    questions.innerHTML = '';

    for (var i = 0; i < listOfQuestions[currentQuestion].textQuestion.length; i++) {
        // questions.innerHTML = listOfQuestions[currentQuestion].question[i];
        var questionText = document.createElement('span');
        questionText.textContent = listOfQuestions[currentQuestion].textQuestion[i];
        questions.appendChild(questionText);
    }

    console.log(questions)
};

//This function not only moves on to the next question once you choose an answer it starts determining your score and finishes the game
function nextQuestion(event) {
    var chosenAnswer = event.innerHTML;
    if(chosenAnswer == listOfQuestions[currentQuestion].correctAnswer) {
        score++;
    } else {
        score--;
    }
    console.log(score);
    if(currentQuestion > 5){
        gameOver();
    }
   
    currentQuestion++;
    questionDisplay();
    answersDisplay();
}

//Just the timer and the text around it.
function timerClock() {

    time = setInterval(function () {

        if (timeLeft > 1) {
            timerEl.textContent = 'You have ' + timeLeft + ' seconds to go!';
            timeLeft--;

        } else if (timeLeft === 1) {
            timerEl.textContent = 'You have ' + timeLeft + ' second to go!';
            timeLeft--;

        } else {
            timerEl.textContent = 'Game Over!';
            clearInterval(time)
        }
    }, 1000)
};


//This is what runs once the quiz finishes.
function gameOver() {
    console.log("finish");
    timeLeft = 0;
    startButton.innerHTML = 'submit';
    questions.innerHTML = 'You did it! You scored: ' + ((score / 5) * 100) + '%';
}