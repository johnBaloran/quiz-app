const quizData = async function () {
  const response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple"
  );
  const data = await response.json();

  const newData = data.results.map((question) => {
    const correctAnswer = question.correct_answer;

    const options = question.incorrect_answers.map((answer) => answer);
    options.push(question.correct_answer);

    const a = options[Math.floor(Math.random() * options.length)];
    const b = options.filter((answer) => answer !== a)[
      Math.floor(Math.random() * (options.length - 1))
    ];
    const c = options.filter((answer) => answer !== a && answer !== b)[
      Math.floor(Math.random() * (options.length - 2))
    ];
    const d = options.filter(
      (answer) => answer !== a && answer !== b && answer !== c
    )[0];
    let rightAnswer;
    if (correctAnswer === a) {
      rightAnswer = "a";
    }
    if (correctAnswer === b) {
      rightAnswer = "b";
    }
    if (correctAnswer === c) {
      rightAnswer = "c";
    }
    if (correctAnswer === d) {
      rightAnswer = "d";
    }
    return {
      question: question.question,
      a: a,
      b: b,
      c: c,
      d: d,
      correct: rightAnswer,
    };
  });

  let currentQuiz = 0;
  let score = 0;
  const quiz = document.querySelector(".quiz-header");
  const questionEl = document.getElementById("question");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const submitBtn = document.getElementById("submit");

  function loadQuiz() {
    const currentQuizData = newData[currentQuiz];
    questionEl.innerHTML = currentQuizData.question;
    a_text.innerHTML = currentQuizData.a;
    b_text.innerHTML = currentQuizData.b;
    c_text.innerHTML = currentQuizData.c;
    d_text.innerHTML = currentQuizData.d;
  }

  function getSelected() {
    const answerEls = document.querySelectorAll(".answer");

    let answer;
    answerEls.forEach((answerEl) => {
      if (answerEl.checked) {
        answer = answerEl.id;
      }
    });
    return answer;
  }

  submitBtn.addEventListener("click", () => {
    // Check to see the answer
    const answer = getSelected();
    console.log(answer === newData[currentQuiz].correct);

    if (answer) {
      if (answer === newData[currentQuiz].correct) {
        score++;
      }

      currentQuiz++;
      if (currentQuiz < newData.length) {
        loadQuiz();
      } else {
        // TODO: show results
        quiz.innerHTML = `<h2>You answered correctly at ${score}/${newData.length} questions</h2>

        <button onclick="location.reload()">Reload</button>`;
      }
    }
    console.log(score);
  });

  loadQuiz();
};

quizData();
