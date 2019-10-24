const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Which animated movie was first to feature a celebrity as a voice actor?",
    choice1: "Aladdin",
    choice2: "Toy Story",
    choice3: "James and the Giant Peach",
    choice4: "The Hunchback of Notre Dame",
    answer: 1
  },
  {
    question: "Who played Deputy Marshal Samuel Gerard in the 1993 film ''The Fugitive''?",
    choice1: "Harrison Ford",
    choice2: "Harvey Keitel",
    choice3: "Tommy Lee Jones",
    choice4: "Martin Landau",
    answer: 3
  },
  {
    question: "Who directed the movies ''Pulp Fiction'', ''Reservoir Dogs'' and ''Django Unchained''?",
    choice1: "Steven Spielberg",
    choice2: "Quentin Tarantino",
    choice3: "Martin Scorcese",
    choice4: "James Cameron",
    answer: 2
  },
  {
    question: "Who directed the 2015 movie ''The Revenant''?",
    choice1: "Christopher Nolan",
    choice2: "David Fincher",
    choice3: "Alejandro G. I\u00f1\u00E1rritu",
    choice4: "Wes Anderson",
    answer: 3
  },
  {
    question: "Which of these Movies was NOT released in 1996?",
    choice1: "Independence Day",
    choice2: "Mission: Impossible",
    choice3: "The Rock",
    choice4: "Gladiator",
    answer: 4
  }
];

//constants
const correctBonus = 10;
const maxQuestions = 5;
const restart = document.getElementsByClassName("restart");

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

restartGame = () => {
  this.restart.addEventListener("touchend", e => {
    return startGame;
  });
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("touchend", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

startGame();