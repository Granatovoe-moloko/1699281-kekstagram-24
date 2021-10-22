import {createFotos} from './mock/create-fotos.js';

const pictureList = document.querySelector('.pictures');
pictureList.classList.remove('visually-hidden');
const picturePattern = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createPictures = createFotos();

createPictures.forEach(() => {
  const picture = picturePattern.cloneNode(true);
  picture.querySelector('.picture__img').src =
  fragment.appendChild(picture);
});

pictureList.appendChild(fragment);
