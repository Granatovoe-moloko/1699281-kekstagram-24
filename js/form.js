import {isEscapeKey} from './mock/utils.js';

const uploadFile = document.querySelector('#upload-file');
const uploadForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const cancelForm = document.querySelector('#upload-cancel');
const scaleControl = document.querySelector('.scale__control--value');
const effectLevel = document.querySelector('.effect-level__value');
const defaultEffect = document.querySelector('#effect-none');
const hashtag = document.querySelector('.text__hashtags');
const regHashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const fieldComment = document.querySelector('.text__description');
const MAX_COMMENT_LENGTH = 140;


const cancelFormKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    uploadForm.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.value = ''; //почему это не нужно для закрытия по клику?куда записывается значение value,если для input form нет value
    scaleControl.value = '55%';
    effectLevel.value = '';
    defaultEffect.checked = true;
    hashtag.value = '';
    fieldComment.value = '';
    document.removeEventListener('keydown', cancelFormKeydown);
  }
};

/*hashtag.addEventListener('focus', (evt) => {
  evt.stopPropagation(cancelFormKeydown);
});
fieldComment.addEventListener('focus', (evt) => {
  evt.stopPropagation(cancelFormKeydown);
});*/

//не работают

const openUploadForm = () => {
  uploadForm.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', cancelFormKeydown);
};


uploadFile.addEventListener('change', () => {
  openUploadForm();
});

cancelForm.addEventListener('click', () => {
  uploadForm.classList.add('hidden');
  body.classList.remove('modal-open');
});


hashtag.addEventListener('input', () => {
  const arrayHashtags = hashtag.value.split(' ',5); //опубликовал 6 хэштегов, ошибку не показал, только в отправленной форме

  arrayHashtags.forEach((item) => {
    if (!regHashtag.test(item)) {
      hashtag.setCustomValidity('где-то в ваших хэштэгах ошибка');
    }
    else {
      hashtag.setCustomValidity('');
    }
  });

  //можно ли разделить проверку, чтобы на разные случаи
  //были разные сообщения? делить регулярное выражение на несколько?
  //нужно ли это делать?

  /* нужно уточнить по этим пунктам:
хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
один и тот же хэш-тег не может быть использован дважды;*/

  hashtag.reportValidity();
});

fieldComment.addEventListener('input', () => {
  const commentLength = fieldComment.value.length;

  if (commentLength > MAX_COMMENT_LENGTH) {
    fieldComment.setCustomValidity(`максимальная длина комментария - ${  MAX_COMMENT_LENGTH  } символов. Удалите ${  commentLength - MAX_COMMENT_LENGTH  }симв.`);
  }
  else {
    fieldComment.setCustomValidity(`${commentLength  }/${  MAX_COMMENT_LENGTH}`);
  }
  fieldComment.reportValidity();
});
