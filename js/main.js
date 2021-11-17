import {renderPreviews, filterPreviews} from './previews.js';
import {getPhotoData} from './api.js';
import {downloadNewFile, addHandlerToSendForm, closeSuccessMessage, closeErrorMessage} from './form.js';

getPhotoData((photos) => {
  renderPreviews(photos);
  filterPreviews(photos);
});

downloadNewFile();

addHandlerToSendForm(closeSuccessMessage, closeErrorMessage);


