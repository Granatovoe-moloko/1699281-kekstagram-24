const previewList = document.querySelector('.pictures');
const previewPattern = document.querySelector('#picture').content.querySelector('.picture');


const showPreviews = (instancePreview) => {
  const fragment = document.createDocumentFragment();
  instancePreview.forEach(({url, likes, comments}) => {
    const preview = previewPattern.cloneNode(true);
    preview.querySelector('.picture__img').src = url;
    preview.querySelector('.picture__likes').textContent = likes;
    preview.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(preview);
  });
  previewList.appendChild(fragment);
};

export {showPreviews};

