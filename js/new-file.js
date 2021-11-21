const FILE_TYPES = ['png', 'jpg', 'jpeg'];
const newFileField = document.querySelector('.img-upload__input');
const newFilePreview = document.querySelector('.img-upload__preview img');

const uploadNewFileHandler = () => {

  newFileField.addEventListener('change', () => {
    const newFile = newFileField.files[0];
    const newFileName = newFile.name.toLowerCase();

    const matches = FILE_TYPES.some((fileType) => newFileName.endsWith(fileType));

    if (matches) {
      newFilePreview.src = URL.createObjectURL(newFile);
    }
  });
};

export {uploadNewFileHandler};
