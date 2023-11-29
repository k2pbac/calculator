const signs = ["+", "-", "*", "/"];
function generateEasyQuestion(currentLevel) {
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
  console.log(getNums("Easy", currentLevel), getSigns("Easy", currentLevel));

  const answer = getAnswer([num1, num2, num3, num4], [sign, sign2, sign3]);

  return { question, answer };
}

function generateMediumQuestion(currentLevel) {
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
  console.log(getNums("Medium", currentLevel), getSigns("Easy", currentLevel));

  const answer = getAnswer([num3, num4, num2, num1], [sign3, sign, sign2]);
  return { question, answer };
}

function generateHardQuestion() {
  let question = "";
  const nums = getNums("Hard", currentLevel);
  const signs = getSigns("Easy", currentLevel);

  const answer = getAnswer(nums, signs);
  for (let i = 0; i < signs.length; ) {
    question += nums[i] + " " + signs[i] + " ";
    i++;
  }

  question += nums[nums.length - 1];
  return { question, answer };
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomArbitrary(min, max) {
  let num = Math.floor(Math.random() * (max - min) + min);
  if (num === 0) return Math.floor(Math.random() * (max - min) + min);
  else return num;
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

function getNums(level, currentLevel) {
  let nums = [];
  currentLevel += 1;
  for (let i = 0; i <= currentLevel; i++) {
    if (level === "Easy" || currentLevel < 5) {
      nums.push(getRandomInt(100));
    } else {
      nums.push(getRandomArbitrary(-100, 100));
    }
  }
  return nums;
}

function getSigns(level, currentLevel) {
  let tempSigns = [];
  currentLevel += 1;
  for (let i = 1; i <= currentLevel; i++) {
    if (level === "Easy" || currentLevel < 5) {
      const num = getRandomInt(2);
      console.log(signs[num], num);
      tempSigns.push(signs[num]);
    } else {
      tempSigns.push(signs[getRandomArbitrary(2, 3)]);
    }
  }
  return tempSigns;
}
