// Servicios de APIs Firebase
// export const storageService = firebase.storage();// función que se encargará de subir el archivo
import { getStorage, ref, uploadBytes } from 'firebase/storage';
// import { Auth } from 'firebase/auth';
// Crear una referencia raíz
const storage = getStorage();
// a esta función la invocamos para mostrar el mensaje final después del upload
function mensajeFinalizado(url, bytes) {
  const elMensaje = document.getElementById('mensaje');
  let textoMensaje = '<p>Subido el archivo!';
  textoMensaje += `<br>Bytes subidos: ${bytes}`;
  textoMensaje += `<br><a href="${url}">Ver el fichero</a></p>`;
  elMensaje.innerHTML = textoMensaje;
}

export function subirArchivo(archivo) {
  // creo una referencia al lugar donde guardaremos el archivo
  // const refStorage = getStorage.ref('micarpeta').child(archivo.name);
  const refStorage = ref(storage, 'images/space.jpg');
  // Comienzo la tarea de upload
  // const uploadTask = refStorage.put(archivo);
  // Create file metadata including the content type
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
  };
  // Upload the file and metadata
  const uploadTask = uploadBytes(refStorage, archivo, metadata);
  // defino un evento para saber qué pasa con ese upload iniciado
  uploadTask.then(
    'state_changed',
    null,
    (error) => {
      console.log('Error al subir el archivo', error);
    },
    () => {
      console.log('Subida completada');
      mensajeFinalizado(uploadTask.snapshot.downloadURL, uploadTask.snapshot.totalBytes);
    },
  );
}

/* window.onload = function () {
  // realizamos la autenticación anónima (debe estar activada en la consola de Firebase)
  /* authService.signInAnonymously()
    .catch((error) => {
      console.error('Detectado error de autenticación', error);
    }); *

  // asociamos el manejador de eventos sobre el INPUT FILE
  document.getElementById('campoarchivo').addEventListener('change', (evento) => {
    evento.preventDefault();
    const archivo = evento.target.files[0];
    subirArchivo(archivo);
  });
}; */

/*
export const saveImg = (file) => firebase.storage().put(file);
export const getFileFromStorage = (path) => firebase.storage().ref().child(path).getDownloadURL();
 */
