import {getRandomUniqueNumber, DESCRIPTIONS, generateParameter, getSomeLikes} from './utils.js';
import {createComment} from './create-comment.js';

const commentsData = (count) =>
  [...Array(count)].map(createComment);

const createPhoto = () => ({
  id: getRandomUniqueNumber(1, 25),
  url: `photos/${getRandomUniqueNumber(1, 25)  }.jpg`,
  description: `${generateParameter(DESCRIPTIONS)  }`,
  likes: getSomeLikes(15, 200),
  comments: commentsData(13),
});

const createPhotoData = (count) =>
  [...Array(count)].map(createPhoto);

export {createPhotoData, commentsData};
