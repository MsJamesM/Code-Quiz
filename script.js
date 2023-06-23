$(document).ready(function () {
  var currentQuestion = 0;
  var score = 0;
  var timer;
  var timeLeft = 60;
  var quizEnd = false;
  const questions = [
    {
      question: "Question #1",
      choices: ["answer #1", "answer #2", "answer #3"],
      correctAnswer: 1,
    },
    {
      question: "Question #2",
      choices: ["answer #1", "answer #2", "answer #3"],
      correctAnswer: 3,
    },
    {
      question: "Question #3",
      choices: ["answer #1", "answer #2", "answer #3"],
      correctAnswer: 2,
    },
    {
      question: "Question #4",
      choices: ["answer #1", "answer #2", "answer #3"],
      correctAnswer: 3,
    },
  ];

  // timer upon "start"

  function startTimer() {
    timer = setInterval(function () {
      if (quizEnd) {
        clearInterval(timer);
        return;
      }

      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        showResult();
      }
      $("#timerContainer").text("Time left: " + timeLeft + " seconds");
    }, 1000);
  }

  // displays questions

  function showQuestion() {
    let question = questions[currentQuestion];
    $("#question").text(question.question);

    let choices = question.choices;
    $("#choices").empty();
    for (let i = 0; i < choices.length; i++) {
      $("#choices").append(
        "<li><input type='radio' name='choice' value='" +
          i +
          "'>" +
          choices[i] +
          "</li>"
      );
    }
  }

  // checks correct answers

  function checkAnswer() {
    let selectedChoice = $("input[name='choice']:checked").val();
    let question = questions[currentQuestion];
    if (parseInt(selectedChoice) === question.correctAnswer) {
      score++;
    } else {
      timeLeft -= 3;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      $("#timerContainer").text("Time left: " + timeLeft + " seconds");
      $("#timerContainer").addClass("wrong-answer");
      setTimeout(function () {
        $("#timerContainer").removeClass("wrong-answer");
      }, 2000);
    }

    currentQuestion++;
    if (currentQuestion >= questions.length) {
      showResult();
    } else {
      showQuestion();
    }
  }

  // displays final results

  function showResult() {
    quizEnd = true;
    $("#quizContainer").hide();
    $("#welcomeContainer").hide();
    $(".wrong-answer").hide();
    $("#result").text(
      "Your score is: " + score + " out of " + questions.length
    );
    $("#resultContainer").show();
  }

  function startQuiz() {
    $("#startButton").hide();
    $("#welcomeContainer").hide();
    startTimer();
    $("#quizContainer").show();
    showQuestion();
    $("#submit").click(checkAnswer);
  }

  $("#startButton").click(startQuiz);
});
