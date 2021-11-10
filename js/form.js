import {isEscapeKey} from './utils.js';

const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_COUNT = 5;
const uploadFile = document.querySelector('#upload-file');
const newFileForm = document.querySelector('.img-upload__form');
const uploadForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelForm = document.querySelector('#upload-cancel');
const fieldHashtags = document.querySelector('.text__hashtags');
const regSymbolsHashtag = /[A-Za-zА-Яа-яЁё0-9]$/;
const regStartHashtag = /^#/;
const fieldComment = document.querySelector('.text__description');


const formHandler = () => {

  const cancelFormKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      uploadForm.classList.add('hidden');
      body.classList.remove('modal-open');
      newFileForm.reset();
      document.removeEventListener('keydown', cancelFormKeydown);
    }
  };

  const openUploadForm = () => {
    uploadForm.classList.remove('hidden');
    body.classList.add('modal-open');

    const activeHashtag = fieldHashtags.activeElement;
    const activeComment = fieldComment.activeElement;

    document.addEventListener('keydown', cancelFormKeydown);

    if (activeHashtag || activeComment) {
      document.removeEventListener('keydown', cancelFormKeydown); //не работает
    }
  };

  uploadFile.addEventListener('change', () => {
    openUploadForm();
  });

  cancelForm.addEventListener('click', () => {
    uploadForm.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', cancelFormKeydown);
  });

  //хэштеги
  const checkHashtags = (array) => {
    if (array.length > MAX_HASHTAG_COUNT) {
      fieldHashtags.setCustomValidity(`Не должно быть больше ${  MAX_HASHTAG_COUNT  } хэштегов`);
    }
    else if (array.length !== new Set(array).size) {
      fieldHashtags.setCustomValidity('удалите повторяющиеся хэштеги');
    }
    else {fieldHashtags.setCustomValidity('');}
    fieldHashtags.reportValidity();
  };


  fieldHashtags.addEventListener('input', () => {
    const lowerTextHashtags = fieldHashtags.value.toLowerCase();
    const hashtags = lowerTextHashtags.split(' ');


    hashtags.forEach((hashtag) => {
      if (!regStartHashtag.test(hashtag)) {
        fieldHashtags.setCustomValidity('хэштег должен начинаться с символа #');
      }
      else if (hashtag.length < MIN_HASHTAG_LENGTH) {
        fieldHashtags.setCustomValidity(`минимальная длина хэштега - ${  MIN_HASHTAG_LENGTH  } симв. с решеткой`);
      }
      else if (!regSymbolsHashtag.test(hashtag)) {
        fieldHashtags.setCustomValidity('хэштег может содержать только латинские и киррилические буквы и цифры');
      }
      else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        fieldHashtags.setCustomValidity(`максимальная длина хэштега - ${  MAX_HASHTAG_LENGTH  } симв. с решеткой`);
      }

      else {
        checkHashtags(hashtags);
      }

      fieldHashtags.reportValidity();
    });
  });

  //комментарии

  fieldComment.addEventListener('input', () => {
    const commentLength = fieldComment.value.length;

    if (commentLength > MAX_COMMENT_LENGTH) {
      fieldComment.setCustomValidity(`максимальная длина комментария - ${  MAX_COMMENT_LENGTH  } символов. Удалите ${  commentLength - MAX_COMMENT_LENGTH  }симв.`);
    }
    else {
      fieldComment.setCustomValidity('');
    }

    fieldComment.reportValidity();
  });

};

export {formHandler};
