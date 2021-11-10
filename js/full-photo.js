const fullPhoto = document.querySelector('.big-picture');
const fullPhotoImg = fullPhoto.querySelector('.big-picture__img img');
const fullPhotoComments = fullPhoto.querySelector('.social__comments');
const fullPhotoComment = fullPhoto.querySelector('.social__comment');
const commentsLoaderButton = fullPhoto.querySelector('.social__comments-loader');
const fullPhotoCommentsCount = fullPhoto.querySelector('.social__comment-count');

const showFullPhotoComments = (photoComments) => {

  const allPhotoComments = document.createElement('span');
  allPhotoComments.classList.add('.comments-count');
  allPhotoComments.textContent = photoComments.length;
  fullPhotoCommentsCount.appendChild(allPhotoComments);

  const showPartOfComments = (array) => array.splice(0, 5);
  const commentFragment = document.createDocumentFragment();

  const cutVisionComments = (generatedComments) => {
    const visionComments = showPartOfComments(generatedComments);

    visionComments.forEach((comment) => {
      const {avatar, name, message} = comment;
      const commentpattern = fullPhotoComment.cloneNode(true);

      commentpattern.querySelector('.social__picture').src = avatar;
      commentpattern.querySelector('.social__picture').alt = name;
      commentpattern.querySelector('.social__text').textContent = message;

      commentFragment.appendChild(commentpattern);
    });
    if (visionComments.length < 5) {
      commentsLoaderButton.classList.add('hidden');
    }
    fullPhotoComments.innerHTML = '';
    fullPhotoComments.appendChild(commentFragment);

    fullPhotoCommentsCount.textContent = `${visionComments.length  } из `;
    fullPhotoCommentsCount.appendChild(allPhotoComments);
  };

  cutVisionComments(photoComments);

  commentsLoaderButton.addEventListener('click', () => {
    cutVisionComments(photoComments);
  });

};


const showFullPhoto = (pictureData) => {
  const {url, likes, comments, description} = pictureData;
  fullPhoto.classList.remove('hidden');
  fullPhotoImg.src = url;
  fullPhoto.querySelector('.likes-count').textContent = likes;
  showFullPhotoComments(comments);
  fullPhoto.querySelector('.social__caption').textContent = description;
};

export {showFullPhoto};
