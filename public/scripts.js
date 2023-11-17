$(document).ready(function () {
  $(".calculator-form form > input").on("click", (res) => {
    const val = handleInput(res.target.value);
    const currentVal = $(".total").val();
    if (currentVal == "0") $(".total").val(val);
    else $(".total").val(currentVal + val);
  });
});

const handleInput = (input) => {
  let total = 0;
  if (input === ".") total = 0.1;
  else {
    const num = parseFloat(input);
    if (typeof num == "number") {
      total = num;
    } else return 0;
  }
  return total;
};
