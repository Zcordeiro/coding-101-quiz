var highscoreEL = document.querySelector('#highScore');
var timerEl = document.querySelector('#timer');
var questions = document.querySelector('#questions');
var startButton = document.querySelector('#startButton');


function timerClock() {
    var timeLeft = 60;

    var timeInterval = setInterval(function () {

        if(timeLeft > 1) {
            timerEl.textContent = 'You have ' + timeLeft + ' seconds to go!';
            timeLeft--;

        } else if(timeLeft === 1) {
            timerEl.textContent = 'You have ' + timeLeft + ' second to go!';
            timeLeft--;
            
        } else {
            timerEl.textContent = 'Times Up!';
            clearInterval(timeInterval)
        }
    }, 1000)
};

function startQuiz() {
    timerClock();
}


startButton.addEventListener('click', startQuiz());

