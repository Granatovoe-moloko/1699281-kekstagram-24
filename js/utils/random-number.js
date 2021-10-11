//id/url
const getRandomUniqueNumber = function(lower, upper, array) {
  const randomNumber = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  while (array.includes(randomNumber)) {
    continue;
  }
  array.push(randomNumber);
  return randomNumber;
};

export {getRandomUniqueNumber};
