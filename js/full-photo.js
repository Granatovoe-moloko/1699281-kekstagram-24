const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const fullPhotoComments = fullPhoto.querySelector('.social__comments');
const fullPhotoComment = fullPhoto.querySelector('.social__comment');

const showFullPhotoComments = (photoComments) => {
  const commentFragment = document.createDocumentFragment();

  photoComments.forEach((comment) => {
    const {avatar, name, message} = comment;
    const commentpattern = fullPhotoComment.cloneNode(true);

    commentpattern.querySelector('.social__picture').src = avatar;
    commentpattern.querySelector('.social__picture').alt = name;
    commentpattern.querySelector('.social__text').textContent = message;

    commentFragment.appendChild(commentpattern);
  });
  fullPhotoComments.innerHTML = '';
  fullPhotoComments.appendChild(commentFragment);
};

const showFullPhoto = (pictureData) => {
  const {url, likes, comments, description} = pictureData;
  fullPhoto.classList.remove('hidden');
  fullPhotoImg.src = url;
  fullPhoto.querySelector('.likes-count').textContent = likes;
  fullPhoto.querySelector('.comments-count').textContent = comments.length;
  showFullPhotoComments(comments);
  fullPhoto.querySelector('.social__caption').textContent = description;
};

export {showFullPhoto};
