'use strict';

const QUESTIONS = [
    {
        id: 1,
        question: 'What is the oldest national park in the United States?',
        answerOptions: ['Yellowstone National Park', 'Yosemite National Park', 'Glacier National Park', 'Rocky Mountain National Park'],
        answer: 'Yellowstone National Park',
        answerDetail: 'Yellowstone National Park (located in Wyoming, Idaho, and Montana) is the oldest U.S. National Park, founded in 1872. ' +
            'It is home to many hot springs and the world\'s largest collection of geysers, including the iconic Old Faithful.',
        badge: 'images/yellowstone.png'
    },
    {
        id: 2,
        question: 'What national park is home to what is known as one of the Seven Natural Wonders of the World?',
        answerOptions: ['Bryce Canyon National Park', 'Arches National Park', 'Grand Canyon National Park', 'Canyonlands National Park'],
        answer: 'Grand Canyon National Park',
        answerDetail: 'The Grand Canyon, located in Grand Canyon National Park in Arizona, is generally agreed upon as one of the seven natural wonders of the world. ' + 
            'It\'s an immense canyon with unique combinations of geological color that spans 277 miles and was formed as a result of constant erosion by the Colorado River over millions of years.',
        badge: 'images/grandcanyon.png'
    },
    {
        id: 3,
        question: 'In what national park can you find the largest living tree (by volume) in the world?',
        answerOptions: ['Redwood National Park', 'Olympic National Park', 'Sequoia National Park', 'Kings Canyon National Park'],
        answer: 'Sequoia National Park',
        answerDetail: 'The largest tree in the world is a giant sequoia located in California\'s Sequoia National Park. Named the General Sherman, the tree is approximately 52,500 cubic feet in ' + 
            'volume and 275 feet tall. One branch of the General Sherman is so big — nearly 7 feet — that it’s larger than most trees east of the Mississippi River.',
        badge: 'images/sequoia.png'
    },
    {
        id: 4,
        question: 'What national park is home to the highest point in the United States?',
        answerOptions: ['Glacier Bay National Park', 'Denali National Park', 'Gates of the Arctic National Park', 'Grand Teton National Park'],
        answer: 'Denali National Park',
        answerDetail: 'The highest point in any national park belongs to Denali National Park in Alaska. With a summit elevation of 20,310 feet above sea level, Mount Denali is the tallest ' + 
            'mountain peak in North America.',
        badge: 'images/denali.png'
    },
    {
        id: 5,
        question: 'What national park is home to the lowest point in the United States?',
        answerOptions: ['Everglades National Park', 'Great Sand Dunes National Park', 'Joshua Tree National Park', 'Death Valley National Park'],
        answer: 'Death Valley National Park',
        answerDetail: 'Death Valley National Park, located in California, boasts the lowest point in the United States. Badwater Basin, a surreal landscape of vast salt flats, sits 282 feet below ' +
            'sea level and is the lowest point in the western hemisphere.',
        badge: 'images/deathvalley.png'
    },
    {
        id: 6,
        question: 'What national park is the most visited national park in the United States?',
        answerOptions: ['Great Smoky Mountains National Park', 'Grand Canyon National Park', 'Yosemite National Park', 'Acadia National Park'],
        answer: 'Great Smoky Mountains National Park',
        answerDetail: 'Great Smoky Mountains National Park, which straddles the border between North Carolina and Tennessee, welcomes more than 9 million guests per year and is the most visited ' +
            'national park in the U.S.',
        badge: 'images/smokymountain.png'
    },
    {
        id: 7,
        question: 'What state has the most national parks?',
        answerOptions: ['Alaska', 'Utah', 'California', 'Wyoming'],
        answer: 'California',
        answerDetail: 'Claiming nine national parks out of the total of 61 national parks in the United States, California has the most national parks. The list includes: Channel Islands National ' +
            'Park, Death Valley National Park, Joshua Tree National Park, Kings Canyon National Park, Lassen Volcanic National Park, Pinnacles National Park, Redwood National Park, Sequoia National ' +
            'Park, and Yosemite National Park.',
        badge: 'images/california.png'
    },
    {
        id: 8,
        question: 'What national park is known for, and named after, its world-renowned concentration of sea turtles?',
        answerOptions: ['Dry Tortugas National Park', 'Isle Royal National Park', 'Virgin Island National Park', 'Channel Islands National Park'],
        answer: 'Dry Tortugas National Park',
        answerDetail:'Located 70 miles west of Key West, Florida, Dry Tortugas National Park was originally named Las Tortugas, which is Spanish for "The Turtles." It is also one of the most remote ' +
            'national parks, as it is only accessible by boat or seaplane.',
        badge: 'images/drytortugas.png'
    },
    {
        id: 9,
        question: 'What is the only state in the United States that is unfortunate enough to not have either a national park or a national monument?',
        answerOptions: ['Delaware', 'New York', 'New Jersey', 'Ohio'],
        answer: 'Delaware',
        answerDetail: 'Delaware, which is ironically the country\'s first state, is the only state that does not currently have a national park or a national monument.',
        badge: 'images/delaware.png'
    },
    {
        id: 10,
        question: 'What national park is home to the largest volcano in the world in terms of volume and height above its base?',
        answerOptions: ['Crater Lake National Park', 'Lassen Volcanic National Park', 'Hawaii Volcanoes National Park', 'Haleakala National Park'],
        answer: 'Hawaii Volcanoes National Park',
        answerDetail: 'Hawaii Volcanoes National Park is where you\'ll find the Mauna Loa Volcano, which contains about 19,000 cubic miles of lava and rises more than 50,000 feet above its base, ' +
            'including the portion which is beneath the ocean.',
        badge: 'images/hawaiivolcanoes.png'
    }
];

