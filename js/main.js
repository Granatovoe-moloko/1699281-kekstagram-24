import {getRandomUniqueNumber} from './utils/random-number';
import {DESCRIPTIONS, generateParameter} from './utils/random-parameter';
import {getSomeLikes} from './utils/random-likes';
import {createComments} from './utils/create-comments';

const arrayId = [];
const arrayUrl = [];


const createFoto = () => ({
  id: getRandomUniqueNumber(1, 25, arrayId),
  url: `photos/${getRandomUniqueNumber(1, 25, arrayUrl)  }.jpg`,
  description: `${generateParameter(DESCRIPTIONS)  }`,
  likes: getSomeLikes(15, 200),
  comments: createComments(),
});

const arrayOfCreateFoto = (count) =>
  [...Array(count)].map(createFoto);

arrayOfCreateFoto(3);

