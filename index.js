const quiz = [
  {
    no: "Q1",
    question: "Which organization deones the Web Standards?",
    answers: [
      {
        li: "A",
        answer: "Microsoft Corporation",
        correct: false,
      },
      {
        li: "B",
        answer: "IBM Corporation",
        correct: false,
      },
      {
        li: "C",
        answer: "World Wide Web Consortium",
        correct: true,
      },
      {
        li: "D",
        answer: "Apple Inc.",
        correct: false,
      },
    ],
  },
  {
    no: "Q2",
    question: "Which of the following is used to create web pages?",
    answers: [
      {
        li: "A",
        answer: "HTML",
        correct: true,
      },
      {
        li: "B",
        answer: "C",
        correct: false,
      },
      {
        li: "C",
        answer: "JVM",
        correct: false,
      },
      {
        li: "D",
        answer: "DTD",
        correct: false,
      },
    ],
  },
  {
    no: "Q3",
    question: "HTML is considered as ____ language.",
    answers: [
      {
        li: "A",
        answer: "Programming Language",
        correct: false,
      },
      {
        li: "B",
        answer: "OOP Language",
        correct: false,
      },
      {
        li: "C",
        answer: "High Level Language",
        correct: false,
      },
      {
        li: "D",
        answer: "Markup Language",
        correct: true,
      },
    ],
  },
  {
    no: "Q4",
    question: "HTML is a set of markup ____.",
    answers: [
      {
        li: "A",
        answer: "Attributes",
        correct: false,
      },
      {
        li: "B",
        answer: "Tags",
        correct: true,
      },
      {
        li: "C",
        answer: "Sets",
        correct: false,
      },
      {
        li: "D",
        answer: "Groups",
        correct: false,
      },
    ],
  },
  {
    no: "Q5",
    question: "HTML tags are used to describe document ____.",
    answers: [
      {
        li: "A",
        answer: "Deonition",
        correct: false,
      },
      {
        li: "B",
        answer: "Language",
        correct: false,
      },
      {
        li: "C",
        answer: "Content",
        correct: true,
      },
      {
        li: "D",
        answer: "None of those",
        correct: false,
      },
    ],
  },
];

const playNowButton = document.getElementById("play-now");
const questionsElement = document.getElementById("questions");
const singleQuestion = document.getElementById("question");
const answerLists = document.getElementById("answer-lists");
const optionBtns = document.getElementById("options");
const submitBtn = document.getElementById("submit");
const nextBtn = document.getElementById("next");

playNowButton.innerHTML = "Play now";
questionsElement.style.display = "none";

let initialIndex = 0;
let initialScore = 0;

function removePreviousChild() {
  if (answerLists.firstChild) {
    while (answerLists.firstChild) {
      answerLists.removeChild(answerLists.firstChild);
    }
  }
  if (optionBtns.firstChild) {
    while (optionBtns.firstChild) {
      optionBtns.removeChild(optionBtns.firstChild);
    }
  }
}

function showQuestions() {
  removePreviousChild();
  const question = quiz[initialIndex];
  questionsElement.style.display = "";
  singleQuestion.innerHTML = `${question.no}. ${question.question}`;
  for (let i in question.answers) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    const answer = question.answers[i];
    li.innerHTML = `${answer.li}. ${answer.answer}`;
    button.innerHTML = answer.li;
    answerLists.appendChild(li);
    optionBtns.appendChild(button);

    if (question.answers[i].correct) {
      button.dataset.iscorrect = "true";
    }

    button.addEventListener("click", () => {
      submitBtn.style.display = "block";

      submitBtn.addEventListener("click", () => {
        submitBtn.style.display = "none";
        nextBtn.style.display = "block";
        Array.from(optionBtns.children).forEach((btn) => {
          btn.disabled = true;
          btn.classList.remove("chosenBtn");
          if (btn.dataset.iscorrect === "true") {
            btn.classList.add("correct");
          } else {
            btn.classList.add("incorrect");
          }
        });
      });

      Array.from(optionBtns.children).forEach((btn) => {
        if (btn.innerHTML === button.innerHTML) {
          btn.classList.add("chosenBtn");
        } else {
          btn.classList.remove("chosenBtn");
        }
      });

      if(button.dataset.iscorrect === "true") {
        initialScore++;
      }

    });

  }
}

nextBtn.addEventListener("click", () => {
  nextBtn.style.display = "none";
  if(initialIndex < quiz.length) {
    initialIndex++;
    if(initialIndex < quiz.length) {
      showQuestions();
    } else {
      questionsElement.innerHTML = "your score is " + initialScore;
      
    }
  } else {
    alert("else")
  }
})

function playNowFun() {
  playNowButton.style.display = "none";
  showQuestions();
}

playNowButton.addEventListener("click", playNowFun);
