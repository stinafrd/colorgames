$(document).ready(function() {
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function generateRandomColors() {
    var colors = [];
    for (var i = 0; i < 3; i++) {
      var color = getRandomColor();
      colors.push(color);
    }
    return colors;
  }

  function displayRandomColors() {
    var colors = generateRandomColors();
    var correctIndex = Math.floor(Math.random() * 3) + 1;

    $("#color-code").text(colors[correctIndex - 1]);

    $(".color-box").each(function(index) {
      var color = colors[index];
      $(this).css("background-color", color);
      $(this).attr("data-is-correct", index + 1 === correctIndex ? "true" : "false");
    });
  }

  function updateScore(points) {
    var score = parseInt($("#score").text());

    if (isNaN(score)) {
      score = 0;
    }

    score += points;
    $("#score").text(score);

    if (score <= 0) {
      showModal("Verloren", "Du hast das Spiel verloren!");
      disableGame();
    } else if (score >= 20) {
      showModal("Gewonnen", "Glückwunsch! Du hast das Spiel gewonnen!");
      disableGame();
    }
  }

  function showModal(title, message) {
    $("#modal-title").text(title);
    $("#modal-message").text(message);
    $("#result-modal").modal("show");
  }

  function enableClickHandlers() {
    $(".color-box").on("click", function() {
      var isCorrect = $(this).attr("data-is-correct");

      if (isCorrect === "true") {
        updateScore(1);
      } else {
        updateScore(-2);
      }

      displayRandomColors();
      stopTimer();
      startTimer();
    });
  }

  function resetGame() {
    stopTimer();
    $("#score").text("0");
    displayRandomColors();
    startTimer();
    enableClickHandlers();
  }

  $("#new-game-button").click(function() {
    $("#result-modal").modal("hide");
    resetGame();
  });

  function disableGame() {
    disableClickHandlers();
    stopTimer();
  }

  function disableClickHandlers() {
    $(".color-box").off("click");
  }

  function startTimer() {
    var time = 5;
    $("#timer").text(time);

    timerInterval = setInterval(function() {
      time--;

      if (time >= 0) {
        $("#timer").text(time);
      }

      if (time <= 0) {
        showModal("Verloren", "Die Zeit ist abgelaufen!");
        disableGame();
      }

      if ($("#result-modal").hasClass("show")) {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
  }

  $(".color-box").click(function() {
    var isCorrect = $(this).attr("data-is-correct");

    if (isCorrect === "true") {
      updateScore(1);
    } else {
      updateScore(-2);
    }

    displayRandomColors();
    stopTimer();
    startTimer();
  });

  displayRandomColors();
  startTimer();
});