$(document).ready(function () {
  $(this).on("keypress", (element) => {
    console.log(element);
    if (element.which >= 96 && element.which <= 105) {
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
    }
  });
});
