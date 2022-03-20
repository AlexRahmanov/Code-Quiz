//All Elements required
var timerValue = document.getElementById("timerValue");
var startButton = document.getElementById("startQuiz");
var startContainer = document.getElementById("container1");
var questionContainer = document.getElementById("container2");
var finalScoreContainer = document.getElementById("container3");
var submitBtn = document.getElementById("submit");
var initialsInput = document.getElementById("initialsInput");
var highscoreList = document.getElementById("highscoreList");
var highscoreContainer = document.getElementById("container4");
var highscoreLink = document.getElementById("highscoreLink");
var goBackBtn = document.getElementById("goBack");
var clearBtn = document.getElementById("clear");
var quizQuestion = document.getElementById("quizQuestion");
var answer1 = document.getElementById("questionValue1");
var answer2 = document.getElementById("questionValue2");
var answer3 = document.getElementById("questionValue3");
var answer4 = document.getElementById("questionValue4");
var answersUl = document.getElementById("allAnswers");
var correct = document.getElementById("correct");
var wrong = document.getElementById("wrong");
var finalScore = document.getElementById("finalScore");


//Questions and Answer
var questions = [
  {
    question: "Commonly used data types do NOT include:",
    answer1: "Strings",
    answer2: "Booleans",
    answer3: "Alerts",
    answer4: "Numbers",
    correct: "Alerts",
  },
  {
    question: "The condition in an if/else statement is enclosed in:",
    answer1: "Quotes",
    answer2: "Parenthesis",
    answer3: "Curly Brackets",
    answer4: "Square Brackets",
    correct: "Parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    answer1: "Numbers and Strings",
    answer2: "Other Arrays",
    answer3: "Booleans",
    answer4: "All of the above",
    correct: "All of the above",
  },
  {
    question:
      "String values must be enclosed within ______ when being assigned to variables.",
    answer1: "Commas",
    answer2: "Curly Brackets",
    answer3: "Quotes",
    answer4: "Parenthesis",
    correct: "Quotes",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answer1: "JavaScript",
    answer2: "Terminal Bash",
    answer3: "For Loops",
    answer4: "console.log",
    correct: "console.log",
  },
];

var time = 0;
var i = 0;


var changeQuestion = function () {
  quizQuestion.textContent = questions[i].question;
  answer1.textContent = questions[i].answer1;
  answer2.textContent = questions[i].answer2;
  answer3.textContent = questions[i].answer3;
  answer4.textContent = questions[i].answer4;
};

//Check answer if correct or not
var checkAnswer = function () {
  if (event.target.innerHTML === questions[i].correct) {
    // Correct answer
    correct.style.display = "block";
    wrong.style.display = "none";

    // clear out result in 2 second
    setTimeout(function () {
      correct.style.display = "none";
    }, 2000);
  } else {

    // Subtract 10 seconds if answer is wrong
    time -= 10;
    // Wrong answer
    wrong.style.display = "block";
    correct.style.display = "none";
    setTimeout(function () {
      wrong.style.display = "none";
    }, 1000);
  }
};

// Show question
var showQuestionContainer = function () {
  startContainer.style.display = "none";
  questionContainer.style.display = "block";
};

// Show score question
var showScoreContainer = function () {
  questionContainer.style.display = "none";
  finalScoreContainer.style.display = "block";
};

// Show start
var showStartContainer = function () {
  finalScoreContainer.style.display = "none";
  highscoreContainer.style.display = "none";
  startContainer.style.display = "block";
};

// Show highscore page
var showHighscoreContainer = function () {
  // Get highscores from local storage
  highscoreList.innerHTML = JSON.parse(localStorage.getItem("scores"));
  finalScoreContainer.style.display = "none";
  startContainer.style.display = "none";
  highscoreContainer.style.display = "block";
};

// Click function start button is clicked, timer is set to 75 sec and begins.
startButton.addEventListener("click", function () {
  // Get highscores from local storage
  highscoreList.innerHTML = JSON.parse(localStorage.getItem("scores"));

  // Start timer
  time = 75;
  i = 0;

  // Reset final score to zero
  finalScore.textContent = 0;
  timerValue.textContent = time;
  changeQuestion();
  showQuestionContainer();

  // Start timer
  var setTimer = setInterval(function () {
    if (time > 0) {
      time--;
      timerValue.textContent = time;
    } else {
      // Clear setinterval
      clearInterval(setTimer);
      // Show score page
      showScoreContainer();
    }
  }, 1000);
});

// Show highscore page
highscoreLink.addEventListener("click", function () {
  showHighscoreContainer();
});

// Go back button
goBackBtn.addEventListener("click", function () {
  showStartContainer();
});

// Clear button
clearBtn.addEventListener("click", function () {
  // Remove item from local storage
  localStorage.removeItem("scores");
  highscoreList.innerHTML = "";
});

answersUl.addEventListener("click", function (event) {
  // Prevent page from refreshing
  event.preventDefault();
  // Coding Quiz Challenge ends when the last question is answerd
  if (i < questions.length - 1) {
    // Check answer
    checkAnswer();
    i++;
    changeQuestion();
  } else {
    // Check answer
    checkAnswer();
    // Assign final score to the time value
    // If time is less than 1, final score is assigned value of 0
    if (time >= 0) {
      finalScore.textContent = time;
    } else {
      finalScore.textContent = 0;
    }
    // Reset timer
    time = 0;
    timerValue.textContent = 0;
    showScoreContainer();
  }
});
// Score initials submit
submitBtn.addEventListener("click", function (event) {
  // Prevent refreshing of page
  event.preventDefault();

  var listScore = document.createElement("li");
  // Add initials
  listScore.textContent = initialsInput.value + " - " + finalScore.textContent;
  highscoreList.appendChild(listScore);
  // Show highscore list page
  console.log(highscoreList);
  // Save to local storage
  localStorage.setItem("scores", JSON.stringify(highscoreList.innerHTML));
  showHighscoreContainer();
});
