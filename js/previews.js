import {showFullPhoto} from './full-photo.js';
import {commentsCount} from './mock/create-photo-data.js';

const previewList = document.querySelector('.pictures');
const previewPattern = document.querySelector('#picture').content.querySelector('.picture');
const commentCounter = document.querySelector('.social__comment-count');
const commentLoader = document.querySelector('.comments-loader');
const body = document.querySelector('body');


const showPreviews = (picturesData) => {
  const fragment = document.createDocumentFragment();
  picturesData.forEach((pictureData) => {
    const {url, likes, comments} = pictureData;
    const preview = previewPattern.cloneNode(true);
    preview.querySelector('.picture__img').src = url;
    preview.querySelector('.picture__likes').textContent = likes;
    preview.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(preview);

    preview.addEventListener('click', (evt) => {
      evt.preventDefault();
      const photoComments = commentsCount(2);
      showFullPhoto(pictureData, photoComments);
      commentCounter.classList.add('hidden');
      commentLoader.classList.add('hidden');
      body.classList.add('modal-open');
    });
  });
  previewList.appendChild(fragment);
};

export {showPreviews};

