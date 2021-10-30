import {createComments} from './mock/create-comments.js';

const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img');


const showFullPhotoComment = (avatar, name, message) => {
  const fullPhotoComments = fullPhoto.querySelector('.social__comments');

  const comment = document.createElement('li');
  comment.classList.add('social__comment');

  const commentator = document.createElement('img');
  commentator.classList.add('social__picture');
  commentator.src = avatar;
  commentator.alt = name;
  commentator.style.width = '35';
  commentator.style.height = '35';
  comment.appendChild(commentator);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = message;
  comment.appendChild(commentText);

  fullPhotoComments.appendChild(comment);
};


const showFullPhoto = (url, likes, comments, description) => {
  fullPhoto.classList.remove('hidden');
  fullPhotoImg.children.src = url;
  fullPhoto.querySelector('.likes-count').textContent = likes;
  fullPhoto.querySelector('.comments-count').textContent = comments.length;
  showFullPhotoComment(createComments()); //?
  fullPhoto.querySelector('.social__caption').textContent = description;
};

export {showFullPhoto};
