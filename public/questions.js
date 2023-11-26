const signs = ["+", "-", "*", "/"];

function generateEasyQuestion() {
  const num1 = getRandomInt(100);
  const num2 = getRandomInt(100);
  const num3 = getRandomArbitrary(-100, 100);
  const num4 = getRandomArbitrary(-100, 100);

  const sign = signs[getRandomInt(2)];
  const sign2 = signs[getRandomInt(2)];
  const sign3 = signs[getRandomInt(2)];

  const question =
    num1 +
    " " +
    sign +
    " " +
    num2 +
    " " +
    sign2 +
    " " +
    num3 +
    " " +
    sign3 +
    " " +
    num4;

  const answer = getAnswer([num1, num2, num3, num4], [sign, sign2, sign3]);

  return { question, answer };
}

function generateMediumQuestion() {
  const num1 = getRandomInt(100);
  const num2 = getRandomInt(100);
  const num3 = getRandomArbitrary(-100, 100);
  const num4 = getRandomArbitrary(1, 20);

  const sign = signs[getRandomInt(2)];
  const sign2 = signs[getRandomInt(3)];
  const sign3 = signs[getRandomArbitrary(3, 3)];

  const question =
    num1 +
    " " +
    sign +
    " " +
    num2 +
    " " +
    sign2 +
    " " +
    num3 +
    " " +
    sign3 +
    " " +
    num4;

  const answer = getAnswer([num3, num4, num2, num1], [sign3, sign, sign2]);
  return { question, answer };
}

function generateHardQuestion() {
  const num1 = getRandomInt(100);
  const num2 = getRandomInt(100);
  const num3 = getRandomArbitrary(-100, 100);
  const num4 = getRandomArbitrary(1, 20);

  const sign = signs[getRandomInt(2)];
  const sign2 = signs[getRandomArbitrary(2, 2)];
  const sign3 = signs[getRandomArbitrary(3, 3)];

  const question =
    num1 +
    " " +
    sign +
    " " +
    num2 +
    " " +
    sign2 +
    " " +
    num3 +
    " " +
    sign3 +
    " " +
    num4;

  const answer = getAnswer([num3, num4, num2, num1], [sign3, sign2, sign]);
  return { question, answer };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getAnswer(nums, signs) {
  let total = nums[0];
  for (let i = 0; i < signs.length; ) {
    if (signs[i] === "+") total += nums[i + 1];
    else if (signs[i] === "-") total -= nums[i + 1];
    else if (signs[i] === "*") total *= nums[i + 1];
    else total /= nums[i + 1];
    i++;
  }
  return Math.round(total);
}
