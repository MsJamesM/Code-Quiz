$(document).ready(function () {
  var currentQuestion = 0;
  var score = 0;
  var timer;
  var timeLeft = 60;
  var quizEnd = false;
  const questions = [
    {
      question: "What year did JavaScript first appear?",
      choices: ["1991", "1996", "1995"],
      correctAnswer: 2,
    },
    {
      question: "Which is an example of a JavaScript variable?",
      choices: ["Con", "Let", "Vars"],
      correctAnswer: 1,
    },
    {
      question: "Which is correct?",
      choices: ["GetElement", "GetElementById", "GetId"],
      correctAnswer: 1,
    },
    {
      question: "Which should your JavaScript be placed under?",
      choices: ["<head>", "<body>", "<HTML>"],
      correctAnswer: 0,
    },
  ];

  // timer upon "start"
  function startTimer() {
    var $timerContainer = $("#timerContainer");
    $timerContainer.show();

    var updateTimer = function () {
      timeLeft--;
      if (timeLeft <= 0) {
        clearInterval(timer);
        showResult();
      }
      $timerContainer.html(
        '<i class="fa-solid fa-hourglass"></i> ' + timeLeft + " seconds!"
      );
    };

    timeLeft--;
    updateTimer();
    timer = setInterval(updateTimer, 1000);
  }

  // displays questions
  function showQuestion() {
    var question = questions[currentQuestion];
    $("#question").text(question.question);

    var choices = question.choices;
    var $choicesContainer = $("#choices");
    $choicesContainer.empty();

    for (var i = 0; i < choices.length; i++) {
      $choicesContainer.append(
        $("<button>")
          .addClass("choiceButton")
          .attr("type", "button")
          .data("choice", i)
          .text(choices[i])
      );
    }

    $(".choiceButton").click(checkAnswer);
  }

  // checks correct answers
  function checkAnswer() {
    var selectedChoice = $(this).data("choice");
    var question = questions[currentQuestion];

    if (parseInt(selectedChoice) === question.correctAnswer) {
      score++;
    } else {
      timeLeft -= 3;
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      $("#timerContainer").html(
        '<i class="fa-solid fa-hourglass"></i> ' + timeLeft + " seconds!"
      );
      $("#timerContainer").addClass("wrongAnswerTimer");
      $("body").addClass("bodyBlink");
      setTimeout(function () {
        $("#timerContainer").removeClass("wrongAnswerTimer");
        $("body").removeClass("bodyBlink");
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
    $(".wrongAnswerTimer").hide();

    var resultText = "Your score is " + score + " out of " + questions.length;
    $("#scoreText").text(resultText);

    $("#resultContainer").show();
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
      var $savedScoresList = $("#savedScores");
      $savedScoresList.empty();

      for (var i = 0; i < savedScores.length; i++) {
        var scoreDate = new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });
        var scoreText =
          "your score was " + savedScores[i] + " out of " + questions.length;

        $savedScoresList.append($("<li>").text(scoreDate + ", " + scoreText));
      }
    }
  }

  // click event for start button
  $("#startButton").click(function () {
    $("#startButton").hide();
    $("#welcomeContainer").hide();
    $("#timerContainer").show();
    startTimer();
    $("#quizContainer").show();
    showQuestion();
    $("#submit").click(checkAnswer);
  });

  // load saved scores
  function loadSavedScores() {
    displaySavedScores();
  }

  loadSavedScores();
});
