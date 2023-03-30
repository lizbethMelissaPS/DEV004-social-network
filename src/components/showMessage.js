export function showMessage(message, type = 'sucess') {
  // eslint-disable-next-line no-undef
  Toastify({
    text: message,
    duration: 3000,
    destination: '',
    newWindow: true,
    close: true,
    gravity: 'top', // `top` or `bottom`
    position: 'center', // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: type === 'success' ? 'green' : 'red', // para que cambie de color
    },
    onClick() {}, // Callback after click
  }).showToast();
}
