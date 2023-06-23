$(document).ready(function () {
  var currentQuestion = 0;
  var score = 0;
  var timer;
  var timeLeft = 60;
  var quizEnd = false;
  const questions = [
    {
      question: "Is the sky blue?",
      choices: ["Yes", "It's pink", "No"],
      correctAnswer: 0,
    },
    {
      question: "Are computers alive?",
      choices: ["Maybe", "Oh definitely", "No... right?"],
      correctAnswer: 2,
    },
    {
      question: "Plants - friend or foe",
      choices: ["Mortal enemies", "Friend", "Fern"],
      correctAnswer: 1,
    },
    {
      question: "Mouse",
      choices: ["Mice", "Mouses", "Mooses"],
      correctAnswer: 2,
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
        '<i class="fa-solid fa-hourglass-start"></i> ' + timeLeft + " seconds!"
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
        '<i class="fa-solid fa-hourglass-start"></i> ' + timeLeft + " seconds!"
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
      var $savedScoresList = $("#savedScores");
      $savedScoresList.empty();

      for (var i = 0; i < savedScores.length; i++) {
        var scoreDate = new Date().toLocaleDateString();
        var scoreText = "Your score was: " + savedScores[i];

        $savedScoresList.append($("<li>").text(scoreDate + " - " + scoreText));
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
