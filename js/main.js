import {createPhotoData} from './mock/create-photo-data.js';
import {showPreviews} from './previews.js';


const photoData = createPhotoData(11);


showPreviews(photoData);
