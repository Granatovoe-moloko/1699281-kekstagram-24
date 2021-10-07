/*function returnAnyNumber (from, to) {
  if (from >= 0 && to > 0 && from < to) {
    return Math.floor(Math.random() * (to - from + 1)) + from;
  }

  return 'диапазон указан неверно';
}

returnAnyNumber (5, 10);

// https://habr.com/ru/company/ruvds/blog/534108/


function checkStringLength (string, maxLength) {

  if (string.length <= maxLength) {
    return true;
  }

  return false;
}

checkStringLength ('Напишите комментарий', 140);*/


const DESCRIPTIONS = [
  'Очень красивое фото',
  'Фото заката',
  'Селфи',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'José',
  'María',
  'Antonio',
  'Carmen',
  'Juan',
  'Ana',
  'Manuel',
  'Isabel',
  'Francisco',
  'Dolores',
];

const arrayId = [];
const arrayUrl = [];
const arrayCommentsId = [];

const createFoto = () => {
  //id
  const getRandomId = function(lower, upper) {
    const id = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    while (arrayId.includes(id)) {
      continue;
    }
    arrayId.push(id);
    return id;
  };

  //url
  const getRandomUrl = function(lower, upper) {
    const url = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    while (arrayUrl.includes(url)) {
      continue;
    }
    arrayUrl.push(url);
    return `photos/${  url  }.jpg`;
  };

  //описание
  const getRandomDescription = function() {
    const randomDescription = Math.floor(Math.random() * DESCRIPTIONS.length);
    return DESCRIPTIONS[randomDescription];
  };

  //лайки
  const getSomeLikes = function(min, max) {
    const result = Math.floor(Math.random() * (max - min + 1)) + min;
    return result;
  };

  //комментарии
  const createComments = () => {
    //комментарии-id
    const getRandomCommentsId = function() {
      for (let i = 0; i < arrayCommentsId.length + 1; i++) {
        const commentsId = arrayCommentsId.length + 1;
        arrayCommentsId.push(commentsId);
        return arrayCommentsId.length;
      }
    };

    //аватарки
    const chooseAnyAvatar = function(min, max) {
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      return `img/avatar-${  result  }.svg`;
    };

    //текст комментария
    const chooseTextComments = function() {
      const randomMessage = Math.floor(Math.random() * MESSAGES.length);
      return MESSAGES[randomMessage];
    };

    //имя комментатора
    const chooseNameOfCommentator = function() {
      const randomName = Math.floor(Math.random() * NAMES.length);
      return NAMES[randomName];
    };

    return {
      id: getRandomCommentsId(),
      avatar: `${chooseAnyAvatar(1, 6)  }`,
      message: `${chooseTextComments(MESSAGES)  }`,
      name: `${chooseNameOfCommentator(NAMES)  }`,
    };
  };

  return {
    id: getRandomId(1, 25),
    url: `${getRandomUrl(1, 25)  }`,
    description: `${getRandomDescription(DESCRIPTIONS)  }`,
    likes: getSomeLikes(15, 200),
    comments: createComments(),
  };
};

const arrayOfCreateFoto = Array.from({length: 3}, createFoto);

console.log(arrayOfCreateFoto);
