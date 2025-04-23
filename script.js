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
  },
  {
    question: "What is the best liberal arts college?",
    answers: [
      { text: "Williams", correct: true },
      { text: "Amherst", correct: false },
      { text: "Swarthmore", correct: false },
      { text: "Bowdoin", correct: false }
    ]
  }
];

// 2. How do we know what id to search for when using document.getElementById()? Where are the following ids specified in index.html? 
// You know which id to search for based on how elements are labeled in the HTML file. 
// These IDs (e.g., question, next-btn) are defined in tags like <div> or <button>, allowing JavaScript to access and manipulate them.
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
      // 3. Why are these HTML elements being created dynamically in the JS file, while other page elements are defined statically in the HTML file?
      // The answer buttons are created dynamically because their number and content change with each question. 
      // In contrast, static elements like the question area and navigation buttons remain constant, so they are predefined in the HTML.
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    // 4. What is the line below doing? 
      // This line adds the newly created <button> element (representing an answer choice) to the answer-buttons container element in the DOM. 
      // It makes the button appear on the webpage under the answer section for the current question.
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
  
    // 5. Why is it important to change the display styling rule for the "Next" button to "block" here? What would happen if you did not have this line?
    // Changing the display styling rule for the "Next" button is critical because it  is initially hidden (display: none) to prevent users from skipping questions without answering. 
    // When an answer is selected, changing its display to block makes the "Next" button visible, allowing progression to the next question. 
    // Without this line, the "Next" button would remain hidden, and the user would be unable to proceed.
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
// This block adds a click event listener to the "Next" button. When the button is clicked, the script will check if there are more questions left. 
// If there are, the next question is shown by calling handleNextButton(). If there are no more questions, which means the quiz is over, 
// it restarts the quiz from the beginning by calling startQuiz().


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
