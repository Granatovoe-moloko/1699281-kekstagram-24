import {showFullPhoto} from './full-photo.js';
import {isEscapeKey} from './utils.js';
import {debounce} from './utils/debounce.js';

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
  filters.classList.remove('img-filters--inactive');

  //копия изначального массива

  const picturesDataCopy = picturesData.slice();

  //фильтрация по умолчанию

  const filterDefault = (first, second) => first.id - second.id;

  defaultFilterButton.addEventListener('click', () => {

    const earlyPictures = document.querySelectorAll('.picture');
    earlyPictures.forEach((picture) => {
      picture.remove();
    });

    defaultFilterButton.classList.add('img-filters__button--active');

    if (randomFilterButton.classList.contains('img-filters__button--active')) {
      randomFilterButton.classList.remove('img-filters__button--active');
    }
    else {
      discussedFilterButton.classList.remove('img-filters__button--active');
    }

    const defaultPictures = picturesDataCopy.sort(filterDefault);
    console.log(defaultPictures);
    showPreviews(defaultPictures);

  });

  //случайная фильтрация

  const filterRandom = () =>  Math.random() - 0.5;

  randomFilterButton.addEventListener('click', () => {

    const earlyPictures = document.querySelectorAll('.picture');
    earlyPictures.forEach((picture) => {
      picture.remove();
    });

    randomFilterButton.classList.add('img-filters__button--active');

    if (defaultFilterButton.classList.contains('img-filters__button--active')) {
      defaultFilterButton.classList.remove('img-filters__button--active');
    }
    else {
      discussedFilterButton.classList.remove('img-filters__button--active');
    }

    const randomPictures = picturesData.sort(filterRandom);
    const viewRandomPictures = randomPictures.splice(0, VIEW_RANDOM_PICTURES_COUNT);
    showPreviews(viewRandomPictures);
  });

  //фильтрация по количеству комментариев

  const filterDiscussed = (first, second) => second.comments.length - first.comments.length;

  discussedFilterButton.addEventListener('click', () => {

    const earlyPictures = document.querySelectorAll('.picture');
    earlyPictures.forEach((picture) => {
      picture.remove();
    });

    discussedFilterButton.classList.add('img-filters__button--active');

    if (defaultFilterButton.classList.contains('img-filters__button--active')) {
      defaultFilterButton.classList.remove('img-filters__button--active');
    }
    else {
      randomFilterButton.classList.remove('img-filters__button--active');
    }

    const discussedPictures = picturesDataCopy.sort(filterDiscussed);
    console.log(discussedPictures);
    showPreviews(discussedPictures);

  });

};

export {showPreviews};

