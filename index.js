'use strict';

let questionNumber = 0;
let score = 0;
let shuffledDeck;

function shuffleQuestions() {
    let shuffledQuestions = Array.from(QUESTIONS);
    let count = shuffledQuestions.length;
    let temp;
    let index;

    while (count > 0) {
        index = Math.floor(Math.random() * count);

        count--;

        temp = shuffledQuestions[count];
        shuffledQuestions[count] = shuffledQuestions[index];
        shuffledQuestions[index] = temp;
    }

    return shuffledQuestions;
}

function generateQuizQuestionString(question) {
    let answerOptionsArray = question['answerOptions'];
    
    return `
    <form>
        <fieldset>
            <legend><h3>${question['question']}</h3></legend>
            <label><input type="radio" name="userAnswer" value="${answerOptionsArray[0]}" required> <span>${answerOptionsArray[0]}</span></label>
            <br><br>
            <label><input type="radio" name="userAnswer" value="${answerOptionsArray[1]}" required> <span>${answerOptionsArray[1]}</span></label>
            <br><br>
            <label><input type="radio" name="userAnswer" value="${answerOptionsArray[2]}" required> <span>${answerOptionsArray[2]}</span></label>
            <br><br>
            <label><input type="radio" name="userAnswer" value="${answerOptionsArray[3]}" required> <span>${answerOptionsArray[3]}</span></label>
            <br><br>
            <button class="submit-answer js-submit-answer" type="submit">Submit</button>
        </fieldset>
    </form>`;
}
    
// This function will be responsible for handling when users click the "Start Quiz" button
function startQuizClicked() {
    $('.main-container').on('click', '.js-start', function(event) {
        shuffledDeck = shuffleQuestions();

        $('#quiz-page').html(generateQuizQuestionString(shuffledDeck[questionNumber]));

        questionNumber++;
        $('.js-question-number').text(questionNumber + '/10');
        $('.js-current-score').text(score);

        $('#home-page').removeClass('view').addClass('hide-view');
        $('#quiz-page').removeClass('hide-view').addClass('view');
    });
}

function validateAnswer() {
    let radioButtons = document.getElementsByName("userAnswer");
    let selectedAnswer = "";
    let answer = shuffledDeck[questionNumber - 1].answer;

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedAnswer = radioButtons[i].value;
        }
    }

    if (selectedAnswer.length === 0) {
        alert('Please select an answer to proceed.')
        return;
    } else {
        if (selectedAnswer === answer) {
            return true;
        } else if (selectedAnswer !== answer) {
            return false;
        }
    }
}

function generateAnswerPage(value) {
    if (value) {
        score++;
        $('.js-current-score').text(score);

        let altString = `${shuffledDeck[questionNumber - 1].answer} logo.`;

        return `
            <h3>Correct! You just earned the ${shuffledDeck[questionNumber - 1].answer} badge.</h3>
            <div class="wrapper">
                <img id="badge" src=${shuffledDeck[questionNumber - 1].badge} alt=${altString}>
                <p class="correct-answer-detail"><strong>Detailed Answer: </strong><br>${shuffledDeck[questionNumber - 1].answerDetail}</p>
            </div>
            <button class="js-next" type="button">Next</button>
        `;
    } else if (value === false) {
        return `
            <h3>Incorrect. The correct answer was ${shuffledDeck[questionNumber - 1].answer}.</h3>
            <p class="incorrect-answer-detail"><strong>Detailed Answer: </strong><br>${shuffledDeck[questionNumber - 1].answerDetail}</p>
            <button class="js-next" type="button">Next</button>
        `;
    }
}

// This function will be responsible for handling when users click the "Submit" button
function submitAnswerClicked() {
    $('.main-container').on('click', '.js-submit-answer', function(event) {
        event.preventDefault();

        let isCorrect = validateAnswer();

        $('#answer-page').html(generateAnswerPage(isCorrect)); 
        
        $('#quiz-page').removeClass('view').addClass('hide-view');
        $('#answer-page').removeClass('hide-view').addClass('view');
    });
}

function customStringGenerator() {
    if (score <= 3) {
        return 'Not great! You should do some homework on the National Parks before trying this quiz again.';
    } else if (score <= 6) {
        return 'Could be worse, but there\'s definitely some room for improvement.';
    } else if (score <= 9) {
        return 'You\'ve clearly been to a national park or two or three before..'
    } else if (score === 10) {
        return 'Perfect score! You\'re a modern day John Muir.';
    }
}

function generateQuizEndString() {
    return `
        <h3>Your score is ${score}/10</h3>
        <p><strong>${customStringGenerator()}</strong></p>
        <p class="last-fun-fact"><strong>One last fun fact:</strong> There are over 18,000 miles of trails in the national parks just waiting for you to explore them. 
            Check out the National Parks Service <a target="_blank" href="https://www.nps.gov/index.htm">website</a> for more info, and to start planning your trip 
            today!</p>
        <button class="js-play-again" type="button">Play Again</button>`;
}

// This function will be responsible for handling when users click the "Next Question" button
function nextQuestionClicked() {
    $('.main-container').on('click', '.js-next', function(event) {
        questionNumber++;

        if (questionNumber > 10) {
            $('#quiz-end-page').html(generateQuizEndString());
            
            $('#quiz-end-page').removeClass('hide-view').addClass('view');
            $('#answer-page').removeClass('view').addClass('hide-view');
        } else {
            $('.js-question-number').text(questionNumber + '/10');

            $('#quiz-page').html(generateQuizQuestionString(shuffledDeck[questionNumber - 1]));   

            $('#quiz-page').removeClass('hide-view').addClass('view');
            $('#answer-page').removeClass('view').addClass('hide-view');
        }
    });
}

function resetGame() {
    questionNumber = 0;
    score = 0;
    shuffledDeck = [];

    $('.js-question-number').text("");
    $('.js-current-score').text("");
}
    
// This function will be responsible for handling when users click the "Play Again" button
function playAgainClicked() {
    $('.main-container').on('click', '.js-play-again', function(event) {
        resetGame();

        $('#home-page').removeClass('hide-view').addClass('view');
        $('#quiz-end-page').removeClass('view').addClass('hide-view');
    });
}

// This function will be our callback when the page loads. It's responsible for activating our individual functions that we will write to implement the quiz app
function handleQuiz() {
    startQuizClicked();
    submitAnswerClicked();
    nextQuestionClicked();
    playAgainClicked();
}

// When the page loads, call 'handleQuiz'
$(handleQuiz);