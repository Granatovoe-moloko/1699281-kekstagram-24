import {createFotoData} from './mock/create-foto-data.js';

const pictureList = document.querySelector('.pictures');
pictureList.classList.remove('visually-hidden');
const picturePattern = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();

const createPictures = createFotoData(3);

createPictures.forEach(({url, likes, comments}) => {
  const picture = picturePattern.cloneNode(true);
  picture.querySelector('.picture__img').src = url;
  picture.querySelector('.picture__likes').textContent = likes;
  picture.querySelector('.picture__comments').textContent = comments.length;
  fragment.appendChild(picture);
});

pictureList.appendChild(fragment);

export {createPictures};
