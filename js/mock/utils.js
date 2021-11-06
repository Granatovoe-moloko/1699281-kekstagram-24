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

const arrayCommentsId = [];

//описание/текст комментария/имя комментатора
const generateParameter = (array) => {
  const randomParameter = Math.floor(Math.random() * array.length);
  return array[randomParameter];
};

//id/url
const getRandomUniqueNumber = (lower, upper) => {
  const randomNumber = Math.floor(Math.random() * (upper - lower + 1)) + lower;
  return randomNumber;
};

//лайки
const getSomeLikes = (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
};

//комментарии-id
const getRandomCommentsId = () => {
  for (let i = 0; i < arrayCommentsId.length + 1; i++) {
    const commentsId = arrayCommentsId.length + 1;
    arrayCommentsId.push(commentsId);
    return arrayCommentsId.length;
  }
};

//аватарки
const chooseAnyAvatar = (min, max) => {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return `img/avatar-${  result  }.svg`;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {DESCRIPTIONS, MESSAGES, NAMES, generateParameter, getRandomUniqueNumber, getSomeLikes, getRandomCommentsId, chooseAnyAvatar, isEscapeKey};
