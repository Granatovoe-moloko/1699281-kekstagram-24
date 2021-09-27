function returnAnyNumber (from, to) {
  if (from >= 0 && to > 0 && from < to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  else {
    return 'диапазон указан неверно';
  }
}

returnAnyNumber (5, 10);

// https://habr.com/ru/company/ruvds/blog/534108/

const MAX_LENGTH = 140;

function checkStringLength (string) {
  if (string <= MAX_LENGTH) {
    return true;
  }

  else {
    return false;
  }
}

checkStringLength (128);
