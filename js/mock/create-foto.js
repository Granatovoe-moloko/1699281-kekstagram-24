import {getRandomUniqueNumber} from './utils';
import {DESCRIPTIONS, generateParameter} from './utils';
import {getSomeLikes} from './utils';
import {createComments} from './create-comments';

const arrayId = [];
const arrayUrl = [];

const createFoto = () => ({
  id: getRandomUniqueNumber(1, 25, arrayId),
  url: `photos/${getRandomUniqueNumber(1, 25, arrayUrl)  }.jpg`,
  description: `${generateParameter(DESCRIPTIONS)  }`,
  likes: getSomeLikes(15, 200),
  comments: createComments(),
});

export {arrayId, arrayUrl, createFoto};
