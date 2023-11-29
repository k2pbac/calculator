let clicked = "";
let display = false;
let intervals = [];
let questions = [];
let answers = [];
let index = 0;
let currentLevel = 1;
let difficulty = "";

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
      difficulty = "Easy";
      startLevel(difficulty, "#56ac4a", 5, "12:00", generateEasyQuestion);

      const interval = setInterval(() => {
        counter++;
        $(".timer").html(convertToTime(convertToMinutes(720 - counter)));
        if (counter === 720) clearInterval(interval);
      }, 1000);
      intervals.push(interval);
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
      difficulty = "Medium";
      startLevel(difficulty, "#fb9317", 7, "10:00", generateMediumQuestion);

      const interval = setInterval(() => {
        counter++;
        $(".timer").html(convertToTime(convertToMinutes(600 - counter)));
        if (counter === 600) clearInterval(interval);
      }, 1000);
      intervals.push(interval);
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
      difficulty = "Hard";
      startLevel(difficulty, "#e65053", 10, "8:00", () =>
        generateHardQuestion(currentLevel)
      );

      const interval = setInterval(() => {
        counter++;
        $(".timer").html(convertToTime(convertToMinutes(480 - counter)));
        if (counter === 480) clearInterval(interval);
      }, 1000);
      intervals.push(interval);
    }
  });
  $(".question-container input").on("keypress", (e) => {
    if (
      e.which === 13 &&
      answers[index] &&
      parseFloat(e.target.value) === parseFloat(answers[index])
    ) {
      $(".alert").addClass("success").removeClass("hidden");
      setTimeout(() => {
        $(".alert").addClass("hidden").removeClass("success");
      }, 500);
      if (difficulty === "Easy")
        startLevel(difficulty, "#56ac4a", 5, "12:00", generateEasyQuestion);
      else if (difficulty === "Medium")
        startLevel(difficulty, "#fb9317", 7, "10:00", generateMediumQuestion);
      else
        startLevel(difficulty, "#e65053", 10, "8:00", () =>
          generateHardQuestion(currentLevel)
        );
    } else {
      $(".alert").addClass("fail").removeClass("hidden");
      setTimeout(() => {
        $(".alert").addClass("hidden").removeClass("fail");
      }, 500);
    }
  });
});

function startLevel(
  levelName,
  levelColor,
  levelCount,
  timer,
  generateQuestion
) {
  const level = $(".level-name");
  level.html(levelName);
  level.css("color", levelColor);
  $(".level-questions").prepend("Questions: ");
  $(".level-questions .level-name").html(`${currentLevel}/${levelCount}`);
  $(".timer").html(timer);
  const { answer, question } = generateQuestion();
  questions.push(question);
  answers.push(answer);
  $(".question-container").removeClass("hidden");
  $(".question-container .questions").html(question);
  $(".question-container .level").html(currentLevel);
  currentLevel++;
}

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
  difficulty = "";
  currentLevel = 1;
}
