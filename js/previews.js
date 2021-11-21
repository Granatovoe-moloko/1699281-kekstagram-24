import {isEscapeKey, debounce} from './utils.js';

const ADDED_COMMENTS_COUNT = 5;
const VIEW_RANDOM_PICTURES_COUNT = 10;
const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const fullPhotoComments = fullPhoto.querySelector('.social__comments');
const fullPhotoComment = fullPhoto.querySelector('.social__comment');
const commentsLoaderButton = fullPhoto.querySelector('.social__comments-loader');
const fullPhotoCommentsCount = fullPhoto.querySelector('.social__comment-count');
const previewList = document.querySelector('.pictures');
const previewPattern = document.querySelector('#picture').content.querySelector('.picture');
const body = document.querySelector('body');
const fullPhotoClose = document.querySelector('.big-picture__cancel');
const newCommentsField = document.querySelector('.social__footer-text');
const filters = document.querySelector('.img-filters');
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
let commentsRendered = 0;
let loadMoreClickHanlder;


const showFullPhotoComments = (photoComments) => {

  const allPhotoComments = document.createElement('span');
  allPhotoComments.classList.add('comments-count');
  allPhotoComments.textContent = photoComments.length;
  fullPhotoCommentsCount.appendChild(allPhotoComments);

  const commentFragment = document.createDocumentFragment();
  fullPhotoComments.innerHTML = '';


  const cutVisionComments = (generatedComments) => {
    commentsLoaderButton.classList.remove('hidden');
    const visionComments = generatedComments.slice(commentsRendered, commentsRendered + ADDED_COMMENTS_COUNT);

    commentsRendered += visionComments.length;

    visionComments.forEach((comment) => {
      const {avatar, name, message} = comment;
      const commentPattern = fullPhotoComment.cloneNode(true);

      commentPattern.querySelector('.social__picture').src = avatar;
      commentPattern.querySelector('.social__picture').alt = name;
      commentPattern.querySelector('.social__text').textContent = message;

      commentFragment.appendChild(commentPattern);
    });
    if (photoComments.length === commentsRendered) {
      commentsLoaderButton.classList.add('hidden');
    }
    fullPhotoComments.appendChild(commentFragment);

    fullPhotoCommentsCount.textContent = `${fullPhotoComments.childNodes.length  } из `;
    fullPhotoCommentsCount.appendChild(allPhotoComments);
  };

  cutVisionComments(photoComments);

  loadMoreClickHanlder = () => {
    cutVisionComments(photoComments);
  };
  commentsLoaderButton.addEventListener('click', loadMoreClickHanlder);

};


const showFullPhoto = (pictureData) => {
  const {url, likes, comments, description} = pictureData;
  fullPhoto.classList.remove('hidden');
  fullPhotoImg.src = url;
  fullPhoto.querySelector('.likes-count').textContent = likes;
  showFullPhotoComments(comments);
  fullPhoto.querySelector('.social__caption').textContent = description;
};


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
        fullPhotoComments.innerHTML = '';
        commentsLoaderButton.removeEventListener('click', loadMoreClickHanlder);
        commentsRendered = 0;
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
      fullPhotoComments.innerHTML = '';
      commentsLoaderButton.removeEventListener('click', loadMoreClickHanlder);
      commentsRendered = 0;
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

