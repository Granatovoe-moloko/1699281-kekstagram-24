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

//описание/текст комментария/имя комментатора
const generateParameter = function(array) {
  const randomParameter = Math.floor(Math.random() * array.length);
  return array[randomParameter];
};

export {DESCRIPTIONS, MESSAGES, NAMES, generateParameter};
