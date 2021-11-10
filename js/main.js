import {createPhotoData} from './mock/create-photo-data.js';
import {showPreviews} from './previews.js';
import {formHandler} from './form.js';

const photoData = createPhotoData(11);

showPreviews(photoData);

formHandler();
