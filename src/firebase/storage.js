import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import { app } from './config';
// Crear una referencia raíz
const storage = getStorage(app);
// a esta función la invocamos para mostrar la imagen previa
function imgPreview(url) {
  const fileBox = document.getElementById('file-box');
  const img = `<img src="${url}" class="preview"> `;
  fileBox.innerHTML = img;
}

export function uploadFile(file) {
  const refStorage = ref(storage, `images/${file.name}`);
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
  };
  const uploadTask = uploadBytesResumable(refStorage, file, metadata);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // console.log(`Upload is ${progress}% done`);
      // eslint-disable-next-line default-case
      switch (snapshot.state) {
        case 'paused':
          // console.log('Upload is paused');
          break;
        case 'running':
          // console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // eslint-disable-next-line default-case
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

          // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        localStorage.setItem('url', url);
        imgPreview(url);
      });
    },
  );
}
