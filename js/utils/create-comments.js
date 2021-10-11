//комментарии

import {MESSAGES, NAMES, generateParameter} from './random-parameter';

const arrayCommentsId = [];

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

  return {
    id: getRandomCommentsId(),
    avatar: `${chooseAnyAvatar(1, 6)  }`,
    message: `${generateParameter(MESSAGES)  }`,
    name: `${generateParameter(NAMES)  }`,
  };
};

export {arrayCommentsId, createComments};
