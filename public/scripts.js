$(document).ready(function () {
  let sign = "";
  let runningTotal = 0;
  let runningVal = [];
  let index = 0;

  $(".calculator-form form > input").on("click", (element) => {
    const val = handleInput(element.target.value);
    if (!!runningVal[index]) runningVal[index] += "" + val;
    else runningVal.push(val);
    const currentVal = runningVal[index];
    console.log(index);
    if (sign == "") $(".total").val(currentVal);
    else {
      if (sign === "+") runningTotal = add(runningTotal, runningVal[index]);
      else if (sign === "-")
        runningTotal = subtract(runningTotal, runningVal[index]);
      else if (sign === "/")
        runningTotal = divide(runningTotal, runningVal[index]);
      else if (sign === "*")
        runningTotal = multiply(runningTotal, runningVal[index]);
      $(".total").val($(".total").val() + " " + currentVal);
    }
    console.log({ runningTotal, runningVal });
  });

  $(".calculator-form form > button").on("click", (element) => {
    sign = element.target.value;
    const currentVal = $(".total").val();
    if (sign !== "=") {
      if (index == 0) runningTotal += runningVal[index];
      index++;
      $(".total").val(currentVal + " " + sign);
    } else {
      $(".total").val(runningTotal);
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
