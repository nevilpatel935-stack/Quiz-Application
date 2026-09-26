
// QUIZ QUESTIONS
const questions = [

    {
        question: "What does HTML stand for?",

        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Markup Language",
            "Home Tool Markup Language"
        ],

        correct: 0
    },


    {
        question: "What does CSS stand for?",

        answers: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],

        correct: 1
    },


    {
        question: "Which language is used to make a webpage interactive?",

        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "Bootstrap"
        ],

        correct: 2
    },


    {
        question: "Which HTML tag is used to create a paragraph?",

        answers: [
            "&lt;p&gt;",
            "&lt;h1&gt;",
            "&lt;br&gt;",
            "&lt;div&gt;"
        ],


        correct: 0
    },


    {
        question: "Which symbol is used for an ID in CSS?",

        answers: [
            ".",
            "#",
            "*",
            "@"
        ],

        correct: 1
    },


    {
        question: "Which symbol is used for a class in CSS?",

        answers: [
            "#",
            ".",
            "*",
            "$"
        ],

        correct: 1
    },


    {
        question: "Which keyword is used to declare a variable in JavaScript?",

        answers: [
            "variable",
            "var",
            "int",
            "string"
        ],

        correct: 1
    },


    {
        question: "Which method is used to print output in the browser console?",

        answers: [
            "print()",
            "write()",
            "console.log()",
            "display()"
        ],

        correct: 2
    },


    {
        question: "Which Bootstrap class creates a blue primary button?",

        answers: [
            "btn-primary",
            "button-blue",
            "btn-blue",
            "primary-button"
        ],

        correct: 0
    },


    {
        question: "Which function runs code repeatedly after a fixed time?",

        answers: [
            "setTimeout()",
            "setInterval()",
            "repeat()",
            "loop()"
        ],

        correct: 1
    }

];


const questionNumber =
    document.getElementById("questionNumber");

const questionText =
    document.getElementById("question");

const answerButtons =
    document.getElementById("answerButtons");

const nextButton =
    document.getElementById("nextButton");

const prevButton =
    document.getElementById("prevButton");

const timer =
    document.getElementById("timer");


let currentQuestion = 0;

let selectedAnswers = [];

let timeLeft = 600;

let timerInterval;


function showQuestion() {

    const current = questions[currentQuestion];


    questionNumber.innerHTML =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        questions.length;

    questionText.innerHTML =
        (currentQuestion + 1) + ". " + current.question;

    answerButtons.innerHTML = "";

    current.answers.forEach(function (answer, index) {

        const button =
            document.createElement("button");


        button.innerHTML = answer;


        button.className =
            "btn btn-outline-primary answer-btn w-100 mb-2";

        button.addEventListener("click", function () {

            selectAnswer(index);

        });


        answerButtons.appendChild(button);

    });


    if (
        selectedAnswers[currentQuestion]
        !== undefined
    ) {

        const buttons =
            answerButtons.children;


        buttons[
            selectedAnswers[currentQuestion]
        ].classList.remove(
            "btn-outline-primary"
        );


        buttons[
            selectedAnswers[currentQuestion]
        ].classList.add(
            "btn-primary"
        );

    }

    if (currentQuestion === 0) {

        prevButton.disabled = true;

    } else {

        prevButton.disabled = false;

    }


    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.innerHTML =
            "Finish";

    } else {

        nextButton.innerHTML =
            "Next ➡";

    }

}


function selectAnswer(answerIndex) {


    selectedAnswers[currentQuestion] =
        answerIndex;


    const buttons =
        answerButtons.children;


    for (
        let i = 0;
        i < buttons.length;
        i++
    ) {

        buttons[i].classList.remove(
            "btn-primary"
        );

        buttons[i].classList.add(
            "btn-outline-primary"
        );

    }

    buttons[answerIndex].classList.remove(
        "btn-outline-primary"
    );

    buttons[answerIndex].classList.add(
        "btn-primary"
    );

}

nextButton.addEventListener(
    "click",
    function () {

        if (
            currentQuestion <
            questions.length - 1
        ) {

            currentQuestion++;

            showQuestion();

        } else {

            finishQuiz();

        }

    }
);

prevButton.addEventListener(
    "click",
    function () {

        if (currentQuestion > 0) {

            currentQuestion--;

            showQuestion();

        }

    }
);


function finishQuiz() {

    clearInterval(timerInterval);


    let finalScore = 0;


    for (
        let i = 0;
        i < questions.length;
        i++
    ) {

        if (
            selectedAnswers[i] ===
            questions[i].correct
        ) {

            finalScore++;

        }

    }


    questionNumber.innerHTML =
        "Quiz Completed";


    questionText.innerHTML =
        "Your Score: " +
        finalScore +
        " / " +
        questions.length;



    answerButtons.innerHTML = "";



    prevButton.style.display =
        "none";


    nextButton.innerHTML =
        "Restart";

    nextButton.onclick =
        function () {

            location.reload();

        };


function startTimer() {

    timerInterval =
        setInterval(
            function () {

                let minutes =
                    Math.floor(
                        timeLeft / 60
                    );


                let seconds =
                    timeLeft % 60;

                if (seconds < 10) {

                    seconds =
                        "0" + seconds;

                }

                timer.innerHTML =
                    "Time: " +
                    minutes +
                    ":" +
                    seconds;


                timeLeft--;



                if (timeLeft < 0) {

                    clearInterval(
                        timerInterval
                    );

                    finishQuiz();

                }

            },
            1000
        );

}



showQuestion();

startTimer();

}