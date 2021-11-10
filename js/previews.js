import {showFullPhoto} from './full-photo.js';
import {isEscapeKey} from './utils.js';

const previewList = document.querySelector('.pictures');
const previewPattern = document.querySelector('#picture').content.querySelector('.picture');
const body = document.querySelector('body');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoClose = document.querySelector('.big-picture__cancel');


const showPreviews = (picturesData) => {
  const fragment = document.createDocumentFragment();
  picturesData.forEach((pictureData) => {
    const {url, likes, comments} = pictureData;
    const preview = previewPattern.cloneNode(true);
    preview.querySelector('.picture__img').src = url;
    preview.querySelector('.picture__likes').textContent = likes;
    preview.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(preview);

    const closePhotoKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        fullPhoto.classList.add('hidden');
        body.classList.remove('modal-open');
        document.removeEventListener('keydown', closePhotoKeydown);
      }
    };

    const openPhoto = (evt) => {
      evt.preventDefault();
      showFullPhoto(pictureData);
      body.classList.add('modal-open');

      document.addEventListener('keydown', closePhotoKeydown);
    };

    preview.addEventListener('click', (evt) => {
      openPhoto(evt);
    });

    fullPhotoClose.addEventListener('click', () => {
      fullPhoto.classList.add('hidden');
      body.classList.remove('modal-open');
    });
  });
  previewList.appendChild(fragment);
};

export {showPreviews};

