$(document).ready(function () {
  let sign = "";
  let runningTotal = 0;
  let runningVal = [];
  let index = 0;
  let isOnDiv = false;
  var divPos = {};
  var offset = $("#draggable").offset();

  $.fn.rotationInfo = function () {
    var el = $(this),
      tr =
        el.css("-webkit-transform") ||
        el.css("-moz-transform") ||
        el.css("-ms-transform") ||
        el.css("-o-transform") ||
        "",
      info = { rad: 0, deg: 0 };
    if ((tr = tr.match("matrix\\((.*)\\)"))) {
      tr = tr[1].split(",");
      if (typeof tr[0] != "undefined" && typeof tr[1] != "undefined") {
        info.rad = Math.atan2(tr[1], tr[0]);
        info.deg = parseFloat(((info.rad * 180) / Math.PI).toFixed(1));
      }
    }
    return info;
  };

  $("#draggable").mouseenter(function () {
    isOnDiv = true;
  });
  $("#draggable").mouseleave(function () {
    isOnDiv = false;
  });
  $("#draggable").draggable(
    { containment: ".calculator-form" },
    {
      start: function () {
        console.log("start");
        const obj = $(this);
      },
      drag: function (event, ui) {
        const obj = $(this);
        console.log(obj.rotationInfo());

        divPos = {
          left: event.pageX - offset.left,
          top: event.pageY - offset.top,
        };
        let x = Math.abs(16 - divPos["left"]);
        let y = 304 - divPos["top"];
        console.log({ x, y });
        const mod = (n, m) => (m + (n % m)) % m;
        const capX = (value, low, high) =>
          low + mod(value - low, high - low + 1);
        const capY = (value, low, high) =>
          low + mod(value - low, high - low + 1);

        obj.css("transform", `rotateX(${capX(x, 0, 360) + "deg"})`);
      },
    }
  );
  $(".calculator-form form > input").on("click", (element) => {
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
  });

  $(".calculator-form form > button").on("click", (element) => {
    if (runningVal[0]) {
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

const add = (a, b) => {
  return parseFloat(a) + parseFloat(b);
};
const subtract = (a, b) => {
  return parseFloat(a) - parseFloat(b);
};
const divide = (a, b) => {
  return parseFloat(a) / parseFloat(b);
};
const multiply = (a, b) => {
  return parseFloat(a) * parseFloat(b);
};
