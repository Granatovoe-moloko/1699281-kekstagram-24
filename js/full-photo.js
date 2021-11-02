const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const fullPhotoComments = fullPhoto.querySelector('.social__comments');

const showFullPhotoComments = (photoComments) => {
  const commentFragment = document.createDocumentFragment();

  photoComments.forEach((comment) => {
    const {avatar, name, message} = comment;

    const commentItem = document.createElement('li');
    commentItem.classList.add('social__comment');

    const commentator = document.createElement('img');
    commentator.classList.add('social__picture');
    commentator.src = avatar;
    commentator.alt = name;
    commentator.style.width = '35';
    commentator.style.height = '35';
    commentItem.appendChild(commentator);

    const commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;
    commentItem.appendChild(commentText);

    commentFragment.appendChild(commentItem);
  });
  fullPhotoComments.innerHTML = '';
  fullPhotoComments.appendChild(commentFragment);
};

const showFullPhoto = (pictureData, photoComments) => {
  const {url, likes, comments, description} = pictureData;
  fullPhoto.classList.remove('hidden');
  fullPhotoImg.src = url;
  fullPhoto.querySelector('.likes-count').textContent = likes;
  fullPhoto.querySelector('.comments-count').textContent = comments.length;
  showFullPhotoComments(photoComments);
  fullPhoto.querySelector('.social__caption').textContent = description;
};

export {showFullPhoto};
