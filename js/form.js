import {isEscapeKey} from './utils.js';
import {sendData} from './api.js';


const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_LENGTH = 20;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_COUNT = 5;
const STEP_CHANGE_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const uploadFile = document.querySelector('#upload-file');
const newFileForm = document.querySelector('.img-upload__form');
const uploadForm = document.querySelector('.img-upload__overlay');
const newFilePreview = document.querySelector('.img-upload__preview img');
const body = document.querySelector('body');
const cancelForm = document.querySelector('#upload-cancel');
const fieldHashtags = document.querySelector('.text__hashtags');
const regSymbolsHashtag = /[A-Za-zА-Яа-яЁё0-9]$/;
const regStartHashtag = /^#/;
const fieldComment = document.querySelector('.text__description');
const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scaleValueField = document.querySelector('.scale__control--value');
const effectsOfFile = document.querySelectorAll('.effects__radio');
const slider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelFieldset = document.querySelector('.img-upload__effect-level');
const successMessagePattern = document.querySelector('#success').content.querySelector('.success');
const errorMessagePattern = document.querySelector('#error').content.querySelector('.error');


const closeSuccessMessage =() => {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');
  newFileForm.reset();
  newFilePreview.className = '';
  effectLevelFieldset.classList.add('hidden');
  newFilePreview.style.transform = 'scale(1)';
  newFilePreview.style.cssText = null;

  const messageSuccess = successMessagePattern.cloneNode(true);
  document.body.appendChild(messageSuccess);

  const buttonSuccess = document.querySelector('.success__button');

  const closeMessageEscape = (evt) => {
    if (isEscapeKey(evt)) {
      messageSuccess.remove();
    }
  };

  document.addEventListener('keydown', closeMessageEscape);

  buttonSuccess.addEventListener('click', () => {
    messageSuccess.remove();
  });
  document.addEventListener('click', () => {
    if (document.activeElement !== messageSuccess) {
      messageSuccess.remove();
    }
  });
};


const closeErrorMessage =() => {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');
  newFileForm.reset();
  newFilePreview.className = '';
  effectLevelFieldset.classList.add('hidden');
  newFilePreview.style.transform = 'scale(1)';
  newFilePreview.style.cssText = null;

  const messageError = errorMessagePattern.cloneNode(true);
  document.body.appendChild(messageError);

  const buttonError = document.querySelector('.error__button');

  const closeMessageEscape = (evt) => {
    if (isEscapeKey(evt)) {
      messageError.remove();
    }
  };

  document.addEventListener('keydown', closeMessageEscape);

  buttonError.addEventListener('click', () => {
    messageError.remove();
  });
  document.addEventListener('click', () => {
    if (document.activeElement !== messageError) {
      messageError.remove();
    }
  });
};


