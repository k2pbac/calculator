$(document).ready(function () {
  let sign = "";
  let runningTotal = 0;
  let runningVal = [];
  let index = 0;
  let offset = $("#draggable").offset();
  let startY = 0;
  let startX = 0;

  particlesJS.load("particles-js", "particles.json", function () {
    console.log("callback - particles.js config loaded");
  });

  $(".cp2").bind("cut copy paste", function (e) {
    e.preventDefault();
  });

  $(".home").on("click", () => {
    clearAllElements();
  });

  $(this).on("keydown", (element) => {
    if (element.key >= 0 && element.key <= 9) {
      const val = handleInput(element.key);
      if (
        !!runningVal[index] &&
        !["+", "-", "*", "/"].includes(runningVal[index])
      )
        runningVal[index] += "" + val;
      else {
        runningVal.push(val);
      }
      const currentVal = parseFloat(runningVal[index]);
      if (sign == "") $(".total").val(currentVal);
      else {
        $(".total").val($(".total").val() + val);
      }
      if (["+", "-", "*", "/"].includes(runningVal[index])) {
        index++;
      }
    } else if (element.key === "Backspace") {
      const total = $(".total").val();
      $(".total").val(total.substring(0, total.length - 1));
      if (runningVal[index])
        runningVal[index] = runningVal[index].substring(
          0,
          runningVal[index].length - 1
        );
      else index--;
    }
  });

  $("#draggable").draggable(
    { containment: ".calculator-form" },
    {
      start: function (event, ui) {
        startY = event.pageY;
        startX = event.pageX;
        $(".return-image").toggleClass("hidden");
      },
      drag: function (event, ui) {
        const obj = $(this);

        divPos = {
          left: event.pageX - offset.left,
          top: event.pageY - offset.top,
        };
        let realY = startY - event.pageY;
        let realX = startX - event.pageX;

        obj.css(
          "transform",
          `rotateY(${realX + "deg"}) rotateX(${realY + "deg"}) rotateZ(360deg)`
        );

        ui.position.top = 0;
        ui.position.left = 0;
      },
    }
  );
  $(".calculator-form form > input").on("click", (element) => {
    if (element.target.value !== "clr") {
      const val = handleInput(element.target.value);
      if (
        !!runningVal[index] &&
        !["+", "-", "*", "/"].includes(runningVal[index])
      )
        runningVal[index] += "" + val;
      else {
        runningVal.push(val);
      }
      const currentVal = parseFloat(runningVal[index]);
      if (sign == "") $(".total").val(currentVal);
      else {
        $(".total").val($(".total").val() + val);
      }
      if (["+", "-", "*", "/"].includes(runningVal[index])) {
        index++;
      }
    } else {
      $(".total").val("");
      runningTotal = 0;
      runningVal = [];
      index = 0;
      sign = "";
    }
  });

  $(".calculator-form form > button").on("click", (element) => {
    if (runningVal[0] && !["+", "-", "*", "/"].includes(runningVal[index])) {
      sign = element.target.value;
      const currentVal = $(".total").val();
      if (sign !== "=") {
        runningVal.push(sign);
        if (index == 0) runningTotal += parseFloat(runningVal[index]);
        index++;
        $(".total").val(currentVal + " " + sign + " ");
      } else {
        let tempTotal = handleCalculate(runningVal);
        runningVal.push(tempTotal);
        index = 0;
        $(".total").val(tempTotal);
      }
    }
  });
});

const handleInput = (input) => {
  let total = 0;
  if (input === ".") total = 0.1;
  else {
    const num = parseFloat(input);
    if (typeof num == "number") {
      total = num;
    }
  }
  return total;
};

const handleCalculate = (array) => {
  let total = 0;
  if (array.length % 3 == 0 || array.length % 5 == 0)
    for (let i = 0; i < array.length; ) {
      let num1 = parseFloat(array[i]);
      let num2 = parseFloat(array[i + 2]);
      let sign = array[i + 1];
      if (sign == "+") total += num1 + num2;
      else if (sign == "-") total += num1 - num2;
      else if (sign == "*") total += num1 * num2;
      else total += num1 / num2;
      array.splice(0, 3);
    }
  return total;
};

function bringToFront() {
  $("#draggable").css("transform", "");
  $(".return-image").toggleClass("hidden");
}
