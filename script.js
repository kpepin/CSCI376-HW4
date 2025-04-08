// 1. Add a fourth question to the questions data structure that has three incorrect answers and one correct answer. 
const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Madrid", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Cascading Style Sheets", correct: true },
      { text: "Colorful Style Scripts", correct: false },
      { text: "Computer Style Sheets", correct: false },
      { text: "Creative Style Syntax", correct: false }
    ]
  }
];

// 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
// 
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const hintButton = document.getElementById("hint-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });

  // Show hint button only while the question is active
  hintButton.style.display = "block";
}


function resetState() {
  nextButton.style.display = "none";
  hintButton.style.display = "block";  
  answerButtonsElement.innerHTML = "";
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtonsElement.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
  hintButton.style.display = "none";  // Hide hint button after answer is selected
}


function showScore() {
  resetState();
  questionElement.textContent = `You scored ${score} out of ${questions.length}!`;
  nextButton.textContent = "Restart";
  nextButton.style.display = "block";
  hintButton.style.display = "none";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// 6. Summarize in your own words what you think this block of code is doing. 
// 
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

hintButton.addEventListener("click", () => {
  const buttons = Array.from(answerButtonsElement.children);
  const incorrectButtons = buttons.filter(btn => btn.dataset.correct !== "true" && !btn.classList.contains("wrong"));

  if (incorrectButtons.length > 0) {
    const randomIndex = Math.floor(Math.random() * incorrectButtons.length);
    incorrectButtons[randomIndex].classList.add("wrong");
    incorrectButtons[randomIndex].disabled = true;
  }

  hintButton.style.display = "none";
});

startQuiz();
