//комментарии

import {MESSAGES, NAMES, generateParameter} from './utils';
import {getRandomCommentsId} from './utils';
import {chooseAnyAvatar} from './utils';

const createComments = () => ({
  id: getRandomCommentsId(),
  avatar: `${chooseAnyAvatar(1, 6)  }`,
  message: `${generateParameter(MESSAGES)  }`,
  name: `${generateParameter(NAMES)  }`,
});

export {createComments};
