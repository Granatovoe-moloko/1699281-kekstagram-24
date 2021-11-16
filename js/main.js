import {showPreviews} from './previews.js';
import {getPhotoData} from './api.js';
import {downloadNewFile, addHandlerToSendForm, closeSuccessMessage, closeErrorMessage} from './form.js';


getPhotoData(showPreviews);

downloadNewFile();

addHandlerToSendForm(closeSuccessMessage, closeErrorMessage);


