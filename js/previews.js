import {showFullPhoto} from './full-photo.js';
import {isEscapeKey, debounce} from './utils.js';

const VIEW_RANDOM_PICTURES_COUNT = 10;

const previewList = document.querySelector('.pictures');
const previewPattern = document.querySelector('#picture').content.querySelector('.picture');
const body = document.querySelector('body');
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoClose = document.querySelector('.big-picture__cancel');
const newCommentsField = document.querySelector('.social__footer-text');
const filters = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');


const renderPreviews = (picturesData) => {
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
        newCommentsField.value = '';
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
      newCommentsField.value = '';
      document.removeEventListener('keydown', closePhotoKeydownHandler);
    });
  });
  previewList.appendChild(fragment);
  filters.classList.remove('img-filters--inactive');
};


//фильтры


const filterPreviews = (picturesData) => {

  const clearPreviews = () => {
    const earlyPictures = document.querySelectorAll('.picture');
    earlyPictures.forEach((picture) => {
      picture.remove();
    });
  };

  //фильтрация по умолчанию

  const filterDefault = (first, second) => first.id - second.id;

  defaultFilterButton.addEventListener('click', debounce(() => {
    clearPreviews();

    defaultFilterButton.classList.add('img-filters__button--active');
    if (randomFilterButton.classList.contains('img-filters__button--active')) {
      randomFilterButton.classList.remove('img-filters__button--active');
    }
    else {
      discussedFilterButton.classList.remove('img-filters__button--active');
    }

    const defaultPictures = picturesData.sort(filterDefault);
    renderPreviews(defaultPictures);

  }));

  //случайная фильтрация

  const filterRandom = () =>  Math.random() - 0.5;

  randomFilterButton.addEventListener('click', debounce(() => {
    clearPreviews();

    randomFilterButton.classList.add('img-filters__button--active');
    if (defaultFilterButton.classList.contains('img-filters__button--active')) {
      defaultFilterButton.classList.remove('img-filters__button--active');
    }
    else {
      discussedFilterButton.classList.remove('img-filters__button--active');
    }

    const randomPictures = picturesData.sort(filterRandom);
    const viewRandomPictures = randomPictures.slice(0, VIEW_RANDOM_PICTURES_COUNT);
    renderPreviews(viewRandomPictures);
  }));

  //фильтрация по количеству комментариев

  const filterDiscussed = (first, second) => second.comments.length - first.comments.length;

  discussedFilterButton.addEventListener('click', debounce(() => {
    clearPreviews();

    discussedFilterButton.classList.add('img-filters__button--active');
    if (defaultFilterButton.classList.contains('img-filters__button--active')) {
      defaultFilterButton.classList.remove('img-filters__button--active');
    }
    else {
      randomFilterButton.classList.remove('img-filters__button--active');
    }

    const discussedPictures = picturesData.sort(filterDiscussed);
    renderPreviews(discussedPictures);

  }));


};

export {renderPreviews, filterPreviews};

