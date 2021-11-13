import {createPhotoData} from './mock/create-photo-data.js';
import {showPreviews} from './previews.js';
import {downloadNewFile} from './form.js';

const photoData = createPhotoData(11);

showPreviews(photoData);

downloadNewFile();
