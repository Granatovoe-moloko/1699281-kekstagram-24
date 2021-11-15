import {showFullPhoto} from './full-photo.js';
import {isEscapeKey} from './utils.js';

const previewList = document.querySelector('.pictures');
const previewPattern = document.querySelector('#picture').content.querySelector('.picture');
const body = document.querySelector('body');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoClose = document.querySelector('.big-picture__cancel');
const newCommentsField = document.querySelector('.social__footer-text');


const showPreviews = (picturesData) => {
  const fragment = document.createDocumentFragment();
  picturesData.forEach((pictureData) => {
    const {url, likes, comments} = pictureData;
    const preview = previewPattern.cloneNode(true);
    preview.querySelector('.picture__img').src = url;
    preview.querySelector('.picture__likes').textContent = likes;
    preview.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(preview);

    const closePhotoKeydownHandler = (evt) => {
      if (isEscapeKey(evt) && document.activeElement !== newCommentsField) {
        fullPhoto.classList.add('hidden');
        body.classList.remove('modal-open');
        document.removeEventListener('keydown', closePhotoKeydownHandler);
      }
    };

    const openPhotoHandler = (evt) => {
      evt.preventDefault();
      showFullPhoto(pictureData);
      body.classList.add('modal-open');

      document.addEventListener('keydown', closePhotoKeydownHandler);
    };

    preview.addEventListener('click', openPhotoHandler);

    fullPhotoClose.addEventListener('click', () => {
      fullPhoto.classList.add('hidden');
      body.classList.remove('modal-open');
    });
  });
  previewList.appendChild(fragment);
};

export {showPreviews};

