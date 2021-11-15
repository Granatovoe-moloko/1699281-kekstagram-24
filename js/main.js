import {showPreviews} from './previews.js';
import {getPhotoData} from './api.js';
import {downloadNewFile, sendForm, closeForm} from './form.js';


getPhotoData(showPreviews);

downloadNewFile();

sendForm(closeForm);


