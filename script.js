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
    var question = questions[currentQuestion];
    $("#question").text(question.question);

    var choices = question.choices;
    $("#choices").empty();
    for (var i = 0; i < choices.length; i++) {
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
    var selectedChoice = $("input[name='choice']:checked").val();
    var question = questions[currentQuestion];
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

  // displays final results and saves scores
  function showResult() {
    quizEnd = true;
    $("#quizContainer").hide();
    $("#welcomeContainer").hide();
    $(".wrong-answer").hide();

    var resultText = "";
    if (score >= questions.length * 0.8) {
      resultText =
        score + " out of " + questions.length + "? You sure know your stuff!";
    } else if (score >= questions.length * 0.5) {
      resultText = score + " out of " + questions.length + ". Not too shabby!";
    } else {
      resultText =
        score +
        " out of " +
        questions.length +
        ". Maybe this isn't the career for you.";
    }
    $("#resultContainer").show();
    $("#customTextContainer").text(resultText);
    saveScore(score);
    displaySavedScores();
  }

  // saves and displays scores
  function saveScore(score) {
    var savedScores = localStorage.getItem("scores");
    if (savedScores) {
      savedScores = JSON.parse(savedScores);
      savedScores.push(score);
    } else {
      savedScores = [score];
    }
    localStorage.setItem("scores", JSON.stringify(savedScores));
  }

  function displaySavedScores() {
    var savedScores = localStorage.getItem("scores");
    if (savedScores) {
      savedScores = JSON.parse(savedScores);
      var savedScoresList = $("#savedScores");
      savedScoresList.empty();
      for (var i = 0; i < savedScores.length; i++) {
        var scoreDate = new Date().toLocaleDateString();
        var scoreText = "Your score was: " + savedScores[i];

        savedScoresList.append(
          "<li>" + scoreDate + " - " + scoreText + "</li>"
        );
      }
    }
  }

  // starts the quiz
  function startQuiz() {
    $("#startButton").hide();
    $("#welcomeContainer").hide();
    startTimer();
    $("#quizContainer").show();
    showQuestion();
    $("#submit").click(checkAnswer);
  }

  function loadSavedScores() {
    displaySavedScores();
  }

  startQuiz();
  loadSavedScores();
});
