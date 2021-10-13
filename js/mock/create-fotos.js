import {getRandomUniqueNumber, DESCRIPTIONS, generateParameter, getSomeLikes} from './utils.js';
import {createComments} from './create-comments.js';

const arrayId = [];
const arrayUrl = [];

const createFoto = () => ({
  id: getRandomUniqueNumber(1, 25, arrayId),
  url: `photos/${getRandomUniqueNumber(1, 25, arrayUrl)  }.jpg`,
  description: `${generateParameter(DESCRIPTIONS)  }`,
  likes: getSomeLikes(15, 200),
  comments: createComments(),
});

const createFotos = (count) =>
  [...Array(count)].map(createFoto);

export {createFotos};
