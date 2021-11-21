import {renderPreviews, filterPreviews} from './previews.js';
import {getPhotoData} from './api.js';
import {downloadNewFile, addHandlerToSendForm, closeSuccessMessage, closeErrorMessage} from './form.js';
import {uploadNewFileHandler} from './new-file.js';

getPhotoData((photos) => {
  renderPreviews(photos);
  filterPreviews(photos);
});

downloadNewFile();

uploadNewFileHandler();

addHandlerToSendForm(closeSuccessMessage, closeErrorMessage);


