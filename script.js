const questions = [
    {
        question: "What is the fullform of HTTP?",
        answers : [
            { text: "Hyper Text Paper", correct: false},
            { text: "Hypertest Transfer Protocol", correct: false},
            { text: "Hypertext Transfer Protocol", correct: true},
            { text: "Hypertext Transfer Product", correct: false},
        ]
    },
    {
        question: "What is the full form of CSS?",
        answers : [
            { text: "Cartoon Style Sheet", correct: false},
            { text: "Cascading Style Sheets", correct: true},
            { text: "Cartoon Style Sheep", correct: false},
            { text: "Cascading Style Sheep", correct: false},
        ]
    },
    {
        question: "Which is the full form of API?",
        answers : [
            { text: "Application Positional Interface", correct: false},
            { text: "Applied Program Intrest", correct: false},
            { text: "Application Program Intrest", correct: false},
            { text: "Application Programmable Interface", correct: true},
        ]
    },
    {
        question: "Which is the full form of URL?",
        answers : [
            { text: "Uniform Resource Location", correct: false},
            { text: "Uniform Readable Locator", correct: false},
            { text: "Uniform Resource Locator", correct: true},
            { text: "Uniform Readable Logic", correct: false},
        ]
    },
    {
        question: "Which is the full form of PDF?",
        answers : [
            { text: "Portable Document Format", correct: true},
            { text: "Portable Data File", correct: false},
            { text: "Personal Document Format", correct: false},
            { text: "Printable Document Form", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerbuttons = document.getElementById("answer-button");
const nextbutton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0 ;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState() {
    nextbutton.style.display = "none";
    while (answerbuttons.firstChild) {
      answerbuttons.removeChild(answerbuttons.firstChild);
    }
  }


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerbuttons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextbutton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML ="Play Again";
    nextbutton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();

    }else {
        showScore();
    }
}

nextbutton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();
