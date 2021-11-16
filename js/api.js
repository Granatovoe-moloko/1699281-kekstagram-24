import {showMessage} from './utils.js';

const sendData = (onSuccess, onFail, body) => {
  fetch('https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST', //почему без этого не работет, ведь у меня уже указан метод в разметке
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


const getPhotoData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((previews) => {
      onSuccess(previews);
    })
    .catch(() => {
      showMessage('Не удалось загрузить ленту');
    });
};


export {getPhotoData, sendData};