let questionNumber = 0;
let score = 0;
let shuffledDeck;

function shuffleQuestions() {
    const shuffledQuestions = Array.from(QUESTIONS);

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
    const answerOptionsArray = question['answerOptions'];
    
    return `
    <h3 class="quiz-question">${question['question']}</h3>
    <form>
        <input type="radio" name="answer1" value="${answerOptionsArray[0]}"> <span>${answerOptionsArray[0]}</span>
        <br><br>
        <input type="radio" name="answer2" value="${answerOptionsArray[1]}"> <span>${answerOptionsArray[1]}</span>
        <br><br>
        <input type="radio" name="answer3" value="${answerOptionsArray[2]}"> <span>${answerOptionsArray[2]}</span>
        <br><br>
        <input type="radio" name="answer4" value="${answerOptionsArray[3]}"> <span>${answerOptionsArray[3]}</span>
        <br><br>
        <button class="submit-answer js-submit-answer" type="submit">Submit</button>
    </form>`;
}
    
// This function will be responsible for handling when users click the "Start Quiz" button
function startQuizClicked() {
    $('.main-container').on('click', '.js-start', function(event) {
        // Shuffles the quiz questions
        shuffledDeck = shuffleQuestions();

        // Creates a String representing the #quiz-page <section> for the first question
        const questionString = generateQuizQuestionString(shuffledDeck[questionNumber]);
        
        // Inserts the String inside the #quiz-page <section>
        $('#quiz-page').html(questionString);

        // Sets questionNumber to 1 renders the score/question number in the HTML. 
        questionNumber++;
        $('.js-question-number').text(questionNumber + '/10');
        $('.js-current-score').text(score);

        // Hides the #home-page <section> and displays the #quiz-page <section>. 
        $('#home-page').removeClass('view').addClass('hide-view');
        $('#quiz-page').removeClass('hide-view').addClass('view');
    });
}

// This function will be responsible for handling when users click the "Submit" button
function submitAnswerClicked() {
    $('.main-container').on('click', '.js-submit-answer', function(event) {
        event.preventDefault();
    // 1) Make sure that a radio <input> was selected, display an error message if not.
    // 2) Check the radio <input> selected against the value for the 'answer' property for the corresponding question.
    // 3) IF the answer is correct, generate a String representing the #correct-page <section> with the: .correct-answer <span> set to the answer value, .badge <img> set to the corresponding badge, 
    //    .answer-detail <p> set to the value in the answerDetail property of the question. Insert the String inside the #correct-page <section> in the DOM the hide then hide the #quiz-page <section> 
    //    and display the #correct-page <section>. Increase questionNumber and score by 1.
    // 4) IF the answer is incorrect, generate a String representing the #incorrect-page <section> with the: .correct-answer <span> set to the answer value,
    //    .answer-detail <p> set to the value in the answerDetail property of the question. Insert the String inside the #incorrect-page <section> in the DOM the hide the #quiz-page <section> 
    //    and display the #incorrect-page <section>. Increase ONLY questionNumber by 1.
    // 5) Update the .question-number <span> and .score <span>
    });
}

// This function will be responsible for handling when users click the "Next Question" button
function nextQuestionClicked() {
    // 1) IF questionNumber === 10, generate a String representing the #quiz-end-page <section> with the: Score and a customized message depending on how they scored.
    //    Then hide the #quiz-page <section> and show the #quiz-end-page <section>
    // 2) ELSE Pull a random question from the QUESTIONS array that was not already selected.
    // 3) Generate a String representing the #quiz-page <section> with: The value for the question property rendered as the <h3>, the values for the answerOptions rendered as the value/text for the
    //    radio <input>s.
    // 4) Insert the String inside the #quiz-page <section> then hide the #incorrect-page or #correct-page sections and display the #quiz-page <section>
}
    
// This function will be responsible for handling when users click the "Play Again" button
function playAgainClicked() {
    // 1) Set questionNumber and score to 0 (or hide them).
    // 2) Hide the #quiz-end-page <section> and display the #home-page<section>
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