import {createFoto} from './mock/create-foto';

const arrayOfCreateFoto = (count) =>
  [...Array(count)].map(createFoto);

arrayOfCreateFoto(3);