const addHandlerToSendForm = (onSuccess, onFail) => {
  newFileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

const closeForm =() => {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');
  newFileForm.reset();
  newFilePreview.className = '';
  effectLevelFieldset.classList.add('hidden');
  newFilePreview.style.transform = 'scale(1)';
  newFilePreview.style.cssText = null;
};

const downloadNewFile = () => {

  const cancelFormKeydownHandler = (evt) => {
    if (isEscapeKey(evt) && document.activeElement !== fieldHashtags && document.activeElement !== fieldComment) {
      closeForm();
      document.removeEventListener('keydown', cancelFormKeydownHandler);
    }
  };

  const openUploadFormHandler = () => {
    uploadForm.classList.remove('hidden');
    body.classList.add('modal-open');

    document.addEventListener('keydown', cancelFormKeydownHandler);
  };

  uploadFile.addEventListener('change', openUploadFormHandler);

  cancelForm.addEventListener('click', () => {
    closeForm();
    document.removeEventListener('keydown', cancelFormKeydownHandler);
  });

  //размер изображения

  const changeScale = (step) => {
    const result = parseInt(scaleValueField.value, 10) + step;
    scaleValueField.value = `${result  }%`;
    newFilePreview.style.transform = `scale(${result / 100})`;
  };

  buttonScaleSmaller.addEventListener('click', () => {
    if (parseInt(scaleValueField.value, 10) > MIN_SCALE) {
      changeScale(- STEP_CHANGE_SCALE);
    }
  });

  buttonScaleBigger.addEventListener('click', () => {
    if (parseInt(scaleValueField.value, 10) < MAX_SCALE) {
      changeScale(STEP_CHANGE_SCALE);
    }
  });

  //смена эффекта изображения
  const changeEffect = (effectValue) => {
    newFilePreview.className = '';
    newFilePreview.classList.toggle(`effects__preview--${  effectValue}`);
  };

  effectsOfFile.forEach((item) => {
    item.addEventListener('change', () => {
      if(item.checked) {
        const effect = item.value;
        changeEffect(effect);
      }
    });
  });

  // ползунок

  noUiSlider.create(slider, {
    start: 1,
    range: {
      'min': 0,
      'max': 1,
    },
    step: 0.1,
  });

  slider.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevelValue.value = unencoded[handle];
    if(newFilePreview.classList.contains('effects__preview--chrome')) {
      newFilePreview.style.filter = `grayscale(${effectLevelValue.value})`;
    }
    else if(newFilePreview.classList.contains('effects__preview--sepia')) {
      newFilePreview.style.filter = `sepia(${effectLevelValue.value})`;
    }
    else if(newFilePreview.classList.contains('effects__preview--marvin')) {
      newFilePreview.style.filter = `invert(${`${effectLevelValue.value  }%`})`;
    }
    else if(newFilePreview.classList.contains('effects__preview--phobos')) {
      newFilePreview.style.filter = `blur(${`${effectLevelValue.value  }px`})`;
    }
    else if(newFilePreview.classList.contains('effects__preview--heat')) {
      newFilePreview.style.filter = `brightness(${effectLevelValue.value})`;
    }
  });

  effectsOfFile.forEach((item) => {
    item.addEventListener('change', () => {
      if(newFilePreview.classList.contains('effects__preview--chrome')) {
        effectLevelFieldset.classList.remove('hidden');
        slider.noUiSlider.updateOptions({
          start: 1,
          range: {
            'min': 0,
            'max': 1,
          },
          step: 0.1,
        });
      }

      else if(newFilePreview.classList.contains('effects__preview--sepia')) {
        effectLevelFieldset.classList.remove('hidden');
        slider.noUiSlider.updateOptions({
          start: 1,
          range: {
            'min': 0,
            'max': 1,
          },
          step: 0.1,
        });
      }

      else if(newFilePreview.classList.contains('effects__preview--marvin')) {
        effectLevelFieldset.classList.remove('hidden');
        slider.noUiSlider.updateOptions({
          start: 100,
          range: {
            'min': 0,
            'max': 100,
          },
          step: 1,
        });
      }

      else if(newFilePreview.classList.contains('effects__preview--phobos')) {
        effectLevelFieldset.classList.remove('hidden');
        slider.noUiSlider.updateOptions({
          start: 3,
          range: {
            'min': 0,
            'max': 3,
          },
          step: 0.1,
        });
      }

      else if(newFilePreview.classList.contains('effects__preview--heat')) {
        effectLevelFieldset.classList.remove('hidden');
        slider.noUiSlider.updateOptions({
          start: 3,
          range: {
            'min': 0,
            'max': 3,
          },
          step: 0.1,
        });
      }

      else if(newFilePreview.classList.contains('effects__preview--none')) {
        effectLevelFieldset.classList.add('hidden');
        effectLevelValue.value = '';
        newFilePreview.style.cssText = null;
      }

    });
  });


  //хэштеги
  const illuminateInvalidFields = (field) => {
    field.style.borderColor = 'red';
    field.style.borderWidth = '3px';
  };

  const checkHashtags = (array) => {
    if (array.length > MAX_HASHTAG_COUNT) {
      fieldHashtags.setCustomValidity(`Не должно быть больше ${  MAX_HASHTAG_COUNT  } хэштегов`);
      illuminateInvalidFields(fieldHashtags);
    }
    else if (array.length !== new Set(array).size) {
      fieldHashtags.setCustomValidity('удалите повторяющиеся хэштеги');
      illuminateInvalidFields(fieldHashtags);
    }
    else {
      fieldHashtags.setCustomValidity('');
      fieldHashtags.style.borderColor = 'rgb(118, 118, 118)';
      fieldHashtags.style.borderWidth = '2px';
    }
    fieldHashtags.reportValidity();
  };


  fieldHashtags.addEventListener('input', () => {
    const lowerTextHashtags = fieldHashtags.value.toLowerCase();
    const hashtags = lowerTextHashtags.split(' ');


    hashtags.forEach((hashtag) => {
      if (!regStartHashtag.test(hashtag)) {
        fieldHashtags.setCustomValidity('хэштег должен начинаться с символа #');
        illuminateInvalidFields(fieldHashtags);
      }
      else if (hashtag.length < MIN_HASHTAG_LENGTH) {
        fieldHashtags.setCustomValidity(`минимальная длина хэштега - ${  MIN_HASHTAG_LENGTH  } симв. с решеткой`);
        illuminateInvalidFields(fieldHashtags);
      }
      else if (!regSymbolsHashtag.test(hashtag)) {
        fieldHashtags.setCustomValidity('хэштег может содержать только латинские и киррилические буквы и цифры');
        illuminateInvalidFields(fieldHashtags);
      }
      else if (hashtag.length > MAX_HASHTAG_LENGTH) {
        fieldHashtags.setCustomValidity(`максимальная длина хэштега - ${  MAX_HASHTAG_LENGTH  } симв. с решеткой`);
        illuminateInvalidFields(fieldHashtags);
      }

      else {
        fieldHashtags.style.borderColor = 'rgb(118, 118, 118)';
        fieldHashtags.style.borderWidth = '2px';
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
      illuminateInvalidFields(fieldComment);
    }
    else {
      fieldHashtags.style.borderColor = 'rgb(118, 118, 118)';
      fieldHashtags.style.borderWidth = '1px';
      fieldComment.setCustomValidity('');
    }

    fieldComment.reportValidity();
  });

};

export {downloadNewFile, addHandlerToSendForm, closeForm, closeSuccessMessage, closeErrorMessage};
