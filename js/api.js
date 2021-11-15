import {showMessage} from './utils.js';

const successMessagePattern = document.querySelector('#success').content.querySelector('.success');
//const successMessageButton = document.querySelector('.success__button');


const sendData = (onSuccess, onFail, body) => {
  const messageSuccess = successMessagePattern.cloneNode(true);
  const fragmentSuccess = document.createDocumentFragment();
  fragmentSuccess.appendChild(messageSuccess);
  fetch('https://24.javascript.pages.academy/kekstagram',
    {
      method: 'POST', //почему без этого не работет, ведь у меня уже указан метод в разметке
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        body.appendChild(fragmentSuccess);
      }
      else {
        onFail('Упс, что-то пошло не так:( Попробуйте еще раз');
      }
    })
    .catch(() => {
      onFail('Упс, что-то пошло не так:( Попробуйте еще раз');
    });
};


const getPhotoData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((preview) => {
      onSuccess(preview);
    })
    .catch(() => {
      showMessage('Не удалось загрузить ленту');
    });
};


export {getPhotoData, sendData};

