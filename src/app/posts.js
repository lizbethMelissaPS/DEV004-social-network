// // cremos esta condicional donde decimos que si existen datos los recorremos

export function posts(arrPosts) {
  let htmlPost = '';
  arrPosts.forEach((element) => {
    htmlPost += `
        <p> ${element.texto} </p>
        `;
  });
  return htmlPost;
}
