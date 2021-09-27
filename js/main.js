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


function checkStringLength (string, maxLength) {
  if (string <= maxLength) {
    return true;
  }

  else {
    return false;
  }
}

checkStringLength (128, 140);
