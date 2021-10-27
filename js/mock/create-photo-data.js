import {getRandomUniqueNumber, DESCRIPTIONS, generateParameter, getSomeLikes} from './utils.js';
import {createComments} from './create-comments.js';

const commentsCount = (count) =>
  [...Array(count)].map(createComments);

const createPhoto = () => ({
  id: getRandomUniqueNumber(1, 25),
  url: `photos/${getRandomUniqueNumber(1, 25)  }.jpg`,
  description: `${generateParameter(DESCRIPTIONS)  }`,
  likes: getSomeLikes(15, 200),
  comments: commentsCount(2),
});

const createPhotoData = (count) =>
  [...Array(count)].map(createPhoto);

export {createPhotoData};
