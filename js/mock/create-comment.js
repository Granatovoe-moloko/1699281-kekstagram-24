//комментарии

import {MESSAGES, NAMES, generateParameter, getRandomCommentsId, chooseAnyAvatar} from './utils.js';

const createComment = () => ({
  id: getRandomCommentsId(),
  avatar: `${chooseAnyAvatar(1, 6)  }`,
  message: `${generateParameter(MESSAGES)  }`,
  name: `${generateParameter(NAMES)  }`,
});

export {createComment};
