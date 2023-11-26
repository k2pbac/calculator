let clicked = "";
let display = false;
let intervals = [];
$(document).ready(function () {
  $(".easy").on("click", (e) => {
    if (clicked !== "easy") {
      $(".button-3d").toggleClass("hidden");
      if (intervals.length) {
        intervals.map((el) => clearInterval(el));
        intervals = [];
      }
      let counter = 0;
      clicked = "easy";
      if (display == false) {
        $(".level-selector .current-level").toggleClass("hidden");
        display = true;
      }
      const level = $(".level-name");
      level.html("Easy");
      level.css("color", "#56ac4a");
      $(".level-questions").prepend("Questions: ");
      $(".level-questions .level-name").html("0/5");
      $(".timer").html("12:00");
      const { answer, question } = generateEasyQuestion();
      $(".question-container").toggleClass("hidden");
      const interval = setInterval(() => {
        counter++;
        $(".timer").html(convertToTime(convertToMinutes(720 - counter)));
      }, 1000);
      intervals.push(interval);

      if (counter === 720) clearInterval(interval);
    }
  });
  $(".medium").on("click", (e) => {
    if (clicked !== "medium") {
      $(".button-3d").toggleClass("hidden");
      if (intervals.length) {
        intervals.map((el) => clearInterval(el));
        intervals = [];
      }
      let counter = 0;
      clicked = "medium";
      if (display == false) {
        $(".level-selector .current-level").toggleClass("hidden");
        display = true;
      }
      const level = $(".level-name");
      level.html("Medium");
      level.css("color", "#fb9317");
      $(".level-questions").prepend("Questions: ");
      $(".level-questions .level-name").html("0/7");
      $(".timer").html("10:00");
      const { answer, question } = generateMediumQuestion();
      $(".question-container").toggleClass("hidden");

      const interval = setInterval(() => {
        counter++;
        $(".timer").html(convertToTime(convertToMinutes(600 - counter)));
      }, 1000);
      intervals.push(interval);

      if (counter === "600") clearInterval(interval);
    }
  });
  $(".hard").on("click", (e) => {
    if (clicked !== "hard") {
      $(".button-3d").toggleClass("hidden");

      if (intervals.length) {
        intervals.map((el) => clearInterval(el));
        intervals = [];
      }
      let counter = 0;
      clicked = "hard";
      if (display == false) {
        $(".level-selector .current-level").toggleClass("hidden");
        display = true;
      }
      const level = $(".level-name");
      level.html("Hard");
      level.css("color", "#e65053");
      $(".level-questions").prepend("Questions: ");
      $(".level-questions .level-name").html("0/10");
      $(".timer").html("8:00");
      const { answer, question } = generateHardQuestion();
      $(".question-container").toggleClass("hidden");

      const interval = setInterval(() => {
        counter++;
        $(".timer").html(convertToTime(convertToMinutes(480 - counter)));
      }, 1000);
      intervals.push(interval);

      if (counter === "480") clearInterval(interval);
    }
  });
});

function convertToMinutes(seconds) {
  return seconds / 60;
}

function convertToTime(minutes) {
  var mins_num = parseFloat(minutes, 10); // don't forget the second param
  var hours = Math.floor(mins_num / 60);
  var minutes = Math.floor(mins_num - (hours * 3600) / 60);
  var seconds = Math.floor(mins_num * 60 - hours * 3600 - minutes * 60);
  return minutes + ":" + (seconds < 10 ? 0 + "" + seconds : seconds);
}

function clearAllElements() {
  $(".level-selector .current-level").addClass("hidden");
  $(".button-3d").removeClass("hidden");
  $(".question-container").addClass("hidden");
  if (intervals.length) {
    intervals.map((el) => clearInterval(el));
    intervals = [];
  }
  $(".level-questions .level-name").html("");
  $(".level-questions")
    .contents()
    .filter((_, el) => el.nodeType === 3)
    .remove();
  clicked = "";
  display = false;
}
