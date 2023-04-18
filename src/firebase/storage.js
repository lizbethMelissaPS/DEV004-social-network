import {
  getStorage, ref, uploadBytesResumable, getDownloadURL,
} from 'firebase/storage';

// Crear una referencia raíz
const storage = getStorage();
// a esta función la invocamos para mostrar el mensaje final después del upload
function mensajeFinalizado(url) {
  const elMensaje = document.getElementById('file-box');
  const textoMensaje = `<img src="${url}" class="preview"> `;
  elMensaje.innerHTML = textoMensaje;
}

export function subirArchivo(archivo) {
  console.log('entramos!!', archivo);
  const refStorage = ref(storage, `images/${archivo.name}`);
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
  };
  const uploadTask = uploadBytesResumable(refStorage, archivo, metadata);
  console.log(uploadTask);
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
      // eslint-disable-next-line default-case
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
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
        mensajeFinalizado(url);
      });
    },
  );
}
